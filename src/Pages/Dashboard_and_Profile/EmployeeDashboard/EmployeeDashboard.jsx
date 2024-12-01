import { useState, useEffect, PureComponent } from "react";
import Admin_IMG from "../../../assets/user.png";
import { GiAlarmClock } from "react-icons/gi";
import { FaAngleDown, FaChevronRight, FaRegCalendarAlt } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import img_emp1 from "../../../assets/emp1.png";
import { TfiLayoutMenuSeparated } from "react-icons/tfi";
import { RiUser6Line } from "react-icons/ri";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import { MdOutlineInsertChart } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LivClockSVG from "../../../utils/Calendar/LiveClockSVG/Clock";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./EmployeeDashboard.scss";
import AttendanceSection from "../AdminDashboard/AttendanceSection";
import ListSection from "../AdminDashboard/ListSection";
import EmpBirthday from "../AdminDashboard/EmpBirthday";
import EmpAttendanceOverview from "./EmpAttendanceOverview";
import EmpPerformanceStats from "./EmpPerformanceStats";
import EmpNavBar from "./EmpNavBar";
const EmployeeDashboard = () => {
  const [time, setTime] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0); // State to track current slide

  //   Live (*) time  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
      setTime(formattedTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const data = [
    { day: "Mon", assignedHours: 8, workedHours: 8.5 - 8 }, //workedHours - assignedHours = total work
    { day: "Tue", assignedHours: 8, workedHours: 8 - 8 },
    { day: "Wed", assignedHours: 3, workedHours: 4 - 3 },
    { day: "Thu", assignedHours: 8, workedHours: 8 - 8 },
    { day: "Fri", assignedHours: 8, workedHours: 10 - 8 },
    { day: "Sat", assignedHours: 6, workedHours: 8 - 6 },
  ];

  return (
    <div className="ADMIN_EMP">
      <EmpNavBar />

      <div className="content_emp_three">
        <div className="Left_cart">
          <EmpAttendanceOverview />
          <EmpBirthday />
        </div>
        <EmpPerformanceStats />
      </div>
      <AttendanceSection />

      <ListSection />
    </div>
  );
};

export default EmployeeDashboard;
