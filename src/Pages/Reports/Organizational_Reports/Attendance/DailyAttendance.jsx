import React, { useState, useEffect, PureComponent, useRef } from "react";
import { useNavigate } from 'react-router-dom'; // Add useNavigate here
import '../EmployeeInformation/dashboard/Dashboard.scss';
import { OutsideClick } from '../../../Employee_onboarding/AddEmployee/OutsideClick.jsx'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import user from '../../../../assets/user.png'
// Calculate totals
import './Attendance.scss'


import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

const SickLeaves = [
    { name: 'Remaining sick Leaves', value: 7, fill: '#BFB3CB' }, // Purple color
    { name: 'Sick Leaves Taken', value: 3, fill: '#400F6F' }, // Red color
];
const CasualLeaves = [
    { name: 'Remaining Casual Leaves', value: 8, fill: '#BFB3CB' }, // Purple color
    { name: 'Casual Leaves Taken', value: 8, fill: '#400F6F' }, // Red color
];
const EarnedLeaves = [
    { name: 'Remaining Earned Leaves', value: 5, fill: '#BFB3CB' }, // Purple color
    { name: 'Earned Leaves Taken', value: 2, fill: '#400F6F' }, // Red color
];



const DailyAttendance = () => {
    const { isOpen: isStatusOpen, ref: statusRef, buttonRef: statusButtonRef, handleToggle: toggleStatus, setIsOpen: setStatusOpen } = OutsideClick();
    const { isOpen: isFilterOpen, ref: filterRef, buttonRef: filterButtonRef, handleToggle: toggleFilter } = OutsideClick();
    const { isOpen: isFilterOpen2, ref: filterRef2, buttonRef: filterButtonRef2, handleToggle: toggleFilter2 } = OutsideClick();

    const totalRemaining = SickLeaves[0].value + CasualLeaves[0].value + EarnedLeaves[0].value; // 7 + 8 + 5
    const totalTaken = SickLeaves[1].value + CasualLeaves[1].value + EarnedLeaves[1].value; // 3 + 8 + 2
    const printRef = useRef();

    // Create TotalLeaves array
    const TotalLeaves = [
        { name: 'Present', value: 270, fill: '#400F6F' }, // Purple color 
        { name: 'Absent', value: 30, fill: '#765C8E' },
        { name: 'Half day', value: 15, fill: '#A18FB2' }, // Red color 
    ];

    const navigate = useNavigate(); // Use useNavigate here
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activetab, setActivetab] = useState('Daily Attendance Report');

    // Fixed subItems Array
    const subItems = ["Daily Attendance Report", "Employee Present/Absent Status", "Monthly Attendance"];

    // Log the subItems properly
    console.log('selectedIndex', selectedIndex)
    // Handling the Previous Button
    const handlePrevClick = () => {
        if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
        navigate(`/reports/organizational/${subItems[selectedIndex].toLowerCase().replace(/\s+/g, '-')}`);
    };

    // Handling the Next Button
    const handleNextClick = () => {
        if (selectedIndex < subItems.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
        navigate(`/reports/organizational/${subItems[selectedIndex].toLowerCase().replace(/\s+/g, '-')}`);
    };

    // Handle Active Class for Navigation
    const isActiveTab = (index) => selectedIndex === index ? 'active' : '';

    const currentURL = window.location.pathname;
    const newUrl = currentURL.split('/').slice(0, -1).join('/');

    const handleHomeClick = () => {
        navigate(newUrl); // Use navigate here instead of window.location.href
    };

    const handleDropdownClick = (index) => {
        navigate(`/reports/organizational/${subItems[index].toLowerCase().replace(/\s+/g, '-')}`);
        const handleDropdownClick = (index) => {
            navigate(`/reports/organizational/${subItems[index].toLowerCase().replace(/\s+/g, '-')}`);
            setActivetab(subItems[index]); // Set active tab
        };
    };
    // Custom legend rendering function
    const renderLegend = (props) => {
        return (
            <div className="custom_legend_at">
                {props.payload.map((entry, index) => (
                    <div className="custom-legend-item_att" key={`item-${index}`}>
                        <div
                            className="custom-legend-icon_1"
                            style={{ backgroundColor: entry.payload.fill }}
                        />
                        <span>{entry.payload.name} - {entry.payload.value}</span>
                    </div>
                ))}
            </div>
        );
    };
    const style = {
        // top: '50%',
        bottom: 0,
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
    };


    const handlePrint = async () => {
        // Take screenshot of the content
        const canvas = await html2canvas(printRef.current);
        const imgData = canvas.toDataURL('image/png');

        // PDF ko landscape orientation mein set karna
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Image ko add karo PDF mein, full width and height ke saath
        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 130);
        pdf.save("print_horizontal.pdf");
    };

    //
    const [selectedDate, setSelectedDate] = useState(null);
    console.log('selectedDate', selectedDate)
    const handleDateChange = (event) => {
        const date = new Date(event.target.value);
        // Format the date as yyyy/MM/dd
        const formattedDate = date.toLocaleDateString('en-CA'); // yyyy-mm-dd format
        setSelectedDate(formattedDate);
    };

    const [selectedDateFilter, setSelectedDateFilter] = useState(dayjs());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleDateChangeFilter = (newValue) => {
        setSelectedDateFilter(newValue);
        setIsDatePickerOpen(false); // Close picker after selecting date
    };

    const handlePreviousDate = () => {
        setSelectedDateFilter(prev => prev.subtract(1, 'day'));
    };

    const handleNextDate = () => {
        setSelectedDateFilter(prev => prev.add(1, 'day'));
    };

    const formattedDate = selectedDateFilter.format('DD - MMMM - YYYY'); // '26 of October of 2024'
    console.log(formattedDate);


       const punches = [
            { type: "Punch In", time: "09:05 AM" },
            { type: "Punch Out", time: "12:05 PM" },
            { type: "Punch In", time: "12:15 PM" },
            { type: "Punch Out", time: "01:00 PM" },
        ];


    return (
        <>
            {/* nav */}
            <div className="breadcrumb-container" >
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
                        onClick={toggleStatus} ref={statusButtonRef}
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
                            {isStatusOpen ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#4a4a4a" fill="none">
                                    <path d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#4a4a4a" fill="none">
                                    <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            }
                        </button>

                        {isStatusOpen && (
                            <div className="dropdown-menu- three_menu" ref={statusRef}>
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
            <h2 className="Overview_main_h2_title_att">Overview</h2>
            <div className="Overview_dashboard">
                <div className="Overview_dashboard">
                    <div className="Overview_box_dashboard">
                        <div className="Overview__dashboard ">
                            <p className="title_o">
                                TOTAL EMPLOYEES
                            </p>
                            <div className="hading_o">
                                <div className="flex-O-h">
                                    <span className="t-n-o">
                                        315
                                    </span>
                                    <span className="o-span-svg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#141b34" fill="none">
                                            <path d="M7.78256 17.1112C6.68218 17.743 3.79706 19.0331 5.55429 20.6474C6.41269 21.436 7.36872 22 8.57068 22H15.4293C16.6313 22 17.5873 21.436 18.4457 20.6474C20.2029 19.0331 17.3178 17.743 16.2174 17.1112C13.6371 15.6296 10.3629 15.6296 7.78256 17.1112Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15.5 10C15.5 11.933 13.933 13.5 12 13.5C10.067 13.5 8.5 11.933 8.5 10C8.5 8.067 10.067 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M2.854 16C2.30501 14.7664 2 13.401 2 11.9646C2 6.46129 6.47715 2 12 2C17.5228 2 22 6.46129 22 11.9646C22 13.401 21.695 14.7664 21.146 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="Overview_dashboard">
                    <div className="Overview_box_dashboard">
                        <div className="Overview__dashboard">
                            <p className="title_o">
                                TOTAL EMPLOYEES
                            </p>
                            <div className="hading_o">
                                <div className="flex-O-h">
                                    <span className="t-n-o">
                                        315
                                    </span>
                                    <span className="o-span-svg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#400f6f" fill="none">
                                            <path d="M13 16.7033C13 15.7854 13 15.3265 13.2034 14.9292C13.4067 14.5319 13.7859 14.2501 14.5442 13.6866L15.0442 13.315C16.2239 12.4383 16.8138 12 17.5 12C18.1862 12 18.7761 12.4383 19.9558 13.315L20.4558 13.6866C21.2141 14.2501 21.5933 14.5319 21.7966 14.9292C22 15.3265 22 15.7854 22 16.7033V18.1782C22 19.9798 22 20.8806 21.4142 21.4403C20.8284 22 19.8856 22 18 22H13V16.7033Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                            <path d="M18 12.0002V5C18 2.518 17.482 2 15 2H11C8.518 2 8 2.518 8 5V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <ellipse cx="3.5" cy="14" rx="1.5" ry="2" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M3.5 16V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M2 22H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M12 6H14M12 9H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M17.5 22L17.5 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="Overview_dashboard">
                    <div className="Overview_box_dashboard">
                        <div className="Overview__dashboard">
                            <p className="title_o">
                                TOTAL EMPLOYEES
                            </p>
                            <div className="hading_o">
                                <div className="flex-O-h">
                                    <span className="t-n-o">
                                        315
                                    </span>
                                    <span className="o-span-svg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#400f6f" fill="none">
                                            <path d="M10.2892 21.9614H9.39111C6.14261 21.9614 4.51836 21.9614 3.50918 20.9363C2.5 19.9111 2.5 18.2612 2.5 14.9614V9.96139C2.5 6.66156 2.5 5.01165 3.50918 3.98653C4.51836 2.9614 6.14261 2.9614 9.39111 2.9614H12.3444C15.5929 2.9614 17.4907 3.01658 18.5 4.04171C19.5092 5.06683 19.5 6.66156 19.5 9.96139V11.1478" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15.9453 2V4M10.9453 2V4M5.94531 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7 15H11M7 10H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path opacity="0.93" d="M20.7598 14.8785C19.8544 13.8641 19.3112 13.9245 18.7076 14.1056C18.2851 14.166 16.8365 15.8568 16.2329 16.3952C15.2419 17.3743 14.2464 18.3823 14.1807 18.5138C13.9931 18.8188 13.8186 19.3592 13.7341 19.963C13.5771 20.8688 13.3507 21.8885 13.6375 21.9759C13.9242 22.0632 14.7239 21.8954 15.6293 21.7625C16.2329 21.6538 16.6554 21.533 16.9572 21.3519C17.3797 21.0983 18.1644 20.2046 19.5164 18.8761C20.3644 17.9833 21.1823 17.3664 21.4238 16.7626C21.6652 15.8568 21.3031 15.3737 20.7598 14.8785Z" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="Overview_dashboard">
                    <div className="Overview_box_dashboard">
                        <div className="Overview__dashboard">
                            <p className="title_o">
                                TOTAL EMPLOYEES
                            </p>
                            <div className="hading_o">
                                <div className="flex-O-h">
                                    <span className="t-n-o">
                                        315
                                    </span>
                                    <span className="o-span-svg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#400f6f" fill="none">
                                            <path d="M5.77778 16C4.66596 16.6327 4 17.4385 4 18.3158C4 20.3505 7.58172 22 12 22C16.4183 22 20 20.3505 20 18.3158C20 17.4385 19.334 16.6327 18.2222 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M12.9981 7H11.0019C8.13196 7 6.19701 10.0691 7.32753 12.828C7.48501 13.2124 7.84633 13.4615 8.24612 13.4615H8.9491C9.18605 13.4615 9.39259 13.6302 9.45006 13.8706L10.3551 17.6567C10.5438 18.4462 11.222 19 12 19C12.778 19 13.4562 18.4462 13.6449 17.6567L14.5499 13.8706C14.6074 13.6302 14.814 13.4615 15.0509 13.4615H15.7539C16.1537 13.4615 16.515 13.2124 16.6725 12.828C17.803 10.0691 15.868 7 12.9981 7Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M14.5 4.5C14.5 5.88071 13.3807 7 12 7C10.6193 7 9.5 5.88071 9.5 4.5C9.5 3.11929 10.6193 2 12 2C13.3807 2 14.5 3.11929 14.5 4.5Z" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div className="att_Balance_second_title">
                <h3>Employees Attendance Status</h3>
                <div className="print_right_icon" onClick={handlePrint} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20" width="20" height="20" color="#4a4a4a" fill="none">
                        <path d="M7.35396 18C5.23084 18 4.16928 18 3.41349 17.5468C2.91953 17.2506 2.52158 16.8271 2.26475 16.3242C1.87179 15.5547 1.97742 14.5373 2.18868 12.5025C2.36503 10.8039 2.45321 9.95455 2.88684 9.33081C3.17153 8.92129 3.55659 8.58564 4.00797 8.35353C4.69548 8 5.58164 8 7.35396 8H16.646C18.4184 8 19.3045 8 19.992 8.35353C20.4434 8.58564 20.8285 8.92129 21.1132 9.33081C21.5468 9.95455 21.635 10.8039 21.8113 12.5025C22.0226 14.5373 22.1282 15.5547 21.7352 16.3242C21.4784 16.8271 21.0805 17.2506 20.5865 17.5468C19.8307 18 18.7692 18 16.646 18" stroke="currentColor" stroke-width="1.5" />
                        <path d="M17 8V6C17 4.11438 17 3.17157 16.4142 2.58579C15.8284 2 14.8856 2 13 2H11C9.11438 2 8.17157 2 7.58579 2.58579C7 3.17157 7 4.11438 7 6V8" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        <path d="M13.9887 16L10.0113 16C9.32602 16 8.98337 16 8.69183 16.1089C8.30311 16.254 7.97026 16.536 7.7462 16.9099C7.57815 17.1904 7.49505 17.5511 7.32884 18.2724C7.06913 19.3995 6.93928 19.963 7.02759 20.4149C7.14535 21.0174 7.51237 21.5274 8.02252 21.7974C8.40513 22 8.94052 22 10.0113 22L13.9887 22C15.0595 22 15.5949 22 15.9775 21.7974C16.4876 21.5274 16.8547 21.0174 16.9724 20.4149C17.0607 19.963 16.9309 19.3995 16.6712 18.2724C16.505 17.5511 16.4218 17.1904 16.2538 16.9099C16.0297 16.536 15.6969 16.254 15.3082 16.1089C15.0166 16 14.674 16 13.9887 16Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        <path d="M18 12H18.009" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    Print
                </div>
            </div>


            <div className="Att_CartPie" ref={printRef} style={{ marginBottom: '40px' }}>
                <div className="TotalLeaves_">
                    <div className="EmpOn_Second_Head">
                        <div id='' onClick={toggleFilter2} ref={filterButtonRef2}>

                        </div>
                        <div className='left_filter_p_l'>
                            <div className="date_left_filter">
                                <div className="date_picker_open">
                                    <div className={'date-filter__button'} onClick={handlePreviousDate}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9b9b9b" fill="none">
                                            <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="hidentPickdate">

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Box>
                                                <DesktopDatePicker
                                                    value={selectedDateFilter}
                                                    onChange={handleDateChangeFilter}
                                                    renderInput={() => null} // Hide input
                                                />
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9b9b9b" fill="none">
                                                    <path d="M18 2V4M6 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M3.5 8H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M3 8H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                            </Box>
                                        </LocalizationProvider>
                                    </div>

                                    <div className={'date-filter__button'} onClick={handleNextDate}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9b9b9b" fill="none">
                                            <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="selected-date-display">
                                    {formattedDate}
                                </div>
                            </div>
                        </div>
                        <div className="right">

                            <div className="filter divRight">
                                <div className='div_box' onClick={toggleFilter} ref={filterButtonRef}>
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


                            </div>
                        </div>

                    </div>
                    <div className="pieChart" >
                        <ResponsiveContainer>
                            <PieChart>
                                <Legend content={renderLegend} />
                                <Pie
                                    data={TotalLeaves}
                                    dataKey="value"
                                    isAnimationActive={false}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={140}
                                    innerRadius={40}
                                    label
                                >
                                    {TotalLeaves.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="Current_Day_Status" >
                    <h2>
                        Current Day Status
                    </h2>
                  
                    <div className="punch-timeline" >
                        <h3 className="punch-timeline__date">April 16, 2024</h3>
                        <div className="punch-timeline__entries">
                            {punches.map((punch, index) => (
                                <div className="punch-timeline__entry" key={index}>
                                    <div className="punch-timeline__icon">
                                        <i className="icon-placeholder"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#5d369f" fill="none">
                                            <path d="M17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.247 11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M16.8538 7.43306C16.8538 8.24714 16.1901 8.90709 15.3714 8.90709C14.5527 8.90709 13.889 8.24714 13.889 7.43306C13.889 6.61898 14.5527 5.95904 15.3714 5.95904C16.1901 5.95904 16.8538 6.61898 16.8538 7.43306Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        </svg></i>
                                        {/* Placeholder icon */}
                                    </div>
                                    <div className="punch-timeline__details">
                                        <span className="punch-timeline__type">{punch.type} at</span>
                                        <br />
                                        <span className="punch-timeline__time">{punch.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default DailyAttendance;