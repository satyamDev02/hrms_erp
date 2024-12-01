import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { OutsideClick } from '../../Employee_onboarding/AddEmployee/OutsideClick'
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.scss'
import ListSection from "./ListSection";
import AttendanceSection from "./AttendanceSection";
import EmpBirthday from "./EmpBirthday";
import NewEmp from "./NewEmp";
import EmpOnLeave from "./EmpOnLeave";
import AttendanceOverview from "./AttendanceOverview";
import AdminNavbar from "./AdminNavbar";

const todayData = [
  { name: "Present", value: 150 },
  { name: "Absent", value: 4 },
  { name: "Half Day", value: 23 },
];
const weekData = [
  { name: "Present", value: 700 },
  { name: "Absent", value: 60 },
  { name: "Half Day", value: 150 },
];
const monthData = [
  { name: "Present", value: 2800 },
  { name: "Absent", value: 600 },
  { name: "Half Day", value: 300 },
];
const COLORS = ["#A448EE", "#a348eebe", "#a348ee77"];

const AdminDashboard = () => {
  const {
    isOpen: isAttendanceOpen,
    ref: attendanceRef,
    buttonRef: attendanceButtonRef,
    handleToggle: toggleAttendance,
    setIsOpen: setAttendanceOpen,
  } = OutsideClick();

  const [time, setTime] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0); // State to track current slide
  const navigate = useNavigate();
  // pie show
  const [selectedOption, setSelectedOption] = useState("Today");
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(todayData);

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

  return (
    <div className="ADMIN_EMP">
      <AdminNavbar />

      <div className="content_emp_three">
        <div className="Left_cart">
          <AttendanceOverview />
          <EmpBirthday />
        </div>
        <div className="flex_right">
          <NewEmp />
          <EmpOnLeave />
        </div>
      </div>

      <AttendanceSection />

      <ListSection />
    </div>
  );
};

export default AdminDashboard;
