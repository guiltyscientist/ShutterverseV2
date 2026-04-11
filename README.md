# Shutterverse

A photography studio booking and showcase platform built with Vue 3 + Express.js.

## Tech Stack

**Frontend:** Vue 3, TypeScript, Vite, Tailwind CSS  
**Backend:** Express.js, MongoDB (Mongoose), Cloudinary  
**Monorepo:** npm workspaces with shared TypeScript types

## Setup

### 1. Install dependencies

```sh
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your credentials:

```sh
cp backend/.env.example backend/.env
```

| Variable | Description |
|---|---|
| `PORT` | Backend port (default: 3000) |
| `FRONTEND_URL` | Frontend origin for CORS (default: http://localhost:5173) |
| `DB_URI` | MongoDB connection string |
| `CLOUDINARY_NAME` | Cloudinary cloud name |
| `CLOUDINARY_KEY` | Cloudinary API key |
| `CLOUDINARY_SECRET` | Cloudinary API secret |

### 3. Run in development

Starts frontend (port 5173) and backend (port 3000) simultaneously:

```sh
npm run dev
```

### 4. Build for production

```sh
npm run build
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/studios` | List all studios |
| POST | `/api/studios` | Create studio (multipart) |
| PATCH | `/api/studios/:id` | Update studio |
| DELETE | `/api/studios/:id` | Delete studio |
| DELETE | `/api/studios/:id/images/:publicId` | Remove a studio image |
| GET | `/api/news` | List all news |
| POST | `/api/news` | Create news item (multipart) |
| PATCH | `/api/news/:id` | Update news item |
| DELETE | `/api/news/:id` | Delete news item |
| GET | `/api/team` | List all team members |
| POST | `/api/team` | Create team member (multipart) |
| PATCH | `/api/team/:id` | Update team member |
| DELETE | `/api/team/:id` | Delete team member |
