import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportsPage.scss'; // Import the SCSS file
import user from '../../assets/repot/user.png'
import goal from '../../assets/repot/goal.png'
import Performance from '../../assets/repot/Performance.png'
import clock from '../../assets/repot/clock.png'
import date from '../../assets/repot/date.png'

export const OrganizationalData = [
    {
        left: [
            {
                name: 'Employee Information',
                description: 'Lorem ipsum dolor sit amet consectetur. Diam aliquam proin vitae lorem eget. Odio non id dui viverra dictum venenatis orci.',
                img: user,
            },
        ],
        right: [
            {
                buttonText: 'Dashboard',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000c2" fill="none">
                        <path d="M7 17L7 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M12 17L12 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M17 17L17 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                ),
            },
            {
                buttonText: 'Employee Attrition Trend',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M14 8.99988H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M14 12.4999H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <rect x="2" y="2.99988" width="20" height="18" rx="5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        <path d="M5 15.9999C6.20831 13.4188 10.7122 13.249 12 15.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.5 8.99988C10.5 10.1044 9.60457 10.9999 8.5 10.9999C7.39543 10.9999 6.5 10.1044 6.5 8.99988C6.5 7.89531 7.39543 6.99988 8.5 6.99988C9.60457 6.99988 10.5 7.89531 10.5 8.99988Z" stroke="currentColor" stroke-width="1.5" />
                    </svg>
                ),
            },
            {
                buttonText: 'Headcount',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M18 12.5743C18 12.2721 18 12.1209 18.0416 11.9862C18.1626 11.5947 18.4814 11.4428 18.8009 11.2838C19.1599 11.1049 19.3395 11.0155 19.5174 10.9998C19.7193 10.9819 19.9217 11.0295 20.0943 11.1354C20.3232 11.2759 20.4828 11.5427 20.6462 11.7597C21.4008 12.7619 21.7782 13.263 21.9162 13.8155C22.0277 14.2614 22.0277 14.7279 21.9162 15.1738C21.7148 15.9797 21.0786 16.6554 20.6077 17.2807C20.3668 17.6007 20.2464 17.7606 20.0943 17.8539C19.9217 17.9598 19.7193 18.0074 19.5174 17.9895C19.3395 17.9738 19.1599 17.8844 18.8009 17.7055C18.4814 17.5465 18.1626 17.3946 18.0416 17.0031C18 16.8684 18 16.7172 18 16.415V12.5743Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M5.99978 12.5745C5.99978 12.1937 5.99 11.8517 5.70853 11.584C5.60615 11.4867 5.47041 11.419 5.19896 11.2839C4.83986 11.1051 4.66031 11.0157 4.4824 10.9999C3.94863 10.9527 3.66145 11.3511 3.35363 11.7598C2.59897 12.762 2.22164 13.263 2.08357 13.8156C1.97214 14.2615 1.97214 14.7278 2.08357 15.1738C2.28495 15.9797 2.92117 16.6553 3.3921 17.2806C3.68894 17.6748 3.9725 18.0345 4.4824 17.9894C4.66031 17.9737 4.83986 17.8843 5.19896 17.7055C5.47041 17.5702 5.60615 17.5026 5.70853 17.4053C5.99 17.1377 5.99978 16.7955 5.99978 16.4149V12.5745Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M19.9991 10.9958V9.87129C19.9991 5.52383 16.4176 1.99951 11.9996 1.99951C7.58152 1.99951 4 5.52383 4 9.87129V10.9958" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />
                        <path d="M11.9977 13.4592C10.752 12.8002 7.99771 11.6788 6.73429 12.0203C6.49453 12.1204 5.99805 12.4652 5.99805 13.6189L6.09383 19.5962C6.09975 19.9659 6.38606 20.2689 6.74809 20.32C7.98052 20.4942 10.0798 20.9935 11.9977 22.0002M11.9977 13.4592V22.0002M11.9977 13.4592C13.2434 12.8002 15.9988 11.6788 17.2623 12.0203C17.502 12.1204 17.9985 12.4652 17.9985 13.6189L17.9027 19.5962C17.8968 19.9659 17.6105 20.2689 17.2485 20.32C16.016 20.4942 13.9156 20.9935 11.9977 22.0002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
            {
                buttonText: 'Employee Addition Trend',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                        <path d="M14 8.99988H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M14 12.4999H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <rect x="2" y="2.99988" width="20" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M5 15.9999C6.20831 13.4188 10.7122 13.249 12 15.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.5 8.99988C10.5 10.1044 9.60457 10.9999 8.5 10.9999C7.39543 10.9999 6.5 10.1044 6.5 8.99988C6.5 7.89531 7.39543 6.99988 8.5 6.99988C9.60457 6.99988 10.5 7.89531 10.5 8.99988Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                ),
            },
            // Add more items here as needed
        ]
    },
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
                buttonText: 'Daily Attendance Report',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M2 22H13C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.36745 4 4.49744 7.50005 4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M18.5 5.5L19.5 4.5M5.5 4.5L6.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16.5001 9.00003L13.5608 11.9394M13.5608 11.9394C13.2893 11.6679 12.9143 11.5 12.5001 11.5C11.6717 11.5 11.0001 12.1716 11.0001 13C11.0001 13.8285 11.6717 14.5 12.5001 14.5C13.3285 14.5 14.0001 13.8285 14.0001 13C14.0001 12.5858 13.8322 12.2108 13.5608 11.9394Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M12.5 3.5V2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.5 2H14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2 15H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2 19H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
            {
                buttonText: 'Employee present/absent status',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M17 2V4M12 2V4M7 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.5 10C3.5 6.70017 3.5 5.05025 4.52513 4.02513C5.55025 3 7.20017 3 10.5 3H13.5C16.7998 3 18.4497 3 19.4749 4.02513C20.5 5.05025 20.5 6.70017 20.5 10V15C20.5 18.2998 20.5 19.9497 19.4749 20.9749C18.4497 22 16.7998 22 13.5 22H10.5C7.20017 22 5.55025 22 4.52513 20.9749C3.5 19.9497 3.5 18.2998 3.5 15V10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.5 16H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M13.5 9H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M7 10C7 10 7.5 10 8 11C8 11 9.58824 8.5 11 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7 17C7 17 7.5 17 8 18C8 18 9.58824 15.5 11 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
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
                buttonText: 'Appraisal Status',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M7.29469 17C3.53045 7.25 8.86313 2.9375 12 2C15.1369 2.9375 20.4696 7.25 16.7053 17C16.1369 16.6875 14.4 16.0625 12 16.0625C9.6 16.0625 7.86313 16.6875 7.29469 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M17.5 15.5576C18.9421 15.6908 20.7078 16.0822 21.9814 17C21.9814 17 22.5044 12.0642 18 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.5 15.5576C5.05794 15.6908 3.29216 16.0822 2.01858 17C2.01858 17 1.49555 12.0642 6 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9.5 19C9.5 19 9.91667 21.5 12 22C14.0833 21.5 14.5 19 14.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
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
            {
                buttonText: 'Appraisal History',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M11.0065 21H9.60546C6.02021 21 4.22759 21 3.11379 19.865C2 18.7301 2 16.9034 2 13.25C2 9.59661 2 7.76992 3.11379 6.63496C4.22759 5.5 6.02021 5.5 9.60546 5.5H13.4082C16.9934 5.5 18.7861 5.5 19.8999 6.63496C20.7568 7.50819 20.9544 8.7909 21 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18.85 18.85L17.5 17.95V15.7M13 17.5C13 19.9853 15.0147 22 17.5 22C19.9853 22 22 19.9853 22 17.5C22 15.0147 19.9853 13 17.5 13C15.0147 13 13 15.0147 13 17.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16 5.5L15.9007 5.19094C15.4056 3.65089 15.1581 2.88087 14.5689 2.44043C13.9796 2 13.197 2 11.6316 2H11.3684C9.80304 2 9.02036 2 8.43111 2.44043C7.84186 2.88087 7.59436 3.65089 7.09934 5.19094L7 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
            // Add more items here as needed
        ]
    },
    {
        left: [
            {
                name: 'Project and Trainee Report',
                description: 'Lorem ipsum dolor sit amet consectetur. Diam aliquam proin vitae lorem eget. Odio non id dui viverra dictum venenatis orci.',
                img: goal,
            },
        ],
        right: [
            {
                buttonText: 'All Projects',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M18 20.5001C18.8888 20.3004 19.5638 19.9723 20.1088 19.4328C21.5 18.0554 21.5 15.8386 21.5 11.4051C21.5 6.97151 21.5 4.75472 20.1088 3.37739C18.7175 2.00006 16.4783 2.00006 12 2.00006C7.52166 2.00006 5.28249 2.00006 3.89124 3.37739C2.5 4.75472 2.5 6.97151 2.5 11.4051C2.5 15.8386 2.5 18.0554 3.89124 19.4328C4.43619 19.9723 5.11124 20.3004 6 20.5001" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M2.5 8.50006H21.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        <path d="M6.99981 5.50006H7.00879" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.9998 5.50006H11.0088" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15.5 17.5001V15.0001C13.5 15.0001 12 14.0001 12 14.0001C12 14.0001 10.5 15.0001 8.5 15.0001V17.5001C8.5 21.0001 12 22.0001 12 22.0001C12 22.0001 15.5 21.0001 15.5 17.5001Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
            {
                buttonText: 'Training Attendance',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M22 14V10C22 6.22876 22 4.34315 20.8284 3.17157C19.6569 2 17.7712 2 14 2H12C8.22876 2 6.34315 2 5.17157 3.17157C4 4.34315 4 6.22876 4 10V14C4 17.7712 4 19.6569 5.17157 20.8284C6.34315 22 8.22876 22 12 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M5 6L2 6M5 12H2M5 18H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.5 7L13.5 7M15.5 11H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9 22L9 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
            {
                buttonText: 'Trainee Employee',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M7.78256 17.1112C6.68218 17.743 3.79706 19.0331 5.55429 20.6474C6.41269 21.436 7.36872 22 8.57068 22H15.4293C16.6313 22 17.5873 21.436 18.4457 20.6474C20.2029 19.0331 17.3178 17.743 16.2174 17.1112C13.6371 15.6296 10.3629 15.6296 7.78256 17.1112Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15.5 10C15.5 11.933 13.933 13.5 12 13.5C10.067 13.5 8.5 11.933 8.5 10C8.5 8.067 10.067 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M2.854 16C2.30501 14.7664 2 13.401 2 11.9646C2 6.46129 6.47715 2 12 2C17.5228 2 22 6.46129 22 11.9646C22 13.401 21.695 14.7664 21.146 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                ),
            },
            // Add more items here as needed
        ]
    },
];

const OrganizationalReports = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // const filteredData = OrganizationalData.map(category => ({
    //     left: category.left.filter(item => item.name.toLowerCase().includes(searchTerm)),
    //     right: category.right.filter(item => item.buttonText.toLowerCase().includes(searchTerm)),
    // }));
    const filteredData = OrganizationalData.map(category => {
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000de" fill="none">
                        <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search Reports"
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="categories_section">
                {OrganizationalData.map((category, i) => (
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
                                            onClick={() => navigate(`/reports/organizational/${item.buttonText.toLowerCase().replace(/\s+/g, '-')}`)}
                                        >{item.svg}</div>
                                        <span className="visit-button"
                                            onClick={() => navigate(`/reports/organizational/${item.buttonText.toLowerCase().replace(/\s+/g, '-')}`)}>
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

export default OrganizationalReports;
//