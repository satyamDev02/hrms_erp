import React, { useState } from 'react'
import LivClockSVG from '../../../utils/Calendar/LiveClockSVG/Clock'
import Admin_IMG from "../../../assets/user.png";

const EmpNavBar = () => {
    const [time, setTime] = useState("");
    const data = [
        { day: "Mon", assignedHours: 8, workedHours: 8.5 - 8 }, //workedHours - assignedHours = total work
        { day: "Tue", assignedHours: 8, workedHours: 8 - 8 },
        { day: "Wed", assignedHours: 3, workedHours: 4 - 3 },
        { day: "Thu", assignedHours: 8, workedHours: 8 - 8 },
        { day: "Fri", assignedHours: 8, workedHours: 10 - 8 },
        { day: "Sat", assignedHours: 6, workedHours: 8 - 6 },
      ];
  return (
    <div className="Top_Head_Admin_Dashboard">
    {/* left */}
    <div className="Left_admin_hello">
      <img src={Admin_IMG} alt="Admin_image" />
      <div>
        <h2>
          Hello Akash Shinde! <span className="wave">👋</span>
        </h2>
        <p>Welcome back, Track your team progress here</p>
      </div>
    </div>
    {/* right */}
    <div className="Right_Time">
      <div className="Check_in_time">
        <h3>CHECK IN TIME</h3>
        {/* <span><GiAlarmClock /></span> */}
        <LivClockSVG size={35} setColor="#fff" />
        <h2>{time}</h2>
      </div>
      {/* <div className="check_out_time">
                    <h3>CHECK OUT TIME</h3>
                    <button>Check Out</button>
                </div> */}
    </div>
  </div>
  )
}

export default EmpNavBar
