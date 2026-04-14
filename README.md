
#**Fashionify** - E-Commerce Student Project

A simple e-commerce website built with React.js, Node.js, and SQL Server.

## Project Overview

This project consists of:
- Frontend: React.js with Tailwind CSS
- Backend: Node.js with Express
- Database: SQL Server

## Features

- Product listing with images and details
- Shopping cart functionality
- Checkout process
- Order management

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- SQL Server instance (local or cloud)
- Code editor (VS Code recommended)

### Database Setup

1. Connect to your SQL Server instance using SQL Server Management Studio (SSMS)
2. Run the SQL script located in `src/backend/db/schema.sql`
   - This will create the database, tables, and insert sample products

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd src/backend
   ```

2. Create a `.env` file based on the `.env.example` template:
   ```
   cp .env.example .env
   ```

3. Edit the `.env` file with your SQL Server credentials

4. Install dependencies:
   ```
   npm install
   ```

5. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. From the project root directory, install dependencies:
   ```
   npm install
   ```

2. Start the frontend development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
/
├── public/
├── src/
│   ├── backend/              # Backend code
│   │   ├── db/               # Database scripts
│   │   ├── .env.example      # Environment variables template
│   │   ├── package.json      # Backend dependencies
│   │   └── server.js         # Express server
│   ├── components/           # React components
│   ├── context/              # React context providers
│   ├── data/                 # Mock data
│   ├── pages/                # Page components
│   └── types/                # TypeScript type definitions
└── README.md
```

## Notes

- This project is intended as an educational exercise
- In a production environment, additional security measures would be implemented

## Future Improvements

- User authentication
- Product search and filtering
- Order history page
- Admin panel for product management
