// webUsageStats.js

export const DepartmentSummary = [
    { label: 'Operations', value: 100 },
    { label: 'Maintenance', value: 60 },
    { label: 'Manning', value: 10 },
    { label: 'HR ', value: 10 },
    { label: 'Engineering', value: 5 },
    { label: 'IT', value: 25 },
];

export const DesignationSummary = [
    { label: 'Manager', value: 20 },
    { label: 'Engineer', value: 30 },
    { label: 'Technician', value: 25 },
    { label: 'Support', value: 15 },
    { label: 'Admin', value: 10 },
];

// New Age Group Summary
export const AgeGroupSummary = [
    { label: '15-20', value: 30 },
    { label: '21-25', value: 40 },
    { label: '26-30', value: 50 },
    { label: '31-35', value: 20 },
    { label: '36-40', value: 15 },
    { label: '41-50', value: 12 },
    { label: '51-60', value: 3 },
];

// New Gender Summary
export const GenderSummary = [
    { label: 'Male', value: 70 },
    { label: 'Female', value: 50 },
    { label: 'Other', value: 10 },
];

export const EmployeeAdditionTrend = [
    { month: 'January', additions: 5 },
    { month: 'February', additions: 10 },
    { month: 'March', additions: 15 },
    { month: 'April', additions: 20 },
    { month: 'May', additions: 25 },
    { month: 'June', additions: 30 },
    { month: 'July', additions: 35 },
    { month: 'August', additions: 40 },
    { month: 'September', additions: 45 },
    { month: 'October', additions: 50 },
    { month: 'November', additions: 55 },
    { month: 'December', additions: 60 },
];

export const valueFormatter = (params) => `${params.value}`; // Update this line
