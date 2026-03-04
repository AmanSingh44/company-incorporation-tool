# Company Incorporation Tool

A full-stack application for managing company incorporation processes, with a **React frontend**, **Node.js + TypeScript backend**, and **PostgreSQL database**. The backend uses **Prisma ORM**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Clone the repository](#clone-the-repository)
  - [Backend Setup (Docker)](#backend-setup-docker)
  - [Frontend Setup](#frontend-setup)



---

## Features

- Create and manage companies
- Add shareholders to companies
- Admin dashboard with protected access
- API powered by Node.js, TypeScript, and Prisma
- PostgreSQL database for storage

---

## Tech Stack

- **Frontend:** React, Vite, JSX/CSS
- **Backend:** Node.js, TypeScript, Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Containerization:** Docker & Docker Compose

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### Clone the Repository

```bash
git clone https://github.com/AmanSingh44/company-incorporation-tool.git
cd company-incorporation-tool
```



### Backend Setup (Docker)

Two `.env` files are required:

**1. Root `.env` (used by Docker Compose)**

Place this at the **project root** alongside `docker-compose.yml`:

```env
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_database_name

NODE_ENV=your-environment
APP_ORIGIN=your_app_origin
PORT=your_port
DATABASE_URL=postgresql://username:your_password@db:port/your_database_name
ADMIN_KEY=your_admin_key_here
```

**2. Server `.env` (used by the backend directly)**

Place this inside the **`server/`** directory:

```env
NODE_ENV=development
APP_ORIGIN=your_app_origin
PORT=your_port
DATABASE_URL=postgresql://username:your_password@db:port/your_database_name
ADMIN_KEY=your_admin_key_here
```



**3. Build and start the backend and database containers:**

```bash
docker compose up --build
```





---

### Frontend Setup

**1. Navigate to the frontend directory:**

```bash
cd client
```

**2. Install dependencies:**

```bash
npm install
```

**3. Create a `.env` file inside the `client/` directory:**

```env
VITE_API_URL=http://localhost:${your_backend_port}/api
```

**4. Start the development server:**

```bash
npm run dev
```

**5. Open the frontend in your browser:**

```
http://localhost:5173
```

