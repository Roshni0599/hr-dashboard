import React, { useState } from "react";
import Topbar from "../components/Topbar";

export default function Reports() {
  const [reports, setReports] = useState([
    {
      id: 1,
      name: "Monthly Attendance Report",
      period: "Jan 2026",
      generatedOn: "Jan 30, 2026",
      status: "Ready",
      fileUrl: "/reports/attendance-jan2026.pdf",
      summary: "Detailed attendance records for Jan 2026.",
      type: "attendance",
      data: [
        { employee: "Roshni", daysPresent: 22, daysAbsent: 2 },
        { employee: "Anil Kumar", daysPresent: 20, daysAbsent: 4 },
        { employee: "Sangeetha", daysPresent: 18, daysAbsent: 6 },
      ],
    },
    {
      id: 2,
      name: "Leave Summary Report",
      period: "Jan 2026",
      generatedOn: "Jan 30, 2026",
      status: "Ready",
      fileUrl: "/reports/leave-jan2026.pdf",
      summary: "Leave applications and approvals for Jan 2026.",
      type: "leave",
      data: [
        { employee: "Roshni", leaveType: "Sick Leave", days: 2 },
        { employee: "Anil Kumar", leaveType: "Casual Leave", days: 1 },
        { employee: "Sangeetha", leaveType: "Annual Leave", days: 3 },
      ],
    },
    {
      id: 3,
      name: "Performance Review Report",
      period: "Q1 2026",
      generatedOn: "Jan 28, 2026",
      status: "Ready",
      fileUrl: "/reports/performance-q1-2026.pdf",
      summary: "Performance evaluations for Q1 2026.",
      type: "performance",
      data: [
        { employee: "Roshni", rating: "Excellent", reviewer: "Sunil Kumar" },
        { employee: "Anil Kumar", rating: "Good", reviewer: "Meena Iyer" },
        { employee: "Sangeetha", rating: "Average", reviewer: "Sunil Kumar" },
      ],
    },
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    period: "",
    generatedOn: new Date().toLocaleDateString(),
    status: "Ready",
    fileUrl: "",
    summary: "",
    type: "attendance",
    data: [],
  });

  // Add new report
  const handleAddReport = () => {
    if (!formData.name || !formData.period || !formData.summary) {
      alert("Please fill all fields.");
      return;
    }
    const newReport = {
      id: reports.length + 1,
      ...formData,
    };
    setReports([...reports, newReport]);
    setFormData({
      name: "",
      period: "",
      generatedOn: new Date().toLocaleDateString(),
      status: "Ready",
      fileUrl: "",
      summary: "",
      type: "attendance",
      data: [],
    });
    setShowForm(false);
    alert("Report generated successfully.");
  };

  return (
    <div className="flex-1">
      <Topbar />
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Reports</h2>

        {/* Report Cards */}
        <div className="grid grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white p-4 rounded shadow space-y-2">
              <h4 className="text-md font-semibold">{report.name}</h4>
              <p className="text-sm text-gray-600">{report.period}</p>
              <p className="text-xs text-gray-500">Generated: {report.generatedOn}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => window.open(report.fileUrl, "_blank")}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Download
                </button>
                <button
                  onClick={() => setSelectedReport(report)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Generate New Report */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Generate New Report
        </button>

        {showForm && (
          <div className="bg-gray-50 p-4 rounded-lg shadow space-y-4 mt-4">
            <input
              type="text"
              placeholder="Report Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Period (e.g. Jan 2026)"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              className="border px-3 py-2 rounded w-full"
            />
            <textarea
              placeholder="Summary"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="border px-3 py-2 rounded w-full"
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="attendance">Attendance</option>
              <option value="leave">Leave</option>
              <option value="performance">Performance</option>
            </select>
            <button
              onClick={handleAddReport}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        )}

        {/* Report History Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
          <h3 className="text-lg font-medium p-3">Report History</h3>
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Report</th>
                <th className="p-3 text-left">Period</th>
                <th className="p-3 text-left">Generated On</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.period}</td>
                  <td className="p-3">{r.generatedOn}</td>
                  <td className="p-3">{r.status}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedReport(r)}
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

        {/* Report Detail Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] space-y-3">
              <h3 className="text-lg font-semibold">{selectedReport.name}</h3>
              <p><strong>Period:</strong> {selectedReport.period}</p>
              <p><strong>Generated On:</strong> {selectedReport.generatedOn}</p>
              <p><strong>Status:</strong> {selectedReport.status}</p>

              {/* Show sample data table based on report type */}
              {selectedReport.type === "attendance" && (
                <table className="w-full text-sm text-gray-700 mt-4 border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2">Employee</th>
                      <th className="p-2">Days Present</th>
                                            <th className="p-2">Days Absent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReport.data.map((row, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{row.employee}</td>
                        <td className="p-2">{row.daysPresent}</td>
                        <td className="p-2">{row.daysAbsent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedReport.type === "leave" && (
                <table className="w-full text-sm text-gray-700 mt-4 border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2">Employee</th>
                      <th className="p-2">Leave Type</th>
                      <th className="p-2">Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReport.data.map((row, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{row.employee}</td>
                        <td className="p-2">{row.leaveType}</td>
                        <td className="p-2">{row.days}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedReport.type === "performance" && (
                <table className="w-full text-sm text-gray-700 mt-4 border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2">Employee</th>
                      <th className="p-2">Rating</th>
                      <th className="p-2">Reviewer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReport.data.map((row, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{row.employee}</td>
                        <td className="p-2">{row.rating}</td>
                        <td className="p-2">{row.reviewer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => window.open(selectedReport.fileUrl, "_blank")}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Download
                </button>
                <button
                  onClick={() => setSelectedReport(null)}
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