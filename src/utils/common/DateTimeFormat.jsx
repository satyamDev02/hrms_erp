//show date in ( dd/month name/yy) format
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

//day
export const formatDay = (date) => {
  return new Date(date).toLocaleDateString("en-GB", { weekday: "long" });
};

//show date in yy/mm/dd
export const formatDate2 = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

//overtimeCalculate
export const calculateOvertime = (totalHoursWorked) => {
    // Check if the input is a valid string
    if (typeof totalHoursWorked !== 'string' || !totalHoursWorked.trim()) {
      return "Invalid data"; // Return a default message if input is not a valid string
    }
  
    // Regex to match the hours and minutes from the string
    const match = totalHoursWorked.match(/(\d+)\s*Hrs\s*and\s*(\d+)\s*min/);
  
    // If the string doesn't match the expected format, return an error message
    if (!match) {
      return "Invalid data"; // Return a default message if input format is incorrect
    }
  
    const hoursWorked = parseInt(match[1], 10); // Extract hours as a number
    const minutesWorked = parseInt(match[2], 10); // Extract minutes as a number
  
    const standardHours = 8; // Standard workday in hours
    const totalMinutesWorked = (hoursWorked * 60) + minutesWorked; // Convert total hours and minutes worked to minutes
    const overtimeMinutes = totalMinutesWorked - (standardHours * 60); // Subtract 8 hours in minutes
  
    // If no overtime, return "0 hrs 0 min"
    if (overtimeMinutes <= 0) {
      return "0 hrs 0 min";
    }
  
    // Calculate overtime hours and minutes
    const overtimeHours = Math.floor(overtimeMinutes / 60);
    const overtimeRemainingMinutes = overtimeMinutes % 60;
  
    // Return the overtime in the format "X hrs Y min"
    return `${overtimeHours} hrs ${overtimeRemainingMinutes} min`;
  };
  
  
  export const formatDate3 = (date) => {
    if (!date || typeof date !== "string") return ""; // Return an empty string if date is undefined or not a string
    
    const [day, month, year] = date.split("-"); // Split the date string
    const parsedDate = new Date(`${year}-${month}-${day}`); // Reorder to YYYY-MM-DD
  
    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  