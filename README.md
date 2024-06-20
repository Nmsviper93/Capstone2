# Vegan Recipes Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Vegan Recipes Application is a full-stack web application that allows users to search, find, and save vegan recipes. Users can log in, view detailed information about recipes, add recipes to their favorites, and edit their profile information.

## Features

- User authentication (register, login, logout)
- Search for vegan recipes
- View detailed recipe information
- Add recipes to favorites
- Edit user profile
- Responsive UI

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running

## Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/your-username/vegan-recipes-app.git
    cd vegan-recipes-app
    ```

2. **Backend Setup**:

    ```sh
    cd backend
    npm install
    ```

3. **Environment Variables**:

    Create a `.env` file in the `backend` directory with the following variables:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4. **Start Backend Server**:

    ```sh
    npm start
    ```

5. **Frontend Setup**:

    ```sh
    cd ../frontend
    npm install
    ```

6. **Environment Variables**:

    Create a `.env` file in the `frontend` directory with the following variable:

    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```

7. **Start Frontend Server**:

    ```sh
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new user or log in with existing credentials.
3. Search for vegan recipes, view details, and add them to your favorites.
4. Edit your profile information as needed.

## API Endpoints

### User Routes

- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login a user
- `GET /api/users/profile`: Get user profile
- `PUT /api/users/profile`: Update user profile
- `PUT /api/users/password`: Change user password

### Recipe Routes

- `POST /api/recipes`: Create a new recipe
- `GET /api/recipes`: Get all recipes
- `GET /api/recipes/:id`: Get a recipe by ID
- `PUT /api/recipes/:id`: Update a recipe by ID
- `DELETE /api/recipes/:id`: Delete a recipe by ID

## Database Schema

### User Collection

- `username`: String, Unique, Required
- `email`: String, Unique, Required
- `password`: String, Required
- `favorites`: Array of ObjectId (References Recipe)

### Recipe Collection

- `title`: String, Required
- `description`: String
- `ingredients`: Array of String, Required
- `instructions`: String, Required
- `createdBy`: ObjectId (References User), Required

## Deployment

### Backend Deployment

1. **Create a Web Service on Render**.
2. **Connect your GitHub repository**.
3. **Set the build and start commands**:
    - Build Command: `npm install`
    - Start Command: `node server.js`
4. **Set Environment Variables**:
    - `MONGODB_URI`
    - `JWT_SECRET`
5. **Deploy the backend**.

### Frontend Deployment

1. **Create a Static Site on Render**.
2. **Connect your GitHub repository**.
3. **Set the build command and publish directory**:
    - Build Command: `npm run build`
    - Publish Directory: `build`
4. **Deploy the frontend**.

## Testing

1. **Unit Tests**: Ensure that unit tests are written for both backend and frontend components.
2. **Integration Tests**: Write integration tests to ensure seamless interaction between frontend and backend.
3. **Run Tests**:
    - Backend: `npm test`
    - Frontend: `npm test`

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

