import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Add useNavigate here
import { OutsideClick } from '../../../../Employee_onboarding/AddEmployee/OutsideClick'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { PieChart } from '@mui/x-charts/PieChart';
import { DepartmentSummary, DesignationSummary, EmployeeAdditionTrend, GenderSummary, AgeGroupSummary, valueFormatter } from '../../../../../utils/Chart/webUsageStats';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import {
    LinePlot,
    MarkPlot,
    lineElementClasses,
    markElementClasses,
} from '@mui/x-charts/LineChart';



const Addition_Trend = () => {
    const { isOpen: isStatusOpen, ref: statusRef, buttonRef: statusButtonRef, handleToggle: toggleStatus, setIsOpen: setStatusOpen } = OutsideClick();


    const navigate = useNavigate(); // Use useNavigate here
    const [selectedIndex, setSelectedIndex] = useState(2);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activetab, setActivetab] = useState('Employee Addition Trend');

    // Fixed subItems Array
    const subItems = ["Dashboard", "Employee Attrition Trend", "Employee Addition Trend", "Headcount"];

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

    const [selectedData, setSelectedData] = useState(DesignationSummary);

    // Update chart data on hover
    const handleHover = (label) => {
        const filteredData = DesignationSummary.filter(item => item.label === label);
        setSelectedData(filteredData);
    };
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Update the width on window resize
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    const [timeRange, setTimeRange] = useState('1y'); // '1y' for 1 year, '6m' for 6 months, '1m' for month
    const [selectedMonth, setSelectedMonth] = useState(null); // month ke liye

    const filterData = () => {
        if (timeRange === '1y') {
            return EmployeeAdditionTrend.slice(0, 12); // last 12 months ka data
        } else if (timeRange === '6m') {
            return EmployeeAdditionTrend.slice(0, 6); // last 6 months ka data
        } else if (timeRange === '3m') {
            return EmployeeAdditionTrend.slice(0, 3); // last 6 months ka data
        } else if (timeRange === '1m' && selectedMonth) {
            return EmployeeAdditionTrend.filter(item => item.label === selectedMonth); // specific month ka data
        }
        return EmployeeAdditionTrend; // default all data
    };

    const filteredData = filterData();

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

            {/* chart */}
            <div id="cart_d">
                <Box sx={{
                    width: { lg: '108%', md: '108%%' },
                    padding: '0px', scale: '0.9', marginLeft: '-60px',
                    overflow: 'hidden'
                }}>
                    <Grid container spacing={1}>
                        {/* 1st Chart */}
                        {/* <div className="grid_card"> */}
                        <Grid xs={12} sm={12} md={12} lg={12} sx={{
                            margin: '20px',
                            border: '1px solid #ddd', // Optional border for better visibility
                            borderRadius: '12px', // Rounded corners
                            backgroundColor: '#f9f9f9', // Background color
                        }}  >
                            <div className="cart_head_">
                                <div className="l_title">
                                    Employee Addition Trend
                                </div>
                                <div className="btn_r_Export">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#141b34" fill="none">
                                        <path d="M17.4776 9.01106C17.485 9.01102 17.4925 9.01101 17.5 9.01101C19.9853 9.01101 22 11.0294 22 13.5193C22 15.8398 20.25 17.7508 18 18M17.4776 9.01106C17.4924 8.84606 17.5 8.67896 17.5 8.51009C17.5 5.46695 15.0376 3 12 3C9.12324 3 6.76233 5.21267 6.52042 8.03192M17.4776 9.01106C17.3753 10.1476 16.9286 11.1846 16.2428 12.0165M6.52042 8.03192C3.98398 8.27373 2 10.4139 2 13.0183C2 15.4417 3.71776 17.4632 6 17.9273M6.52042 8.03192C6.67826 8.01687 6.83823 8.00917 7 8.00917C8.12582 8.00917 9.16474 8.38194 10.0005 9.01101" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 13L12 21M12 13C11.2998 13 9.99153 14.9943 9.5 15.5M12 13C12.7002 13 14.0085 14.9943 14.5 15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span>
                                        Export
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9b9b9b" fill="none">
                                        <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',

                                    width: '100%',
                                }}
                            >

                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div className="custom-dropdown__">
                                        <div>
                                        </div>
                                        <div>
                                            <select onChange={(e) => setTimeRange(e.target.value)} value={timeRange}>
                                                <option value="1y">This Year</option>
                                                <option value="6m">Last Six Months</option>
                                                <option value="3m">Last Three Months</option>
                                                <option value="1m">Custom</option>
                                            </select>
                                        </div>
                                        {timeRange === '1m' && (
                                            <select onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth} className="month-selector">
                                                {EmployeeAdditionTrend.map((item, index) => (
                                                    <option key={index} value={item.label}>{item.label}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>

                                    {/* Line Chart Container */}
                                    <ChartContainer
                                        width={screenWidth - 100}
                                        height={450}
                                        series={[{ type: 'line', data: filteredData.map(item => item.value) }]}
                                        xAxis={[{ scaleType: 'band', data: filteredData.map(item => item.label) }]}
                                        sx={{
                                            [`& .${lineElementClasses.root}`]: {
                                                stroke: '#400F6F',
                                                strokeWidth: 1,
                                            },
                                            [`& .${markElementClasses.root}`]: {
                                                stroke: '#400F6F',
                                                scale: '0.5',
                                                fill: '#400F6F',
                                                strokeWidth: 12,
                                            },
                                            marginBottom: '-410px',
                                            marginLeft: '36px',
                                            zIndex: '0'
                                        }}
                                        disableAxisListener
                                    >
                                        <LinePlot />
                                        <MarkPlot />
                                    </ChartContainer>

                                    {/* Bar Chart */}
                                    <BarChart
                                        style={{ width: '100%' }}
                                        sx={{
                                            borderRadius: '10px',
                                            padding: '10px',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        }}
                                        height={400}
                                        series={[
                                            {
                                                data: filteredData.map(item => item.value),
                                            }
                                        ]}
                                        borderRadius={10}
                                        xAxis={[{
                                            data: filteredData.map(item => item.label),
                                            scaleType: 'band',
                                            tickPlacement: 'middle',
                                            dataKey: 'month'
                                        }]}
                                    />
                                    <div className="lable_chart_">
                                        <span className="s_count">
                                            Count
                                        </span>
                                        <span className="s_Percentage">
                                            Percentage
                                        </span>
                                    </div>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </div>

        </>
    );
};

export default Addition_Trend;