import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <Outlet />
    </div>
  );
}
