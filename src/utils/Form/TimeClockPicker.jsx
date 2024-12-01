import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const TimeClockPicker = ({ onTimeChange, initialTime, ampm = true, name = "", showOnlyMinutes = false, error = false, disabled = false, }) => {
    const timeFormat = ampm ? "hh:mm A" : "HH:mm";
    const [selectedTime, setSelectedTime] = useState(initialTime ? dayjs(initialTime, timeFormat) : null);

    useEffect(() => {
        if (initialTime) {
            const formattedTime = showOnlyMinutes ? dayjs().set('minute', initialTime).set('hour', 0) : dayjs(initialTime, timeFormat); 
            setSelectedTime(formattedTime);
        }
    }, [initialTime]);

    const handleTimeChange = (newTime) => {
        if (!newTime || !newTime.isValid()) return;

        let formattedValue;
        if (showOnlyMinutes) {
            // Extract and format only the minute value
            const minutes = newTime.minute();
            formattedValue = `${minutes}`; // Customize the display format as needed

            // Create a new dayjs object with only the minute updated
            const updatedTime = dayjs().set('minute', minutes).set('hour', 0); // Set hour to 0 for consistency
            
            setSelectedTime(updatedTime); // Immediately reflect the new minute in state
        } else {
            // Format the full time (hour and minute)
            formattedValue = newTime.format(timeFormat);
            setSelectedTime(newTime);
        }

        onTimeChange(name, formattedValue); // Pass the formatted value to the parent
    };


    return (
        <div className="dropdown-content date-h popHoloday" id='TimePicker' style={{ border: error ? "1px solid red" : "" }}>
            <div className='date_tittle'>
                <div className="title__show__d">
                    {selectedTime && selectedTime.isValid()
                        ? showOnlyMinutes
                            ? `${selectedTime.minute()} min` // Display only minutes when in minute-only mode
                            : selectedTime.format(timeFormat) // Display full time when in normal mode
                        : <span>{showOnlyMinutes ? 'Choose Minute' : 'Choose Time'}</span>}
                </div>
                <div className='date_icontimeLive'>
                    {/* <LivClockSVG size={27} setColor='grey' /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                        <circle cx="12" cy="13" r="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M5 19L3 21M19 19L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M19 3.5697L19.5955 3.27195C20.4408 2.84932 20.7583 2.89769 21.4303 3.5697C22.1023 4.2417 22.1507 4.55924 21.728 5.4045L21.4303 6M5 3.5697L4.4045 3.27195C3.55924 2.84932 3.2417 2.89769 2.5697 3.5697C1.89769 4.2417 1.84932 4.55924 2.27195 5.4045L2.5697 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M12 9.5V13.5L14 15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 3.5V2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 2H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box>
                    {/* <TimePicker
                            value={selectedTime}
                            onChange={handleTimeChange}
                            ampm={ampm}
                            // renderInput={(params) => <input {...params} />}
                        /> */}
                    <TimePicker
                        value={selectedTime}
                        onChange={handleTimeChange}
                        ampm={ampm}
                        minutesStep={1} // Ensures every minute option is displayed
                        views={showOnlyMinutes ? ['minutes'] : ['hours', 'minutes']} // Restricts view to minutes if required
                        openTo={showOnlyMinutes ? 'minutes' : 'hours'} // Opens directly to the minutes view
                        disabled={disabled}
                    />
                </Box>
            </LocalizationProvider>
        </div>
    );
};

export default TimeClockPicker;
