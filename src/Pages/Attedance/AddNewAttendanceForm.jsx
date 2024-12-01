import './AddNewAttendanceForm.scss';
import { useState, useEffect, useRef } from 'react';
import DatePicker from '../../utils/Form/DatePicker';
import TimeClockPicker from '../../utils/Form/TimeClockPicker';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeList } from '../../Redux/Actions/employeeActions';
import SelectDropdown from '../../utils/common/SelectDropdown';
import { attendanceStatus } from '../../utils/Constant';
import { getShiftList } from '../../Redux/Actions/shiftActions';
import { createNewAttendance } from '../../Redux/Actions/attendanceActions';
import { otherIcons } from '../../components/Helper/icons';
import SubmitButtonPopup from '../../utils/common/SubmitButtonPopup ';
import { useNavigate } from "react-router-dom";


const AddNewAttendanceForm = ({ ClosePop, refBox, id, updateList, data }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Data from redux
    const createUpdateAttendance = useSelector((state) => state?.createAttendance);

    const employeeData = useSelector((state) => state?.employeeList);
    const employeeLists = employeeData?.data?.result || [];

    const shiftData = useSelector((state) => state?.shiftList);
    const shiftLists = shiftData?.data?.result || [];

    const fetchEmployee = (search = "") => {
        const sendData = {employee_status: "Active"};
        if (search) {
            sendData["search"] = search;
        }
        dispatch(getEmployeeList(sendData));
    };

    const fetchShift = (search = "") => {
        const sendData = {status: "0"};
        if (search) {
            sendData["search"] = search;
        }       
        dispatch(getShiftList(sendData));
    };

    const debounceTimeoutRef = useRef(null); // Store debounce timeout reference
    const handleSearch = (value, type) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current); // Clear previous timeout
        }
        if (value.trim().length > 0 || value.trim().length === 0) {
            debounceTimeoutRef.current = setTimeout(() => {
                if (type === "employee") {
                    fetchEmployee(value);
                }
                else if (type === "shift") {
                    fetchShift(value);
                }
            }, 800);
        }
    };

    useEffect(() => {
        fetchEmployee();
        fetchShift();
    }, []);

    const [formData, setFormData] = useState({
        user_id: data?.user_id ? data?.user_id : '',
        user_name: data?.user_name ? data?.user_name : '',
        date: data?.date ? data?.date : '',
        shift_id: data?.shift_id ? data?.shift_id : '',
        shift_name: data?.shift_name ? data?.shift_name : '',
        punch_in: data?.punch_in ? data?.punch_in : '',
        punch_out: data?.punch_out ? data?.punch_out : '',
        // overtime: '',
        status: data?.status ? data?.status : '0'
    });

    //error handling
    const [errors, setErrors] = useState({
        user_id: false,
        shift_id: false
    })

    const handleSelect = (name, value) => {
        if (name === "status") {
            setFormData((prevData) => ({
                ...prevData,
                status: value,
            }));
        }
        if (name === "employee") {
            const selectedEmployee = employeeLists?.find(item => item.user_id === value);
            if (selectedEmployee) {
                setFormData((prevData) => ({
                    ...prevData,
                    user_name: selectedEmployee?.first_name + ' ' + selectedEmployee?.last_name,
                    user_id: value,
                }));
            }
            setErrors((prevData) => ({
                ...prevData,
                user_id: false,
            }));
        }
        if (name === "shift") {
            const selectedShift = shiftLists?.find(item => item.id === value);
            if (selectedShift) {
                setFormData((prevData) => ({
                    ...prevData,
                    shift_name: selectedShift?.shift_name,
                    shift_id: value,
                }));
            }
            setErrors((prevData) => ({
                ...prevData,
                shift_id: false,
            }));
        };
    };

    const handleDateChange = (name, date) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: date,
        }));
    };

    const handleTimeChange = (name, time) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: time,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {
            user_id: formData?.user_id ? false : true,
            shift_id: formData?.shift_id ? false : true,
        };
        setErrors(newErrors);
        const hasAnyError = Object.values(newErrors).some((value) => value === true);
        if (hasAnyError) {
            return;
        }
        else {
            const formDataToSubmit = {
                ...formData,
            };
            if (id) {
                formDataToSubmit['id'] = id
            }
            dispatch(createNewAttendance(formDataToSubmit))
                .then((res) => {
                    if (res?.success) {
                        if (id) {
                            navigate('/all-attendance-list')
                            // const queryParams = {
                            //     id: id,
                            // };
                            // dispatch(getAttendanceDetails(queryParams));
                        }
                        else {
                            updateList((prev) => prev + 1);
                        }
                        ClosePop();
                    }
                })
                .catch((error) => {
                    console.log("error-", error);
                });
            // Close the popup after submission
        }
    };
    return (
        <div className='NewAttendance_main' >
            <div className="blurBG"></div>
            <div className="formDiv" >
                <div className="popForm">
                    <div className="Attendance_Head">
                        <h2>{id ? 'Edit Attendance' : 'New Attendance'}</h2>
                        <div className='close_icon' onClick={ClosePop}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <div id="employeeForm">
                                <div className="form-group">
                                    <label>Employee<b className='red'>*</b></label>
                                    <SelectDropdown
                                        selectedValue={formData?.user_id}
                                        options={employeeLists?.map((item) => ({
                                            id: item?.user_id,
                                            name: item?.first_name + ' ' + item?.last_name
                                        }))}
                                        placeholder="Select Employee"
                                        onSelect={handleSelect}
                                        searchPlaceholder="Search employee"
                                        handleSearch={handleSearch}
                                        type="employee"
                                        loading={employeeData?.loading}
                                        showSearchBar={true}
                                        className={errors?.user_id ? "select-dropdown-error" : ""}
                                    />
                                    {errors?.user_id && (
                                        <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                            {otherIcons.error_svg}
                                            Please Select Employee
                                        </p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Shift<b className='red'>*</b></label>
                                    <SelectDropdown
                                        selectedValue={formData?.shift_id}
                                        options={shiftLists?.map((item) => ({
                                            id: item?.id,
                                            name: item?.shift_name,
                                        }))}
                                        placeholder="Select Shift"
                                        onSelect={handleSelect}
                                        searchPlaceholder="Search shift"
                                        handleSearch={handleSearch}
                                        type="shift"
                                        loading={shiftData?.loading}
                                        showSearchBar={true}
                                        className={errors?.shift_id ? "select-dropdown-error" : ""}
                                    />
                                    {errors?.shift_id && (
                                        <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                            {otherIcons.error_svg}
                                            Please Select Shift
                                        </p>
                                    )}
                                </div>
                                <div className="form-group grupdate2">
                                    <label htmlFor="">Punch In</label>
                                    <TimeClockPicker
                                        onTimeChange={handleTimeChange}
                                        initialTime={formData?.punch_in}
                                        ampm={true}
                                        name="punch_in"
                                    />
                                </div>
                                {/* {errors?.user_id && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Select Employee
                                    </p>
                                )} */}
                                <div className="form-group grupdate2">
                                    <label htmlFor="">Punch Out</label>
                                    <TimeClockPicker
                                        onTimeChange={handleTimeChange}
                                        initialTime={formData?.punch_out}
                                        ampm={true}
                                        name="punch_out"
                                    />
                                </div>
                                <DatePicker label="Date" onDateChange={handleDateChange} initialDate={formData?.date} type="date" />

                                <div className="form-group">
                                    <label className=''>Status </label>
                                    <SelectDropdown
                                        selectedValue={formData?.status}
                                        options={attendanceStatus?.map((item) => ({
                                            id: item?.value,
                                            name: item?.label
                                        }))}
                                        placeholder="Select Status"
                                        onSelect={handleSelect}
                                        searchPlaceholder="Search Status"
                                        handleSearch={handleSearch}
                                        type="status"
                                        loading={false}
                                        showSearchBar={false}
                                        className={""}
                                    />
                                </div>
                                {/* <div className="buttons">
                                <button type="submit" className="submit-btn">Submit
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9b9b9b" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div> */}
                            </div>
                            <SubmitButtonPopup loading={createUpdateAttendance?.loading} id={id} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewAttendanceForm;
