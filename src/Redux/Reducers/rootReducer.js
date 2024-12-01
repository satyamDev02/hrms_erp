import { combineReducers } from "redux";
import jobReducer from "../../slices/jobSlice"; // Import the job slice reducer
import userReducer from "../../slices/userSlice";
import { announcementDetailReducer, announcementListReducer, createAnnouncementReducer, deleteAnnouncementReducer } from "./announcementReducer";
import {
  applicantDetailReducer,
  applicantListReducer,
  createApplicantReducer,
  deleteApplicantReducer,
  updateApplicantStatusReducer,
} from "./applicantReducer";
import { attendanceDetailReducer, attendanceListReducer, attendanceSummaryReducer, createAttendanceReducer, deleteAttendanceReducer, updateAttendanceStatusReducer } from "./attendanceReducer";
import { clientDetailProjectReducer, clientDetailReducer, clientListReducer, createClientReducer, deleteClientReducer, updateClientStatusReducer } from "./clientReducer";
import {
  createDepartmentReducer,
  deleteDepartmentReducer,
  departmentDetailReducer,
  departmentListReducer,
  empDepartmentDetailReducer,
  projectDepartmentDetailReducer,
} from "./departmentReducer";
import {
  createDesignationReducer,
  deleteDesignationReducer,
  designationDetailReducer,
  designationListReducer,
  empDesignationDetailReducer,
} from "./designationReducer";
import { createEmpHealthReducer, deleteEmpHealthReducer, empHealthDetailReducer, empHealthListReducer, updateEmpHealthStatusReducer } from "./employeeHealthReducer";
import {
  createEmployeeReducer,
  deleteEmployeeReducer,
  employeeDetailReducer,
  employeeListReducer,
  updateEmployeeStatusReducer,
} from "./employeeReducer";
import { getUserByIdReducer } from "./globalReducers";
import { createHolidayReducer, deleteHolidayReducer, holidayDetailReducer, holidayListReducer, updateHolidayStatusReducer } from "./holidayReducer";
import {
  createJobReducer,
  deleteJobReducer,
  jobDetailReducer,
  jobListReducer,
  updateJobStatusReducer,
} from "./jobReducer";
import { createLeaveTypeReducer, deleteLeaveTypeReducer, leaveTypeDetailReducer, leaveTypeListReducer, updateLeaveTypeStatusReducer } from "./leaveMasterReducer";
import { createLeaveReducer, deleteLeaveReducer, empLeaveDetailReducer, leaveDetailReducer, leaveListReducer, leaveSummaryDetailReducer, todayLeaveListReducer, updateLeaveStatusReducer } from "./leaveReducer";
import {
  cityListReducer,
  countryListReducer,
  stateListReducer,
} from "./locationReducer";
import { createPerformanceReducer, deletePerformanceReducer, performanceDetailReducer, performanceListReducer, updatePerformanceStatusReducer } from "./performanceReducer";
import { createProjectReducer, deleteProjectReducer, projectDetailReducer, projectListReducer, updateProjectStatusReducer } from './projectReducer';
import {
  assignShiftListReducer,
  assignShiftReducer,
  asssignshiftDetailReducer,
  createShiftReducer,
  deleteAssignShiftReducer,
  deleteShiftReducer,
  shiftDetailReducer,
  shiftListReducer,
  updateShiftStatusReducer,
} from "./shiftReducer";
import { createTicketReducer, deleteTicketReducer, ticketDetailReducer, ticketListReducer, updateTicketStatusReducer } from "./ticketReducer";
import { createTrainerReducer, deleteTrainerReducer, trainerDetailReducer, trainerListReducer, trainerHistoryDetailsReducer, updateTrainerStatusReducer } from "./trainerReducer";
import { createTrainingReducer, deleteTrainingReducer, trainingDetailReducer, trainingListReducer, updateTrainingStatusReducer } from "./trainingReducer";
import {
  createTravelReducer,
  deleteTravelReducer,
  travelDetailReducer,
  travelHistoryDetailReducer,
  travelListReducer,
} from "./travelReducer";
import { createFileReducer, deleteFileReducer, fileDetailReducer, fileListReducer } from "./fileReducer";
import { loginReducer } from "./loginReducer";

