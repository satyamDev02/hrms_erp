import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import { Cell, Pie, PieChart } from "recharts";
import { OutsideClick } from "../../../utils/common/OutsideClick";
const todayData = [
  { name: 'Present', value: 150 },
  { name: 'Absent', value: 4 },
  { name: 'Half Day', value: 23 },
];
const weekData = [
  { name: 'Present', value: 700 },
  { name: 'Absent', value: 60 },
  { name: 'Half Day', value: 150 },
];
const monthData = [
  { name: 'Present', value: 2800 },
  { name: 'Absent', value: 600 },
  { name: 'Half Day', value: 300 },
];
const COLORS = ['#A448EE', '#a348eebe', '#a348ee77'];
const AttendanceOverview = () => {
  const [selectedOption, setSelectedOption] = useState('Today');
  const [data, setData] = useState(todayData);
  const [totalEmployees, setTotalEmployees] = useState(todayData.reduce((sum, item) => sum + item.value, 0));

  const { isOpen: isAttendanceOpen, ref: attendanceRef, buttonRef: attendanceButtonRef, handleToggle: toggleAttendance, setIsOpen: setAttendanceOpen } = OutsideClick();
  let selectedDataTotal;
  // const selectOption = (option) => {
  //     setSelectedOption(option);
  //     setIsOpen(false);
  //     setAttendanceOpen(false)
  //     // Update data based on selected option
  //     switch (option) {
  //         case 'Today':
  //             setData(todayData);
  //             selectedDataTotal = todayData.reduce((sum, item) => sum + item.value, 0);
  //             break;
  //         case 'Week':
  //             setData(weekData);
  //             selectedDataTotal = weekData.reduce((sum, item) => sum + item.value, 0);

  //             break;
  //         case 'Month':
  //             setData(monthData);
  //             selectedDataTotal = monthData.reduce((sum, item) => sum + item.value, 0);

  //             break;
  //         default:
  //             setData(todayData);
  //     }
  //     // Calculate the total of the selected data
  //     setTotalEmployees(selectedDataTotal)
  // };
  const selectOption = (option) => {
    let selectedDataTotal = 0;
    switch (option) {
      case 'Today':
        setData(todayData);
        selectedDataTotal = todayData.reduce((sum, item) => sum + item.value, 0);
        break;
      case 'Week':
        setData(weekData);
        selectedDataTotal = weekData.reduce((sum, item) => sum + item.value, 0);
        break;
      case 'Month':
        setData(monthData);
        selectedDataTotal = monthData.reduce((sum, item) => sum + item.value, 0);
        break;
      default:
        setData(todayData);
        selectedDataTotal = todayData.reduce((sum, item) => sum + item.value, 0);
        break;
    }
    setTotalEmployees(selectedDataTotal);
    setSelectedOption(option);
    setAttendanceOpen(false);
    
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: "#27014a",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 4px 18px 0.5px #a348ee77",
          transition: "linear 0.3s"
        }}>
          <p className="label" style={{ fontWeight: "bold", fontSize: '12px', margin: 0 }}>
            {`${payload[0].name} : ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="Attendance_Overview">
      <div className="head">
        <h3>Attendance Overview</h3>
        <div className="dropdown">
          <div
            className="dropdown-button"
            onClick={toggleAttendance}
            ref={attendanceButtonRef}
          >
            <div>{selectedOption}</div>
            <div>
              <FaAngleDown />
            </div>
          </div>
          {isAttendanceOpen && (
            <div className="dropdown-menu" ref={attendanceRef}>
              <div
                className="dropdown-item_"
                onClick={() => selectOption("Today")}
              >
                Today
              </div>
              <div
                className="dropdown-item_"
                onClick={() => selectOption("Week")}
              >
                Week
              </div>
              <div
                className="dropdown-item_"
                onClick={() => selectOption("Month")}
              >
                Month
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="Left_right">
        <div className="left">
          <div>
            <span className="present"></span>
            <h3>Present</h3>
          </div>
          <div>
            <span className="absent"></span>
            <h3>Absent</h3>
          </div>
          <div>
            <span className="halfday"></span>
            <h3>Half Day</h3>
          </div>
        </div>
        <div className="right">
          <div className="pie_char_admin">
            <PieChart width={300} height={120}>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={data}
                cx={210}
                cy={100}
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                fill="#000"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="none" // Border removed
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="gauge">
            <span>Total Employees</span>
            <h1>{totalEmployees}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
