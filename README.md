# Allure Impex React

A full-stack React + Node.js (Express) project. This repository contains a frontend React app and a backend Express API which uses MongoDB and Cloudinary for uploads.

## Overview

- Frontend: React app (project root `package.json`, `src/`)
- Backend: Express API in `backend/`
- Database: MongoDB (local or Atlas)
- File uploads: Cloudinary

## Prerequisites

- Node.js (16+ recommended) and npm
- MongoDB (local `mongod` or MongoDB Atlas)
- Cloudinary account (for image uploads) — optional for local testing

## Repository layout

- `backend/` — Express server, routes, models
- `src/` — React frontend source
- `public/` — static frontend assets

## Environment variables

Create `.env` files in `backend/` and `src/` (or set env vars in your environment). Example keys:

Backend (`backend/.env`)

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=optional_folder_name
PORT=5000
```

Frontend (`src/.env`)

```
REACT_APP_API_URL=http://localhost:5000/api
```

Note: Check the actual variable names in `backend/` and `src/` if you change them.

## Install

1. Install frontend deps (project root):

```bash
npm install
```

2. Install backend deps:

```bash
cd backend
npm install
```

## Run locally

Open two terminals.

- Backend

```bash
cd backend
npm run dev
```

This starts the Express API (default port `5000` unless `PORT` set).

- Frontend

```bash
# from project root
npm run dev
```

The frontend dev server (Vite/CRA) will start and proxy API requests to the backend if configured.

Run both concurrently (example using separate terminals). You can add `concurrently` to run both in one command if you prefer.

## Create admin user

There is a helper script at `backend/createAdmin.js`. To run it:

```bash
cd backend
node createAdmin.js
```

## API testing

- There is a `backend/test-api.http` file with example requests (use VS Code REST Client or Postman).

## Deployment notes

- Use MongoDB Atlas for production DB.
- Set Cloudinary credentials in production environment.
- Build frontend for production:

```bash
npm run build
```

Serve the `build` (or `dist`) directory from a static host or integrate with your backend.

## Troubleshooting

- If backend can't connect to MongoDB, verify `MONGO_URI` and that `mongod` is running.
- If uploads fail, verify Cloudinary keys and folder names.
- Check backend logs (console) for stack traces.

## Useful files

- `backend/server.js` — API entrypoint
- `backend/routes/` — API routes
- `src/services/` — client API services

## Contributing

PRs and issues welcome. Run linters/tests (if present) before submitting.

## License

This project does not include a license file. Add one if you plan to publish.
