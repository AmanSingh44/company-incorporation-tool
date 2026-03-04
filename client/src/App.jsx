import { Routes, Route } from "react-router-dom";
import "./App.css";
import CreateCompanyPage from "./pages/CreateCompanyPage";
import AddShareHoldersPage from "./pages/AddShareHoldersPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminKeyPage from "./pages/AdminKeyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateCompanyPage />} />
      <Route
        path="/shareholders/:companyId"
        element={<AddShareHoldersPage />}
      />
      <Route path="/admin/login" element={<AdminKeyPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
    </Routes>
  );
}

export default App;
