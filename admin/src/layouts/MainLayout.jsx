import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <main>
      <Header />
      <Sidebar />
      <div className="startbar-overlay d-print-none" />
      <div className="page-wrapper">
        <div className="page-content position-relative">
          <Outlet />
          <div className="">
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
