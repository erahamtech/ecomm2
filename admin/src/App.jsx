import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import './assets/css/app.css'

export default function App() {
  return( 
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
)}
