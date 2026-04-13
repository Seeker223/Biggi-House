# biggiHouse

Smart group savings platform UI built with a MERN-friendly setup. This repo includes a Vite + React frontend and an Express backend starter.

## Highlights
1. Fintech-inspired UI with brand gradients and card-based layouts
2. Auth flow with mock login/signup and protected routes
3. Houses flow with join modal, filtering, and multiple house membership
4. Wallet and dashboard views with consistent styling
5. Responsive navbar with mobile menu

## Project Structure
1. `frontend` — Vite + React UI
2. `backend` — Express API starter

## Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

The app runs at `http://localhost:5173`.

## Backend Setup
1. `cd backend`
2. `npm install`
3. `npm run dev`

The API runs at `http://localhost:5000`.

## Environment Variables
Backend expects the following:

1. `PORT=5000`
2. `MONGO_URI=mongodb://localhost:27017/biggi-house`

Copy the sample file:

```bash
cd backend
copy .env.example .env
```

## Key Routes (Frontend)
1. `/` Home
2. `/houses` Houses
3. `/dashboard` Dashboard (protected)
4. `/wallet` Wallet (protected)
5. `/profile` Profile (protected)
6. `/faq` FAQ

## Tech Stack
1. React + Vite
2. styled-components
3. React Router
4. Express (backend starter)

## Notes
1. Auth is mocked using `localStorage` for now.
2. Payments are simulated for UI workflow testing.
3. Replace mock logic with real API calls when backend endpoints are ready.

## UI Snapshots
Home / Flow Reference  
![BiggiHouse UI](frontend/src/assets/biggiHouse%20fintech%20platform%20interface.png)

Brand Logo  
![BiggiHouse Logo](frontend/src/assets/biggiHouse2.png)

## Suggested Next Steps
1. Connect Flutterwave or Paystack for real payment verification
2. Add real user authentication and JWT
3. Build admin dashboard and KYC flow
4. Deploy frontend and backend separately
