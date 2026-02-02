import React, { useState } from "react";
import Topbar from "../components/Topbar";

export default function LeaveAttendance({
  role = "HR",
  hrEmployees = [
    "Anil Kumar",
    "Sangeetha",
    "Priya",
    "Rahul",
    "Meena",
    "Vikram",
    "Divya",
    "Arjun",
    "Kavya",
    "Manoj",
    "Sneha",
    "Deepak",
    "Lakshmi",
    "Ravi",
    "Roshni",
  ],
}) {
  const [leaveRecords, setLeaveRecords] = useState([
    { id: 1, employee: "Roshni", type: "Casual Leave", days: 2, status: "Approved" },
    { id: 2, employee: "Anil Kumar", type: "Sick Leave", days: 3, status: "Pending" },
    { id: 3, employee: "Sangeetha", type: "Earned Leave", days: 5, status: "Rejected" },
    { id: 4, employee: "Priya", type: "Casual Leave", days: 1, status: "Approved" },
    { id: 5, employee: "Rahul", type: "Sick Leave", days: 2, status: "Pending" },
    { id: 6, employee: "Meena", type: "Casual Leave", days: 4, status: "Approved" },
    { id: 7, employee: "Vikram", type: "Earned Leave", days: 6, status: "Pending" },
    { id: 8, employee: "Divya", type: "Sick Leave", days: 2, status: "Approved" },
    { id: 9, employee: "Arjun", type: "Casual Leave", days: 3, status: "Pending" },
    { id: 10, employee: "Kavya", type: "Earned Leave", days: 7, status: "Approved" },
    { id: 11, employee: "Manoj", type: "Casual Leave", days: 1, status: "Pending" },
    { id: 12, employee: "Sneha", type: "Sick Leave", days: 2, status: "Approved" },
    { id: 13, employee: "Deepak", type: "Casual Leave", days: 2, status: "Rejected" },
    { id: 14, employee: "Lakshmi", type: "Earned Leave", days: 4, status: "Approved" },
    { id: 15, employee: "Ravi", type: "Casual Leave", days: 3, status: "Pending" },
  ]);

  // HR can approve/reject leave
  const updateStatus = (id, newStatus) => {
    const updated = leaveRecords.map((rec) =>
      rec.id === id ? { ...rec, status: newStatus } : rec
    );
    setLeaveRecords(updated);
    alert(`Leave request updated to ${newStatus}`);
  };

  // Filter records based on HR employees
  const visibleRecords = leaveRecords.filter((rec) => hrEmployees.includes(rec.employee));

  // Calculate summary per employee
  const summary = hrEmployees.map((emp) => {
    const empRecords = leaveRecords.filter((rec) => rec.employee === emp);
    const approved = empRecords
      .filter((rec) => rec.status === "Approved")
      .reduce((sum, rec) => sum + rec.days, 0);
    const pending = empRecords
      .filter((rec) => rec.status === "Pending")
      .reduce((sum, rec) => sum + rec.days, 0);
    return { employee: emp, approved, pending };
  });

  return (
    <div className="flex-1">
      <Topbar />
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Leave & Attendance</h2>

        {/* Summary Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <h3 className="text-lg font-medium p-3">Leave Summary</h3>
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Leaves Taken (Approved)</th>
                <th className="p-3 text-left">Leaves Pending</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((s, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{s.employee}</td>
                  <td className="p-3 text-green-600 font-semibold">{s.approved}</td>
                  <td className="p-3 text-yellow-600 font-semibold">{s.pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Records Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h3 className="text-lg font-medium p-3">Leave Requests</h3>
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Leave Type</th>
                <th className="p-3 text-left">Days</th>
                <th className="p-3 text-left">Status</th>
                {role === "HR" && <th className="p-3 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {visibleRecords.map((rec) => (
                <tr key={rec.id} className="border-t">
                  <td className="p-3">{rec.employee}</td>
                  <td className="p-3">{rec.type}</td>
                  <td className="p-3">{rec.days}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        rec.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : rec.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  {role === "HR" && (
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => updateStatus(rec.id, "Approved")}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(rec.id, "Rejected")}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}