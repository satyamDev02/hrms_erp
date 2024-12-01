import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'; // Add useNavigate here
import '../EmployeeInformation/dashboard/Dashboard.scss';
import { OutsideClick } from '../../../Employee_onboarding/AddEmployee/OutsideClick.jsx'

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import user from '../../../../assets/user.png'

const LeaveTypeSummary = () => {
    const { isOpen: isStatusOpen, ref: statusRef, buttonRef: statusButtonRef, handleToggle: toggleStatus, setIsOpen: setStatusOpen } = OutsideClick();


    const navigate = useNavigate(); // Use useNavigate here
    const [selectedIndex, setSelectedIndex] = useState(3);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activetab, setActivetab] = useState('Leave Type Summary');

    // Fixed subItems Array
    const subItems = ["Daily Leave Status", "Resource Availability", "Leave Balance", "Leave Type Summary"];

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
    const [employees, setEmployees] = useState([
        { JobTitle: "Options", Department: "Navjot", Positions: "8-Feb-2024", ExperienceRequired: "28-Mar-2024", SkillsRequired: "Vishwas Patel", status: "Ongoing", priority: "Sick Leave", isChecked: false },
        { JobTitle: "Options", Department: "Navjot", Positions: "8-Feb-2024", ExperienceRequired: "28-Mar-2024", SkillsRequired: "Vishwas Patel", status: "Completed", priority: "Casual Leave", isChecked: false },
        { JobTitle: "Options", Department: "Navjot", Positions: "8-Feb-2024", ExperienceRequired: "28-Mar-2024", SkillsRequired: "Vishwas Patel", status: "On Hold", priority: "Earned Leave", isChecked: false },


        // { JobTitle: "Cloud Architect", Department: "Customer Success", Positions: "10", ExperienceRequired: "01 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Draft", isChecked: false },
        // { JobTitle: "Software Engineer", Department: "Office Administration", Positions: "10", ExperienceRequired: "03 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "On hold", isChecked: false },
        // { JobTitle: "IT Auditor", Department: "Operations", Positions: "10", ExperienceRequired: "07 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Cancelled", isChecked: false },
        // { JobTitle: "Technical Writer", Department: "Executive Management", Positions: "10", ExperienceRequired: "02 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "On hold", isChecked: false },
        // { JobTitle: "UI/UX Designer", Department: "Product", Positions: "10", ExperienceRequired: "2.6 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Filled", isChecked: false },
        // { JobTitle: "Database Administrator", Department: "UX", Positions: "10", ExperienceRequired: "03 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Filled", isChecked: false },
        // { JobTitle: "Network Administrator", Department: "Finance", Positions: "10", ExperienceRequired: "03 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Open", isChecked: false },
        // { JobTitle: "QA Engineer", Department: "Sales", Positions: "10", ExperienceRequired: "01 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Open", isChecked: false },
    ]);
    const printRef = useRef();

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

    return (
        <>
            {/* nav */}
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
                            <div className="dropdown-menu-" ref={statusRef}>
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
            <div className="_Leave_Balance_second_title">
                <h3>Employee Leave Balance</h3>
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
            <div className="_Leave_Balance_second_title _Leave_Balance_second_title_2">
                <div className="print_right_icon print_right_icon_3" >
                    Casual Leave
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#4a4a4a" fill="none">
                        <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </div>
                <div className="print_right_icon" >
                    Filter
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#4a4a4a" fill="none">
                        <path d="M3 7H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3 17H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18 17L21 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15 7L21 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" stroke="currentColor" stroke-width="1.5" />
                    </svg>

                </div>
            </div>
            <div className="allEmployeeList ">
                <div className="employee-table ">
                    <table>
                        <thead>
                            <tr>
                                <th><div>Employee Name</div></th>
                                <th>Opening Balance</th>
                                <th>Granted</th>
                                <th>Booked</th>
                                <th>Date</th>
                                <th>Closing Balance</th>
                                <th>Lapsed</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp, index) => (
                                <tr key={index}  >
                                    <td> Navjot Kaur</td>
                                    <td>
                                        N/A
                                    </td>
                                    <td className='td' >N/A</td>
                                    <td >N/A</td>
                                    <td className='td' >N/A</td>
                                    <td className='td' >N/A</td>
                                    <td className='td' >N/A</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
            <div id="bottom_m_l">
            </div>
        </>
    );
};

export default LeaveTypeSummary;