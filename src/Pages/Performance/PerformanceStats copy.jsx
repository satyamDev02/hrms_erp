import React from "react";

const technicalData = [
    { name: "Customer Experience", Expected: "Intermediate", Achieved: "Expert" },
    { name: "Marketing", Expected: "Expert", Achieved: "Advanced" },
    { name: "Management", Expected: "Advanced", Achieved: "Intermediate" },
    { name: "Administration", Expected: "Expert", Achieved: "Advanced" },
    { name: "Presentation", Expected: "Expert", Achieved: "Expert" },
    { name: "Production Quality", Expected: "Advanced", Achieved: "Intermediate" },
    { name: "Efficiency", Expected: "Expert", Achieved: "Advanced" },
];

const organizationalData = [
    { name: "Integrity", Expected: "Advanced", Achieved: "Intermediate" },
    { name: "Professionalism", Expected: "Expert", Achieved: "Advanced" },
    { name: "Team Work", Expected: "Expert", Achieved: "Expert" },
    { name: "Critical Thinking", Expected: "Advanced", Achieved: "Expert" },
    { name: "Conflict Management", Expected: "Intermediate", Achieved: "Advanced" },
    { name: "Attendance", Expected: "Advanced", Achieved: "Intermediate" },
    { name: "Ability to meet Deadlines", Expected: "Expert", Achieved: "Beginner" },
];

const levelMapping = {
    "Beginner": 25,
    "Intermediate": 50,
    "Advanced": 70,
    "Expert": 95
};

const getLevelValue = (level) => levelMapping[level] || 0;

// Function to calculate the average of Achieved values
const calculateAverageAchieved = (data) => {
    const totalAchieved = data.reduce((sum, item) => sum + getLevelValue(item.Achieved), 0);  // Convert Achieved to numeric value
    return totalAchieved / data.length;
};

// Function to calculate the overall performance level based on averages
const getOverallPerformanceLevel = (technicalData, organizationalData) => {
    // Calculate average achieved value for each category
    const technicalAverage = calculateAverageAchieved(technicalData);
    const organizationalAverage = calculateAverageAchieved(organizationalData);

    // Calculate total average by taking the average of the two categories
    const totalAverage = (technicalAverage + organizationalAverage) / 2;

    // Return the overall performance level based on the total average
    return getPerformanceLevel(totalAverage);
};

const getPerformanceLevel = (value) => {
    if (value >= levelMapping["Expert"]) {
        return "Expert";
    } else if (value >= levelMapping["Advanced"]) {
        return "Advanced";
    } else if (value >= levelMapping["Intermediate"]) {
        return "Intermediate";
    } else {
        return "Beginner";
    }
};

const overallPerformance = getOverallPerformanceLevel(technicalData, organizationalData);
console.log(`Overall Performance Level: ${overallPerformance}`);

export { overallPerformance };

const PerformanceStats = ({ apiData }) => {
    console.log('apiData technical', apiData.technical)
    console.log('apiData organisation', apiData.organisation)
    return (
        <div className="main_performance_stats">
            <div className="header_stats">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#4b0986" fill="none">
                        <path d="M6.5 17.5L6.5 14.5M11.5 17.5L11.5 8.5M16.5 17.5V13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M21.5 5.5C21.5 7.15685 20.1569 8.5 18.5 8.5C16.8431 8.5 15.5 7.15685 15.5 5.5C15.5 3.84315 16.8431 2.5 18.5 2.5C20.1569 2.5 21.5 3.84315 21.5 5.5Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M21.4955 11C21.4955 11 21.5 11.3395 21.5 12C21.5 16.4784 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4784 2.5 12C2.5 7.52169 2.5 5.28252 3.89124 3.89127C5.28249 2.50003 7.52166 2.50003 12 2.50003L13 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
                Performance Stats
            </div>

            <div className="performance_stats">
                <div className="stats-grid">
                    {/* Technical Stats */}
                    <div className="stats-column">
                        <div className="column-title">Technical Stats</div>
                        <div className="title_info">
                            <div>Competencies</div>
                            <div>Statistics</div>
                        </div>
                        <div className="stats-list">
                            {technicalData.map((item, index) => (
                                <div className="stats-item" key={index}>
                                    <div className="competency">{item.name}</div>
                                    <div className="bar-container">
                                        <div
                                            className="bar expected-bar"
                                            style={{ width: `${getLevelValue(item.Expected)}%` }}
                                        >
                                            <div className="tooltip_1 tooltip_Expected">Expected Value: {item.Expected}</div>
                                        </div>
                                        <div
                                            className="bar achieved-bar"
                                            style={{ width: `${getLevelValue(item.Achieved)}%` }}
                                        >
                                            <div className="tooltip_1 tooltip_Achieved">Achieved Value: {item.Achieved}</div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                        <div className="legend">
                            <div className="legend-item">
                                <span className="legend-color expected"></span> Expected Value
                            </div>
                            <div className="legend-item">
                                <span className="legend-color achieved"></span> Achieved Value
                            </div>
                        </div>
                    </div>

                    {/* Organizational Stats */}
                    <div className="stats-column">
                        <div className="column-title">Organizational Stats</div>
                        <div className="title_info">
                            <div>Competencies</div>
                            <div>Statistics</div>
                        </div>
                        <div className="stats-list">
                            {organizationalData.map((item, index) => (
                                <div className="stats-item" key={index}>
                                    <div className="competency">{item.name}</div>
                                    <div className="bar-container">
                                        <div
                                            className="bar expected-bar"
                                            style={{ width: `${getLevelValue(item.Expected)}%` }}
                                        >
                                            <div className="tooltip_1 tooltip_Expected">Expected Value: {item.Expected}</div>
                                        </div>
                                        <div
                                            className="bar achieved-bar"
                                            style={{ width: `${getLevelValue(item.Achieved)}%` }}
                                        >
                                            <div className="tooltip_1 tooltip_Achieved">Achieved Value: {item.Achieved}</div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                        <div className="legend">
                            <div className="legend-item">
                                <span className="legend-color expected"></span> Expected Value
                            </div>
                            <div className="legend-item">
                                <span className="legend-color achieved"></span> Achieved Value
                            </div>
                        </div>
                    </div>

                </div>

                {/* Legend */}


            </div>
            <div className="skill_types">
                <div className="title:">Experience Value:</div>
                <p>Beginner</p>
                <p>Intermediate</p>
                <p>Advanced</p>
                <p>Expert</p>
            </div>
        </div>

    );
};

export default PerformanceStats;
