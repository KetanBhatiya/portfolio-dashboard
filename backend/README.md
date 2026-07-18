# Portfolio Dashboard Backend

Backend service for the Portfolio Dashboard assignment.

The application reads portfolio data from an Excel file, enriches it with live market data from Yahoo Finance, performs portfolio calculations, and exposes the processed data through REST APIs.

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Yahoo Finance API (yahoo-finance2)
- XLSX
- Zod
- Axios

---

## Features

- Parse portfolio data from Excel
- Validate Excel structure
- Fetch live stock market data from Yahoo Finance
- Calculate:
  - Investment
  - Current Market Value
  - Gain/Loss
  - Portfolio Allocation
- REST API architecture
- Centralized error handling
- Type-safe implementation
- Clean folder structure

---

## Project Structure

```
src/
├── config/
├── constants/
├── controllers/
├── middlewares/
├── routes/
├── services/
├── types/
├── utils/
├── validators/
├── app.ts
└── server.ts
```

---

## Environment Variables

Create a `.env` file.

```env
PORT=5000
```

---

## Installation

```bash
git clone <repository-url>

cd backend

npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

---

## API Endpoint

### Get Portfolio

```
GET /api/v1/portfolio
```

Response:

```json
{
  "success": true,
  "data": [...]
}
```

---

## Data Flow

```
Excel File
      │
      ▼
Excel Parser
      │
      ▼
Validate Data
      │
      ▼
Yahoo Finance
      │
      ▼
Portfolio Calculator
      │
      ▼
REST API Response
```

---

## Assumptions

- Portfolio data is sourced from the provided Excel sheet.
- Yahoo Finance is used for live market information.
- Some stock symbols may not be available on Yahoo Finance and are returned with null market values.
- Portfolio calculations are performed on the server.

---

## Author

Ketan Bhatiya
