import React from "react";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import EmployeeTable from "../components/EmployeeTable";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Reusable section card (summary only, no button)
function SectionCard({ title, items }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow h-full">
      <h3 className="font-semibold mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Quick Actions (summary only, no buttons)
function QuickActions() {
  const actions = ["Add Employee", "Mark Attendance", "Approve Leave", "Start Onboarding"];
  return (
    <div className="bg-white p-5 rounded-lg shadow h-full">
      <h3 className="font-semibold mb-3">Quick Actions</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {actions.map((action, i) => (
          <li key={i}>{action}</li>
        ))}
      </ul>
    </div>
  );
}

// Employee Insights chart
function EmployeeInsights() {
  const data = [
    { month: "Jan", headcount: 800, attrition: 50 },
    { month: "Feb", headcount: 950, attrition: 60 },
    { month: "Mar", headcount: 1100, attrition: 55 },
    { month: "Apr", headcount: 1200, attrition: 70 },
    { month: "May", headcount: 1300, attrition: 65 },
    { month: "Jun", headcount: 1400, attrition: 60 },
    { month: "Jul", headcount: 1500, attrition: 58 },
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow h-full">
      <h3 className="font-semibold mb-3">Employee Insights</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="headcount" stroke="#dc2626" name="Headcount Growth" />
          <Line type="monotone" dataKey="attrition" stroke="#2563eb" name="Attrition Rate" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Today's Attendance with circular chart
function TodayAttendanceCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-center items-center h-full">
      <h3 className="font-semibold text-base mb-4">Today's Attendance</h3>
      <div className="w-28 h-28 mb-4">
        <CircularProgressbar
          value={82}
          text="82%"
          styles={buildStyles({
            textSize: "18px",
            pathColor: "#16a34a",
            textColor: "#16a34a",
            trailColor: "#e5e7eb",
          })}
        />
      </div>
      <div className="space-y-2 text-sm text-gray-700 text-center">
        <p>Late Check-ins: 26</p>
        <p>Early Check-outs: 14</p>
        <p>Working from Home: 23</p>
      </div>
    </div>
  );
}

export default function HRDashboard() {
  // Example state for dynamic data (replace with API or global store)
  const [summary] = React.useState({
    totalEmployees: 1308,
    presentToday: 1080,
    absentToday: 48,
    onLeave: 36,
    leave: { pending: 18, approved: 5, rejected: 2, upcoming: 24 },
    hiring: { open: 8, interviews: 3, offers: 2, upcoming: 24 },
    todo: {
      leaveRequests: 12,
      attendanceRegularizations: 8,
      newEmployees: 15,
      performanceReviews: 4,
    },
  });

  return (
    <div className="flex-1">
      <Topbar />

      <div className="p-6 space-y-6">
        <h2 className="text-lg font-semibold">Welcome, Anil Kumar 👋</h2>

        {/* Stat cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <StatCard title="Total Employees" value={summary.totalEmployees} />
          <StatCard title="Present Today" value={summary.presentToday} />
          <StatCard title="Absent Today" value={summary.absentToday} />
          <StatCard title="On Leave" value={summary.onLeave} />
        </div>

        {/* Attendance + Insights */}
        <div className="grid md:grid-cols-2 gap-6">
          <TodayAttendanceCard />
          <EmployeeInsights />
        </div>

        <ChartCard />
        <EmployeeTable />

        {/* Leave, Hiring, To-Do */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SectionCard
            title="Leave Overview"
            items={[
              `Pending Requests: ${summary.leave.pending}`,
              `Approved Today: ${summary.leave.approved}`,
              `Rejected: ${summary.leave.rejected}`,
              `Upcoming (Next 7 days): ${summary.leave.upcoming}`,
            ]}
          />
          <SectionCard
            title="Hiring Status"
            items={[
              `Open Positions: ${summary.hiring.open}`,
              `Interviews Today: ${summary.hiring.interviews}`,
              `Offers Sent: ${summary.hiring.offers}`,
              `Upcoming (Next 7 days): ${summary.hiring.upcoming}`,
            ]}
          />
          <SectionCard
            title="To Do List"
            items={[
              `${summary.todo.leaveRequests} Leave Requests Pending Review`,
              `${summary.todo.attendanceRegularizations} Attendance Regularizations Pending Approval`,
              `${summary.todo.newEmployees} New Employees Pending Documents`,
              `${summary.todo.performanceReviews} Performance Reviews Due`,
            ]}
          />
        </div>
      </div>
    </div>
  );
}