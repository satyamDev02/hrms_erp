import { useState, useRef, useEffect } from 'react';
import '../styles/Navbar.scss';
import logo from "../assets/logo.png";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import user from '../assets/user.png';
import { FaRegUser } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { LuSettings } from "react-icons/lu";
import imgN from '../assets/user.png';
import { TbLogout } from "react-icons/tb";
import { OutsideClick } from './OutSideClick';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SvgIcon from '@mui/material/SvgIcon';

const Navbar = ({ setIsLoggedIn }) => {
    // Hook for Notifications Dropdown
    const { isOpen: isNotificationsOpen, ref: notificationsRef, buttonRef: notificationsButtonRef, handleToggle: toggleNotifications } = OutsideClick();
    const [showAlert, setShowAlert] = useState(false);

    // Hook for Account Dropdown
    const { isOpen: isAccountOpen, ref: accountRef, buttonRef: accountButtonRef, handleToggle: toggleAccount } = OutsideClick();

    const navigate = useNavigate();
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);

    // Update navigation state
    useEffect(() => {
        const updateNavigationState = () => {
            setCanGoBack(window.history.state && window.history.state.idx > 0);
            setCanGoForward(window.history.state && window.history.state.idx < window.history.length - 1);
        };

        updateNavigationState();

        window.addEventListener('popstate', updateNavigationState);

        return () => {
            window.removeEventListener('popstate', updateNavigationState);
        };
    }, [location]);

    const handleNext = () => {
        if (canGoForward) {
            navigate(1);
        }
    };

    const handlePrevious = () => {
        if (canGoBack) {
            navigate(-1);
        }
    };

    const clickOut = () => {
        localStorage.setItem('access_token', '');
        setShowAlert(true)
        setIsLoggedIn(false);
        navigate('/');

    };

    const handleClick = () => {
        navigate('/');
    };

    const handleMyAccountClick = () => {
        navigate('/admin-dashboard');
        toggleAccount()
    };

    const handleAnnouncementsClick = () => {
        navigate('/announcements');
    };

    const handleSettingsClick = () => {
        navigate('/settings');
    };

    const handleSeeAllNotifications = () => {
        navigate('/notifications');
    };
    const isNotificationsClose = () => {
        toggleNotifications()
    }
    const isAccountClose = () => {
        toggleAccount()
    }

    useEffect(() => {
        const icon = document.querySelector('.icon_ball');

        function startSwing() {
            if (icon) {
                icon.classList.add('swing'); // Swing start 
                // 30 seconds ke baad swing ko stop 
                setTimeout(() => {
                    icon.classList.remove('swing'); // Swing ko stop karna
                }, 20000); // 30 seconds
            }
        }

        // Start swing initially
        startSwing();

        const intervalId = setInterval(startSwing, 60000); // 2 minutes + 30 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="navbar">
            {showAlert ? <div> <div id='showAlert' ><p>LogOut Successfully</p></div> </div> : ''}
            <div className="navbar-left">
                <div className="logo" onClick={handleClick}>
                    <img src={logo} alt="HRMS" />
                </div>
            </div>
            <div className="navbar-right">
                <div className="leftIcon">
                    <span>
                        <IoIosArrowDropleft
                            onClick={handlePrevious}
                            className={canGoBack ? 'icon-active' : 'icon-inactive'}
                        />
                    </span>
                    <span>
                        <IoIosArrowDropright
                            onClick={handleNext}
                            className={canGoForward ? 'icon-active' : 'icon-inactive'}
                        />
                    </span>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search employee" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#ffffff" fill="none">
                        <path d="M17.5 17.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                </div>
                <div className="iconRight">
                    <span onClick={toggleNotifications} ref={notificationsButtonRef}>
                        <Tooltip title="Notifications" placement="bottom" arrow>
                            <span className="icon icon_ball ">
                                <svg className='' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                                    <path d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </Tooltip>
                    </span>
                    <span>
                        <Tooltip title="Settings" placement="bottom" arrow>
                            <span className="icon" onClick={() => navigate('/settings')} >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                    <path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                            </span>
                        </Tooltip>
                    </span>
                    <span>
                        <Tooltip title="Profile" placement="bottom" arrow>
                            <img src={user} alt="User" onClick={toggleAccount} ref={accountButtonRef} />
                        </Tooltip>
                    </span>
                </div>

            </div>

            {/* Notifications Popup */}
            {
                isNotificationsOpen && (
                    <div className="notification-popup" ref={notificationsRef}>
                        <h3>Notification</h3>
                        <ul>
                            <li onClick={isNotificationsClose}>
                                <img src={imgN} alt="User 1" />
                                <div>
                                    <p>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
                                    <small>April, 2024 At 9:15 AM</small>
                                </div>
                            </li>
                            <li onClick={isNotificationsClose}>
                                <img src={imgN} alt="User 2" />
                                <div>
                                    <p>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
                                    <small>April, 2024 At 9:15 AM</small>
                                </div>
                            </li>
                            <li onClick={isNotificationsClose}>
                                <img src={imgN} alt="User 3" />
                                <div>
                                    <p>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
                                    <small>April, 2024 At 9:15 AM</small>
                                </div>
                            </li>
                            <li onClick={isNotificationsClose}>
                                <img src={imgN} alt="User 4" />
                                <div>
                                    <p>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
                                    <small>April, 2024 At 9:15 AM</small>
                                </div>
                            </li>
                        </ul>
                        <div className='all_notifications' onClick={isNotificationsClose}>
                            <p onClick={handleSeeAllNotifications}>See All Notifications</p>
                        </div>
                    </div>
                )
            }

            {/* Account Popup */}
            {
                isAccountOpen && (
                    <div className="account-popup" ref={accountRef}>
                        <div className='img_user_profile' onClick={isAccountClose}>
                            <img src={user} alt="" />
                            <div>
                                <h2>Mr. Akash Shinde</h2>
                                <p>Akash25shinde@gmail.com</p>
                            </div>
                        </div>
                        <ul>
                            <li onClick={handleMyAccountClick}>
                                <div>
                                    <span><FaRegUser /></span>
                                    <p>My Account</p>
                                </div>
                            </li>
                            <li onClick={handleAnnouncementsClick}>
                                <div>
                                    <span><GrAnnounce /></span>
                                    <p>Announcements</p>
                                </div>
                            </li>
                            <li onClick={handleSettingsClick}>
                                <div>
                                    <span><LuSettings /></span>
                                    <p>Settings</p>
                                </div>
                            </li>
                        </ul>
                        <div className="out">
                            <span onClick={clickOut}><TbLogout /></span>


                            <h2 onClick={clickOut}>Sign Out</h2>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Navbar;
