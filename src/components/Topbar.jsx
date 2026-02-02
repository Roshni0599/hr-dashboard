import React, { useState } from "react";

export default function Topbar({ onProfileUpdate, onPasswordChange, onLogout }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null); // "notifications" or "profile"

  const employees = [
    { name: "Roshni", department: "HR", email: "roshni@goldcorp.com" },
    { name: "Anil Kumar", department: "IT", email: "anil@goldcorp.com" },
    { name: "Sangeetha", department: "Accounts", email: "sangeetha@goldcorp.com" },
  ];

  const notifications = [
    { id: 1, message: "Your password was updated successfully." },
    { id: 2, message: "New report generated: Attendance Jan 2026." },
    { id: 3, message: "Salary revision request approved." },
  ];

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3">
      <h2 className="text-lg font-semibold">GOLD corp Dashboard</h2>

      <div className="flex items-center gap-4">
        {/* Search Employee */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search Employee"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          {searchQuery && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded p-2">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp, idx) => (
                  <div key={idx} className="p-2 border-b text-sm">
                    <strong>{emp.name}</strong> — {emp.department} ({emp.email})
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No employees found.</p>
              )}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "notifications" ? null : "notifications")
            }
            className="px-3 py-2 bg-gray-200 rounded"
          >
            🔔
          </button>
          {openDropdown === "notifications" && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded p-3">
              <h4 className="font-semibold mb-2">Notifications</h4>
              {notifications.map((n) => (
                <p key={n.id} className="text-sm border-b py-1">{n.message}</p>
              ))}
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <div className="relative">
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "profile" ? null : "profile")
            }
            className="px-3 py-2 bg-gray-200 rounded-full"
          >
            👤
          </button>
          {openDropdown === "profile" && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded p-3">
              <h4 className="font-semibold mb-2">Account</h4>
              <button
                onClick={() => {
                  setOpenDropdown(null);
                  if (onProfileUpdate) onProfileUpdate();
                }}
                className="block w-full text-left px-2 py-1 hover:bg-gray-100"
              >
                Update Profile
              </button>
              <button
                onClick={() => {
                  setOpenDropdown(null);
                  if (onPasswordChange) onPasswordChange();
                }}
                className="block w-full text-left px-2 py-1 hover:bg-gray-100"
              >
                Change Password
              </button>
              <button
                onClick={() => {
                  setOpenDropdown(null);
                  if (onLogout) onLogout();
                }}
                className="block w-full text-left px-2 py-1 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}