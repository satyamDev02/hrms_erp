import React, { useState, useRef } from "react";
import "./CalendarAttendance.scss";

const CalendarAttendance = ({ attendanceDetail }) => {
  console.log("attend", attendanceDetail);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const getDayType = (day) => {
    const dateKey = `${String(day).padStart(2, "0")}-${String(
      selectedMonth + 1
    ).padStart(2, "0")}-${selectedYear}`;

    const shift = attendanceDetail.find((s) => s.date === dateKey);

    const weekday = new Date(selectedYear, selectedMonth, day).getDay();
    const currentDate = new Date(); // Current date to compare with

    // Get the date for the current day
    const currentDayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    // Check if the current day is in the past (before today), excluding today
    const isPastDay =
      new Date(selectedYear, selectedMonth, day) < currentDayDate;

    // Set status as "Absent" for past days (excluding today) if no status is found
    let dayStatus = "";

    // If it's a Sunday (weekday === 0), mark it as "Weekly Off"
    if (weekday === 0) {
      dayStatus = "weekly-off";
    } else {
      // If the day is in the past and no attendance is recorded, mark it as "Absent"
      dayStatus = shift
        ? shift?.status === "0"
          ? "Present"
          : shift?.status === "1"
          ? "Absent"
          : shift?.status === "2"
          ? "Half-Day"
          : ""
        : isPastDay
        ? "Absent"
        : "workday"; // Default for workdays
    }

    return {
      type: dayStatus,
      name: shift ? shift?.status : "",
      shift: shift ? shift.shift : null,
      shift_name: shift ? shift.shift_name : "",
      punch_in: shift ? shift.punch_in : "",
      punch_out: shift ? shift.punch_out : "",
      holiday_name: shift ? shift.holiday_name : "",
      isSunday: weekday === 0,
    };
  };

  const handlePreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };
  const handleCurrentMonth = () => {
    const today = new Date();
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
  };

  const calendarRef = useRef();

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDayOfMonth = getFirstDayOfMonth(selectedMonth, selectedYear);

  const handleMonthChange = (e) => setSelectedMonth(parseInt(e.target.value));
  const handleYearChange = (e) => setSelectedYear(parseInt(e.target.value));

  // Apply selected month and year when "Apply" button is clicked
  const applySelectedDate = () => {
    calendarRef.current
      .getApi()
      .gotoDate(new Date(selectedYear, selectedMonth));
    // Implement filter logic here if needed
    console.log(`Filtered to ${selectedMonth + 1}-${selectedYear}`);
  };

  return (
    <div className="calendar">
      <div className="calendar-header-att">
        <div className="C_Left">
          <select value={selectedMonth} onChange={handleMonthChange}>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>

          <select value={selectedYear} onChange={handleYearChange}>
            {[2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button className="apply-btn" onClick={applySelectedDate}>
            Apply
          </button>
        </div>

        <h2 className="curr_moth_">
          {new Date(selectedYear, selectedMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {selectedYear}
        </h2>

        <div className="C_right">
          <button onClick={handlePreviousMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              color="#400F6F"
              fill="none"
            >
              <path
                d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Previous Month
          </button>
          <button onClick={handleCurrentMonth} className="Current_month">
            Current Month
          </button>
          <button onClick={handleNextMonth}>
            Next Month
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              color="#400f6f"
              fill="none"
            >
              <path
                d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="day_name_attendance">Sunday</div>
        <div className="day_name_attendance">Monday</div>
        <div className="day_name_attendance">Tuesday</div>
        <div className="day_name_attendance">Wednesday</div>
        <div className="day_name_attendance">Thursday</div>
        <div className="day_name_attendance">Friday</div>
        <div className="day_name_attendance">Saturday</div>

        {/* Empty cells for days before the month starts */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="empty-cell"></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
          const day = dayIndex + 1;
          const {
            type,
            name,
            shift,
            shift_name,
            punch_in,
            punch_out,
            isSunday,
            holiday_name,
          } = getDayType(day);
          {
            console.log("name, type", name, type);
          }
          const leaveClass =
            type === "leave" ? name.toLowerCase().replace(" ", "-") : "";

          return (
            <div key={day} className={`day ${type} ${leaveClass}`}>
              {!holiday_name ? (
                <div
                  className={`date date-flex`}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div className="event">
                      {type === "weekly-off" && (
                        <span className="weekly-off">Weekly Off</span>
                      )}
                      {type === "Present" && (
                        <span className="Present">
                          <div className="dot"></div>
                          {type}
                        </span>
                      )}
                      {type === "Absent" && (
                        <span className="Absent">
                          <div className="dot"></div>
                          {type}
                        </span>
                      )}
                      {type === "Half-Day" && (
                        <span className="Half-day">
                          <div className="dot"></div>
                          {type}
                        </span>
                      )}
                    </div>
                    <div>{day}</div>
                  </div>
                  
                   {type!=="Absent" && ( <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      <span>{shift_name && `Shift - ${shift_name}`}</span>
                      <div style={{ display: "flex", marginTop: "5px" }}>
                        <span>{punch_in ? `${punch_in}  - ` : ""}</span>
                        <span style={{ marginLeft: "10px" }}>
                          {punch_out || ""}
                        </span>
                      </div>
                    </div>)}
               
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div className="event">
                    <span className="Absent">{holiday_name ? `${holiday_name} Holiday ` : ""}</span>
                  </div>
                  <div>{day}</div>
                </div>
              )}

              {!isSunday && <div className="shift_given">{shift || ""}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarAttendance;
