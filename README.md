# Nutrivo Food App

This project is a full-stack food ordering application.
It is now cleaned up to keep only active files and the current required logic.

## Tech Stack

- Backend: Node.js, Express, MongoDB (Mongoose), JWT auth, Socket.IO
- Frontend: React, React Router, Axios, Socket.IO client

## Current Business Logic (Implemented)

1. Meals data source:
- Meals shown in the frontend come only from backend APIs.
- Backend APIs read/write meals in MongoDB.
- Postman changes (create/update/delete food) are reflected in the frontend.

2. Auth flow:
- New users can register.
- Existing users can login with matching DB credentials.
- JWT token is stored and verified using `/api/auth/me` on app load.

3. Live sync flow:
- Backend emits `foods:changed` Socket.IO event on food create/update/delete.
- Frontend Menu listens to this event and refreshes meals immediately.
- A timed refresh also runs as backup.

## API Routes Used by Frontend

- Auth:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/auth/me`
- Food:
  - `GET /api/food/search`
  - `GET /api/food/getAll` (fallback)
  - `GET /api/food/get/:id`

## Project Structure (Simplified)

- `server.js`: backend entry, DB connect, CORS, Socket.IO setup
- `controllers/`: auth, food, user logic
- `routes/`: route mapping
- `models/`: MongoDB schemas
- `frontend/src/pages/`: main route pages
- `frontend/src/components/`: reusable UI parts
- `frontend/src/context/`: auth and cart global state
- `frontend/src/services/`: API and socket integration
- `frontend/src/hooks/`: reusable hooks

## Run Locally

### 1) Backend

From project root:

```bash
npm install
npm run server
```

Backend default port: `8080`

### 2) Frontend

From `frontend` folder:

```bash
npm install
npm start
```

Frontend default port: `3000`

## Notes for Teacher Demo

- Show food creation in Postman (`/api/food/create`) and then open Menu page to verify live reflection.
- Show register/login and refresh browser to confirm session restore via `/api/auth/me`.
- Mention that mock/local meals were removed, so data is backend + MongoDB only.

## Complete Authentication Flow

For detailed authentication documentation including:
- Backend API endpoints
- Frontend components & flow
- Postman testing instructions
- User journey diagrams
- Session management details

See: [AUTHENTICATION.md](AUTHENTICATION.md)
