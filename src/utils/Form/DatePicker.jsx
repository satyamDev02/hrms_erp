import React, { useEffect, useState } from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DatePicker = ({ label, onDateChange, initialDate, type, error = false, required = false, restrict= false }) => {
    const [parsedDate, setParsedDate] = useState(initialDate ? dayjs(initialDate, 'DD-MM-YYYY') : null);

    useEffect(() => {
        // Parse and validate initialDate on load or whenever it changes
        if (initialDate) {
            const parsed = dayjs(initialDate, 'DD-MM-YYYY', true); // Strict parsing
            if (parsed.isValid()) {
                setParsedDate(parsed);
            } else {
                setParsedDate(null);
                toast.error("Invalid initial date format!");
            }
        }
    }, [initialDate]);

    const handleDateChange = (newDate) => {
        const formattedDate = dayjs(newDate).format('DD-MM-YYYY');
        const parsed = dayjs(formattedDate, 'DD-MM-YYYY', true); // Strict parsing
        if (!parsed.isValid()) {
            toast.error("Invalid date format!");
            return;
        }
        if (type === "date_of_birth") {
            const currentDate = dayjs();
            const age = currentDate.diff(newDate, 'year');
            if (age < 18) {
                toast.error("Age should be 18 or above!");
                return;
            }
        }
        onDateChange(type, formattedDate); // Pass the formatted date to the parent
    };

    return (
        <div className="form-group grupdate2">
            <label>
                {label}
                {required && <b className="color_red">*</b>}
            </label>
            <div className="dropdown-content date-h popHoloday" style={{ border: error ? '1px solid red' : '' }}>
                <div className="date_tittle">
                    <div className="title__show__d">
                        {!parsedDate ? <span>Choose {label}</span> : parsedDate.format('DD-MM-YYYY')}
                    </div>
                    <div className="date_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                            <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3.5 8H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box>
                        <DemoItem>
                            <DesktopDatePicker
                                value={parsedDate || null}
                                onChange={handleDateChange}
                                minDate={restrict ? dayjs() : null} // Restricts dates to today or later
                                inputFormat="DD-MM-YYYY"
                                renderInput={(params) => <input {...params} />}
                            />
                        </DemoItem>
                    </Box>
                </LocalizationProvider>
            </div>
        </div>
    );
};

export default DatePicker;
