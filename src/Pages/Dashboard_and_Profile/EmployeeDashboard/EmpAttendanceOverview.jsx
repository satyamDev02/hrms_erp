import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const EmpAttendanceOverview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Today");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <div className="Attendance_Overview">
      <div className="head">
        <h3>My Attendance</h3>
        <div className="dropdown">
          <div className="dropdown-button" onClick={toggleDropdown}>
            <div>{selectedOption}</div>
            <div>
              <FaAngleDown />
            </div>
          </div>
          {isOpen && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                onClick={() => selectOption("Today")}
              >
                Today
              </div>
              <div
                className="dropdown-item"
                onClick={() => selectOption("Week")}
              >
                Week
              </div>
              <div
                className="dropdown-item"
                onClick={() => selectOption("Month")}
              >
                Month
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="TotalWorkingHRS">
        <div className="checkOut">
          <p>Time Active</p>
          <div>
            <h2>05hrs 45m</h2>
            <button>Check Out</button>
          </div>
        </div>
        <div className="totalWork">
          <div>
            <p>Remaining</p>
            <div>
              <h2>
                03hrs <span>15m</span>
              </h2>
            </div>
          </div>
          <div>
            <p>On Break</p>
            <div>
              <h2>
                01hrs <span>20m</span>
              </h2>
            </div>
          </div>
          <div>
            <p>Overtime</p>
            <div>
              <h2>
                00hrs <span> 0m</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpAttendanceOverview;
