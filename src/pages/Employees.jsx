import React, { useState } from "react";
import Topbar from "../components/Topbar";

export default function Employees() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Roshni", role: "HR Intern", email: "roshni@goldcorp.com" },
    { id: 2, name: "Anil Kumar", role: "Developer", email: "anil@goldcorp.com" },
    { id: 3, name: "Sangeetha", role: "Accounts", email: "sangeetha@goldcorp.com" },
    { id: 4, name: "Priya", role: "UI Designer", email: "priya@goldcorp.com" },
    { id: 5, name: "Rahul", role: "Backend Engineer", email: "rahul@goldcorp.com" },
    { id: 6, name: "Meena", role: "QA Tester", email: "meena@goldcorp.com" },
    { id: 7, name: "Vikram", role: "Project Manager", email: "vikram@goldcorp.com" },
    { id: 8, name: "Divya", role: "Business Analyst", email: "divya@goldcorp.com" },
    { id: 9, name: "Arjun", role: "DevOps Engineer", email: "arjun@goldcorp.com" },
    { id: 10, name: "Kavya", role: "Content Writer", email: "kavya@goldcorp.com" },
    { id: 11, name: "Manoj", role: "Support Engineer", email: "manoj@goldcorp.com" },
    { id: 12, name: "Sneha", role: "Recruiter", email: "sneha@goldcorp.com" },
    { id: 13, name: "Deepak", role: "Finance Executive", email: "deepak@goldcorp.com" },
    { id: 14, name: "Lakshmi", role: "Payroll Specialist", email: "lakshmi@goldcorp.com" },
    { id: 15, name: "Ravi", role: "System Admin", email: "ravi@goldcorp.com" },
  ]);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "", email: "" });

  // Remove employee
  const removeEmployee = (id) => {
    const updated = employees.filter((emp) => emp.id !== id);
    setEmployees(updated);
    alert(`Employee with ID ${id} has been removed.`);
  };

  // Start editing employee
  const startEdit = (emp) => {
    setEditingEmployee(emp.id);
    setFormData({ name: emp.name, role: emp.role, email: emp.email });
  };

  // Save updated employee
  const saveUpdate = () => {
    const updated = employees.map((emp) =>
      emp.id === editingEmployee ? { ...emp, ...formData } : emp
    );
    setEmployees(updated);
    setEditingEmployee(null);
    alert("Employee details updated successfully.");
  };

  // Add new employee
  const addEmployee = () => {
    if (!formData.name || !formData.role || !formData.email) {
      alert("Please fill all fields before adding.");
      return;
    }
    const newEmployee = {
      id: employees.length + 1,
      name: formData.name,
      role: formData.role,
      email: formData.email,
    };
    setEmployees([...employees, newEmployee]);
    setFormData({ name: "", role: "", email: "" });
    alert("New employee added successfully.");
  };

  return (
    <div className="flex-1">
      <Topbar />
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Employees</h2>

        {/* Add Employee Form */}
        <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-medium mb-3">Add Employee</h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border px-3 py-2 rounded w-1/4"
            />
            <input
              type="text"
              placeholder="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="border px-3 py-2 rounded w-1/4"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border px-3 py-2 rounded w-1/4"
            />
            <button
              onClick={addEmployee}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Employee
            </button>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-t">
                  <td className="p-3">{emp.id}</td>
                  <td className="p-3">
                    {editingEmployee === emp.id ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      emp.name
                    )}
                  </td>
                  <td className="p-3">
                    {editingEmployee === emp.id ? (
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      emp.role
                    )}
                  </td>
                  <td className="p-3">
                    {editingEmployee === emp.id ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      emp.email
                    )}
                  </td>
                  <td className="p-3 space-x-2">
                    {editingEmployee === emp.id ? (
                      <button
                        onClick={saveUpdate}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(emp)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                      >
                        Update
                      </button>
                    )}
                    <button
                      onClick={() => removeEmployee(emp.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                    >
                      Remove
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