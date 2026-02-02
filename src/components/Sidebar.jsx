import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCalendar,
  FaUserTie,
  FaChartLine,
  FaClipboardCheck,
  FaCog,
  FaFileAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function Sidebar() {
  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/" },
    { icon: <FaUsers />, label: "Employees", path: "/employees" },
    { icon: <FaCalendar />, label: "Leave & Attendance", path: "/leave-attendance" },
    { icon: <FaUserTie />, label: "Hiring", path: "/hiring" },
    { icon: <FaChartLine />, label: "Performance", path: "/performance" },
    { icon: <FaClipboardCheck />, label: "Approvals", path: "/approvals" },
    { icon: <FaFileAlt />, label: "Reports", path: "/reports" },
    { icon: <FaMoneyBillWave />, label: "Salary Structure", path: "/salary-structure" },
    { icon: <FaCog />, label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6">HR Portal</h2>
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded font-medium 
               ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"}`
            }
          >
            {item.icon} {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}