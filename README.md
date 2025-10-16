# Task Management Backend

A RESTful API backend for a task management web application built with Node.js, Express, and MongoDB.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **MongoDB** (v4.x or higher)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Ensure MongoDB is running**
   - Start MongoDB on your local machine
   - Default connection: `mongodb://localhost:27017/task_management`
   - The database will be created automatically on first run

## Configuration

### Environment Settings

The application configuration is located in `src/Helper/ENV/environment.js`. Key settings include:

- **MODE**: `development` or `production`
- **PORT**: 
  - Development: `4000`
  - Production: `8000`
- **DATABASE**: `mongodb://localhost:27017/task_management`
- **SESSION_OUT_AFTER**: 
  - Development: `30d`
  - Production: `5h`

### Customization (Optional)

To modify the configuration, edit `src/Helper/ENV/environment.js`:

```javascript
const MODE = "development"; // Change to "production" for production mode
const PORT = MODE == "development" ? 4000 : 8000;
const DB_STRING = "mongodb://localhost:27017/task_management";
```

## Running the Application

### Development Mode

Start the server with auto-reload on file changes:

```bash
npm run dev
```

### Development Mode with Increased Memory

For applications requiring more memory:

```bash
npm run dev-heap
```

### Production Mode

1. Update `MODE` to `"production"` in `src/Helper/ENV/environment.js`
2. Start the server:
   ```bash
   node app.js
   ```

### Verify Server is Running

Once started, you should see:
```
Server Is running on http://localhost:4000
```

Visit `http://localhost:4000/status` to check API health:

```json
{
  "status": "Healthy",
  "API": "Task-APIs",
  "version": 1.0,
  "developer": "Abdul Rehman"
}
```

## API Endpoints

### Base URL
```
http://localhost:4000/api
```

### Authentication Routes
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login user

### Task Management Routes
- **GET** `/api/tasks` - Get all tasks
- **POST** `/api/tasks` - Create a new task
- **PUT** `/api/tasks/:id` - Update a task
- **DELETE** `/api/tasks/:id` - Delete a task

### Health Check
- **GET** `/status` - Check API status

## Project Structure

```
backend/
├── app.js                          # Main application entry point
├── package.json                    # Project dependencies
├── nodemon.json                    # Nodemon configuration
└── src/
    ├── controller/                 # Request handlers
    │   ├── Auth/
    │   │   └── AuthController.js
    │   ├── Task-Management/
    │   │   └── TaskManagementController.js
    │   └── index.js
    ├── dbConfig/                   # Database configuration
    │   ├── mdbConnection.js
    │   └── schema/
    │       ├── schema.js
    │       ├── tasks.js
    │       └── users.js
    ├── Helper/                     # Utility functions
    │   ├── ENV/
    │   │   └── environment.js
    │   ├── helper.js
    │   └── makeToken.js
    ├── middleware/                 # Express middleware
    │   ├── jsonResponseFormat.js
    │   ├── validateRequest.js
    │   └── validateToken.js
    ├── routes/                     # API routes
    │   ├── index.js
    │   └── restApis/
    │       ├── Auth/
    │       │   └── authRoutes.js
    │       ├── Task-Management/
    │       │   └── TaskManagementRoutes.js
    │       └── index.js
    └── validation/                 # Request validation schemas
        ├── authSchema.js
        └── taskSchema.js
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Yup** - Schema validation
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-reload

## Features

- ✅ User authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ Request validation with Yup schemas
- ✅ CORS enabled
- ✅ RESTful API architecture
- ✅ MongoDB database integration
- ✅ Token-based authorization middleware

## Author

**Abdul Rehman**

## License

ISC

