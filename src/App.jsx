import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./styles/App.scss";
import _404 from "./components/_404.jsx";
import Login from "./Views/Login/Login.jsx";

{
  /* Dashboard & Profile Page Imports */
}

import AdminDashboard from "./Pages/Dashboard_and_Profile/AdminDashboard/AdminDashboard.jsx";
import AdminProfile from "./Pages/Dashboard_and_Profile/AdminProfile/AdminProfile.jsx";
import EmployeeDashboard from "./Pages/Dashboard_and_Profile/EmployeeDashboard/EmployeeDashboard.jsx";
import EmployeeProfile from "./Pages/Dashboard_and_Profile/EmployeeProfile/EmployeeProfile.jsx";

{
  /* Employee Onboarding Imports */
}
import AllEmployeeList from "./Pages/Employee_onboarding/AllEmployeeList/AllEmployeeList.jsx";
import AddEmloyee from "./Pages/Employee_onboarding/AddEmployee/AddEmloyee.jsx";
import EmployeeDetails from "./Pages/Employee_onboarding/EmployeeDetail/EmployeeDetails.jsx";

{
  /* Jobs Imports */
}
import JobList from "./Pages/Job/JobList.jsx";
import AddJob from "./Pages/Job/AddJob.jsx";
import JobDetails from "./Pages/Job/JobDetails.jsx";

{
  /* Applicant Tracking Imports */
}
import ApplicantList from "./Pages/Applicant/ApplicantList.jsx";
import ApplicantDetails from "./Pages/Applicant/ApplicantDetails.jsx";
import AddApplicant from "./Pages/Applicant/AddApplicant.jsx";

{
  /* Attendance Tracking Imports */
}
import AttendanceList from "./Pages/Attedance/AttendanceList.jsx";
import AttendanceDetails from "./Pages/Attedance/AttendanceDetails.jsx";

{
  /* Department, Designation, and Employee Health Imports */
}
import DepartmentList from "./Pages/Department/DepartmentList.jsx";
import DepartmentDetails from "./Pages/Department/DepartmentDetails.jsx";


import DesignationList from "./Pages/Designation/DesignationList.jsx";
import DesignationDetails from "./Pages/Designation/DesignationDetails.jsx";

import EmployeeHealthList from "./Pages/EmployeeHealth/EmployeeHealthList.jsx";
import AddEmployeeHealth from "./Pages/EmployeeHealth/AddEmployeeHealth.jsx";
import EmployeeHealthDetails from "./Pages/EmployeeHealth/EmployeeHealthDetails.jsx";

{
  /* Leave Management Imports */
}
import LeaveList from "./Pages/Leave/LeaveList.jsx";
import AddLeave from "./Pages/Leave/AddLeave.jsx";
import LeaveDetails from "./Pages/Leave/LeaveDetails.jsx";

import LeaveTypeList from "./Pages/LeaveType/LeaveTypeList.jsx";
import LeaveTypeDetails from "./Pages/LeaveType/LeaveTypeDetails.jsx";
{
  /* Shift Management Imports */
}
// import AllShiftsList from './Pages/Shift/';
import ShiftList from "./Pages/Shift/ShiftList.jsx";
import AssignShiftList from "./Pages/ShiftAssign/AssignShiftList.jsx";
import ShiftDetails from "./Pages/Shift/ShiftDetails.jsx";

{
  /* Holiday and Project Management Imports */
}
import HolidayList from "./Pages/Holiday/Holiday_List/HolidayList.jsx";
import HolidayDetail from "./Pages/Holiday/HolidayDetail/HolidayDetail.jsx";
import Project from "./Pages/Project/Project_List/Project.jsx";
import AddProject from "./Pages/Project/Add_Project/AddProject.jsx";
import ProjectDetails from "./Pages/Project/Project_Details/ProjectDetails.jsx";

{
  /* Client Imports */
}
import ClientList from "./Pages/Client/ClientList.jsx";
import AddClient from "./Pages/Client/AddClient.jsx";
import ClientDetails from "./Pages/Client/ClientDetails.jsx";

{
  /*Ticket Import*/
}
import TicketList from "./Pages/Ticket/TicketList.jsx";
import TicketDetails from "./Pages/Ticket/TicketDetails.jsx";
import AddTicket from "./Pages/Ticket/AddTicket.jsx";

{
  /*Trainers Import*/
}
import TrainerList from "./Pages/Trainers/TrainerList.jsx";
import AddTrainer from "./Pages/Trainers/AddTrainer.jsx";
import TrainerDetails from "./Pages/Trainers/TrainerDetails.jsx";

