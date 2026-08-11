"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", views: 120, conversions: 12 },
  { day: "Tue", views: 150, conversions: 18 },
  { day: "Wed", views: 90, conversions: 8 },
  { day: "Thu", views: 200, conversions: 25 },
  { day: "Fri", views: 170, conversions: 22 },
];

export function AnalyticsChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#3b82f6" name="Views" />
          <Line type="monotone" dataKey="conversions" stroke="#10b981" name="Conversions" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
