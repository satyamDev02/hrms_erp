import { Tooltip } from "@ariakit/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { getPerformanceDetails } from "../../../Redux/Actions/performanceActions";
import DashboardPerformanceStats from "./DashboardPerformanceStats";

const EmpPerformanceStats = () => {
 
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = JSON.parse(localStorage.getItem("HRMS_USER_DATA"));
  console.log("data ❌😊😊", data?.user_id);
  const performanceDetails = useSelector((state) => state?.performanceDetails);

  const performanceDetail = performanceDetails?.data?.result || {};
  useEffect(() => {
    if (data?.user_id) {
      const queryParams = {
        id: data?.user_id,
      };
      dispatch(getPerformanceDetails(queryParams));
    }
  }, [data?.user_id]);
  return (
    <>

      <div className="chart_Performance_Stats">
        {/* <div className="headerCrt">
        <h3>Performance Stats</h3>
        <select>
          <option>Last Week</option>
          <option>This Week</option>
        </select>
      </div> */}
        <DashboardPerformanceStats apiData={performanceDetail} />
      </div>
    </>
  );
};

export default EmpPerformanceStats;
