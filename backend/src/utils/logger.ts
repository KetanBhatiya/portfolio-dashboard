type LogMeta = Record<string, unknown>;

const formatMeta = (meta?: LogMeta): string => {
  if (!meta || Object.keys(meta).length === 0) {
    return "";
  }

  return ` ${JSON.stringify(meta)}`;
};

export const logger = {
  error: (message: string, error?: unknown, meta?: LogMeta): void => {
    const details =
      error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : error;

    console.error(`[ERROR] ${message}${formatMeta(meta)}`, details ?? "");
  },

  warn: (message: string, meta?: LogMeta): void => {
    console.warn(`[WARN] ${message}${formatMeta(meta)}`);
  },

  info: (message: string, meta?: LogMeta): void => {
    console.info(`[INFO] ${message}${formatMeta(meta)}`);
  },
};
