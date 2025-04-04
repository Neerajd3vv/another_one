# 🔐 Full Stack User Authentication App

This is a full-stack application for user **registration** and **login**, built with:

- 🛠 **Backend**: Express.js + PostgreSQL using Prisma ORM
- 🌐 **Frontend**: React.js

---

## 📦 Tech Stack

### Backend
- **Express.js** – Node.js web framework
- **PostgreSQL** – Relational database
- **Prisma** – ORM for DB operations
- **bcrypt** – For password hashing

### Frontend
- **React.js + Vite** – Frontend framework for fast development
- **TypeScript** – Strongly typed JavaScript
- **React Router** – For routing between pages
- **React Query** – For efficient data fetching and caching
- **React Hook Form** – For form validation and handling
- **Tailwind CSS** / **Shadcn**   – For styling

---


---


## 🗂️ Project Structure

### Backend (`/backend`)

backend/ ├── prisma/ # Database schema & migrations ├── src/ │ ├── controllers/ # Business logic for routes │ ├── routes/ # Express routes for auth │ ├── main.ts # App entry point │ ├── prismaClient.ts # Prisma client instance └── .env # Environment variables


### Frontend (`/frontend`)

frontend/ ├── public/ # Static assets ├── src/ │ ├── assets/ # Static assets │ ├── components/ # Reusable UI components │ ├── lib/ # Utilities and helper functions │ ├── pages/ # Page components │ ├── App.tsx # Main App component │ ├── main.tsx # Entry point for React │ ├── index.css # Global styles │ ├── App.css # Component-specific styles └── .env # Environment variables



## ⚙️ Setup Instructions (Docker)

## 🐳 Running the App Locally with Docker

### 📁 1. Clone the Repository

```bash
git clone https://github.com/Neerajd3vv/another_one.git
```
```bash
cd another_one
```

### 2. Build Docker Images
```bash
docker compose build
```

### 3. Run Prisma Migrations
```bash
docker compose run nodejs_backend npx prisma migrate dev --name init
```

### 4. Start the App

```bash
docker compose up
```

## ⚙️ Setup Instructions (Normal setup)
## 🐳 Running the App Locally 


### 📁 1. Clone the Repository

```bash
git clone https://github.com/Neerajd3vv/another_one.git
cd another_one

```
#### 🔧 Backend Setup (/backend)
1. Navigate to the backend folder
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```



3. Create a .env file
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/your_db_name"
JWT_SECRET="your_jwt_secret"
```
Replace username, password, and your_db_name with your PostgreSQL credentials.

4. Set up Prisma and the database
```bash
npx prisma migrate dev --name init
```

5. Run the backend server
```bash
npm run dev
```




🌐 Frontend Setup (/frontend)

1. Navigate to the frontend folder
```bash
cd frontend
``` 

3. Install dependencies
```bash
npm install
```
  
5. Create a .env file
```bash
VITE_BACKEND_URL=http://localhost:8383
```
  
7. Run the React development server
```bash
npm run dev
```



