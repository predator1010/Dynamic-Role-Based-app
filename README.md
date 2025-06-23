# Dynamic Role-Based Authentication and Authorization Module

A complete MEAN stack (MongoDB, Express.js, Angular, Node.js) application implementing dynamic role-based authentication and authorization.

## Features

- **User Registration & Login**: Secure user registration with bcrypt password hashing and JWT-based authentication
- **Dynamic Role Management**: Three roles (Admin, Editor, Viewer) stored in MongoDB with dynamic assignment
- **Route Protection**: Backend middleware and frontend route guards for role-based access control
- **Clean UI**: Angular-based user interface with role-based navigation and content display
- **Modular Architecture**: Well-structured code following best practices

## Project Structure

```
Assignment/
├── backend/                 # Node.js + Express backend
│   ├── config/             # Database and JWT configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Authentication and authorization middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   └── server.js          # Main server file
├── frontend/              # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Angular components
│   │   │   ├── guards/     # Route guards
│   │   │   ├── services/   # Angular services
│   │   │   └── models/     # TypeScript interfaces
│   │   └── assets/         # Static assets
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Angular CLI (`npm install -g @angular/cli`)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/role-auth-db
   JWT_SECRET=your-super-secret-jwt-key
   PORT=3000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   ng serve
   ```

The frontend will run on `http://localhost:4200`

## Demo Credentials

### Admin User
- **Email**: admin@example.com
- **Password**: admin123
- **Role**: Admin

### Editor User
- **Email**: editor@example.com
- **Password**: editor123
- **Role**: Editor

### Viewer User
- **Email**: viewer@example.com
- **Password**: viewer123
- **Role**: Viewer

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Users
- `GET /api/users` - Get all users (Admin only)
- `PUT /api/users/:id/role` - Update user role (Admin only)

### Roles
- `GET /api/roles` - Get all roles
- `POST /api/roles` - Create new role (Admin only)

## Role Permissions

### Admin
- Full access to all features
- Can manage users and roles
- Can view all content

### Editor
- Can edit content
- Can view content
- Cannot manage users or roles

### Viewer
- Can only view content
- Cannot edit or manage anything

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Route Protection**: Middleware-based authorization
- **Input Validation**: Request validation and sanitization
- **CORS Configuration**: Proper cross-origin resource sharing

## Technologies Used

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT implementation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables

### Frontend
- **Angular**: Frontend framework
- **Angular Router**: Navigation and route guards
- **Angular Forms**: Form handling and validation
- **Angular HTTP Client**: API communication
- **Bootstrap**: UI styling

## Testing the Application

1. Start both backend and frontend servers
2. Open `http://localhost:4200` in your browser
3. Register a new user or use the demo credentials
4. Test different role-based features:
   - Admin: Try managing users and roles
   - Editor: Try editing content
   - Viewer: Try viewing content only

## Code Quality Features

- **Modular Architecture**: Separated concerns with proper modules
- **TypeScript**: Type safety in Angular components
- **Error Handling**: Comprehensive error handling throughout
- **Code Comments**: Well-documented code
- **Best Practices**: Following Angular and Node.js best practices "# Dynamic-Role-Based-app" 
