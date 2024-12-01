import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaAngleLeft, FaChevronRight } from "react-icons/fa6";
import { RiHome6Line } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi2";
import { MdOutlineWorkOutline, MdOutlineDateRange, MdAdd } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { TbFileMinus, TbGraph, TbFolderSymlink } from "react-icons/tb";
import { BsClipboardData } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { MdOutlineSwitchAccessShortcut } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import FilledItemIco from '../assets/FilledItemIco.svg';
import FilledSalesIco from '../assets/FilledSalesIco.svg';
import FilledPurchasesIco from '../assets/FilledPurchasesIco.svg';
import FilledEwaybillsIco from '../assets/FilledEwaybillsIco.svg';
import FilledAccountantIco from '../assets/FilledAccountantIco.svg';
import { OutsideClick } from './OutSideClick';
import '../styles/Sidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarW } from '../slices/userSlice';
import { setLiHover } from '../slices/userSlice';

// 
const Sidebar = ({ isOpen, toggleSidebar }) => {

    // redux
    const dispatch = useDispatch();
    const sidebarW = useSelector((state) => state.user.sidebarW);
    const liHover = useSelector((state) => state.user.liHover); // Redux से liHover state को select करें

    // 
    const { isOpen: isSideOpen, ref: sideRef, buttonRef: sideButtonRef, handleToggle: toggleSide } = OutsideClick();
    const [activeItem, setActiveItem] = useState(null);
    const [activeItem2, setActiveItem2] = useState(true);
    const [activeItem3, setActiveItem3] = useState(null);

    const [isSubmenu, setIsSubmenu] = useState(false);
    const [showAddShorts, setShowAddShorts] = useState(false);

    const navigate = useNavigate();

    const handleShowActivespan = () => {
        setActiveItem2(!activeItem2)
    }

    const handleClick = (index, path,) => {//isSubmenu = false
        handleShowActivespan()
        dispatch(setSidebarW(!sidebarW));
        setActiveItem(index)

        if (!isSubmenu) {

            setActiveItem(activeItem == index ? null : index);
        }
        if (path) {
            navigate(path);
        }
    };
    const [sideW, setSideW] = useState(false)
    const combinedClickHandler = (index, path) => {
        dispatch(setSidebarW(!sidebarW));
        setSideW(!sideW)
        setIsSubmenu(true)
        handleClick(index);
        setActiveItem2(false)
        // console.log('span index ', index)
        // handleShowActivespan()  ise tab call karo jab li index and span index same ho
        if (activeItem == index) {

            handleShowActivespan()
        }
    };


    const handleClickShortCut = () => {
        setShowAddShorts(!showAddShorts)
    }




    const menuItems = [
        {
            label: 'Home',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                <path d="M10 18L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.35139 13.2135C1.99837 10.9162 1.82186 9.76763 2.25617 8.74938C2.69047 7.73112 3.65403 7.03443 5.58114 5.64106L7.02099 4.6C9.41829 2.86667 10.6169 2 12 2C13.3831 2 14.5817 2.86667 16.979 4.6L18.4189 5.64106C20.346 7.03443 21.3095 7.73112 21.7438 8.74938C22.1781 9.76763 22.0016 10.9162 21.6486 13.2135L21.3476 15.1724C20.8471 18.4289 20.5969 20.0572 19.429 21.0286C18.2611 22 16.5537 22 13.1388 22H10.8612C7.44633 22 5.73891 22 4.571 21.0286C3.40309 20.0572 3.15287 18.4289 2.65243 15.1724L2.35139 13.2135Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
            </svg>,
            submenu: [
                { label: 'Admin Dashboard', path: '/admin-dashboard' },
                { label: 'Employee Dashboard', path: '/employee-dashboard' },
                { label: 'Admin Profile', path: '/admin-profile' },
                { label: 'Employee Profile', path: '/Employee-profile' },
                // { label: 'Setting', path: '/setting' },
                // { label: 'Setting', path: '/setting' }

            ]
        },
        {
            label: 'Profile',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" stroke-width="1.5" />
            </svg>,
            submenu: [

                { label: 'All Job List', path: '/all-job-list' },
                { label: 'All Employee List', path: '/all-employee-list' },
                { label: 'All Applicant List', path: '/applicant_list' },
                { label: 'All Attendance List', path: '/all-attendance-list' },

            ]
        },
        {
            label: 'Organization',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                <path d="M12 15L12 16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3 11L3.15288 13.8633C3.31714 17.477 3.39927 19.2839 4.55885 20.3919C5.71843 21.5 7.52716 21.5 11.1446 21.5H12.8554C16.4728 21.5 18.2816 21.5 19.4412 20.3919C20.6007 19.2839 20.6829 17.477 20.8471 13.8633L21 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.84718 10.4431C4.54648 13.6744 8.3792 15 12 15C15.6208 15 19.4535 13.6744 21.1528 10.4431C21.964 8.90056 21.3498 6 19.352 6H4.648C2.65023 6 2.03603 8.90056 2.84718 10.4431Z" stroke="currentColor" stroke-width="1.5" />
                <path d="M15.9999 6L15.9116 5.69094C15.4716 4.15089 15.2516 3.38087 14.7278 2.94043C14.204 2.5 13.5083 2.5 12.1168 2.5H11.8829C10.4915 2.5 9.79575 2.5 9.27198 2.94043C8.7482 3.38087 8.52819 4.15089 8.08818 5.69094L7.99988 6" stroke="currentColor" stroke-width="1.5" />
            </svg>,
            submenu: [
                { label: 'Department', path: '/department' },
                { label: 'Designation', path: '/designation' },
                { label: 'Employee Health', path: '/health' },
                { label: 'Birthday', path: '/birthday' },
            ]
        },
        {
            label: 'Leave Tracker',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                <path d="M12.0078 10.5082C11.1794 10.5082 10.5078 11.1798 10.5078 12.0082C10.5078 12.8366 11.1794 13.5082 12.0078 13.5082C12.8362 13.5082 13.5078 12.8366 13.5078 12.0082C13.5078 11.1798 12.8362 10.5082 12.0078 10.5082ZM12.0078 10.5082V6.99902M15.0147 15.0198L13.0661 13.0712" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>,
            submenu: [
                // { label: 'All Leave', path: '/all-leave' },
                { label: 'All Leave', path: '/all-leave' },
                { label: 'Leave Type', path: '/leave_type' },
                { label: 'Travel', path: '/travel' },
                { label: 'Announcements', path: '/announcements' },
                { label: 'Performance', path: '/performance' },

            ]
        },
        {
            label: 'Project',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                <path d="M18 2V4M6 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.5 8H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3 8H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>,
            submenu: [
               
                { label: 'Holiday', path: '/holiday' },
                { label: 'Shift ', path: '/shift' },
                { label: 'Project ', path: '/project' },
                { label: 'Client', path: '/client' },
            ]
        },
        {
            label: 'Work',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                <path d="M10 13.3333C10 13.0233 10 12.8683 10.0341 12.7412C10.1265 12.3961 10.3961 12.1265 10.7412 12.0341C10.8683 12 11.0233 12 11.3333 12H12.6667C12.9767 12 13.1317 12 13.2588 12.0341C13.6039 12.1265 13.8735 12.3961 13.9659 12.7412C14 12.8683 14 13.0233 14 13.3333V14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14V13.3333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.9 13.5H15.0826C16.3668 13.5 17.0089 13.5 17.5556 13.3842C19.138 13.049 20.429 12.0207 20.9939 10.6455C21.1891 10.1704 21.2687 9.59552 21.428 8.4457C21.4878 8.01405 21.5177 7.79823 21.489 7.62169C21.4052 7.10754 20.9932 6.68638 20.4381 6.54764C20.2475 6.5 20.0065 6.5 19.5244 6.5H4.47562C3.99351 6.5 3.75245 6.5 3.56187 6.54764C3.00682 6.68638 2.59477 7.10754 2.51104 7.62169C2.48229 7.79823 2.51219 8.01405 2.57198 8.4457C2.73128 9.59552 2.81092 10.1704 3.00609 10.6455C3.571 12.0207 4.86198 13.049 6.44436 13.3842C6.99105 13.5 7.63318 13.5 8.91743 13.5H10.1" stroke="currentColor" stroke-width="1.5" />
                <path d="M3.5 11.5V13.5C3.5 17.2712 3.5 19.1569 4.60649 20.3284C5.71297 21.5 7.49383 21.5 11.0556 21.5H12.9444C16.5062 21.5 18.287 21.5 19.3935 20.3284C20.5 19.1569 20.5 17.2712 20.5 13.5V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.5 6.5L15.4227 6.14679C15.0377 4.38673 14.8452 3.50671 14.3869 3.00335C13.9286 2.5 13.3199 2.5 12.1023 2.5H11.8977C10.6801 2.5 10.0714 2.5 9.61309 3.00335C9.15478 3.50671 8.96228 4.38673 8.57727 6.14679L8.5 6.5" stroke="currentColor" stroke-width="1.5" />
            </svg>,
            submenu: [
                { label: 'Ticket', path: '/ticket' },
                { label: 'Trainers', path: '/trainers' },
                { label: 'Training', path: '/training' },
              
            ]
        }
    ];

    const handleMouseEnter = () => {
        dispatch(setLiHover(true));  // Redux में liHover state को true करें
    };

    // Mouse leave पर liHover state को false करें
    const handleMouseLeave = () => {
        dispatch(setLiHover(false));  // Redux में liHover state को false करें
    };
    const [mobileMenu, setMobileMenu] = useState(false);
    const MobileMenuToggle = () => {
        setMobileMenu(!mobileMenu)
    }
    const [showAll, setShowAll] = useState(false);
    const [visibleItems, setVisibleItems] = useState(2);

    const updateVisibleItems = () => {
        const screenHeight = window.innerHeight;

        if (screenHeight > 900) {
            setVisibleItems(7);
        } else if (screenHeight > 800) {
            setVisibleItems(6);
        } else if (screenHeight > 770) {
            setVisibleItems(5);
        } else if (screenHeight > 700) {
            setVisibleItems(4);
        } else if (screenHeight > 600) {
            setVisibleItems(3);
        } else {
            setVisibleItems(2); // Default for small screens
        }
    };

    useEffect(() => {
        updateVisibleItems(); // Initial check
        window.addEventListener('resize', updateVisibleItems);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('resize', updateVisibleItems);
        };
    }, []);
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };
    return (
        <>

            <div className={`sidebar ${isOpen ? 'open' : 'close'} ${sideW ? 'sideW' : ''} ${!mobileMenu ? 'sidebarMobile' : ''} `}>
                <div className="ul"
                    onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                >
                    <div id='top_bar' className="slide-btn">
                        <div id='MobileMenu' onClick={MobileMenuToggle}>
                            {!mobileMenu ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                    <path d="M2 12C2 8.3109 2 6.46633 2.81382 5.1588C3.1149 4.67505 3.48891 4.2543 3.91891 3.91557C5.08116 3.00003 6.72077 3.00003 10 3.00003H14C17.2792 3.00003 18.9188 3.00003 20.0811 3.91557C20.5111 4.2543 20.8851 4.67505 21.1862 5.1588C22 6.46633 22 8.3109 22 12C22 15.6892 22 17.5337 21.1862 18.8413C20.8851 19.325 20.5111 19.7458 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7458 3.1149 19.325 2.81382 18.8413C2 17.5337 2 15.6892 2 12Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M14.5 3.00003L14.5 21" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M18 7.00006H19M18 10.0001H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                    <path d="M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M9.5 3L9.5 21" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M5 7H6M5 10H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            }
                        </div>

                        <button onClick={toggleSidebar} className={`toggle-button ${!mobileMenu ? 'arrowMobile' : ''} `}>
                            {isOpen ? <FaAngleLeft /> : <FaChevronRight />}
                        </button>

                    </div>
                    <ul id='top-ul-hide'>
                        {menuItems.slice(0, showAll ? menuItems.length : visibleItems).map((item, index) => (
                            <li key={index} className={`${activeItem === index ? 'li' : ''}`}>
                                <span onClick={toggleSide}>
                                    <span
                                        onClick={() => combinedClickHandler(index, item.submenu)}
                                        className={`${activeItem === index ? 'color_li' : ''}`}
                                        ref={sideButtonRef}
                                    >
                                        {item.icon}
                                        {activeItem2 &&
                                            <p className={` ${isOpen ? 'openP' : 'closeP'}`}>
                                            </p>}
                                        {!isOpen && (
                                            <div className='hover_P'>
                                                <p>{item.label}</p>
                                                <div></div>
                                            </div>
                                        )}
                                    </span>
                                </span>
                                {isOpen && <p className={`${isOpen ? 'openP' : 'closeP'}`}>{item.label}</p>}
                                <div className={`hover_menu ${activeItem === index ? 'show' : ''} ${activeItem2 || !liHover ? 'active_span_li' : 'active_span_li_2'}`}>
                                    <div className='side_arrow'>
                                        {item.submenu.map((_, subIndex) => (
                                            <div className='leftArrow' key={subIndex}><div className='divL'></div></div>
                                        ))}
                                    </div>
                                    <div className="lineS"></div>
                                    <ul>
                                        {item.submenu.map((submenuItem, subIndex) => (
                                            <li
                                                onClick={() => {
                                                    handleClick(index, submenuItem.path, true);
                                                    setActiveItem3(submenuItem.path);
                                                }}
                                                key={subIndex}
                                            >
                                                {submenuItem.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                        {/* "More" button to reveal additional items */}
                        {!showAll && menuItems.length > visibleItems && (
                            <li onClick={toggleShowAll}><h5>MORE</h5></li>
                        )}
                        {showAll && menuItems.length > visibleItems && (
                            <li onClick={toggleShowAll}><h5>LESS</h5></li>
                        )}
                       
                            <li><div className='border-b'></div></li>
                    </ul>
                    <div className={` ${isOpen ? '' : 'side'} `}>
                        <div className={` ${isOpen ? '' : 'sideLine'} `}>
                            {/* <div className='dot'><div></div></div> */}
                            <div className="ul22">
                                <ul className='ul2 '
                                // onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                                // style={{ height: `150px` }}
                                >
                                    <li>
                                        <span className='spanLiP'>
                                            <span onClick={() => navigate('/file/employee')}><TbFileMinus /></span>{isOpen && <p className={` ${isOpen ? 'openP' : 'closeP'}`}>Files</p>} {isOpen ? '' : <div className='hover_P'><p>Files</p> <div></div></div>}
                                        </span>
                                    </li>
                                    <li>
                                        <span className='spanLiP'>
                                            <span><TbGraph /></span>{isOpen && <p className={` ${isOpen ? 'openP' : 'closeP'}`}>Performance</p>}  {isOpen ? '' : <div className='hover_P'><p>Performance</p> <div></div></div>}
                                        </span>
                                    </li>
                                    <li>
                                        <span className='spanLiP'>
                                            <span><TbFolderSymlink /></span>{isOpen && <p className={` ${isOpen ? 'openP' : 'closeP'}`}>Onboarding</p>}  {isOpen ? '' : <div className='hover_P'><p>Onboarding</p> <div></div></div>}
                                        </span>
                                    </li>
                                    <li>
                                        <span className='spanLiP'>
                                            <span onClick={() => navigate('/reports/my')}><BsClipboardData /></span>{isOpen && <p className={` ${isOpen ? 'openP' : 'closeP'}`}>Report</p>}  {isOpen ? '' : <div className='hover_P'><p>Report</p> <div></div></div>}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="fix-add">
                        <span onClick={handleClickShortCut}><MdAdd /></span>
                    </div>
                    {showAddShorts && (
                        <div id="shortcuts-box">
                            <div id="sugnboxsxx1">
                                <h3>Shortcuts <MdOutlineSwitchAccessShortcut /></h3>
                                <ul>

                                    <div className="firstboxxlw51ws1">
                                        <div className="xkwloxs654s2">
                                            <img src={FilledItemIco} alt="" />

                                            <p>Items</p>
                                        </div>
                                        <div className="xkwloxs654s25">
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Add Item</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Category</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Sub-Category</li>
                                        </div>

                                    </div>


                                    <div className="firstboxxlw51ws1">
                                        <div className="xkwloxs654s2">
                                            {/* {otherIcons?.salesiconex} */}

                                            <img src={FilledSalesIco} alt="" />

                                            <p>Sales</p>
                                        </div>
                                        <div className="xkwloxs654s25">
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Customer</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Quotation</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Sales Order</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Invoice</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Credit Notes</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Payment Recieved</li>
                                        </div>

                                    </div>

                                    <div className="firstboxxlw51ws1">
                                        <div className="xkwloxs654s2">

                                            <img src={FilledPurchasesIco} alt="" />
                                            <p>Purchases</p>
                                        </div>
                                        <div className="xkwloxs654s25">
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Vendor</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Purchases</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Bill</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Expense</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Debit Notes</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Payment Mode</li>
                                        </div>

                                    </div>


                                    <div className="firstboxxlw51ws1">
                                        <div className="xkwloxs654s2">

                                            <img src={FilledEwaybillsIco} alt="" />
                                            {/* {otherIcons?.ewaybillsiconex} */}
                                            {/* <svg id="fi_6992035" height="512" viewBox="0 0 100 100" width="512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="New_Gradient_Swatch_2" gradientUnits="userSpaceOnUse" x1="13.603" x2="76.403" y1="21.4" y2="84.2"><stop offset="0" stop-color="#0a75a1"></stop><stop offset="1" stop-color="#020088"></stop></linearGradient><g id="_09" data-name="09"><path d="m71.119 61.873a3.578 3.578 0 1 0 3.581 3.578 3.582 3.582 0 0 0 -3.581-3.578zm-50.625 0a3.578 3.578 0 1 0 3.578 3.578 3.582 3.582 0 0 0 -3.578-3.578zm6.588-15.018-2.711-2.71a1 1 0 0 1 1.414-1.414l2 2 1.066-1.066 5.109-5.109a1 1 0 1 1 1.414 1.414l-4.4 4.4.361.36 6.178-6.177a1 1 0 1 1 1.414 1.414l-6.885 6.884a1 1 0 0 1 -1.414 0l-1.068-1.067-1.06 1.071a1 1 0 0 1 -1.414 0zm67.118 11.972-6.131-3.25-2.569-12.712a10.21 10.21 0 0 0 -9.974-8.151h-17.492v-2.471a6.062 6.062 0 0 0 -6.049-6.062h-40.656a6.067 6.067 0 0 0 -6.061 6.062v33.214a1 1 0 0 0 1 1h5.924a8.362 8.362 0 0 0 16.6 0h34.025a8.362 8.362 0 0 0 16.6 0h14.315a1 1 0 0 0 1-1v-5.747a1 1 0 0 0 -.532-.883zm-67.34 6.648a6.367 6.367 0 0 1 -12.734 0c0-.007 0-.012 0-.018s0-.014 0-.021a6.368 6.368 0 0 1 12.735 0 .129.129 0 0 0 0 .021c-.004.006 0 .011 0 .018zm4.79-11.567a11.2 11.2 0 1 1 11.2-11.2 11.214 11.214 0 0 1 -11.2 11.2zm22.321 3.016a1 1 0 0 1 -1 1 1 1 0 0 1 -1-1v-6.3a1 1 0 0 1 1-1 1 1 0 0 1 1 1zm.007-10.608a1 1 0 0 1 -1 1 1 1 0 0 1 -1-1l.007-14.067a1 1 0 0 1 1-1 1 1 0 0 1 1 1zm17.141 25.5a6.375 6.375 0 0 1 -6.367-6.352v-.01-.013a6.368 6.368 0 1 1 6.368 6.375zm21.613-7.362h-13.309a8.362 8.362 0 0 0 -16.607 0h-4.782v-27.74h12.085v12.986a1 1 0 0 0 1 1h13.922l1.163 5.74a1.006 1.006 0 0 0 .512.685l6.016 3.189z" fill="url(#New_Gradient_Swatch_2)"></path></g></svg> */}
                                            <p>e-Way Bills</p>
                                        </div>
                                        <div className="xkwloxs654s25">
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Create e-Way Bill</li>
                                        </div>

                                    </div>



                                    <div className="firstboxxlw51ws1">
                                        <div className="xkwloxs654s2">

                                            <img src={FilledAccountantIco} alt="" />
                                            {/* {otherIcons?.accountanticonex} */}
                                            {/* <svg enableBackground="new 0 0 36 36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" id="fi_16597634"><path d="m8.114 5.564c-1.805 6.677-6.504 10.327-7.374 13.545s-.847 10.475 13.955 14.477 19.432-4.501 20.388-8.041c4.481-16.572-23.772-31.807-26.969-19.981z" fill="#efefef"></path><circle cx="15" cy="11" fill="#f3f3f1" r="4.25"></circle><path d="m13 11c0-1.955 1.328-3.585 3.125-4.08-.361-.1-.733-.17-1.125-.17-2.347 0-4.25 1.903-4.25 4.25s1.903 4.25 4.25 4.25c.392 0 .764-.07 1.125-.17-1.797-.495-3.125-2.125-3.125-4.08z" fill="#d5dbe1"></path><path d="m20.39 18.75h-1.14-7.36-1.14c-2.209 0-4 1.791-4 4v3.5h8.39.86 8.39v-3.5c0-2.209-1.791-4-4-4z" fill="#f3f3f1"></path><path d="m13 18.75h-1.11-1.14c-2.209 0-4 1.791-4 4v3.5h2.25v-3.5c0-2.209 1.791-4 4-4z" fill="#d5dbe1"></path><g fill="#a4afc1"><path d="m26.555 3.967h1v2h-1z" transform="matrix(.707 -.707 .707 .707 4.412 20.586)"></path><path d="m30.621 8.033h1v2h-1z" transform="matrix(.707 -.707 .707 .707 2.728 24.652)"></path><path d="m25.878 8.533h2v1h-2z" transform="matrix(.707 -.707 .707 .707 1.485 21.652)"></path><path d="m29.944 4.467h2v1h-2z" transform="matrix(.707 -.707 .707 .707 5.551 23.336)"></path><path d="m9.875 32.5c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5zm0-2c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5z"></path></g><circle cx="23" cy="24.5" fill="#2fdf84" r="2.75"></circle><path d="m22.5 24.5c0-1.117.669-2.074 1.625-2.504-.344-.155-.723-.246-1.125-.246-1.519 0-2.75 1.231-2.75 2.75s1.231 2.75 2.75 2.75c.402 0 .781-.091 1.125-.246-.956-.43-1.625-1.387-1.625-2.504z" fill="#00b871"></path><path d="m23 28c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm0-5.5c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z"></path><path d="m22.25 27.25h1.5v2h-1.5z"></path><path d="m22.25 19.75h1.5v2h-1.5z"></path><path d="m25.246 21.88h1.998v1.5h-1.998z" transform="matrix(.866 -.5 .5 .866 -7.803 16.176)"></path><path d="m18.756 25.62h1.998v1.5h-1.998z" transform="matrix(.866 -.5 .5 .866 -10.547 13.43)"></path><path d="m19.005 21.631h1.5v1.998h-1.5z" transform="matrix(.5 -.866 .866 .5 -9.724 28.408)"></path><path d="m25.495 25.371h1.5v1.998h-1.5z" transform="matrix(.5 -.866 .866 .5 -9.72 35.895)"></path><path d="m15 16c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-8.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"></path><path d="m16 27h-9.25c-.414 0-.75-.336-.75-.75v-3.5c0-2.619 2.131-4.75 4.75-4.75h8.5v1.5h-8.5c-1.792 0-3.25 1.458-3.25 3.25v2.75h8.5z"></path></svg> */}
                                            <p>Accountant</p>
                                        </div>
                                        <div className="xkwloxs654s25">
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Account Chart</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Journal</li>
                                        </div>

                                    </div>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired
};

export default Sidebar;
