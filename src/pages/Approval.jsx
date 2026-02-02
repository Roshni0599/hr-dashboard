import React, { useState } from "react";
import Topbar from "../components/Topbar";

export default function Approval() {
  const [requests] = useState([
    {
      id: 1,
      employee: "Roshni",
      type: "Reimbursement",
      details: "₹1,200 (Travel)",
      date: "Jan 28, 2026",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Anil Kumar",
      type: "Salary Revision",
      details: "₹5,000 increment",
      date: "Jan 25, 2026",
      status: "Approved",
    },
    {
      id: 3,
      employee: "Sangeetha",
      type: "Investment Proof",
      details: "₹20,000 LIC Policy",
      date: "Jan 20, 2026",
      status: "Pending",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter requests by category
  const filteredRequests =
    selectedCategory && selectedCategory !== "All"
      ? requests.filter((r) => r.type.includes(selectedCategory))
      : requests;

  return (
    <div className="flex-1">
      <Topbar />
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Approval Dashboard</h2>

        {/* Pending Approvals Summary */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-sm text-gray-500">Reimbursement Claims</h4>
            <p className="text-2xl font-bold">136</p>
            <button
              onClick={() => setSelectedCategory("Reimbursement")}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Review
            </button>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-sm text-gray-500">Investment Proofs</h4>
            <p className="text-2xl font-bold">99</p>
            <button
              onClick={() => setSelectedCategory("Investment")}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Review
            </button>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-sm text-gray-500">Salary Revisions</h4>
            <p className="text-2xl font-bold">55</p>
            <button
              onClick={() => setSelectedCategory("Salary")}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Review
            </button>
          </div>
        </div>

        {/* Recent Approval Requests */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex justify-between items-center p-3">
            <h3 className="text-lg font-medium">Recent Approval Requests</h3>
            <button
              onClick={() => setSelectedCategory("All")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View All Requests
            </button>
          </div>
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Details</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.employee}</td>
                  <td className="p-3">{r.type}</td>
                  <td className="p-3">{r.details}</td>
                  <td className="p-3">{r.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        r.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedRequest(r)}
                      className="px-3 py-1 bg-gray-200 rounded text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Category Modal */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] space-y-3">
              <h3 className="text-lg font-semibold">
                {selectedCategory === "All"
                  ? "All Requests"
                  : `${selectedCategory} Requests`}
              </h3>
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Employee</th>
                    <th className="p-2 text-left">Type</th>
                    <th className="p-2 text-left">Details</th>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((r) => (
                    <tr key={r.id} className="border-t">
                      <td className="p-2">{r.employee}</td>
                      <td className="p-2">{r.type}</td>
                      <td className="p-2">{r.details}</td>
                      <td className="p-2">{r.date}</td>
                      <td className="p-2">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Request Detail Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] space-y-3">
              <h3 className="text-lg font-semibold">Request Details</h3>
              <p><strong>Employee:</strong> {selectedRequest.employee}</p>
              <p><strong>Type:</strong> {selectedRequest.type}</p>
              <p><strong>Details:</strong> {selectedRequest.details}</p>
              <p><strong>Date:</strong> {selectedRequest.date}</p>
              <p><strong>Status:</strong> {selectedRequest.status}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}