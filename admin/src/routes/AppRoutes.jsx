import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoutes";

import AddNewProduct from "../pages/Product";
import Tags from "../pages/Tags";
import CustomerDetails from "../pages/Customers/CustomerDetails";

// Lazy pages
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Users = lazy(() => import("../pages/Users"));
const Products = lazy(() => import("../pages/Products"));
const Customers = lazy(() => import("../pages/Customers/Customers"));
const Category = lazy(() => import("../pages/Category"));
const Brands = lazy(() => import("../pages/Brands"));
const Attributes = lazy(() => import("../pages/Attributes"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/new-product" element={<AddNewProduct />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customer-details/:id" element={<CustomerDetails />} />
            <Route path="/category" element={<Category />} />
            <Route path="/brand" element={<Brands />} />
            <Route path="/attributes" element={<Attributes />} />
            <Route path="/tags" element={<Tags />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </Suspense>
  );
}
