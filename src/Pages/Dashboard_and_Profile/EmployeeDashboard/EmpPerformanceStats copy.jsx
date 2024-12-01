import { Tooltip } from "@ariakit/react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const EmpPerformanceStats = () => {
    const data = [
        { day: "Mon", assignedHours: 8, workedHours: 8.5 - 8 }, //workedHours - assignedHours = total work
        { day: "Tue", assignedHours: 8, workedHours: 8 - 8 },
        { day: "Wed", assignedHours: 3, workedHours: 4 - 3 },
        { day: "Thu", assignedHours: 8, workedHours: 8 - 8 },
        { day: "Fri", assignedHours: 8, workedHours: 10 - 8 },
        { day: "Sat", assignedHours: 6, workedHours: 8 - 6 },
      ];
  return (
    <div className="chart_Performance_Stats">
      <div className="headerCrt">
        <h3>Performance Stats</h3>
        <select>
          <option>Last Week</option>
          <option>This Week</option>
        </select>
      </div>
      <ResponsiveContainer
        width="100%"
        height={330}
        style={{ marginBottom: "20px" }}
      >
        <div className="lable_chart_Performance">
          <span className="Expected">Assigned Hours</span>
          <span className="Achieved">Total Extra Hours Worked</span>
        </div>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="0.3 1" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 13, fill: "grey" }}
            axisLine={{ stroke: "black" }}
          />
          <YAxis
            tick={{ fontSize: 13, fill: "grey" }}
            axisLine={{ stroke: "black" }}
          />
          <Tooltip />
          {/* <Legend /> */}
          <Bar
            dataKey="assignedHours"
            stackId="a"
            fill="#591AB7"
            name="Assigned Hours"
          />{" "}
          {/* Assigned Hours */}
          <Bar
            dataKey="workedHours"
            stackId="a"
            fill="#7C3CE9"
            name="Total Extra Hours Worked"
          />{" "}
          Total Hours Worked
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmpPerformanceStats;
