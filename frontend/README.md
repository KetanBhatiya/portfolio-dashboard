# Portfolio Dashboard Frontend

Frontend application for visualizing investment portfolio performance.

The dashboard consumes portfolio data from the backend and presents it through responsive tables, summary cards and interactive charts.

---

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- TanStack Query
- Axios
- Recharts
- Lucide React

---

## Features

- Portfolio Dashboard
- Summary Cards
- Portfolio Holdings Table
- Sector Allocation
- Portfolio Analytics Charts
- Loading Skeletons
- Error Handling
- Responsive Design

---

## Project Structure

```
src/
├── app/
├── components/
├── hooks/
├── lib/
├── providers/
├── types/
├── utils/
```

---

## Environment Variables

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

## Installation

```bash
git clone <repository-url>

cd frontend

npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

---

## Dashboard Sections

- Portfolio Summary
- Portfolio Analytics
- Sector Allocation
- Portfolio Holdings

---

## Data Flow

```
Backend API
      │
      ▼
TanStack Query
      │
      ▼
Dashboard
      │
      ├── Summary Cards
      ├── Charts
      ├── Sector Allocation
      └── Portfolio Table
```

---

## Design Decisions

- Business logic remains in the backend.
- Frontend focuses on presentation and lightweight aggregation.
- TanStack Query manages server state.
- Components are reusable and modular.
- Responsive layout built with Tailwind CSS.

---

## Author

Ketan Bhatiya
