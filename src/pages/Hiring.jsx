import React, { useState } from "react";
import Topbar from "../components/Topbar";

export default function Hiring() {
  const [positions, setPositions] = useState([
    { id: 1, title: "Frontend Developer" },
    { id: 2, title: "UI/UX Designer" },
    { id: 3, title: "QA Analyst" },
  ]);

  const [interviews, setInterviews] = useState([
    { id: 1, candidate: "Priya Sharma", role: "Frontend Developer", time: "10:00 AM", status: "Scheduled", outcome: "" },
    { id: 2, candidate: "Rahul Verma", role: "UI/UX Designer", time: "11:30 AM", status: "Scheduled", outcome: "" },
    { id: 3, candidate: "Sneha Reddy", role: "QA Analyst", time: "2:00 PM", status: "Scheduled", outcome: "" },
  ]);

  const [newPosition, setNewPosition] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Add new position
  const handleAddPosition = () => {
    if (newPosition.trim() === "") return alert("Please enter a job title.");
    const updated = [...positions, { id: positions.length + 1, title: newPosition }];
    setPositions(updated);
    setNewPosition("");
    setShowForm(false);
    alert("New position added.");
  };

  // Mark interview as completed
  const markCompleted = (id) => {
    const updated = interviews.map((i) =>
      i.id === id ? { ...i, status: "Completed" } : i
    );
    setInterviews(updated);
  };

  // Set outcome (Selected/Rejected)
  const setOutcome = (id, result) => {
    const updated = interviews.map((i) =>
      i.id === id ? { ...i, outcome: result } : i
    );
    setInterviews(updated);
  };

  return (
    <div className="flex-1">
      <Topbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Hiring Dashboard</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add New Position
          </button>
        </div>

        {/* Add Position Form */}
        {showForm && (
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <input
              type="text"
              placeholder="Job Title"
              value={newPosition}
              onChange={(e) => setNewPosition(e.target.value)}
              className="border px-3 py-2 rounded w-1/2"
            />
            <button
              onClick={handleAddPosition}
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        )}

        {/* Metrics Section */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-sm text-gray-500">Open Positions</h4>
            <p className="text-2xl font-bold">{positions.length}</p>
            <ul className="mt-2 text-xs text-gray-600">
              {positions.map((p) => (
                <li key={p.id}>• {p.title}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-sm text-gray-500">Interviews Today</h4>
            <p className="text-2xl font-bold">
              {interviews.filter((i) => i.status === "Scheduled").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-sm text-gray-500">Offers Sent</h4>
            <p className="text-2xl font-bold">2</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-sm text-gray-500">Upcoming Interviews</h4>
            <p className="text-2xl font-bold">
              {interviews.filter((i) => i.status === "Scheduled").length}
            </p>
          </div>
        </div>

        {/* Interview Schedule Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h3 className="text-lg font-medium p-3">Today's Interview Schedule</h3>
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Candidate</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((i) => (
                <tr key={i.id} className="border-t">
                  <td className="p-3">{i.candidate}</td>
                  <td className="p-3">{i.role}</td>
                  <td className="p-3">{i.time}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        i.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {i.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {i.status === "Scheduled" && (
                      <button
                        onClick={() => markCompleted(i.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Interview Outcome Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h3 className="text-lg font-medium p-3">Interview Outcomes</h3>
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Candidate</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Outcome</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {interviews
                .filter((i) => i.status === "Completed")
                .map((i) => (
                  <tr key={i.id} className="border-t">
                    <td className="p-3">{i.candidate}</td>
                    <td className="p-3">{i.role}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        Completed
                      </span>
                    </td>
                    <td className="p-3">
                      {i.outcome ? (
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            i.outcome === "Selected"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {i.outcome}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => setOutcome(i.id, "Selected")}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                      >
                        Select
                      </button>
                      <button
                        onClick={() => setOutcome(i.id, "Rejected")}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}