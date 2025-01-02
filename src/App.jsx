import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import ExploreProduct from "./pages/ExploreProducts";
import ProductView from "./component/product/ProductView";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Auth from "./component/Auth/Auth";
import AboutUs from "./pages/AboutUs";
import Seller from "./component/seller/Seller";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/explore/:category" element={<ExploreProduct />} />
      <Route path="/product/:id" element={<ProductView />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route 
        path="/checkout" 
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } 
      />
      <Route path="/login" element={<Auth type="login" />} />
      <Route path="/signup" element={<Auth type="signup" />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route 
        path="/seller" 
        element={
          <ProtectedRoute>
            <Seller />
          </ProtectedRoute>
        } 
      />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          style: {
            padding: "16px",
            fontSize: "1.6rem",
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;