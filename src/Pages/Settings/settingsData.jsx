import React, { useState } from 'react';
import './Settings.scss';
import { useNavigate } from 'react-router-dom';

const settingsData = [
    {
        category: 'General Settings',
        items: [
            {
                name: 'Manage Accounts',
                description: 'Lorem ipsum dolor sit amet consectetur.',
                buttonText: 'Visit Accounts',
                url:'Manage Accounts/users',
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                    <path d="M14 8.99988H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M14 12.4999H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <rect x="2" y="2.99988" width="20" height="18" rx="5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    <path d="M5 15.9999C6.20831 13.4188 10.7122 13.249 12 15.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.5 8.99988C10.5 10.1044 9.60457 10.9999 8.5 10.9999C7.39543 10.9999 6.5 10.1044 6.5 8.99988C6.5 7.89531 7.39543 6.99988 8.5 6.99988C9.60457 6.99988 10.5 7.89531 10.5 8.99988Z" stroke="currentColor" stroke-width="1.5" />
                </svg>
            },
            {
                name: 'Employee Information',
                description: 'Lorem ipsum dolor sit amet consectetur.',
                buttonText: 'Visit Employee Information',
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                    <path d="M18.6161 20H19.1063C20.2561 20 21.1707 19.4761 21.9919 18.7436C24.078 16.8826 19.1741 15 17.5 15M15.5 5.06877C15.7271 5.02373 15.9629 5 16.2048 5C18.0247 5 19.5 6.34315 19.5 8C19.5 9.65685 18.0247 11 16.2048 11C15.9629 11 15.7271 10.9763 15.5 10.9312" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M4.48131 16.1112C3.30234 16.743 0.211137 18.0331 2.09388 19.6474C3.01359 20.436 4.03791 21 5.32572 21H12.6743C13.9621 21 14.9864 20.436 15.9061 19.6474C17.7889 18.0331 14.6977 16.743 13.5187 16.1112C10.754 14.6296 7.24599 14.6296 4.48131 16.1112Z" stroke="currentColor" stroke-width="1.5" />
                    <path d="M13 7.5C13 9.70914 11.2091 11.5 9 11.5C6.79086 11.5 5 9.70914 5 7.5C5 5.29086 6.79086 3.5 9 3.5C11.2091 3.5 13 5.29086 13 7.5Z" stroke="currentColor" stroke-width="1.5" />
                </svg>
            },
            {
                name: 'Security',
                description: 'Lorem ipsum dolor sit amet consectetur.',
                buttonText: 'Visit Security',
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                    <path d="M10.3371 10.38C9.25714 10.38 8.71714 11.16 8.59714 11.64C8.47714 12.12 8.47714 13.86 8.54914 14.58C8.78914 15.48 9.38914 15.852 9.97714 15.972C10.5171 16.02 12.7971 16.002 13.4571 16.002C14.4171 16.02 15.1371 15.66 15.4371 14.58C15.4971 14.22 15.5571 12.24 15.4071 11.64C15.0891 10.68 14.2971 10.38 13.6971 10.38H10.3371Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M10.25 9.95854C10.25 9.89854 10.2582 9.55312 10.2596 9.11854C10.2609 8.72145 10.226 8.33854 10.4156 7.98814C11.126 6.57454 13.166 6.71854 13.67 8.15854C13.7573 8.39562 13.7626 8.77146 13.76 9.11854C13.7567 9.56203 13.766 9.95854 13.766 9.95854" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M21 11.1833V8.28029C21 6.64029 21 5.82028 20.5959 5.28529C20.1918 4.75029 19.2781 4.49056 17.4507 3.9711C16.2022 3.6162 15.1016 3.18863 14.2223 2.79829C13.0234 2.2661 12.424 2 12 2C11.576 2 10.9766 2.2661 9.77771 2.79829C8.89839 3.18863 7.79784 3.61619 6.54933 3.9711C4.72193 4.49056 3.80822 4.75029 3.40411 5.28529C3 5.82028 3 6.64029 3 8.28029V11.1833C3 16.8085 8.06277 20.1835 10.594 21.5194C11.2011 21.8398 11.5046 22 12 22C12.4954 22 12.7989 21.8398 13.406 21.5194C15.9372 20.1835 21 16.8085 21 11.1833Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
            },
            {
                name: 'Notifications',
                description: 'Lorem ipsum dolor sit amet consectetur.',
                buttonText: 'Visit Notifications',
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                    <path d="M2.52992 14.7696C2.31727 16.1636 3.268 17.1312 4.43205 17.6134C8.89481 19.4622 15.1052 19.4622 19.5679 17.6134C20.732 17.1312 21.6827 16.1636 21.4701 14.7696C21.3394 13.9129 20.6932 13.1995 20.2144 12.5029C19.5873 11.5793 19.525 10.5718 19.5249 9.5C19.5249 5.35786 16.1559 2 12 2C7.84413 2 4.47513 5.35786 4.47513 9.5C4.47503 10.5718 4.41272 11.5793 3.78561 12.5029C3.30684 13.1995 2.66061 13.9129 2.52992 14.7696Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8 19C8.45849 20.7252 10.0755 22 12 22C13.9245 22 15.5415 20.7252 16 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            }
        ]
    },
    {
        category: 'Organizational Settings',
        items: [
            {
                name: 'Leave Tracker',
                description: 'Lorem ipsum dolor sit amet consectetur.',
                buttonText: 'Visit Leaves',
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                    <path d="M11.0065 21.0001H9.60546C6.02021 21.0001 4.22759 21.0001 3.11379 19.8652C2 18.7302 2 16.9035 2 13.2501C2 9.59674 2 7.77004 3.11379 6.63508C4.22759 5.50012 6.02021 5.50012 9.60546 5.50012H13.4082C16.9934 5.50012 18.7861 5.50012 19.8999 6.63508C20.7568 7.50831 20.9544 8.79102 21 11.0001" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M17.111 13.2551C17.2956 13.085 17.3879 13 17.5 13C17.6121 13 17.7044 13.085 17.889 13.2551L18.6017 13.9117C18.6878 13.991 18.7308 14.0307 18.7843 14.0503C18.8378 14.07 18.8963 14.0677 19.0133 14.0631L19.9762 14.0253C20.2241 14.0155 20.3481 14.0107 20.4331 14.0821C20.5181 14.1535 20.5346 14.2765 20.5677 14.5224L20.7004 15.5077C20.7157 15.6216 20.7234 15.6785 20.7511 15.7271C20.7789 15.7757 20.824 15.8112 20.9143 15.8823L21.6898 16.4928C21.8817 16.6439 21.9777 16.7194 21.9967 16.8274C22.0157 16.9354 21.9513 17.0391 21.8225 17.2467L21.2965 18.0943C21.2363 18.1913 21.2063 18.2398 21.1967 18.2946C21.1871 18.3493 21.199 18.4052 21.2228 18.5168L21.4315 19.4952C21.4827 19.7356 21.5084 19.8558 21.4533 19.9513C21.3983 20.0467 21.2814 20.0848 21.0477 20.1609L20.122 20.4624C20.0117 20.4983 19.9565 20.5163 19.9134 20.5528C19.8703 20.5894 19.8436 20.6409 19.7902 20.7439L19.338 21.6154C19.2227 21.8375 19.1651 21.9485 19.0601 21.9868C18.9551 22.0251 18.8395 21.9772 18.6084 21.8813L17.72 21.5128C17.6114 21.4678 17.5572 21.4453 17.5 21.4453C17.4428 21.4453 17.3886 21.4678 17.28 21.5128L16.3916 21.8813C16.1605 21.9772 16.0449 22.0251 15.9399 21.9868C15.8349 21.9485 15.7773 21.8375 15.662 21.6154L15.2098 20.7439C15.1564 20.6409 15.1297 20.5894 15.0866 20.5528C15.0435 20.5163 14.9883 20.4983 14.878 20.4624L13.9523 20.1609C13.7186 20.0848 13.6017 20.0467 13.5467 19.9513C13.4916 19.8558 13.5173 19.7356 13.5685 19.4952L13.7772 18.5168C13.801 18.4052 13.8129 18.3493 13.8033 18.2946C13.7937 18.2398 13.7637 18.1913 13.7035 18.0943L13.1775 17.2467C13.0487 17.0391 12.9843 16.9354 13.0033 16.8274C13.0223 16.7194 13.1183 16.6439 13.3102 16.4928L14.0857 15.8823C14.176 15.8112 14.2211 15.7757 14.2489 15.7271C14.2766 15.6785 14.2843 15.6216 14.2996 15.5077L14.4323 14.5224C14.4654 14.2765 14.4819 14.1535 14.5669 14.0821C14.6519 14.0107 14.7759 14.0155 15.0238 14.0253L15.9867 14.0631C16.1037 14.0677 16.1622 14.07 16.2157 14.0503C16.2692 14.0307 16.3122 13.991 16.3983 13.9117L17.111 13.2551Z" stroke="currentColor" stroke-width="1.5" />
                    <path d="M15.9998 5.5L15.9004 5.19094C15.4054 3.65089 15.1579 2.88087 14.5686 2.44043C13.9794 2 13.1967 2 11.6313 2H11.3682C9.8028 2 9.02011 2 8.43087 2.44043C7.84162 2.88087 7.59411 3.65089 7.0991 5.19094L6.99976 5.5" stroke="currentColor" stroke-width="1.5" />
                </svg>
            },
            {
                name: 'Attendance',
                description: 'Lorem ipsum dolor sit amet consectetur.',
                buttonText: 'Visit Attendance',
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                    <path d="M15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16 4C17.6568 4 19 5.34315 19 7C19 8.22309 18.268 9.27523 17.2183 9.7423" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13.7143 14H10.2857C7.91876 14 5.99998 15.9188 5.99998 18.2857C5.99998 19.2325 6.76749 20 7.71426 20H16.2857C17.2325 20 18 19.2325 18 18.2857C18 15.9188 16.0812 14 13.7143 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.7143 13C20.0812 13 22 14.9188 22 17.2857C22 18.2325 21.2325 19 20.2857 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8 4C6.34315 4 5 5.34315 5 7C5 8.22309 5.73193 9.27523 6.78168 9.7423" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3.71429 19C2.76751 19 2 18.2325 2 17.2857C2 14.9188 3.91878 13 6.28571 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            },
            {
                name: 'Shifts',
                description: 'Lorem ipsum dolor sit amet consectetur.',
                buttonText: 'Visit Shifts',
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                    <path d="M12 8V12L13.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M19.5454 16.4534C21.1818 17.337 22 17.7789 22 18.5C22 19.2211 21.1818 19.663 19.5454 20.5466L18.4311 21.1484C17.1744 21.827 16.5461 22.1663 16.2439 21.9196C15.504 21.3154 16.6567 19.7561 16.9403 19.2037C17.2277 18.644 17.2225 18.3459 16.9403 17.7963C16.6567 17.2439 15.504 15.6846 16.2439 15.0804C16.5461 14.8337 17.1744 15.173 18.4311 15.8516L19.5454 16.4534Z" stroke="currentColor" stroke-width="1.5" />
                    <path d="M13.0261 21.948C12.6888 21.9824 12.3464 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.6849 21.9311 13.3538 21.8 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
            },
            {
                name: 'Performance',
                description: 'Lorem ipsum dolor sit amet consectetur.',
                buttonText: 'Visit Performance',
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                    <path d="M6.5 17.5L6.5 14.5M11.5 17.5L11.5 8.5M16.5 17.5V13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M21.5 5.5C21.5 7.15685 20.1569 8.5 18.5 8.5C16.8431 8.5 15.5 7.15685 15.5 5.5C15.5 3.84315 16.8431 2.5 18.5 2.5C20.1569 2.5 21.5 3.84315 21.5 5.5Z" stroke="currentColor" stroke-width="1.5" />
                    <path d="M21.4955 11C21.4955 11 21.5 11.3395 21.5 12C21.5 16.4784 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4784 2.5 12C2.5 7.52169 2.5 5.28252 3.89124 3.89127C5.28249 2.50003 7.52166 2.50003 12 2.50003L13 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            },
            {
                name: 'Files',
                description: 'Lorem ipsum dolor sit amet consectetur.',
                buttonText: 'Visit Files',
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                    <path d="M8 7L16 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8 11L12 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13 21.5V21C13 18.1716 13 16.7574 13.8787 15.8787C14.7574 15 16.1716 15 19 15H19.5M20 13.3431V10C20 6.22876 20 4.34315 18.8284 3.17157C17.6569 2 15.7712 2 12 2C8.22877 2 6.34315 2 5.17157 3.17157C4 4.34314 4 6.22876 4 10L4 14.5442C4 17.7892 4 19.4117 4.88607 20.5107C5.06508 20.7327 5.26731 20.9349 5.48933 21.1139C6.58831 22 8.21082 22 11.4558 22C12.1614 22 12.5141 22 12.8372 21.886C12.9044 21.8623 12.9702 21.835 13.0345 21.8043C13.3436 21.6564 13.593 21.407 14.0919 20.9081L18.8284 16.1716C19.4065 15.5935 19.6955 15.3045 19.8478 14.9369C20 14.5694 20 14.1606 20 13.3431Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            },
            {
                name: 'Travel',
                description: 'Lorem ipsum dolor sit amet consectetur.',
                buttonText: 'Visit Files',
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                    <path d="M12 9C8.89837 9 7.77572 11.6032 7.1393 14.2373C6.33194 17.5789 9.1763 19.0941 12 18.9955C14.8237 19.0941 17.6681 17.5789 16.8607 14.2373C16.2243 11.6032 15.1016 9 12 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11.9998 14H12.0088" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3.99981 21H4.00879" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M19.9998 21H20.0088" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7 15L2 17M17 15L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 9L12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4 18L4 16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M20 18L20 16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            },
            {
                name: 'Onboarding',
                description: 'Lorem ipsum dolor sit amet consectetur.',
                buttonText: 'Visit Files',
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                    <path d="M16 3.38462V2M19.6306 4.36369L20.6081 3.38462M20.6176 8H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11.8517 8.00684H15.0738C15.4527 8.00684 15.7598 8.32175 15.7598 8.71022V12.0354M2.75977 13.9583C5.03301 14.2241 10.7373 13.5137 14.8914 8.88963" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            },
            {
                name: 'Project Handling',
                description: 'Lorem ipsum dolor sit amet consectetur.',
                buttonText: 'Visit Files',
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                    <path d="M14.9263 2.91103L8.27352 6.10452C7.76151 6.35029 7.21443 6.41187 6.65675 6.28693C6.29177 6.20517 6.10926 6.16429 5.9623 6.14751C4.13743 5.93912 3 7.38342 3 9.04427V9.95573C3 11.6166 4.13743 13.0609 5.9623 12.8525C6.10926 12.8357 6.29178 12.7948 6.65675 12.7131C7.21443 12.5881 7.76151 12.6497 8.27352 12.8955L14.9263 16.089C16.4534 16.8221 17.217 17.1886 18.0684 16.9029C18.9197 16.6172 19.2119 16.0041 19.7964 14.778C21.4012 11.4112 21.4012 7.58885 19.7964 4.22196C19.2119 2.99586 18.9197 2.38281 18.0684 2.0971C17.217 1.8114 16.4534 2.17794 14.9263 2.91103Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11.4581 20.7709L9.96674 22C6.60515 19.3339 7.01583 18.0625 7.01583 13H8.14966C8.60978 15.8609 9.69512 17.216 11.1927 18.197C12.1152 18.8012 12.3054 20.0725 11.4581 20.7709Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.5 12.5V6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            }
        ]
    }
];


const SettingsDashboard = () => {
    const navigate = useNavigate()

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };
  const [searchTerm, setSearchTerm] = useState('');
  
    const filteredData = settingsData.map(category => ({
        ...category,
        items: category.items.filter(item => item.name.toLowerCase().includes(searchTerm))
    }));

    return (
        <div className="settings-dashboard">
            {/* Search Bar */}
            <div className="search-bar">
                <div className='span_icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                        <path d="M17.5 17.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search Settings"
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Categories */}
            {filteredData.map((category, index) => (
                <div key={index} className="category-section">
                    <h3 className="category-title">{category.category}</h3>
                    <div className="settings-grid">
                        {category.items.map((item, index) => (
                            <div key={index} className="setting-card">
                                <div className="setting-icon">{item.svg}</div>
                                <h4 className="setting-name">{item.name}</h4>
                                <p className="setting-description">{item.description}</p>
                                <button
                                    className="visit-button"
                                    onClick={() => navigate(`/settings/${item.url.toLowerCase().replace(/\s+/g, '-')}`)}>
                                    {item.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default SettingsDashboard;
