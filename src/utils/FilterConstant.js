import { otherIcons } from "../components/Helper/icons";

export const filterJobOptions = [
  { id: "draft", label: "Draft", icon: otherIcons.draft_svg },
  { id: "open", label: "Open", icon: otherIcons.open_svg },
  { id: "On Hold", label: "On Hold", icon: otherIcons.hold_svg },
  { id: "filled", label: "Filled", icon: otherIcons.filled_svg },
  { id: "cancelled", label: "Cancelled", icon: otherIcons.bannned_svg },
];

export const filterClientOptions = [
  { id: "Inactive", label: "Active", icon: otherIcons.active_svg },
  { id: "Active", label: "Inactive", icon: otherIcons.inactive_svg },
];

export const filterEmployeeOptions = [
  { id: "Active", label: "Active", icon: otherIcons.active_svg },
  { id: "Inactive", label: "Inactive", icon: otherIcons.inactive_svg },
  { id: "Resigned", label: "Resigned", icon: otherIcons.resigned_svg },
  { id: "Terminated", label: "Terminated", icon: otherIcons.terminated_svg },
  {
    id: "Notice Period",
    label: "Notice Period",
    icon: otherIcons.notice_period_svg,
  },
];

export const filterAttendanceOptions = [
  { id: "0", label: "Present", icon: otherIcons.active_svg },
  { id: "1", label: "Absent", icon: otherIcons.inactive_svg },
  { id: "2", label: "Half day", icon: otherIcons.resigned_svg },
];

export const filterEmpHealthOptions = [
  {
    id: "Fully Vaccinated",
    label: "Fully Vaccinated",
    icon: otherIcons.active_svg,
  },
  {
    id: "Partially Vaccinated",
    label: "Partially Vaccinated",
    icon: otherIcons.resigned_svg,
  },
  {
    id: "Not Vaccinated",
    label: "Not Vaccinated",
    icon: otherIcons.inactive_svg,
  },
];

export const filterApplicantOptions = [
  { id: "New", label: "New", icon: otherIcons.active_svg },
  { id: "Schedule", label: "Schedule", icon: otherIcons.inactive_svg },
  { id: "Interviewed", label: "Interviewed", icon: otherIcons.resigned_svg },
  { id: "On Hold", label: "On Hold", icon: otherIcons.terminated_svg },
  { id: "Hired", label: "Hired", icon: otherIcons.notice_period_svg },
  { id: "Rejected", label: "Rejected", icon: otherIcons.notice_period_svg },
];

export const filterLeavesOptions = [
  { id: "Pending", label: "Pending", icon: otherIcons.active_svg },
  { id: "Approved", label: "Approved", icon: otherIcons.inactive_svg },
  { id: "Declined", label: "Declined", icon: otherIcons.resigned_svg },
];

export const filterLeavesTypeOptions = [
  { id: "0", label: "Active", icon: otherIcons.active_svg },
  { id: "1", label: "Inactive", icon: otherIcons.inactive_svg },
 
];

export const filterProjectStatusOptions = [
  { id: "Ongoing", label: "Ongoing", icon: otherIcons.resigned_svg },
  { id: "Completed", label: "Completed", icon: otherIcons.active_svg },
  { id: "On Hold", label: "On Hold", icon: otherIcons.terminated_svg },
  { id: "Not Started", label: "Not Started", icon: otherIcons.notice_period_svg },
  { id: "Cancelled", label: "Cancelled", icon: otherIcons.inactive_svg },
];

export const filterPerformanceStatusOptions = [
  { id: "Approved", label: "Approved", icon: otherIcons.resigned_svg },
  { id: "Declined", label: "Declined", icon: otherIcons.active_svg },
  { id: "Pending", label: "Pending", icon: otherIcons.terminated_svg },
];


export const filterTicketOptions = [
  { id: "Pending", label: "Pending", icon: otherIcons.resigned_svg },
  { id: "Approved", label: "Approved", icon: otherIcons.active_svg },
  { id: "Rejected", label: "Rejected", icon: otherIcons.inactive_svg },
];
