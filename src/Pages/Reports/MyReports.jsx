import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportsPage.scss'; // Import the SCSS file
import user from '../../assets/repot/user.png'
import goal from '../../assets/repot/goal.png'
import Performance from '../../assets/repot/Performance.png'
import clock from '../../assets/repot/clock.png'
import date from '../../assets/repot/date.png'

 export const MyData = [
  
    {
        left: [
            {
                name: 'Leave Tracker',
                description: 'Lorem ipsum dolor sit amet consectetur. Diam aliquam proin vitae lorem eget. Odio non id dui viverra dictum venenatis orci.',
                img: date,
            },
        ],
        right: [
            {
                buttonText: 'Daily Leave Status',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
            {
                buttonText: 'Resource Availability',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M2 7C2 5.59987 2 4.8998 2.27248 4.36502C2.51217 3.89462 2.89462 3.51217 3.36502 3.27248C3.8998 3 4.59987 3 6 3C7.40013 3 8.1002 3 8.63498 3.27248C9.10538 3.51217 9.48783 3.89462 9.72752 4.36502C10 4.8998 10 5.59987 10 7V17C10 18.4001 10 19.1002 9.72752 19.635C9.48783 20.1054 9.10538 20.4878 8.63498 20.7275C8.1002 21 7.40013 21 6 21C4.59987 21 3.8998 21 3.36502 20.7275C2.89462 20.4878 2.51217 20.1054 2.27248 19.635C2 19.1002 2 18.4001 2 17V7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 17H6.00898" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2 7H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.4486 8.26843C11.0937 6.93838 10.9163 6.27336 11.0385 5.69599C11.146 5.18812 11.4108 4.72747 11.7951 4.38005C12.2319 3.98508 12.8942 3.80689 14.2187 3.4505C15.5432 3.09412 16.2055 2.91593 16.7804 3.03865C17.2862 3.1466 17.7449 3.41256 18.0909 3.79841C18.4842 4.23706 18.6617 4.90209 19.0166 6.23213L21.5514 15.7316C21.9063 17.0616 22.0837 17.7266 21.9615 18.304C21.854 18.8119 21.5892 19.2725 21.2049 19.62C20.7681 20.0149 20.1058 20.1931 18.7813 20.5495C17.4568 20.9059 16.7945 21.0841 16.2196 20.9614C15.7138 20.8534 15.2551 20.5874 14.9091 20.2016C14.5158 19.7629 14.3383 19.0979 13.9834 17.7679L11.4486 8.26843Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.7812 16.6953L17.7899 16.693" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 8.00019L18.5001 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
            {
                buttonText: 'Leave Balance',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M2 3L20 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.5 3V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.5 3V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <circle cx="6.5" cy="18.5" r="2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <circle cx="11.5" cy="18.5" r="2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <circle cx="19.5" cy="18.5" r="2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M19.5 16L17 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
            {
                buttonText: 'Leave Type Summary',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M20.788 11.0972C20.9293 11.2959 21 11.5031 21 11.7309C21 12.7127 19.6873 13.3109 17.0618 14.5072L15.357 15.284C13.7048 16.0368 12.8786 16.4133 12 16.4133C11.1214 16.4133 10.2952 16.0368 8.64298 15.284L6.93817 14.5072C4.31272 13.3109 3 12.7127 3 11.7309C3 11.5031 3.07067 11.2959 3.212 11.0972" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M20.3767 16.2661C20.7922 16.5971 21 16.927 21 17.3176C21 18.2995 19.6873 18.8976 17.0618 20.0939L15.357 20.8707C13.7048 21.6236 12.8786 22 12 22C11.1214 22 10.2952 21.6236 8.64298 20.8707L6.93817 20.0939C4.31272 18.8976 3 18.2995 3 17.3176C3 16.927 3.20778 16.5971 3.62334 16.2661" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
            // Add more items here as needed
        ]
    },
    {
        left: [
            {
                name: 'Attendance',
                description: 'Lorem ipsum dolor sit amet consectetur. Diam aliquam proin vitae lorem eget. Odio non id dui viverra dictum venenatis orci.',
                img: clock,
            },
        ],
        right: [


            {
                buttonText: 'Monthly Attendance',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M18 2V4M6 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.5 8H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3 8H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
            // Add more items here as needed
        ]
    },
    {
        left: [
            {
                name: 'Performance',
                description: 'Lorem ipsum dolor sit amet consectetur. Diam aliquam proin vitae lorem eget. Odio non id dui viverra dictum venenatis orci.',
                img: Performance,
            },
        ],
        right: [

            {
                buttonText: 'Performance Review',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M2.5 12C2.5 7.52167 2.5 5.2825 3.89124 3.89126C5.28249 2.50002 7.52166 2.50002 12 2.50002C16.4783 2.50002 18.7175 2.50002 20.1088 3.89126C21.5 5.2825 21.5 7.52167 21.5 12C21.5 16.4784 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4784 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M2.5 9.00002H21.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        <path d="M6.99981 6.00002H7.00879" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.9998 6.00002H11.0088" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17 17C17 14.2386 14.7614 12 12 12C9.23858 12 7 14.2386 7 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M12.707 15.293L11.2928 16.7072" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
           
        ]
    },
   
];

const MyReports = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // const filteredData = MyData.map(category => ({
    //     left: category.left.filter(item => item.name.toLowerCase().includes(searchTerm)),
    //     right: category.right.filter(item => item.buttonText.toLowerCase().includes(searchTerm)),
    // }));
    const filteredData = MyData.map(category => {
        const leftFiltered = category.left.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())); // searchTerm ko lower case mein convert karna
        const rightFiltered = category.right.filter(item => item.buttonText.toLowerCase().includes(searchTerm.toLowerCase())); // searchTerm ko lower case mein convert karna

        // Agar rightFiltered mein koi data hai, to leftFiltered ko dikhana
        const result = {
            left: [],
            right: []
        };

        if (rightFiltered.length > 0) {
            result.left = category.left; // yahaan `:` ki jagah `=` ka istemal karna hai
            result.right = rightFiltered; // yahaan bhi `:` ki jagah `=` ka istemal karna hai
        } else if (leftFiltered.length > 0) {
            result.left = category.left; // yahaan `:` ki jagah `=` ka istemal karna hai
            result.right = category.right; // yahaan bhi `:` ki jagah `=` ka istemal karna hai
        } else {
            result.left = leftFiltered; // yahaan bhi `:` ki jagah `=` ka istemal karna hai
            result.right = rightFiltered; // yahaan bhi `:` ki jagah `=` ka istemal karna hai
        }

        return result; // `result` ko return karna
    });


    return (
        <div className="OrganizationalReports-dashboard">
            <div className="search-bar">
                <div className="span_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000" fill="none">
                        <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                </div>
                <input
                    type="text"
                    id='serch_active-none'
                    placeholder="Search Reports"
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="categories_section">
                {MyData.map((category, i) => (
                    <div className='Cards_l_r' key={i}>
                        <div className="left-section">
                            {filteredData[i].left.length > 0 ? (
                                filteredData[i].left.map((item, index) => (
                                    <div key={index} className="-card">
                                        <div className="img">
                                            <img src={item.img} alt="" />
                                        </div>
                                        <h4 className="-name">{item.name}</h4>
                                        <p className="-description">{item.description}</p>
                                    </div>
                                ))
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="right-section">
                            {filteredData[i].right.length > 0 ? (
                                filteredData[i].right.map((item, index) => (
                                    <div key={index} className="section-card">
                                        <div className="section-svg"
                                            onClick={() => navigate(`/reports/my/${item.buttonText.toLowerCase().replace(/\s+/g, '-')}`)}
                                        >{item.svg}</div>
                                        <span className="visit-button"
                                            onClick={() => navigate(`/reports/my/${item.buttonText.toLowerCase().replace(/\s+/g, '-')}`)}>
                                            {item.buttonText}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default MyReports;
//