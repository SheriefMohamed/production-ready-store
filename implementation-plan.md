# Product CRUD Application Plan

## Goal

Create two applications in this project:

- `frontend`: React + TypeScript + Vite application for product CRUD screens.
- `backend`: Node.js + Express API backed by PostgreSQL for product CRUD operations.

No implementation will be started until the plan and open questions are confirmed.

## Proposed Project Structure

```text
production-ready-store/
  frontend/
    src/
      api/
      components/
      pages/
      types/
      App.tsx
      main.tsx
    package.json
    vite.config.ts
    tsconfig.json

  backend/
    src/
      config/
      db/
      routes/
      controllers/
      services/
      repositories/
      validators/
      types/
      app.ts
      server.ts
    migrations/
    package.json
    tsconfig.json
    .env.example
```

## Backend Plan

### Technology

- Runtime: Node.js
- Framework: Express
- Language: TypeScript
- Database: PostgreSQL
- Database access: to confirm, likely one of:
  - Prisma
  - Drizzle ORM
  - node-postgres with SQL migrations

### Product Model

Initial proposed fields:

```text
id: UUID or auto-increment integer
name: string
description: string | nullable
price: decimal
stock: integer
sku: string | nullable
created_at: timestamp
updated_at: timestamp
```

### API Endpoints

```text
GET    /api/products          List products
GET    /api/products/:id      Get one product
POST   /api/products          Create product
PUT    /api/products/:id      Update product
DELETE /api/products/:id      Delete product
```

### Backend Tasks

1. Initialize `backend` as a TypeScript Node.js project.
2. Add Express server setup.
3. Add PostgreSQL connection configuration.
4. Add product table migration.
5. Add product routes, controllers, service/repository layer, and validation.
6. Add consistent API error responses.
7. Add `.env.example`.
8. Add development scripts.
9. Add basic backend tests if desired.

## Frontend Plan

### Technology

- React
- TypeScript
- Vite
- Fetch or Axios for API calls
- Styling approach to confirm

### Screens

1. Product list
   - Display products in a table or card list.
   - Actions: create, edit, delete, view details.

2. Product form
   - Create product.
   - Edit existing product.
   - Validate required fields.

3. Product detail
   - Show full product information.

### Frontend Tasks

1. Initialize `frontend` with Vite React TypeScript.
2. Add product API client.
3. Add shared product types.
4. Add product list page.
5. Add create/edit product form.
6. Add product detail view.
7. Add loading, empty, and error states.
8. Add delete confirmation.
9. Configure API base URL through environment variables.

## Development Workflow

Expected local development:

```text
backend runs on:  http://localhost:4000
frontend runs on: http://localhost:5173
database:         local PostgreSQL instance
```

The backend should enable CORS for the frontend development URL.

## Environment Variables

### Backend

```text
PORT=4000
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/production_ready_store
CORS_ORIGIN=http://localhost:5173
```

### Frontend

```text
VITE_API_BASE_URL=http://localhost:4000/api
```

## Suggested Implementation Phases

1. Backend foundation
   - Set up Express, TypeScript, environment configuration, and health check.

2. Database foundation
   - Configure PostgreSQL access and create the products table.

3. Product API
   - Implement all CRUD endpoints with validation and error handling.

4. Frontend foundation
   - Set up Vite, routing if needed, API client, and product types.

5. Product UI
   - Implement list, create, edit, detail, and delete flows.

6. Verification
   - Run backend and frontend locally.
   - Test CRUD flow end to end.
   - Add or run tests if agreed.

## Open Questions

1. Which database access approach do you prefer: Prisma, Drizzle ORM, or raw `node-postgres`?
2. Should product IDs be UUIDs or auto-increment integers?
3. What fields should a product have beyond `name`, `description`, `price`, `stock`, and `sku`?
4. Should the frontend use React Router, or is a simple single-page CRUD interface enough for now?
5. Do you want a specific styling approach, such as plain CSS, Tailwind CSS, Material UI, or another component library?
6. Should I add automated tests now, or keep the first version focused on working CRUD functionality?
7. Will PostgreSQL run locally on your machine, or should I add Docker Compose for the database?

## Not Included Yet

- Authentication and authorization
- Image upload for products
- Pagination, sorting, and search
- Production deployment setup
- CI/CD configuration

