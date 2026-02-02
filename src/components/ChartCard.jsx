import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", attendance: 80 },
  { name: "Tue", attendance: 85 },
  { name: "Wed", attendance: 78 },
  { name: "Thu", attendance: 90 },
  { name: "Fri", attendance: 88 },
]

export default function ChartCard() {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h3 className="font-semibold mb-3">Attendance Overview</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="attendance" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
