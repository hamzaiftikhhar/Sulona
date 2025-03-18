# E-Commerce Application (MERN Stack)

## 🚀 Demo
[**Live Demo**](https://soluna-k36fo8xha-hamzaiftikhhars-projects.vercel.app)

## Project Overview
This is a full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to browse products, manage their carts, and place orders. It also includes user authentication and an admin panel for managing products.

## Features
### User Features:
- **Authentication**: Sign up, log in, and log out using secure JWT-based authentication.
- **Product Management**: Browse products with detailed descriptions and pricing.
- **Cart Functionality**: Add, update, and remove items from the cart.
- **Order Summary**: View an order summary including subtotal, shipping, and total cost.

### Admin Features:
- **CRUD Operations**: Create, read, update, and delete products from the inventory.

### Additional Features:
- Responsive UI using Material-UI.
- Secure password storage with bcrypt.
- Centralized state management using custom hooks.

## Technologies Used
### Frontend:
- **React.js**: For building dynamic and interactive user interfaces.
- **React Router**: For client-side routing.
- **Custom Hooks**: For managing global state and context (e.g., `useCart` and `useAuth`).
- **CSS Modules**: For scoped and reusable styles.

### Backend:
- **Node.js**: For building the server-side logic.
- **Express.js**: For handling API requests and middleware.
- **MongoDB**: For storing user, product, and order data.

### Authentication:
- **JSON Web Tokens (JWT)**: For user authentication.
- **bcrypt**: For secure password hashing.

### Deployment:
- **Frontend**: Deployed on Vercel.

## Project Structure
```plaintext
frontend/
  src/
    components/
      Auth/
      OrderSummary/
    context/
      AuthContext.js
    api/
      axiosConfig.js
backend/
  models/
    User.js
  routes/
    auth.js
    products.js
  server.js
```

## How to Run Locally
### Prerequisites:
- Node.js installed.
- MongoDB installed and running locally.

### Steps:
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/hamzaiftikhhar/Sulona
   cd Ace
   ```

2. **Install Dependencies:**
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```
   - Backend:
     ```bash
     cd backend
     npm install
     ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the `backend` folder:
     ```plaintext
     MONGO_URI=mongodb://localhost:27017/Soluna
     JWT_SECRET=***********
     ```

4. **Run the Application:**
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend server:
     ```bash
     cd frontend
     npm start
     ```

5. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints
### Auth Routes:
- **POST** `/api/auth/signup`: User registration.
- **POST** `/api/auth/login`: User login.

### Product Routes:
- **GET** `/api/products`: Fetch all products.
- **POST** `/api/products`: Add a new product (admin only).
- **PUT** `/api/products/:id`: Update a product (admin only).
- **DELETE** `/api/products/:id`: Delete a product (admin only).

## State Management
State is managed using custom React hooks:
- **`useCart`**: Provides global access to the shopping cart.
- **`useAuth`**: Manages user authentication state and tokens.

## Challenges Faced
- Implementing secure authentication using JWT and bcrypt.
- Designing a responsive and user-friendly interface.

## Future Enhancements
- Add payment gateway integration.
- Implement user reviews and ratings for products.
- Enhance admin panel with analytics and reporting.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.