{
  /*Trainers Import*/
}
import TrainingList from "./Pages/Training/TrainingList.jsx";
import AddTraining from "./Pages/Training/AddTraining.jsx";
import TrainingDetails from "./Pages/Training/TrainingDetails.jsx";

{
  /*Travel Import*/
}
import TravelList from "./Pages/Travel/TravelList.jsx";
import TravelDetails from "./Pages/Travel/TravelDetails.jsx";
import AddTravel from "./Pages/Travel/AddTravel.jsx";

{
  /*Announcements*/
}
import AnnouncementList from "./Pages/Announcements/AnnouncementList.jsx";
import AnnouncementsDetails from "./Pages/Announcements/AnnouncementsDetails.jsx";
import AddAnnouncement from "./Pages/Announcements/AddAnnouncement.jsx";

{
  /*BirthdayList*/
}
import BirthdayList from "./Pages/Birthday/BirthdayList/BirthdayList.jsx";

{
  /*Performance*/
}
import AddPerformance from "./Pages/Performance/AddPerformance.jsx";
import PerformanceList from "./Pages/Performance/PerformanceList.jsx";
import PerformanceDetails from "./Pages/Performance/PerformanceDetails.jsx";

{
  /*Reports Import*/
}
import Reports from "./Pages/Reports/Reports.jsx";


{
  /*Settings Import*/
}
import Settings from "./Pages/Settings/Settings.jsx";

{
  /* File*/
}
import File from "./Pages/File/File.jsx";
import AddFile from "./Pages/File/AddFile.jsx";
import FileDetails from "./Pages/File/FileDetails.jsx";



import "../src/styles/EffectSroll.scss";
import "./styles/App.scss";

// Other necessary imports for login and password functionality
import ForgotPassword from "./Views/ForgotPassword/ForgotPassword.jsx";
import SetNewPassword from "./Views/ForgotPassword/SetNewPassword.jsx";
import SendOTP from "./Views/ForgotPassword/SendOTP.jsx";
import ViewattendenceLogin from "./Views/Login/ViewattendenceLogin.jsx";
import TrackPerformance from "./Views/Login/TrackPerformance.jsx";

import { useSelector } from "react-redux";


