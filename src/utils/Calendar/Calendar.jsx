import React, { useState } from 'react';
import './Calendar.scss';

const Calendar = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Holidays with names
    const holidays = [
        { date: `${selectedYear}-10-02`, name: 'Gandhi Jayanti' },
        // { date: `${selectedYear}-10-20`, name: 'Karva Chauth' },
        { date: `${selectedYear}-10-31`, name: 'Diwali' }
    ];

    // Leaves with types
    const leaves = {
        [`${selectedYear}-10-03`]: 'Sick Leave',
        [`${selectedYear}-10-11`]: 'Casual Leave',
        [`${selectedYear}-10-19`]: 'Earned Leave',
        [`${selectedYear}-10-25`]: 'Maternity Leave',
        [`${selectedYear}-10-21`]: 'Paternity Leave'
    };

    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    // Check if a specific day is a holiday or leave and return the type
    const getDayType = (day) => {
        const dateKey = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const holiday = holidays.find(h => h.date === dateKey);
        const leave = leaves[dateKey];

        if (holiday) return { type: 'holiday', name: holiday.name };
        if (leave) return { type: 'leave', name: leave };

        const weekday = new Date(selectedYear, selectedMonth, day).getDay();
        return { type: weekday === 0 ? 'weekly-off' : 'workday' };
    };

    const handlePreviousMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDayOfMonth = getFirstDayOfMonth(selectedMonth, selectedYear);

    return (
        <div className='calendar_main'>
            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={handlePreviousMonth}>Previous Month</button>
                    <h2>{new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' })} {selectedYear}</h2>
                    <button onClick={handleNextMonth}>Next Month</button>
                </div>
                <div className="calendar-grid">
                    <div className="day-name">Sunday</div>
                    <div className="day-name">Monday</div>
                    <div className="day-name">Tuesday</div>
                    <div className="day-name">Wednesday</div>
                    <div className="day-name">Thursday</div>
                    <div className="day-name">Friday</div>
                    <div className="day-name">Saturday</div>

                    {/* Empty cells for days before the month starts */}
                    {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                        <div key={`empty-${index}`} className="empty-cell"></div>
                    ))}

                    {/* Displaying days in the current month */}
                    {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                        const day = dayIndex + 1;
                        const { type, name } = getDayType(day);
                        const leaveClass = type === 'leave' ? name.toLowerCase().replace(" ", "-") : '';
                        { console.log('lwwwww', leaveClass) }
                        return (
                            <div key={day} className={`day ${type}  ${leaveClass}`}>
                                <div className={`date `}>{day}</div>
                                <div className="event">
                                    {type === 'workday' &&
                                        <span className='workday'>
                                            <div className="dot"></div>
                                            Work Day
                                        </span>}
                                    {type === 'weekly-off' && <span className='weekly-off'>Weekly Off</span>}
                                    {type === 'holiday' &&
                                        <span className='holiday'>
                                            <div className="dot"></div>
                                            {' ' + name || 'Holiday'}
                                        </span>}

                                    {type === 'leave' && (
                                        <div className={`leave ${leaveClass}`}>
                                            <div className="dot"></div>
                                            {name}
                                        </div>
                                    )}
                                </div>
                            </div>

                        );
                    })}
                </div>
                <div className='colorTypeName'>
                    <div className='Holiday'>
                        <span className="dot"></span>
                        Holiday
                    </div>
                    <div className='sick'>
                        <span className="dot">

                        </span>

                        Sick Leave
                    </div>
                    <div className='casual'>
                        <span className="dot">

                        </span>

                        Casual Leave</div>
                    <div className='earned'>
                        <span className="dot">

                        </span>

                        Earned Leave</div>
                    <div className='maternity'>
                        <span className="dot">

                        </span>

                        Maternity Leave</div>
                    <div className='paternity'>
                        <span className="dot">

                        </span>

                        Paternity Leave
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Calendar;