const reducer = combineReducers({
  job: jobReducer, // Add the job slice reducer here
  user: userReducer,

  //shift
  createShift: createShiftReducer,
  assignShift: assignShiftReducer,
  shiftList: shiftListReducer,
  assignShiftList: assignShiftListReducer,
  assignShiftDelete: deleteAssignShiftReducer,
  assignShiftDetail: asssignshiftDetailReducer,
  shiftMasterDelete: deleteShiftReducer,
  updateShiftStatus: updateShiftStatusReducer,
  shiftMasterDetails: shiftDetailReducer,

  //department
  departmentList: departmentListReducer,
  createDepartment: createDepartmentReducer,
  departmentDelete: deleteDepartmentReducer,
  departmentDetails: departmentDetailReducer,
  empDepartmentDetails: empDepartmentDetailReducer,
  projectDepartmentDetails: projectDepartmentDetailReducer,

  //designation
  designationList: designationListReducer,
  createDesignation: createDesignationReducer,
  designationDelete: deleteDesignationReducer,
  designationDetails: designationDetailReducer,
  empDesignationDetails: empDesignationDetailReducer,

  //employee
  createEmployee: createEmployeeReducer,
  employeeList: employeeListReducer,
  updateEmployeeStatus: updateEmployeeStatusReducer,
  employeeDelete: deleteEmployeeReducer,
  employeeDetails: employeeDetailReducer,

  //job
  createJob: createJobReducer,
  jobList: jobListReducer,
  updateJobStatus: updateJobStatusReducer,
  jobDetails: jobDetailReducer,
  jobDelete: deleteJobReducer,

  //project
  createProject: createProjectReducer,
  projectList: projectListReducer,
  updateProjectStatus: updateProjectStatusReducer,
  projectDetails: projectDetailReducer,
  projectDelete: deleteProjectReducer,

  //client
  createClient: createClientReducer,
  clientList: clientListReducer,
  updateClientStatus: updateClientStatusReducer,
  clientDetails: clientDetailReducer,
  clientDelete: deleteClientReducer,
  clientprojectDetails: clientDetailProjectReducer,

  //holiday
  createHoliday: createHolidayReducer,
  holidayList: holidayListReducer,
  holidayDetails: holidayDetailReducer,
  updateHolidayStatus: updateHolidayStatusReducer,
  holidayDelete: deleteHolidayReducer,

  //applicant
  createApplicant: createApplicantReducer,
  applicantList: applicantListReducer,
  updateApplicantStatus: updateApplicantStatusReducer,
  applicantDelete: deleteApplicantReducer,
  applicantDetails: applicantDetailReducer,

  //attendance
  createAttendance: createAttendanceReducer,
  attendanceList: attendanceListReducer,
  updateAttendanceStatus: updateAttendanceStatusReducer,
  attendanceDelete: deleteAttendanceReducer,
  attendanceDetails: attendanceDetailReducer,
  attendanceSummary:attendanceSummaryReducer,

  //location
  countryList: countryListReducer,
  stateList: stateListReducer,
  cityList: cityListReducer,

  //employee health
  createEmpHealth: createEmpHealthReducer,
  empHealthList: empHealthListReducer,
  updateEmpHealthStatus: updateEmpHealthStatusReducer,
  empHealthDetails: empHealthDetailReducer,
  empHealthDelete: deleteEmpHealthReducer,

  //leave
  createLeave: createLeaveReducer,
  leaveList: leaveListReducer,
  updateLeaveStatus: updateLeaveStatusReducer,
  leaveDetails: leaveDetailReducer,
  empLeaveDetails: empLeaveDetailReducer,
  leaveDelete: deleteLeaveReducer,
  leaveSummaryDetails: leaveSummaryDetailReducer,
  todayEmpOnLeave:todayLeaveListReducer,

  //leave type
  createLeaveMaster: createLeaveTypeReducer,
  leaveMasterList: leaveTypeListReducer,
  updateLeaveTypeStatus: updateLeaveTypeStatusReducer,
  leaveTypeDetails: leaveTypeDetailReducer,
  leaveTypeDelete: deleteLeaveTypeReducer,

  //travel
  createTravel: createTravelReducer,
  travelList: travelListReducer,
  travelDetails: travelDetailReducer,
  travelDelete: deleteTravelReducer,
  travelHistoryDetails: travelHistoryDetailReducer,

  //announcements
  createAnnouncement: createAnnouncementReducer,
  announcementList: announcementListReducer,
  announcementDetails: announcementDetailReducer,
  announcementDelete: deleteAnnouncementReducer,

  //global reducers
  getUserById: getUserByIdReducer,

  //performance
  createPerformance: createPerformanceReducer,
  performanceList: performanceListReducer,
  updatePerformanceStatus: updatePerformanceStatusReducer,
  performanceDetails: performanceDetailReducer,
  performanceDelete: deletePerformanceReducer,

  // training
  createTraining: createTrainingReducer,
  trainingList: trainingListReducer,
  trainingDetails: trainingDetailReducer,
  updateTrainingStatus: updateTrainingStatusReducer,
  trainingDelete: deleteTrainingReducer,

  // ticket
  createTicket: createTicketReducer,
  ticketList: ticketListReducer,
  ticketDetails: ticketDetailReducer,
  updateTicketStatus: updateTicketStatusReducer,
  ticketDelete: deleteTicketReducer,

  // trainers
  createTrainer: createTrainerReducer,
  trainerList: trainerListReducer,
  trainerDetails: trainerDetailReducer,
  updateTrainerStatus: updateTrainerStatusReducer,
  trainerDelete: deleteTrainerReducer,
  trainerHistoryDetail: trainerHistoryDetailsReducer,

  //file
  createFile: createFileReducer,
  fileList: fileListReducer,
  fileDetails: fileDetailReducer,
  fileDelete: deleteFileReducer,

  //login
  login: loginReducer
  
});

export default reducer;
