# Production Ready Store

Full-stack product CRUD application.

## Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Material UI
- Backend: Node.js, Express, TypeScript, Prisma
- Database: PostgreSQL

## Setup

Install dependencies:

```bash
npm install --prefix backend
npm install --prefix frontend
```

Create environment files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Start PostgreSQL:

```bash
docker compose up -d postgres
```

Run the Prisma migration:

```bash
npm --prefix backend run prisma:migrate
```

Start the backend:

```bash
npm --prefix backend run dev
```

Start the frontend:

```bash
npm --prefix frontend run dev
```

Default URLs:

- Frontend: `http://127.0.0.1:3000`
- Backend: `http://localhost:4000`
- PostgreSQL: `localhost:15432`
- Health check: `http://localhost:4000/health`

## API

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```
