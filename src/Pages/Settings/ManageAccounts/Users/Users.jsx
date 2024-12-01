import { useEffect, useState } from 'react';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { HiUserPlus } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";
import { MdDateRange, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import './Project.scss';

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// import { OutsideClick } from '../../../components/OutSideClick.jsx';

import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OutsideClick } from '../../../Employee_onboarding/AddEmployee/OutsideClick';

import userImg from '../../../../assets/user.png';

const Users = () => {


    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activetab, setActivetab] = useState('All');

    // Fixed subItems Array
    const isActiveTab = (index) => selectedIndex === index ? 'active' : '';

    const [activeTab, setActiveTab] = useState('users');  // Default Tab
    const location = useLocation();

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const JobList = () => {
        navigate('/')
    }
    const subItems = ["All", "Login Enabled", "Login Disabled", "Employee Profiles"];

    const currentURL = window.location.pathname;

    let updatedURL = currentURL.replace(/^\/settings/, '');

    // Extract the first word from the URL
    let firstWord = updatedURL.split('/').filter(Boolean)[0];

    console.log('First Word:', firstWord);



    useEffect(() => {

        if (currentURL === '/settings') {
            return
        } else {
            setActiveTab(currentURL)
        }
    }, [currentURL]);

    const newUrl = currentURL.split('/').slice(0, -2).join('/');

    const handleHomeClick = () => {
        navigate(newUrl); // Use navigate here instead of window.location.href
    };
    const handleDropdownClick = (index) => {
        navigate(`/settings/manage-accounts/${subItems[index].toLowerCase().replace(/\s+/g, '-')}`);
        const handleDropdownClick = (index) => {
            navigate(`/settings/manage-accounts/${subItems[index].toLowerCase().replace(/\s+/g, '-')}`);
            setActivetab(subItems[index]); // Set active tab
        };
    };


    const handlePrevClick = () => {
        if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
        navigate(`/settings/manage-accounts/${subItems[selectedIndex].toLowerCase().replace(/\s+/g, '-')}`);
    };

    // Handling the Next Button
    const handleNextClick = () => {
        if (selectedIndex < subItems.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
        navigate(`/settings/manage-accounts/${subItems[selectedIndex].toLowerCase().replace(/\s+/g, '-')}`);
    };
    // 
    const jobs = useSelector((state) => state.job.jobs);
    // console.log('jobs', jobs)
    const { isOpen: isFilterOpen, ref: filterRef, buttonRef: filterButtonRef, handleToggle: toggleFilter } = OutsideClick();
    const { isOpen: isFilterOpen2, ref: filterRef2, buttonRef: filterButtonRef2, handleToggle: toggleFilter2 } = OutsideClick();
    const { isOpen: isFilterOpen3, ref: filterRef3, buttonRef: filterButtonRef3, handleToggle: toggleFilter3 } = OutsideClick();
    const { isOpen: isStatusOpen, ref: statusRef, buttonRef: statusButtonRef, handleToggle: toggleStatus, setIsOpen: setStatusOpen } = OutsideClick();

    // const { isOpen: isStatusOpen, ref: statusRef, buttonRef: statusButtonRef, handleToggle: toggleStatusDropdown } = OutsideClickStatus();
    const [conformStatus, setConformStatus] = useState(false);
    const [open, setOpen] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState(null);
    // alert(selectedFilter)
    console.log('states', selectedFilter)

    const filter_leftClose = (filterName) => {
        setSelectedFilter(filterName);
        setToggleLeft(false)
        // toggleFilter2()
    };

    const [employmentType, setEmploymentType] = useState(""); // State to store the selected employment type

    const handleEmploymentChange = (e) => {
        setEmploymentType(e.target.value); // Set the value of the selected radio button
    };
    // const filter_leftClose = (filterType) => {
    //     console.log(`${filterType} 👉`);
    //     setActiveFilter(filterType); // Set the active filter
    //     toggleFilter2()
    // };
    // 
    // 

    const [loading, setLoading] = useState(true);
    const [sms, setSms] = useState('')
    const [statusId, setStatusId] = useState('')
    const [statusNew, setStatusNew] = useState('')
    // 
    const [allDel, setAllDel] = useState(true);
    const [thisDel, setThisDel] = useState(false)
    const [toggleLeft, setToggleLeft] = useState(false)
    const [isOpen, setIsOpen] = useState(null);
    // 

    const [employees, setEmployees] = useState([
        { JobTitle: "Options", Department: "Navjot", Positions: "8-Feb-2024", ExperienceRequired: "28-Mar-2024", SkillsRequired: "Vishwas Patel", status: "Active", priority: "High", isChecked: false, AccountStatus: false },
        { JobTitle: "Options", Department: "Navjot", Positions: "8-Feb-2024", ExperienceRequired: "28-Mar-2024", SkillsRequired: "Vishwas Patel", status: "Inactive", priority: "Medium", isChecked: false, AccountStatus: false },
        { JobTitle: "Options", Department: "Navjot", Positions: "8-Feb-2024", ExperienceRequired: "28-Mar-2024", SkillsRequired: "Vishwas Patel", status: "Active", priority: "Low", isChecked: false, AccountStatus: true },

    ]);
    const [employees2, setEmployees2] = useState();

    useEffect(() => {
        // Employees ka data employees2 me set karna
        setEmployees2(employees);
    }, [employees]); // Jab bhi employees change hoga, yeh effect trigger hoga


    const DelThis = () => {
        setThisDel(!thisDel);

    }

    const toggleDropdown = (i) => {
        setIsOpen(prev => (prev == i ? null : i));
    };
    // console.log('isOpen', isOpen)


    // 

    const [filteredEmployees, setFilteredEmployees] = useState(employees);
    const [hidImport, setHidImport] = useState(true);
    const navigate = useNavigate()
 
    const [selectAll, setSelectAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedCount, setSelectedCount] = useState(0);

    // console.log('searchQuery', searchQuery)
    const changeStatus = (newStatus) => {
        const updatedEmployees = employees.map(emp => ({
            ...emp,
            status: emp.isChecked ? newStatus : emp.status
        }));
        setEmployees(updatedEmployees);
        setSelectedCount(0); // Reset selected count after status change
        setSelectAll(false); // Deselect all checkboxes
    };


    // console.log(selectedDepartment)

    const handleHidImport = () => {
        setHidImport(!hidImport);
        toggleFilter3()
    };
    // table select checkbox
    const handleSelectAll = () => {
        setAllDel(!allDel)
        const updatedEmployees = filteredEmployees.map(emp => ({
            ...emp,
            isChecked: !selectAll
        }));
        setFilteredEmployees(updatedEmployees);
        setSelectAll(!selectAll);
        const count = updatedEmployees.filter(emp => emp.isChecked).length;
        setSelectedCount(count);
    };

    const handleCheckboxChange = (index) => {
        const updatedEmployees = [...filteredEmployees];
        updatedEmployees[index].isChecked = !updatedEmployees[index].isChecked;
        setFilteredEmployees(updatedEmployees);
        const count = updatedEmployees.filter(emp => emp.isChecked).length;
        setSelectedCount(count);
    };
    // table select checkbox


    // page index active
    // Function to generate the pages to display

    const indexOfLastEmployee = currentPage * rowsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
    // 
    // setFilteredEmployees(currentEmployees)
    // setSurrentEmployees2(currentEmployees)
    // console.log('currentEmployees2', filteredEmployees)

    const generatePages = () => {
        let pages = [];

        // If total pages <= 5, show all pages
        if (totalPages <= 5) {
            pages = [...Array(totalPages).keys()].map(pageIndex => pageIndex + 1);
        }
        // If total pages > 5
        else {
            if (currentPage <= 3) {
                pages = [1, 2, 3, 4, 5];
            } else if (currentPage >= totalPages - 2) {
                pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        return pages;
    };

    // Function to handle page change
    const handlePageChange = (page) => {
        if (page !== '...') {
            setCurrentPage(page);
        }
    };
    // page index active
    // 

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const statuses = ['Active', 'Inactive'];


  
    


    
    const [showEmploymentType, setShowEmploymentType] = useState(false);
    const [showDepartment, setShowDepartment] = useState(false);
    const [showCustomDate, setShowCustomDate] = useState(false);
    const [showDateRange, setShowDateRange] = useState(false)

    const handleDateRangeClick = () => {
        setShowDateRange(!showDateRange)
        setShowCustomDate(false);
        setShowEmploymentType(false)
    }
    const handleCustomDateClick = () => {
        setShowCustomDate(!showCustomDate);
        setShowEmploymentType(false);
        setShowDepartment(false);
        setShowDateRange(false)
    };
  


    const handleEmploymentTypeClick = () => {
        setShowEmploymentType(!showEmploymentType);
        setShowCustomDate(false);
        setShowDepartment(false);
        setShowDateRange(false)
    };

    const handleDepartmentClick = () => {
        setShowDepartment(!showDepartment);
        setShowCustomDate(false);
        setShowEmploymentType(false);
    };

    const projectDetailsPage = () => {
        navigate('/project-details')
    }
    const NewJobPage = () => {
        navigate('/add-project')
    }

    const filter_left = () => {
        setToggleLeft(!toggleLeft)
    }
    // const filter_leftClose = () => {
    //     // setToggleLeft(false)
    //     toggleFilter2()
    // }
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name); // Set the file name in the state
        }
    };
    const [selectedDate, setSelectedDate] = useState(null);
    console.log('selectedDate', selectedDate)
    const handleDateChange = (event) => {
        const date = new Date(event.target.value);
        // Format the date as yyyy/MM/dd
        const formattedDate = date.toLocaleDateString('en-CA'); // yyyy-mm-dd format
        setSelectedDate(formattedDate);
    };


    const [selectedDepartmentId, setSelectedDepartmentId] = useState(''); // State to store selected department

    const handleDepartmentChange = (event) => {
        setSelectedDepartmentId(event.target.value); // Update state on radio button change
    };
    // H

    // console.log('updateId', statusId)
    // console.log('status', statusId)

    const UpdateStatusHndle = (id) => {
        setStatusId(id)
        setStatusOpen(false)
    }
    const handleEmploymentTypeChange = (event) => {
        setEmploymentType(event.target.value);
        console.log('Selected Employment Type:', event.target.value); // Debugging purpose
        // toggleFilter()
    };


    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    // Function to handle the date change and format it to yyyy/mm/dd
    const handleFromDateChange = (event) => {

        const date = new Date(event.target.value);
        // Format the date as yyyy/MM/dd
        const formattedDate = date.toLocaleDateString('en-CA'); // yyyy-mm-dd format
        setFromDate(formattedDate);
    };
    const handleToDateChange = (event) => {
        const date = new Date(event.target.value);
        // Format the date as yyyy/MM/dd
        const formattedDate = date.toLocaleDateString('en-CA'); // yyyy-mm-dd format
        setToDate(formattedDate);
    };
    // api get6 list
    const token = localStorage.getItem('access_token');

   
    let isRequestInProgress = false;

    const ConformOk = () => {
        setTimeout(() => {
            setOpen(false)
        }, 400);
        if (statusId && statusNew && !isRequestInProgress) {
            isRequestInProgress = true;  // Request start hone par flag true
            axios.post('https://hrms.dragnilifecare.in/public/api/jobopening/status/update', {
                job_id: statusId,
                job_status: statusNew
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // Success handling
                    setSms(`Status update successfully`);
                    toast.success('Status update successfully.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    if (response.data.success === true) {
                        // setShowAlert(true);
                        // setTimeout(() => {
                        //     setShowAlert(false);
                        // }, 4000);
                    }
                })
                .catch(error => {
                    // Error handling
                    toast.error('Status update Failed.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    console.error("Error fetching data: ", error);
                })
                .finally(() => {
                    // Request complete hone ke baad flag reset hoga
                    isRequestInProgress = false;
                });
        }
    }
    // Ensure all dependencies are added



    const handleStatusChange = (index, newStatus) => {
        setStatusNew(newStatus)
        console.log('status chenge:::', newStatus)
        const updatedEmployees = [...filteredEmployees];
        updatedEmployees[index].priority = newStatus;
        setFilteredEmployees(updatedEmployees);
        setIsOpen(null);
        // toast.info('Please Wait Status Updating...', {
        //     position: "top-right",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });
        setSms('')
        setOpen(true)
        setStatusOpen(false)
    };

    // const [activeFilter, setActiveFilter] = useState(null); // Track the active filter
    // const filterRef2 = useRef(null);
    const [togglNewAdd, setTogglNewAdd] = useState(false)
    const NewClick = () => {
        setTogglNewAdd(false);
    }
    const ClosePop = () => {
        setTogglNewAdd(true)
    };

    const handleChange = (index) => {
        // Create a copy of the employees array
        const updatedEmployees = [...employees];
        // Toggle the AccountStatus for the employee at the given index
        updatedEmployees[index].AccountStatus = !updatedEmployees[index].AccountStatus;
        // Update the state with the modified array
        setEmployees(updatedEmployees);
    };



    return (
        <div id='allEmp'>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="error"
            />
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                getPersistentElements={() => document.querySelectorAll(".Toastify")}
                backdrop={<div className="backdrop" />}
                className="dialog"
            >
                <DialogHeading className="heading">Are you sure?</DialogHeading>
                <p className="description">
                    You want to Update this Status
                </p>
                <div className="buttons">
                    <div onClick={ConformOk}>
                        <Button className="button">
                            Update
                        </Button>
                    </div>
                    <DialogDismiss className="button secondary">Cancel</DialogDismiss>
                </div>
            </Dialog>
            <div className="EmpOn_main_container EmpOn_main_container_border_b ">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            Manage accounts
                            {/* <p>{currentEmployees.length} total</p> */}
                        </h2>
                        <div className="Emp_Head_Right Emp_Head_Right_FLEX">
                            <div className="_div_navigation_top">
                                <div className="reports-page-main">
                                    <div className="tabs-container-button tabs-container-button_">
                                        <button
                                            className={`tab-button-swich ${currentURL === '/settings/manage-accounts/users' ? 'active-swich_' : (firstWord == 'users') ? 'active-swich' : ''}`}
                                            onClick={() => handleTabClick('users') + navigate('/settings/manage-accounts/users')}
                                        >
                                            Users
                                        </button>
                                        <button
                                            className={`tab-button-swich ${currentURL === '/settings/manage-accounts/organization-setup' ? 'active-swich_' : (firstWord == 'organization-setup') ? 'active-swich' : ''}`}
                                            onClick={() => handleTabClick('organization') + navigate('/settings/manage-accounts/organization-setup')}
                                        >
                                            Organization Setup
                                        </button>
                                    </div>
                                    <div className="">
                                    </div>
                                </div>
                            </div>
                            <div className="close_svg_icon" onClick={() => navigate('/settings')} >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#4a4a4a" fill="none">
                                    <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="breadcrumb-container">
                <div className="arrow_left_right">
                    {/* Disable Previous Button if at First Index */}
                    <span className={`arrow-btn ${selectedIndex === 0 ? 'disabled_' : ''}`} onClick={handlePrevClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                            <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                    {/* Disable Next Button if at Last Index */}
                    <span className={`arrow-btn ${selectedIndex === subItems.length - 1 ? 'disabled_' : ''}`} onClick={handleNextClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                            <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                </div>
                <div className="breadcrumb">
                    <div className="breadcrumb-item" onClick={handleHomeClick}>
                        <i className="icon-home"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#400f6f" fill="none">
                            <path d="M15.0002 17C14.2007 17.6224 13.1504 18 12.0002 18C10.8499 18 9.79971 17.6224 9.00018 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>
                        </i> Home
                    </div>
                    <span className="separator">/</span>
                    <div
                        className="breadcrumb-item dropdown-select"
                        onClick={toggleFilter2} ref={filterButtonRef2}
                    >
                        <button className="btn_option">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#400f6f" fill="none">
                                <path d="M7 17L7 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M12 17L12 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M17 17L17 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            </svg>
                            <span>
                                {activetab}
                            </span>
                            {isFilterOpen2 ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#4a4a4a" fill="none">
                                    <path d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#4a4a4a" fill="none">
                                    <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            }
                        </button>

                        {isFilterOpen2 && (
                            <div className="dropdown-menu-" ref={filterRef2}>
                                {subItems.map((item, index) => (
                                    <span key={index} className={isActiveTab(index)} onClick={() => {
                                        handleDropdownClick(index);
                                        setSelectedIndex(index); // Update selected index
                                    }}>
                                        {subItems[index]}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="EmpOn_main_container ">
                <div className="EmpOn_header ">
                    <div className="top-bar EmpOn_main_container_box_none">
                        <h2>
                            {/* <div className='span'><HiUserPlus /></div> */}
                            All Users
                            <p>{currentEmployees.length} total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp" onClick={NewJobPage}>
                                <p><span><IoMdAdd /></span>Add Shift</p>
                            </div>
                            <div className="filter divRight">
                                <div className='div_box_toggale' onClick={toggleFilter} ref={filterButtonRef}>
                                    {!isFilterOpen ?
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#400F6F" fill="none">
                                            <path d="M3 7H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M3 17H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M18 17L21 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15 7L21 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#400F6F" fill="none">
                                            <path d="M7 21L7 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M17 21L17 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M17 6L17 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7 9L7 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7 18C6.06812 18 5.60218 18 5.23463 17.8478C4.74458 17.6448 4.35523 17.2554 4.15224 16.7654C4 16.3978 4 15.9319 4 15C4 14.0681 4 13.6022 4.15224 13.2346C4.35523 12.7446 4.74458 12.3552 5.23463 12.1522C5.60218 12 6.06812 12 7 12C7.93188 12 8.39782 12 8.76537 12.1522C9.25542 12.3552 9.64477 12.7446 9.84776 13.2346C10 13.6022 10 14.0681 10 15C10 15.9319 10 16.3978 9.84776 16.7654C9.64477 17.2554 9.25542 17.6448 8.76537 17.8478C8.39782 18 7.93188 18 7 18Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M17 12C16.0681 12 15.6022 12 15.2346 11.8478C14.7446 11.6448 14.3552 11.2554 14.1522 10.7654C14 10.3978 14 9.93188 14 9C14 8.06812 14 7.60218 14.1522 7.23463C14.3552 6.74458 14.7446 6.35523 15.2346 6.15224C15.6022 6 16.0681 6 17 6C17.9319 6 18.3978 6 18.7654 6.15224C19.2554 6.35523 19.6448 6.74458 19.8478 7.23463C20 7.60218 20 8.06812 20 9C20 9.93188 20 10.3978 19.8478 10.7654C19.6448 11.2554 19.2554 11.6448 18.7654 11.8478C18.3978 12 17.9319 12 17 12Z" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    }
                                </div>

                                {isFilterOpen && (

                                    <div className="filter-container" ref={filterRef}>
                                        <div className="filter-options">

                                            <div className="filter-option" >
                                                <p onClick={handleCustomDateClick}>Custom Date {!showCustomDate ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
                                                {showCustomDate && (
                                                    <div className="dropdown-content date-h">
                                                        <div><span><MdDateRange /></span>{!selectedDate ? 'Select Custom date' : selectedDate} </div>
                                                        {/* <br /> */}
                                                        <input type="date" name="date" id="" onChange={handleDateChange} />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="filter-option">
                                                <p onClick={handleDateRangeClick}>Date Range  {!showDateRange ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
                                                {showDateRange && (
                                                    <div >
                                                        <label id='daterange-contener'>From</label>
                                                        <div className="dropdown-content date-h">
                                                            <div><span><MdDateRange /></span>{!fromDate ? 'Select Custom date' : fromDate} </div>
                                                            {/* <br /> */}
                                                            <input type="date" name="date" id="" onChange={handleFromDateChange} />
                                                        </div>
                                                        <label id='daterange-contener'>To</label>
                                                        <div className="dropdown-content date-h">
                                                            <div><span><MdDateRange /></span>{!toDate ? 'Select Custom date' : toDate} </div>
                                                            {/* <br /> */}
                                                            <input type="date" name="date" id="" onChange={handleToDateChange} />
                                                        </div>
                                                    </div>
                                                )}

                                            </div>


                                            <div className="filter-option">
                                                <p onClick={handleEmploymentTypeClick}>Employment Type {!showEmploymentType ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
                                                {showEmploymentType && (
                                                    <div className="dropdown-content">
                                                        <ul>
                                                            <li>
                                                                <input
                                                                    type="radio"
                                                                    id="All"
                                                                    name="employmentType"
                                                                    className="custom-radio"
                                                                    value=" "
                                                                    onChange={handleEmploymentTypeChange}
                                                                />
                                                                <label htmlFor="All">All</label>
                                                            </li>
                                                            <li>
                                                                <input
                                                                    type="radio"
                                                                    id="permanent"
                                                                    name="employmentType"
                                                                    className="custom-radio"
                                                                    value="Permanent"
                                                                    onChange={handleEmploymentTypeChange}
                                                                />
                                                                <label htmlFor="permanent">Permanent</label>
                                                            </li>
                                                            <li>
                                                                <input
                                                                    type="radio"
                                                                    id="contract"
                                                                    name="employmentType"
                                                                    className="custom-radio"
                                                                    value="Contract"
                                                                    onChange={handleEmploymentTypeChange}
                                                                />
                                                                <label htmlFor="contract">On Contract</label>
                                                            </li>
                                                            <li>
                                                                <input
                                                                    type="radio"
                                                                    id="intern"
                                                                    name="employmentType"
                                                                    className="custom-radio"
                                                                    value="Intern"
                                                                    onChange={handleEmploymentTypeChange}
                                                                />
                                                                <label htmlFor="intern">Intern</label>
                                                            </li>
                                                            <li>
                                                                <input
                                                                    type="radio"
                                                                    id="trainee"
                                                                    name="employmentType"
                                                                    className="custom-radio"
                                                                    value="Trainee"
                                                                    onChange={handleEmploymentTypeChange}
                                                                />
                                                                <label htmlFor="trainee">Trainee</label>
                                                            </li>

                                                        </ul>
                                                        {/* <p>Selected Employment Type: {employmentType}</p> Displaying selected value */}
                                                    </div>



                                                )}
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="menu_head" onClick={handleHidImport} ref={filterButtonRef3}>
                                <div className="div_top"><CiMenuKebab /></div>
                                <div className={`bottom_import ${!isFilterOpen3 ? 'bottom_import_hide' : ''}`} ref={filterRef3}>
                                    {fileName ? '' : <AiOutlineCloudUpload />}
                                    <input type="file" accept="image/*" onChange={handleFileChange} />
                                    {fileName ? fileName : 'import'}

                                </div>
                            </div>

                        </div>
                        <div className="_div">

                        </div>
                    </div>
                </div>
            </div>
            {/* Popup for selected employees */}
            {selectedCount > 0 && (
                <div className='select_poup_st' >
                    <div>
                        <select onChange={(e) => changeStatus(e.target.value)} className='select_s'>
                            <option>Change Account Status</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                        <span className='select_title'>   {selectedCount} Users Selected</span>
                    </div>
                    <button className='clg_X' onClick={() => setSelectedCount(0)} >✖</button>
                </div>
            )}
            <div className="allEmployeeList">
                {/* <div className="head">
                </div> */}
                <div className="employee-table">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                    {/* {!allDel &&
                                        <span id='deleteAll'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ff0000" fill="none">
                                                <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M9 11.7349H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M10.5 15.6543H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>
                                        </span>
                                    } */}
                                </th>
                                <th> <div>Basic Information
                                    <div className="short_ascending_designation">
                                        <div className='ascending'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#400f6f" fill="none">
                                                <path d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <div className='designation'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#400f6f" fill="none">
                                                <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div></th>
                                <th>Designation</th>
                                <th>Date of Joining</th>
                                <th>Employee Status</th>
                                <th>Account Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, index) => (
                                <tr key={index}  >
                                    <td>
                                        <input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} onClick={DelThis} />
                                        {/* {emp.isChecked &&
                                            <span id='deleteThis'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ff0000" fill="none">
                                                    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                    <path d="M9 11.7349H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                    <path d="M10.5 15.6543H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                    <path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                </svg>
                                            </span>
                                        } */}
                                    </td>
                                    <td className='td' onClick={projectDetailsPage}>
                                        <div className="img_title">
                                            <img src={userImg} alt="" />
                                            <div className="email_title">
                                                <h4 className="title_">
                                                    1-Akash Shinde
                                                </h4>
                                                <p>
                                                    Akash25shinde@gmail.com
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td onClick={projectDetailsPage}>Navjot Kaur</td>
                                    <td className='td' >28-Feb-2024</td>


                                    <td >
                                        <div className="status-dropdown" >
                                            <div key={index} className="status-container" >
                                                <div onClick={toggleStatus} ref={statusButtonRef}>
                                                    <div
                                                        className={` status-display  ${emp.status ? emp.status.toLowerCase().replace(' ', '-') : ''}`}
                                                        onClick={() => toggleDropdown(index)}
                                                    >
                                                        <span className={`  left_dot ${emp.status ? emp.status.toLowerCase().replace(' ', '-') : ''}`}></span>
                                                        <div onClick={() => {
                                                            UpdateStatusHndle(emp.id);
                                                        }}>
                                                            <div

                                                            >
                                                                {emp.status}
                                                            </div>
                                                            <div className="^wdown">
                                                                <MdOutlineKeyboardArrowDown />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {isStatusOpen &&
                                                    <>
                                                        {isOpen === index && (
                                                            <div>
                                                                <div className="status-options" ref={statusRef}>
                                                                    {
                                                                        statuses.map(status => (
                                                                            <div
                                                                                key={status}
                                                                                className="status-option"
                                                                                onClick={() => {
                                                                                    handleStatusChange(index, status)
                                                                                }
                                                                                }
                                                                            >
                                                                                {status} 
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </td>
                                    <td className='td ' >
                                        <div className='center_tddd'>
                                            <label className="switch_">
                                                <input
                                                    type="checkbox"
                                                    id="status"
                                                    className='checkbock'
                                                    checked={emp.AccountStatus}
                                                    onChange={() => handleChange(index)}
                                                    required
                                                />
                                                <span className="slider_ round"></span>
                                            </label>
                                            <label className='lable_true_fallse'>
                                                {emp.AccountStatus == true ?
                                                    <span className='Login_Enabled'>
                                                        Login Enabled
                                                    </span>
                                                    :
                                                    <span className='Login_Disabled'>
                                                        Login Disabled
                                                    </span>
                                                }
                                            </label>
                                        </div>
                                    </td>
                                    <td className='td' >
                                        <div className="action_edit_delete">
                                            <div className="action_edit">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#4a4a4a" fill="none">
                                                    <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M11 20H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                </svg>
                                            </div>
                                            <div className="action_delete">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#d0021b" fill="none">
                                                    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                    <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* {loading ? (
                        <div id='Loading'>
                            <img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="" />
                        </div> // Show loading text or spinner when data is being fetched
                    ) : ('')}
                    {loading ? '' : employees == '' ? (
                        <div className="not-found-container">
                            <img src="https://cdn.dribbble.com/userupload/11708150/file/original-825be68b3517931ad747e0180a4116d3.png?resize=1200x900" alt="" />
                            <h1 className="grey-text">No matching records found</h1>
                            <p className="grey-text">Sorry, we couldn't find the data you're looking for.</p>
                        </div>
                    ) : ('')} */}
                </div>
                <div className="pagination">
                    <div className="rows-per-page">
                        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={30}>30 per page</option>
                            <option value={50}>50 per page</option>
                            <option value={70}>70 per page</option>
                            <option value={100}>100 per page</option>
                        </select>
                    </div>
                    <div className="page-navigation">
                        <div className="page-numbers">
                            {[...Array(totalPages)].map((_, pageIndex) => (
                                <button
                                    key={pageIndex + 1}
                                    className={currentPage === pageIndex + 1 ? 'activePageIndex' : ''}
                                    onClick={() => handlePageChange(pageIndex + 1)}
                                >
                                    {pageIndex + 1}
                                    {/* {console.log('currentPage', pageIndex + 1)} */}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}> <FaAngleLeft /></button>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}><FaAngleRight /></button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Users;
// 