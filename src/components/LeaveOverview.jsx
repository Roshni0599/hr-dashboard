import React from "react";
export default function LeaveOverview() {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h3 className="font-semibold mb-3">Leave Overview</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        <li>Pending Requests: 18</li>
        <li>Approved Today: 2</li>
        <li>Rejected: 0</li>
        <li>Upcoming (Next 7 days): 24</li>
      </ul>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800">
        Review Leave Requests
      </button>
    </div>
  );
}
