import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoutes";

import AddProduct from "../pages/Product/AddProduct";
import Tags from "../pages/Tags";

// Lazy pages
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Users = lazy(() => import("../pages/Users"));
const Products = lazy(() => import("../pages/Products"));
const Customers = lazy(() => import("../pages/Customers/Customers"))
const Category = lazy(() => import("../pages/Category"))
const Brands = lazy(() => import("../pages/Brands"))
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
            <Route path="/new-product" element={<AddProduct />} />
            <Route path="/customers" element={<Customers/>} />
            <Route path="/category" element={<Category/>} />
            <Route path="/brand" element={<Brands/>} />
            <Route path="/tags" element={<Tags/>} />
          </Route>
        <Route path="*" element={<NotFound />} />
        </Route>

        {/* 404 */}

      </Routes>
    </Suspense>
  );
}
