import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getEmployeeList } from "../../Redux/Actions/employeeActions.js";
//send emp.. id get name
export const useGetNameById = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployeeList());
    }, [dispatch]);

    const employeeLists = useSelector((state) => state?.employeeList);
    const employeeList = employeeLists?.data?.result || [];

    // Find employee by ID
    const employee = employeeList.find((item) => item?.id === id);

    console.log("Employee List:", employeeLists);
    if (employee) {
        return `${employee.first_name} ${employee?.last_name}`;
    }
    return "-";
};
