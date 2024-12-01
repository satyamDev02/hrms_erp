import React, { useEffect, useState } from 'react'
import LivClockSVG from '../../../utils/Calendar/LiveClockSVG/Clock';
import { getUserData } from '../../../services/login';
import defaultImage from "../../../assets/user.png";

const AdminNavbar = () => {

    const user_info = getUserData();
    const employeeImage = user_info?.image?.startsWith("[") ? JSON.parse(user_info?.image) : [];

    const [time, setTime] = useState('');
    const [isCheckedOut, setIsCheckedOut] = useState(false); //Toggle for check-out
    const [isOnBreak, setIsOnBreak] = useState(false); //Toggle for break mode
    const [timer, setTimer] = useState(0); //Timer count
    // const [userData, setUserData] = useState({});

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Load data from localStorage on initial render
    useEffect(() => {
        // (async () => {
        //     const user_info = await getUserData();
        //     setUserData(user_info);
        // }
        // )();

        const storedTimer = parseInt(localStorage.getItem("timer") || "0", 10);
        const storedDate = localStorage.getItem("date");
        const today = new Date().toDateString();

        // Check if date has changed (new day), then reset timer
        if (storedDate === today) {
            setTimer(storedTimer);
            setIsCheckedOut(true);
            setIsOnBreak(JSON.parse(localStorage.getItem("isOnBreak")) || false);
        } else {
            // New day: reset localStorage
            localStorage.setItem("timer", "0");
            localStorage.setItem("date", today);
        }
    }, []);

    // Update timer in localStorage every second if on break
    useEffect(() => {
        let interval;
        if (isCheckedOut && isOnBreak) {
            interval = setInterval(() => {
                setTimer((prevTime) => {
                    const newTime = prevTime + 1;
                    localStorage.setItem("timer", newTime);
                    return newTime;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        localStorage.setItem("isOnBreak", JSON.stringify(isOnBreak));
        localStorage.setItem("date", new Date().toDateString());
        return () => clearInterval(interval);
    }, [isCheckedOut, isOnBreak]);

    const handleButtonClick = () => {
        if (!isCheckedOut) {
            setIsCheckedOut(true);
            setIsOnBreak(true);
        } else {
            setIsOnBreak((prev) => !prev);
        }
    };

    return (
        <div className="Top_Head_Admin_Dashboard">
            {/* left */}
            <div className="Left_admin_hello">
                {/* <img src={Admin_IMG} alt="Admin_image" /> */}
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
                    <h2>Hello {user_info?.first_name} <span className='wave'>👋</span> </h2>
                    <p>Welcome back, Track your team progress here</p>
                </div>
            </div>
            {/* right */}
            <div className="Right_Time">
                <div className="Check_in_time">
                    <h3>CHECK IN TIME</h3>
                    <LivClockSVG size={35} setColor='#fff' />
                    <h2>{time}</h2>
                </div>
                {/* <div className="check_out_time">
                        <h3>CHECK OUT TIME</h3>
                        <button>Check Out</button>
                    </div> */}
                <div className="check_out_time">
                    {timer == 0 ? (
                        <h3>CHECK OUT</h3>
                    ) : (
                        <p>{formatTime(timer)}</p>
                    )}
                    <button onClick={handleButtonClick}>
                        {timer == 0 ? "Check In" : isOnBreak ? "Break" : "Continue"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar
//