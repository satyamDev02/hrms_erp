import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import { OutsideClick } from "./OutsideClick";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import './DatePicker.scss'
const DatePicker = ({ setSearchTrigger, dateRange, setDateRange, setSpecificDate, setClearFilter, section, resetPageIfNeeded }) => {

  const [pendingDateRange, setPendingDateRange] = useState(dateRange);
  const filterDateDropdown = OutsideClick();
  // Function to handle date range change
  const handleDateRangeChange = (ranges) => {
    setPendingDateRange([ranges.selection]); // Update the pending date range state
  };

  const dateRangeFilterButton = document?.getElementById("dateRangeFilterButton");
  const handleApplyDateFilter = () => {
    setDateRange(pendingDateRange); // Apply the pending date range
    const { startDate, endDate } = pendingDateRange[0];
    if (startDate?.toDateString() === endDate?.toDateString()) {
      setSpecificDate(startDate);

    } else {
      setSpecificDate(null);
    }
    dateRangeFilterButton?.classList.add("filter-applied");
    setClearFilter(false);
    resetPageIfNeeded();
    setSearchTrigger(prev => prev + 1); // Trigger the API call
    filterDateDropdown.handleToggle();
  };

  const handleClearDatePicker = () => {
    const dateRangeFilterButton = document?.getElementById("dateRangeFilterButton");
    setDateRange([
      {
        startDate: null, // Clear the start date (or set to null)
        endDate: null,   // Clear the end date (or set to null)
        key: "selection",
      },
    ]);

    setSpecificDate(null);
    setPendingDateRange([
      {
        startDate: new Date(), // Reset pending to default if needed
        endDate: new Date(),
        key: "selection",
      },
    ]);
    dateRangeFilterButton?.classList.remove("filter-applied");
    setClearFilter(true); // Indicate filter is cleared
    resetPageIfNeeded();
    setSearchTrigger(prev => prev + 1);// Trigger the API or refresh call
    filterDateDropdown.handleToggle(); // Close the dropdown if needed
  };

  useEffect(() => {
    dateRangeFilterButton?.classList.remove("filter-applied");
    handleClearDatePicker();
    filterDateDropdown.handleToggle();
  }, [section])

  return (
    <div className="maincontainmiainx1">
      <div
        data-tooltip-content="Date Filter"
        data-tooltip-id="my-tooltip"
        data-tooltip-place="bottom"
        className="filtersorticos5w"
        id="dateRangeFilterButton"
        onClick={filterDateDropdown?.handleToggle}
        ref={filterDateDropdown?.buttonRef}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#6b6b6b" fill="none"><path d="M18 2V4M6 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.5 8H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 8H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

      </div>

      {filterDateDropdown?.isOpen && (
        <div className="dropdowncontentofx35" ref={filterDateDropdown.ref}>

          <DateRangePicker
            ranges={pendingDateRange || [{
              startDate: new Date(),
              endDate: new Date(),
              key: "selection",
            }]}
            onChange={handleDateRangeChange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            
          />
          <button className="buttonofapplyfilter" onClick={handleApplyDateFilter}>Apply Sort</button>
          <button className="buttonofclerfilter" onClick={handleClearDatePicker}>Clear</button>

        </div>
      )}

    </div>
  );
};

export default DatePicker;