const App = () => {
  const liHover = useSelector((state) => state.user.liHover);
  const sidebarW = useSelector((state) => state.user.sidebarW);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      {!isLoggedIn ? (
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/login-attendance"
            element={<ViewattendenceLogin setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/track-performance"
            element={<TrackPerformance setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<SendOTP />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          {/* Nav Bar */}
          <div id="app_">
            <div className="NavBar">
              <Navbar setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className="app">
              {/* Side Bar */}
              <div
                className={` ${sidebarW ? "sideBar_app2" : "sideBar_app"} ${liHover ? "expanded" : ""
                  } `}
              >
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
              </div>
              <div className="content">
                <Routes>
                  {/* 404 page */}
                  <Route path="/*" element={<_404 />} />

                  {/* Dashboard & Profile Routes */}
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/" element={<AdminDashboard />} />
                  <Route
                    path="/employee-dashboard"
                    element={<EmployeeDashboard />}
                  />
                  <Route path="/admin-profile" element={<AdminProfile />} />
                  <Route
                    path="/employee-profile"
                    element={<EmployeeProfile />}
                  />

                  {/* Employee Onboarding Routes */}
                  <Route
                    path="/all-employee-list"
                    element={<AllEmployeeList />}
                  />
                  <Route path="/add-employee" element={<AddEmloyee />} />
                  <Route
                    path="/employee-details/:id"
                    element={<EmployeeDetails />}
                  />
                  <Route path="/add-employee/:id" element={<AddEmloyee />} />

                  {/* Recruitment Routes */}
                  <Route path="/all-job-list" element={<JobList />} />
                  <Route path="/add-job" element={<AddJob />} />
                  <Route path="/add-job/:id" element={<AddJob />} />
                  <Route path="/job-details/:id" element={<JobDetails />} />

                  {/* Applicant Tracking Routes */}
                  <Route path="/applicant_list" element={<ApplicantList />} />
                  <Route path="/add_applicant" element={<AddApplicant />} />
                  <Route path="/add_applicant/:id" element={<AddApplicant />} />
                  <Route path="/applicant_details/:id" element={<ApplicantDetails />}/>
                 

                  {/* Attendance Tracking Routes */}
                  <Route
                    path="/all-Attendance-list"
                    element={<AttendanceList />}
                  />
                  <Route
                    path="/attendance-details/:id"
                    element={<AttendanceDetails />}
                  />

                  {/* Department, Designation & Employee Health Routes */}
                  <Route path="/department" element={<DepartmentList />} />
                  <Route path="/department_details/:id" element={<DepartmentDetails />}/>

                  <Route path="/designation" element={<DesignationList />} />
                  <Route path="/designationdeatils/:id" element={<DesignationDetails />}/>

                  <Route path="/health" element={<EmployeeHealthList />} />
                  <Route path="/addemployeehealth" element={<AddEmployeeHealth />}/>
                  <Route path="/addemployeehealth/:id" element={<AddEmployeeHealth />}/>
                  <Route path="/employeehealthdetails/:id" element={<EmployeeHealthDetails />}/>

                  {/* Leave Management Routes */}
                  <Route path="/all-leave" element={<LeaveList />} />
                  <Route path="/new-leave" element={<AddLeave />} />
                  <Route path="/new-leave/:id" element={<AddLeave />} />
                  <Route path="/leave-details/:id" element={<LeaveDetails />} />
                  

                  {/* LeaveType */}
                  <Route path="/leave_type" element={<LeaveTypeList />} />
                  <Route path="/leave_type_details/:id" element={<LeaveTypeDetails />} />



                  {/* Shift Management Routes */}
                  {/* <Route path="/shifts-list" element={<AllShiftsList />} /> */}
                  <Route path="/shift" element={<ShiftList />} />
                  <Route path="/new-shift" element={<AssignShiftList />} />
                  <Route path="/shift-details/:id" element={<ShiftDetails />} />

                  {/* Holiday & Project Management Routes */}
                  <Route path="/holiday" element={<HolidayList />} />
                  <Route
                    path="/holiday-details/:id"
                    element={<HolidayDetail />}
                  />

                  <Route path="/project" element={<Project />} />
                  <Route path="/add-project" element={<AddProject />} />
                  <Route path="/add-project/:id" element={<AddProject />} />
                  <Route
                    path="/project-details/:id"
                    element={<ProjectDetails />}
                  />

                  {/* Client Routes */}
                  <Route path="/client" element={<ClientList />} />
                  <Route path="/new-client" element={<AddClient />} />
                  <Route path="/new-client/:id" element={<AddClient />} />
                  <Route path="/client-details/:id" element={<ClientDetails />} />

                  {/* Ticket Routes*/}
                  <Route path="/ticket" element={<TicketList />} />
                  <Route path="/ticket-details/:id" element={<TicketDetails />} />
                  <Route path="/add-ticket" element={<AddTicket />} />
                  <Route path="/add-ticket/:id" element={<AddTicket />} />

                  {/* Trainers Routes */}
                  <Route path="/trainers" element={<TrainerList />} />
                  <Route path="/add-trainer" element={<AddTrainer />} />
                  <Route path="/add-trainer/:id" element={<AddTrainer />} />
                  <Route path="/trainer-details/:id" element={<TrainerDetails />} />

                  {/* Training Routes */}
                  <Route path="/training" element={<TrainingList />} />
                  <Route path="/new-training" element={<AddTraining />} />
                  <Route path="/new-training/:id" element={<AddTraining />} />
                  <Route path="/training-details/:id" element={<TrainingDetails />} />

                  {/* Travel Routes */}
                  <Route path="/travel" element={<TravelList />} />
                  <Route path="/travel-details/:id" element={<TravelDetails />} />
                  <Route path="/add-travel" element={<AddTravel />} />
                  <Route path="/add-travel/:id" element={<AddTravel />} />

                  {/* Announcements Routes */}
                  <Route path="/announcements" element={<AnnouncementList />} />
                  <Route path="/announcements-details/:id" element={<AnnouncementsDetails />}/>
                  <Route path="/add-AddAnnouncements" element={<AddAnnouncement />}/>
                  <Route path="/add-AddAnnouncements/:id"element={<AddAnnouncement />}/>

                  {/*BirthdayList Routes*/}
                  <Route path="/birthday" element={<BirthdayList />} />

                  {/*Performance Routes*/}
                  <Route path="/add-performance" element={<AddPerformance />} />
                  <Route path="/add-performance/:id" element={<AddPerformance />} />
                  <Route path="/performance" element={<PerformanceList />} />
                  <Route path="/performance-details/:id" element={<PerformanceDetails />} />


                  {/*Reports Routes*/}
                  <Route path="/reports/*" element={<Reports />} />

                  {/* Settings  */}
                  <Route path="/settings/*" element={<Settings />} />

                  {/*   File*/}
                  <Route path="/file/*" element={<File />} />
                  <Route path="/add-file" element={<AddFile />} />
                  <Route path="/add-file/:id" element={<AddFile />} />
                  <Route path="/file-details/:id" element={<FileDetails />} />
                </Routes>
              </div>
            </div>
          </div>
        </>
      )}
    </Router>
  );
};

export default App;
