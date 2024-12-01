import React, { useEffect, useState } from 'react';
import LivClockSVG from '../../../utils/Calendar/LiveClockSVG/Clock';
import { getUserData } from '../../../services/login';
import defaultImage from "../../../assets/user.png";

const AdminNavbar = () => {
    const user_info = getUserData();
    const employeeImage = user_info?.image?.startsWith("[") ? JSON.parse(user_info?.image) : [];
    const [time, setTime] = useState('');
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);
    const [isCheckedIn, setIsCheckedIn] = useState(false);

    useEffect(() => {
        const today = new Date().toDateString();
        const storedCheckInTime = localStorage.getItem("checkInTime");
        const storedDate = localStorage.getItem("checkInDate");

        if (storedDate === today && storedCheckInTime) {
            setIsCheckedIn(true);
            setCheckInTime(new Date(storedCheckInTime));
        } else {
            // Reset for new day
            localStorage.removeItem("checkInTime");
            localStorage.setItem("checkInDate", today);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCheckInOut = () => {
        if (!isCheckedIn) {
            const now = new Date();
            setCheckInTime(now);
            setIsCheckedIn(true);
            localStorage.setItem("checkInTime", now);
            localStorage.setItem("checkInDate", new Date().toDateString());
        } else {
            const now = new Date();
            setCheckOutTime(now);
            setIsCheckedIn(false);
            localStorage.removeItem("checkInTime");
        }
    };

    return (
        <div className="Top_Head_Admin_Dashboard">
            {/* Left Section */}
            <div className="Left_admin_hello">
                <img
                    className="header_img_rounded"
                    src={
                        employeeImage?.length > 0
                            ? employeeImage[0]?.url
                            : defaultImage
                    }
                    alt={
                        employeeImage?.length > 0
                            ? employeeImage[0]?.name
                            : "Admin_image"
                    }
                />
                <div>
                    <h2>Hello {user_info?.first_name} <span className='wave'>👋</span></h2>
                    <p>Welcome back, Track your team progress here</p>
                </div>
            </div>

            {/* Right Section */}
            <div className="Right_Time">
                <div className="Check_in_time">
                    <h3>CHECK IN TIME</h3>
                    <LivClockSVG size={35} setColor='#fff' />
                    <h2>{checkInTime ? checkInTime.toLocaleTimeString() : '--:--:--'}</h2>
                </div>
                <div className="check_out_time">
                    <h3>{isCheckedIn ? "CHECK OUT TIME" : "CHECK IN TIME"}</h3>
                    <h2>{checkOutTime ? checkOutTime.toLocaleTimeString() : '--:--:--'}</h2>
                    <button onClick={handleCheckInOut}>
                        {isCheckedIn ? "Check Out" : "Check In"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
