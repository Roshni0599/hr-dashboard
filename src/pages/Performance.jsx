import React, { useState } from "react";
import Topbar from "../components/Topbar";

export default function Performance() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      employee: "Roshni",
      role: "HR Intern",
      rating: "Excellent",
      dueDate: "Feb 2026",
      reviewer: "Sunil Kumar",
      status: "Pending",
      fullReview: "Roshni has shown excellent initiative and leadership in HR operations.",
      timestamp: "2026-02-01 10:30 AM",
    },
    {
      id: 2,
      employee: "Anil Kumar",
      role: "Developer",
      rating: "Good",
      dueDate: "Mar 2026",
      reviewer: "Meena Iyer",
      status: "Completed",
      fullReview: "Anil has delivered consistent code quality and collaborated well with the team.",
      timestamp: "2026-03-05 3:45 PM",
    },
    {
      id: 3,
      employee: "Sangeetha",
      role: "Accounts",
      rating: "Average",
      dueDate: "Apr 2026",
      reviewer: "Sunil Kumar",
      status: "Pending",
      fullReview: "Sangeetha needs improvement in accuracy and timeliness of reports.",
      timestamp: "2026-04-10 11:00 AM",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employee: "",
    role: "",
    rating: "",
    dueDate: "",
    reviewer: "",
    status: "Pending",
    fullReview: "",
    timestamp: new Date().toLocaleString(),
  });

  const [selectedReview, setSelectedReview] = useState(null);
  const [showFullPanel, setShowFullPanel] = useState(false);

  // Add new review
  const handleAddReview = () => {
    if (
      !formData.employee ||
      !formData.role ||
      !formData.rating ||
      !formData.dueDate ||
      !formData.reviewer ||
      !formData.fullReview
    ) {
      alert("Please fill all fields.");
      return;
    }
    const newReview = {
      id: reviews.length + 1,
      ...formData,
    };
    setReviews([...reviews, newReview]);
    setFormData({
      employee: "",
      role: "",
      rating: "",
      dueDate: "",
      reviewer: "",
      status: "Pending",
      fullReview: "",
      timestamp: new Date().toLocaleString(),
    });
    setShowForm(false);
    alert("Review added successfully.");
  };

  return (
    <div className="flex-1">
      <Topbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Performance Reviews</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Review
          </button>
        </div>

        {/* Add Review Form */}
        {showForm && (
          <div className="bg-gray-50 p-4 rounded-lg shadow space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Employee Name"
                value={formData.employee}
                onChange={(e) =>
                  setFormData({ ...formData, employee: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Rating"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Due Date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Reviewer"
                value={formData.reviewer}
                onChange={(e) =>
                  setFormData({ ...formData, reviewer: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="border px-3 py-2 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <textarea
                placeholder="Full Review"
                value={formData.fullReview}
                onChange={(e) =>
                  setFormData({ ...formData, fullReview: e.target.value })
                }
                className="border px-3 py-2 rounded col-span-2"
              />
            </div>
            <button
              onClick={handleAddReview}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit Review
            </button>
          </div>
        )}

        {/* Review Summary Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h3 className="text-lg font-medium p-3">Review Summary</h3>
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-left">Due Date</th>
                <th className="p-3 text-left">Reviewer</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.employee}</td>
                  <td className="p-3">{r.role}</td>
                  <td className="p-3">{r.rating}</td>
                  <td className="p-3">{r.dueDate}</td>
                  <td className="p-3">{r.reviewer}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        r.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setSelectedReview(r);
                        setShowFullPanel(false);
                      }}
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

        {/* View Review Modal */}
        {selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] space-y-3">
              <h3 className="text-lg font-semibold">Review Details</h3>
              <p><strong>Employee:</strong> {selectedReview.employee}</p>
              <p><strong>Role:</strong> {selectedReview.role}</p>
              <p><strong>Rating:</strong> {selectedReview.rating}</p>
              <p><strong>Due Date:</strong> {selectedReview.dueDate}</p>
              <p><strong>Reviewer:</strong> {selectedReview.reviewer}</p>
              <p><strong>Status:</strong> {selectedReview.status}</p>

              <div className="flex justify-end gap-3 pt-4">
                {selectedReview.status === "Completed" && (
                  <button
                    onClick={() => setShowFullPanel(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    View Full Review
                  </button>
                )}
                                <button
                  onClick={() => setSelectedReview(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right-Side Full Review Panel */}
        {showFullPanel && selectedReview && (
          <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-50 p-6 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Full Review</h3>
            <p><strong>Employee:</strong> {selectedReview.employee}</p>
            <p><strong>Role:</strong> {selectedReview.role}</p>
            <p><strong>Rating:</strong> {selectedReview.rating}</p>
            <p><strong>Due Date:</strong> {selectedReview.dueDate}</p>
            <p><strong>Reviewer:</strong> {selectedReview.reviewer}</p>
            <p><strong>Status:</strong> {selectedReview.status}</p>
            <p><strong>Reviewed On:</strong> {selectedReview.timestamp}</p>

            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h4 className="font-medium mb-2">Review Comments</h4>
              <p className="text-gray-800">{selectedReview.fullReview}</p>
            </div>

            <button
              onClick={() => setShowFullPanel(false)}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close Panel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}