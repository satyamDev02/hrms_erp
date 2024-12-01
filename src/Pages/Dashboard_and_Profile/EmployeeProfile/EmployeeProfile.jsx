// import React from 'react'
import './EmployeeProfile.scss'
import { HiUserPlus } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import Admin_IMG from '../../../assets/user.png'
import { BiEditAlt } from "react-icons/bi";
// import { FaUserCircle, FaPhone, FaAddressCard, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import iconUser from '../../../assets/icons/user.png'
import iconContect from '../../../assets/icons/contect.png'
import iconEdu from '../../../assets/icons/edu.png'
import imgCheck from '../../../assets/icons/check.png'
import imgFacbook from '../../../assets/icons/facbook.png'
import imgDropbox from '../../../assets/icons/dropbox.png'
import imgMailchimp from '../../../assets/icons/Mailchimp.png'
import imgIdentity from '../../../assets/icons/Identity.png'
import ImgPDF from '../../../assets/icons/pdf.png'
import ImgEye from '../../../assets/icons/eye.png'

const EmployeeProfile = () => {
    return (
        <div className='AdminProfile_main'>
            {/* patter top header */}
            <div className="top-bar">
                <h2><div className='span'><HiUserPlus /></div>My Profile</h2>
                <span className="close_nav"><TfiClose /></span>
                <div className="">
                    <span className="1"></span>
                    <span className="2"></span>
                    <span className="3"></span>
                    <span className="4"></span>
                    <span className="5"></span>
                    <span className="6"></span>
                    <span className="7"></span>
                    <span className="8"></span>
                    <span className="9"></span>
                    <span className="10"></span>
                </div>
            </div>
            {/* second header */}
            <div className="mainContainers">
                <div className="Top_Head_Admin_Dashboard">
                    {/* left */}
                    <div className="Left_admin_hello">
                        <img src={Admin_IMG} alt="Admin_image" className="header_img_rounded" />
                        <div>
                            <div>
                                <h2>Mrs. Employee </h2>
                                <div><h4>Active</h4></div>
                            </div>
                            <p>employee@gmail.com</p>
                        </div>
                    </div>
                    {/* right */}
                    <div className="Right_Time">
                        <div className="Check_in_time">
                            <BiEditAlt />
                            <h3> Edit</h3>
                        </div>

                    </div>
                </div>
                {/* data form cart */}
                <div className="containers">
                    <div className='info'>
                        {/* Basic details */}
                        <div className="div_details">
                            <div className="section_header">
                                <span className="icon" >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#320b57" fill="none">
                                        <path d="M8.49994 16.5C9.19857 15.2923 10.5044 14.4797 11.9999 14.4797C13.4955 14.4797 14.8013 15.2923 15.4999 16.5M14 10C14 11.1046 13.1045 12 12 12C10.8954 12 9.99997 11.1046 9.99997 10C9.99997 8.89543 10.8954 8 12 8C13.1045 8 14 8.89543 14 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M22 13.9669V10.0332C19.1433 10.0332 17.2857 6.93041 18.732 4.46691L15.2679 2.5001C13.8038 4.99405 10.1978 4.99395 8.73363 2.5L5.26953 4.46681C6.71586 6.93035 4.85673 10.0332 2 10.0332V13.9669C4.85668 13.9669 6.71425 17.0697 5.26795 19.5332L8.73205 21.5C10.1969 19.0048 13.8046 19.0047 15.2695 21.4999L18.7336 19.5331C17.2874 17.0696 19.1434 13.9669 22 13.9669Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <h2>Basic details</h2>
                            </div>
                            <div className="data">
                                <div>
                                    <h4>Employee ID</h4>
                                    <span>:</span>
                                    <p>EMP - 270015SC</p>
                                </div>
                                <div>
                                    <h4>Date of Birth</h4>
                                    <span>:</span>
                                    <p>14-Apr-1996</p>
                                </div>
                                <div>
                                    <h4>Age</h4>
                                    <span>:</span>
                                    <p>24</p>
                                </div>
                                <div>
                                    <h4>Marital Status</h4>
                                    <span>:</span>
                                    <p>Married</p>
                                </div>
                                <div>
                                    <h4>Department</h4>
                                    <span>:</span>
                                    <p>Engineer</p>
                                </div>
                                <div>
                                    <h4>Designation</h4>
                                    <span>:</span>
                                    <p>Web Developer</p>
                                </div>
                                <div>
                                    <h4>Employment Type</h4>
                                    <span>:</span>
                                    <p>Permanent</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="div_details">
                            <div className="section_header">
                                <span className="icon" >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#320b57" fill="none">
                                        <path d="M4 10C4 6.22876 4 4.34315 5.17157 3.17157C6.34315 2 8.22876 2 12 2H13.5C17.2712 2 19.1569 2 20.3284 3.17157C21.5 4.34315 21.5 6.22876 21.5 10V14C21.5 17.7712 21.5 19.6569 20.3284 20.8284C19.1569 22 17.2712 22 13.5 22H12C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V10Z" stroke="currentColor" stroke-width="1.5" />
                                        <path d="M9.79993 11.9741C9.37332 11.2302 9.16733 10.6228 9.04313 10.007C8.85943 9.09641 9.27981 8.20686 9.97622 7.63926C10.2706 7.39937 10.608 7.48133 10.782 7.79358L11.1749 8.49851C11.4864 9.05725 11.6421 9.33663 11.6112 9.63282C11.5803 9.929 11.3703 10.1702 10.9503 10.6527L9.79993 11.9741ZM9.79993 11.9741C10.6634 13.4797 12.0185 14.8356 13.5259 15.7001M13.5259 15.7001C14.2698 16.1267 14.8772 16.3327 15.493 16.4569C16.4036 16.6406 17.2931 16.2202 17.8607 15.5238C18.1006 15.2294 18.0187 14.892 17.7064 14.718L17.0015 14.3251C16.4427 14.0136 16.1634 13.8579 15.8672 13.8888C15.571 13.9197 15.3298 14.1297 14.8473 14.5497L13.5259 15.7001Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                        <path d="M5 6L2.5 6M5 12L2.5 12M5 18H2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <h2>Contact Information</h2>
                            </div>
                            <div className="data">
                                <div>
                                    <h4>Work Contact Number</h4>
                                    <span>:</span>
                                    <p>+91-9764910135</p>
                                </div>
                                <div>
                                    <h4>Personal Phone Number</h4>
                                    <span>:</span>
                                    <p>+91-9764910135</p>
                                </div>
                                <div>
                                    <h4>Country</h4>
                                    <span>:</span>
                                    <p>INDIA</p>
                                </div>
                                <div>
                                    <h4>State</h4>
                                    <span>:</span>
                                    <p>Maharashtra</p>
                                </div>
                                <div>
                                    <h4>City</h4>
                                    <span>:</span>
                                    <p>Pune</p>
                                </div>
                                <div>
                                    <h4>Present Address</h4>
                                    <span>:</span>
                                    <p>602, Mangalwar peth, Bwing</p>
                                </div>
                                <div>
                                    <h4>Permanent Address</h4>
                                    <span>:</span>
                                    <p>602, Mangalwar peth, Bwing</p>
                                </div>
                                <div>
                                    <h4>Zip Code</h4>
                                    <span>:</span>
                                    <p>415002</p>
                                </div>
                            </div>
                        </div>

                        {/* Identity Information */}
                        <div className="div_details">
                            <div className="section_header">
                                <span className="icon" >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#320b57" fill="none">
                                        <path d="M14 3.5H10C6.22876 3.5 4.34315 3.5 3.17157 4.67157C2 5.84315 2 7.72876 2 11.5V12.5C2 16.2712 2 18.1569 3.17157 19.3284C4.34315 20.5 6.22876 20.5 10 20.5H14C17.7712 20.5 19.6569 20.5 20.8284 19.3284C22 18.1569 22 16.2712 22 12.5V11.5C22 7.72876 22 5.84315 20.8284 4.67157C19.6569 3.5 17.7712 3.5 14 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                        <path d="M5 16C6.03569 13.4189 9.89616 13.2491 11 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M9.75 9.75C9.75 10.7165 8.9665 11.5 8 11.5C7.0335 11.5 6.25 10.7165 6.25 9.75C6.25 8.7835 7.0335 8 8 8C8.9665 8 9.75 8.7835 9.75 9.75Z" stroke="currentColor" stroke-width="1.5" />
                                        <path d="M14 8.5H19M14 12H19M14 15.5H16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <h2>Identity Information</h2>
                            </div>
                            <div className="data DataIdentity">
                                <div className='box_Identity'>
                                    <div className='preview_pdf'>
                                        <div className='img'>
                                            {/* <img src={ImgPDF} alt="pdf" /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#4a4a4a" fill="none">
                                                <path d="M19 11C19 10.1825 19 9.4306 18.8478 9.06306C18.6955 8.69552 18.4065 8.40649 17.8284 7.82843L13.0919 3.09188C12.593 2.593 12.3436 2.34355 12.0345 2.19575C11.9702 2.165 11.9044 2.13772 11.8372 2.11401C11.5141 2 11.1614 2 10.4558 2C7.21082 2 5.58831 2 4.48933 2.88607C4.26731 3.06508 4.06508 3.26731 3.88607 3.48933C3 4.58831 3 6.21082 3 9.45584V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H19M12 2.5V3C12 5.82843 12 7.24264 12.8787 8.12132C13.7574 9 15.1716 9 18 9H18.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M21 14H19C18.4477 14 18 14.4477 18 15V16.5M18 16.5V19M18 16.5H20.5M7 19V17M7 17V14H8.5C9.32843 14 10 14.6716 10 15.5C10 16.3284 9.32843 17 8.5 17H7ZM12.5 14H13.7857C14.7325 14 15.5 14.7462 15.5 15.6667V17.3333C15.5 18.2538 14.7325 19 13.7857 19H12.5V14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <div className='text'>
                                            <h3>Aadhar Card</h3>
                                            <p>123450318</p>
                                        </div>
                                    </div>
                                    <div className='preview_eye'>
                                        {/* <img src={ImgEye} alt="" /> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" color="#4a4a4a" fill="none">
                                            <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='box_Identity'>
                                    <div className='preview_pdf'>
                                        <div className='img'>
                                            {/* <img src={ImgPDF} alt="pdf" /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#4a4a4a" fill="none">
                                                <path d="M19 11C19 10.1825 19 9.4306 18.8478 9.06306C18.6955 8.69552 18.4065 8.40649 17.8284 7.82843L13.0919 3.09188C12.593 2.593 12.3436 2.34355 12.0345 2.19575C11.9702 2.165 11.9044 2.13772 11.8372 2.11401C11.5141 2 11.1614 2 10.4558 2C7.21082 2 5.58831 2 4.48933 2.88607C4.26731 3.06508 4.06508 3.26731 3.88607 3.48933C3 4.58831 3 6.21082 3 9.45584V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H19M12 2.5V3C12 5.82843 12 7.24264 12.8787 8.12132C13.7574 9 15.1716 9 18 9H18.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M21 14H19C18.4477 14 18 14.4477 18 15V16.5M18 16.5V19M18 16.5H20.5M7 19V17M7 17V14H8.5C9.32843 14 10 14.6716 10 15.5C10 16.3284 9.32843 17 8.5 17H7ZM12.5 14H13.7857C14.7325 14 15.5 14.7462 15.5 15.6667V17.3333C15.5 18.2538 14.7325 19 13.7857 19H12.5V14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <div className='text'>
                                            <h3>Aadhar Card</h3>
                                            <p>123450318</p>
                                        </div>
                                    </div>
                                    <div className='preview_eye'>
                                        {/* <img src={ImgEye} alt="" /> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" color="#4a4a4a" fill="none">
                                            <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='box_Identity'>
                                    <div className='preview_pdf'>
                                        <div className='img'>
                                            {/* <img src={ImgPDF} alt="pdf" /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#4a4a4a" fill="none">
                                                <path d="M19 11C19 10.1825 19 9.4306 18.8478 9.06306C18.6955 8.69552 18.4065 8.40649 17.8284 7.82843L13.0919 3.09188C12.593 2.593 12.3436 2.34355 12.0345 2.19575C11.9702 2.165 11.9044 2.13772 11.8372 2.11401C11.5141 2 11.1614 2 10.4558 2C7.21082 2 5.58831 2 4.48933 2.88607C4.26731 3.06508 4.06508 3.26731 3.88607 3.48933C3 4.58831 3 6.21082 3 9.45584V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H19M12 2.5V3C12 5.82843 12 7.24264 12.8787 8.12132C13.7574 9 15.1716 9 18 9H18.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M21 14H19C18.4477 14 18 14.4477 18 15V16.5M18 16.5V19M18 16.5H20.5M7 19V17M7 17V14H8.5C9.32843 14 10 14.6716 10 15.5C10 16.3284 9.32843 17 8.5 17H7ZM12.5 14H13.7857C14.7325 14 15.5 14.7462 15.5 15.6667V17.3333C15.5 18.2538 14.7325 19 13.7857 19H12.5V14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <div className='text'>
                                            <h3>Aadhar Card</h3>
                                            <p>123450318</p>
                                        </div>
                                    </div>
                                    <div className='preview_eye'>
                                        {/* <img src={ImgEye} alt="" /> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" color="#4a4a4a" fill="none">
                                            <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Education Section */}
                    <div className="education">
                        <div className="section-header">
                            {/* <FaGraduationCap className="icon" /> */}
                            <img src={iconEdu} alt="" className='icon' />
                            <h2>Education</h2>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>INSTITUTE NAME</th>
                                    <th>DEGREE</th>
                                    <th>SPECIALIZATION</th>
                                    <th>FROM DATE</th>
                                    <th>TO DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>M.S.B.T.E</td>
                                    <td>Masters</td>
                                    <td>Science</td>
                                    <td>16-Jan-2024</td>
                                    <td>16-Apr-2024</td>
                                </tr>
                                <tr>
                                    <td>C.B.S.E</td>
                                    <td>H.S.C</td>
                                    <td>Maths</td>
                                    <td>25-Mar-2022</td>
                                    <td>25-Mar-2023</td>
                                </tr>
                                <tr>
                                    <td>D.B.S.E</td>
                                    <td>S.S.C</td>
                                    <td>Economics</td>
                                    <td>16-May-2018</td>
                                    <td>16-May-2021</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Experience Section */}
                    <div className="experience">
                        <div className="section-header">
                            <img src={imgCheck} alt="" className='icon' />
                            <h2>Experience</h2>
                        </div>
                        <div className="experience-grid">
                            <div className="experience-card">
                                <div className='logo_title'>
                                    <img src={imgFacbook} alt="Facebook" />
                                    <div>
                                        <h3>Web Developer</h3>
                                        <p>04/02/2023 - 11/06/2023</p>
                                    </div>
                                </div>
                                <h3>Facebook</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, thing here described adipiscing elit, thing here described.</p>
                                <button>Image.png</button>
                            </div>
                            <div className="experience-card">
                                <div className='logo_title'>
                                    <img src={imgDropbox} alt="Facebook" />
                                    <div>
                                        <h3>Sr.Web developer</h3>
                                        <p>04/02/2023 - 11/06/2023</p>
                                    </div>
                                </div>
                                <h3>Dropbox</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, thing here described adipiscing elit, thing here described.</p>
                                <button>Image.png</button>
                            </div>
                            <div className="experience-card">
                                <div className='logo_title'>
                                    <img src={imgMailchimp} alt="Facebook" />
                                    <div>
                                        <h3>Sr.Web developer</h3>
                                        <p>04/02/2023 - 11/06/2023</p>
                                    </div>
                                </div>
                                <h3>Mailchimp</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, thing here described adipiscing elit, thing here described.</p>
                                <button>Image.png</button>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeProfile