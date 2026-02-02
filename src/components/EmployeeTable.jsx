import React from "react";
const employees = [
  { id: 1, name: "Roshni", role: "HR Intern", status: "Active" },
  { id: 2, name: "Anil Kumar", role: "Developer", status: "On Leave" },
  { id: 3, name: "Sangeetha", role: "Accounts", status: "Active" },
]

export default function EmployeeTable() {
  return (
    <div className="bg-white p-5 rounded-lg shadow mt-6">
      <h3 className="font-semibold mb-3">Employees</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm">
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="border-t">
              <td className="py-2">{emp.name}</td>
              <td>{emp.role}</td>
              <td className={emp.status === "Active" ? "text-green-600" : "text-orange-500"}>
                {emp.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
