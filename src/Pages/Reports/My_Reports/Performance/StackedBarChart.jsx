// StackedBarChart.js
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './StackedBarChart.scss';
import { RadialBarChart, RadialBar,  } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

// Sample data for Technical and Organizational charts
const technicalData = [
    { name: 'Efficiency', Expected: 12, Achieved: 8 },
    { name: 'Production Quality', Expected: 16, Achieved: 12 },
    { name: 'Presentation', Expected: 15, Achieved: 10 },
    { name: 'Marketing', Expected: 14, Achieved: 10 },
    { name: 'Administration', Expected: 18, Achieved: 12 },
    { name: 'Management', Expected: 6, Achieved: 1 },
];

const organizationalData = [
    { name: 'Leadership', Expected: 14, Achieved: 10 },
    { name: 'Teamwork', Expected: 18, Achieved: 13 },
    { name: 'Communication', Expected: 16, Achieved: 12 },
    { name: 'Strategy', Expected: 15, Achieved: 11 },
    { name: 'Problem Solving', Expected: 19, Achieved: 15 },
    { name: 'Adaptability', Expected: 17, Achieved: 13 },
];

const StackedBarChart = () => {
    const [activeTab, setActiveTab] = useState('Technical');

    const toggleTab = (tab) => {
        setActiveTab(tab);
    };

    const chartData = activeTab === 'Technical' ? technicalData : organizationalData;
    const data = [{ value: 80 }, { value: 20 }];
    const COLORS = ['#10AFE9', '#e0e0e0'];

    return (
        <div className='my_p_main'>
            <div className="chart-container_my">
                <div className="tab-switch_my">
                    <div>
                        <button
                            className={activeTab === 'Technical' ? 'active' : ''}
                            onClick={() => toggleTab('Technical')}
                        >
                            Technical
                        </button>
                        <button
                            className={activeTab === 'Organizational' ? 'active' : ''}
                            onClick={() => toggleTab('Organizational')}
                        >
                            Organizational
                        </button>
                    </div>
                    <div>
                        <div className="Excellent">
                            <div>
                                Overall Rating
                            </div>
                            <div className='excellent'>
                                Excellent
                            </div>
                        </div>
                    </div>
                </div>

                <div className="charts-wrapper_my">
                    <div className="chart-section_my">
                        {/* <h3>{activeTab} Chart</h3> */}
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}


                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Expected" stackId="a" fill="#0eaedf"
                                    barSize={40}
                                />
                                <Bar dataKey="Achieved" stackId="a" fill="#400f6f"
                                    barSize={40} radius={[10, 10, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="lable_chart_ResponsiveContainer">
                            <span className="Expected">
                                Expected Value
                            </span>
                            <span className="Achieved">
                                Achieved Value
                            </span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="average-performance">
                <h3>Average Performance</h3>
                <div className="score-gauge">
                    <PieChart width={300} height={300}>
                        <Pie
                            data={data}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={80}
                            outerRadius={130}
                            dataKey="value"
                            
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                    <div className="total-score">
                        <p>80</p>
                        <span>Total Score</span>
                    </div>
                </div>
                <div className="last-month-score">
                    <div className="icon">⚡</div>
                    <div className="score-details">
                        <p>75</p>
                        <span>Total Score In Last Month</span>
                    </div>
                </div>
            </div>
       </div>
    
    );
};

export default StackedBarChart;
