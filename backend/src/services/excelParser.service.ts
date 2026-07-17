import fs from "fs";
import path from "path";

import * as XLSX from "xlsx";

import { PortfolioStock } from "../types/portfolio.types";
import { AppError } from "../utils/app-error";

type StockColumnKey = keyof Omit<PortfolioStock, "sector">;

type ColumnMap = Record<StockColumnKey, number>;

const REQUIRED_COLUMNS: StockColumnKey[] = [
  "stockName",
  "symbol",
  "purchasePrice",
  "quantity",
];

const COLUMN_ALIASES: Record<StockColumnKey, string[]> = {
  stockName: [
    "particulars",
    "stock name",
    "stock",
    "name",
    "company",
    "company name",
  ],
  symbol: ["nse/bse", "nse", "bse", "symbol", "ticker", "stock symbol"],
  purchasePrice: [
    "purchase price",
    "purchase",
    "price",
    "buy price",
    "avg price",
    "average price",
  ],
  quantity: ["qty", "quantity", "shares", "units", "no of shares"],
};

const normalizeCellValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
};

const isEmptyRow = (row: unknown[]): boolean => {
  return row.every((cell) => normalizeCellValue(cell) === "");
};

const isSectorLabel = (value: string): boolean => {
  return /\bsector\b/i.test(value);
};

/**
 * Sector rows look like "Financial Sector" in the Particulars column, often
 * accompanied by aggregate totals in other columns.
 */
const isSectorHeaderRow = (row: unknown[]): boolean => {
  const name = normalizeCellValue(row[1]); // Column B

  if (!name) return false;

  // Stock rows have purchase price and qty
  const purchasePrice = normalizeCellValue(row[2]);
  const qty = normalizeCellValue(row[3]);

  return !purchasePrice && !qty;
};

const extractSectorName = (row: unknown[]): string => {
  return normalizeCellValue(row[1]);
};

const isTotalRow = (row: unknown[]): boolean => {
  const labelCandidates = row
    .slice(0, 3)
    .map((cell) => normalizeCellValue(cell).toLowerCase());

  return labelCandidates.some(
    (cell) => cell === "total" || cell.startsWith("total "),
  );
};

const normalizeHeaderLabel = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const resolveColumnKey = (headerLabel: string): StockColumnKey | null => {
  const normalizedLabel = normalizeHeaderLabel(headerLabel);

  for (const [columnKey, aliases] of Object.entries(COLUMN_ALIASES) as [
    StockColumnKey,
    string[],
  ][]) {
    if (aliases.includes(normalizedLabel)) {
      return columnKey;
    }
  }

  return null;
};

const buildColumnMap = (row: unknown[]): Partial<ColumnMap> => {
  const columnMap: Partial<ColumnMap> = {};

  row.forEach((cell, index) => {
    const headerLabel = normalizeCellValue(cell);

    if (!headerLabel) {
      return;
    }

    const columnKey = resolveColumnKey(headerLabel);

    if (columnKey) {
      columnMap[columnKey] = index;
    }
  });

  return columnMap;
};

const isHeaderRow = (row: unknown[]): boolean => {
  const columnMap = buildColumnMap(row);

  return REQUIRED_COLUMNS.every(
    (columnKey) => columnMap[columnKey] !== undefined,
  );
};

const validateColumnMap = (columnMap: Partial<ColumnMap>): ColumnMap => {
  const missingColumns = REQUIRED_COLUMNS.filter(
    (columnKey) => columnMap[columnKey] === undefined,
  );

  if (missingColumns.length > 0) {
    throw new AppError(
      `Missing required columns in Excel sheet: ${missingColumns.join(", ")}`,
      400,
      { missingColumns },
    );
  }

  return columnMap as ColumnMap;
};

const parseNumericValue = (value: unknown, fieldName: string): number => {
  const normalizedValue = normalizeCellValue(value).replace(/,/g, "");

  if (!normalizedValue) {
    throw new Error(`${fieldName} is required`);
  }

  const parsedValue = Number(normalizedValue);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`${fieldName} must be a valid number`);
  }

  return parsedValue;
};

const parseStockRow = (
  row: unknown[],
  columnMap: ColumnMap,
  sector: string,
): PortfolioStock | null => {
  const stockName = normalizeCellValue(row[columnMap.stockName]);
  const symbol = normalizeCellValue(row[columnMap.symbol]);

  if (!stockName || !symbol) {
    return null;
  }

  try {
    return {
      stockName,
      symbol,
      sector,
      purchasePrice: parseNumericValue(
        row[columnMap.purchasePrice],
        "purchasePrice",
      ),
      quantity: parseNumericValue(row[columnMap.quantity], "quantity"),
    };
  } catch {
    return null;
  }
};

/**
 * Reads a portfolio Excel file and converts rows into strongly typed stock objects.
 */
export const parsePortfolioExcel = (filePath: string): PortfolioStock[] => {
  const resolvedFilePath = path.resolve(filePath);

  if (!fs.existsSync(resolvedFilePath)) {
    throw new AppError(
      `Portfolio Excel file not found: ${resolvedFilePath}`,
      404,
    );
  }

  let workbook: XLSX.WorkBook;

  try {
    workbook = XLSX.readFile(resolvedFilePath, { cellDates: false });
  } catch {
    throw new AppError(
      `Unable to read portfolio Excel file: ${resolvedFilePath}`,
      400,
    );
  }

  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new AppError("Portfolio Excel file does not contain any sheets", 400);
  }

  const worksheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<unknown[]>(worksheet, {
    header: 1,
    defval: "",
    raw: false,
  });

  if (!rows.length) {
    throw new AppError("Portfolio Excel sheet is empty", 400);
  }

  const portfolioStocks: PortfolioStock[] = [];
  let currentSector = "";
  let columnMap: ColumnMap | null = null;
  let hasValidHeader = false;

  for (const row of rows) {
    const normalizedRow = Array.isArray(row) ? row : [];

    console.log(normalizedRow);
    if (isEmptyRow(normalizedRow)) {
      continue;
    }

    if (isSectorHeaderRow(normalizedRow)) {
      currentSector = extractSectorName(normalizedRow);
      continue;
    }

    if (isHeaderRow(normalizedRow)) {
      columnMap = validateColumnMap(buildColumnMap(normalizedRow));
      hasValidHeader = true;
      continue;
    }

    if (isTotalRow(normalizedRow)) {
      continue;
    }

    if (!columnMap || !hasValidHeader) {
      continue;
    }

    if (!currentSector) {
      continue;
    }

    const stock = parseStockRow(normalizedRow, columnMap, currentSector);

    if (stock) {
      portfolioStocks.push(stock);
    }
  }

  if (!hasValidHeader) {
    throw new AppError(
      "Required columns are missing from the portfolio Excel sheet",
      400,
      { requiredColumns: REQUIRED_COLUMNS },
    );
  }

  if (!portfolioStocks.length) {
    throw new AppError("No portfolio stock rows found in the Excel sheet", 400);
  }

  return portfolioStocks;
};
