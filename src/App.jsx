import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// Pages
import HrDashboard from "./pages/HrDashboard";
import Employees from "./pages/Employees";
import Approvals from "./pages/Approval";
import LeaveAttendance from "./pages/LeaveAttendance";
import Hiring from "./pages/Hiring";
import Performance from "./pages/Performance";
import Reports from "./pages/Report";          // ✅ make sure file is Reports.jsx
import SalaryStructure from "./pages/SalaryStructure";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<HrDashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/leave-attendance" element={<LeaveAttendance />} />
          <Route path="/hiring" element={<Hiring />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/salary-structure" element={<SalaryStructure />} /> {/* ✅ hyphenated path */}
          <Route path="/settings" element={<Settings />} />
          <Route
            path="*"
            element={<h1 className="text-red-600">Page Not Found</h1>}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;