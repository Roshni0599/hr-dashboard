import React, { useState } from "react";
import Topbar from "../components/Topbar";

export default function SalaryStructure() {
  const [salaryStructures, setSalaryStructures] = useState([
    {
      employee: "Roshni",
      role: "HR Intern",
      basic: 20000,
      hra: 8000,
      travel: 3000,
      medical: 2000,
      deductions: 5000,
      hrStatus: "Editable",
      adminStatus: "Not Approved",
    },
    {
      employee: "Anil Kumar",
      role: "Developer",
      basic: 40000,
      hra: 12000,
      travel: 5000,
      medical: 3000,
      deductions: 8000,
      hrStatus: "Editable",
      adminStatus: "Approved",
    },
    {
      employee: "Sangeetha",
      role: "Accounts",
      basic: 30000,
      hra: 10000,
      travel: 4000,
      medical: 2500,
      deductions: 6000,
      hrStatus: "Editable",
      adminStatus: "Not Approved",
    },
  ]);

  // HR submits changes → mark as Pending
  const submitForApproval = (index) => {
    const updated = [...salaryStructures];
    updated[index].hrStatus = "Pending Approval";
    setSalaryStructures(updated);
    alert(`${updated[index].employee}'s salary submitted for Super Admin approval.`);
  };

  // Generate salary structure (only if approved)
  const generateSalaryStructure = (index) => {
    const s = salaryStructures[index];
    if (s.adminStatus === "Approved") {
      const gross = s.basic + s.hra + s.travel + s.medical;
      const net = gross - s.deductions;
      alert(
        `Salary Structure for ${s.employee}:\n\n` +
          `Role: ${s.role}\n` +
          `Basic: ₹${s.basic}\n` +
          `HRA: ₹${s.hra}\n` +
          `Travel: ₹${s.travel}\n` +
          `Medical: ₹${s.medical}\n` +
          `Deductions: ₹${s.deductions}\n` +
          `Gross: ₹${gross}\n` +
          `Net Salary: ₹${net}\n\n` +
          `This structure is finalized and ready to share.`
      );
    } else {
      alert("Salary structure cannot be generated until it is approved by Super Admin.");
    }
  };

  return (
    <div className="flex-1">
      <Topbar />
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Salary Structure</h2>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Basic</th>
                <th className="p-3 text-left">HRA</th>
                <th className="p-3 text-left">Travel</th>
                <th className="p-3 text-left">Medical</th>
                <th className="p-3 text-left">Deductions</th>
                <th className="p-3 text-left">Net Salary</th>
                <th className="p-3 text-left">HR Status</th>
                <th className="p-3 text-left">Admin Approval</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {salaryStructures.map((s, i) => {
                const gross = s.basic + s.hra + s.travel + s.medical;
                const net = gross - s.deductions;
                return (
                  <tr key={i} className="border-t">
                    <td className="p-3">{s.employee}</td>
                    <td className="p-3">{s.role}</td>
                    <td className="p-3">₹{s.basic}</td>
                    <td className="p-3">₹{s.hra}</td>
                    <td className="p-3">₹{s.travel}</td>
                    <td className="p-3">₹{s.medical}</td>
                    <td className="p-3">₹{s.deductions}</td>
                    <td className="p-3 font-semibold text-blue-600">₹{net}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                        {s.hrStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          s.adminStatus === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {s.adminStatus}
                      </span>
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => submitForApproval(i)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                      >
                        Submit (HR)
                      </button>
                      {s.adminStatus === "Approved" && (
                        <button
                          onClick={() => generateSalaryStructure(i)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                        >
                          Generate Salary Structure
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}