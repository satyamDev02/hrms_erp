import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { IoMdTrendingDown, IoMdTrendingUp } from 'react-icons/io'

const AttendanceSection = () => {
  return (
    <div className="content_emp_four" >
                <div className="box_">
                    <div className="head">
                        <p>All Employees</p>
                        <span> <CiMenuKebab /></span>
                    </div>
                    <div className="centerData">
                        <div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                            </div>
                            <h2>210</h2>
                        </div>
                        <div className='up'>
                            <span> <IoMdTrendingUp /></span>
                            <p>2%</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>Last Month: <span>173</span></p>
                    </div>
                </div>
                <div className="box_">
                    <div className="head">
                        <p>New Employees</p>
                        <span> <CiMenuKebab /></span>
                    </div>
                    <div className="centerData">
                        <div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                            </div>
                            <h2>27</h2>
                        </div>
                        <div className='up'>
                            <span> <IoMdTrendingUp /></span>
                            <p>4%</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>Last Month: <span>7</span></p>
                    </div>
                </div>
                <div className="box_">
                    <div className="head">
                        <p>Resigned</p>
                        <span> <CiMenuKebab /></span>
                    </div>
                    <div className="centerData">
                        <div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                            </div>
                            <h2>10</h2>
                        </div>
                        <div className='down'>
                            <span> <IoMdTrendingDown /></span>
                            <p>4%</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>Last Month: <span>6</span></p>
                    </div>
                </div>
                <div className="box_">
                    <div className="head">
                        <p>On Leave</p>
                        <span> <CiMenuKebab /></span>
                    </div>
                    <div className="centerData">
                        <div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                            </div>
                            <h2>10</h2>
                        </div>
                        <div className='down'>
                            <span> <IoMdTrendingDown /></span>
                            <p>4%</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>Last Month: <span>6</span></p>
                    </div>
                </div>

            </div>
  )
}

export default AttendanceSection
