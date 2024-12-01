import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { assignNewShift, getShiftList } from '../../Redux/Actions/shiftActions';
import DatePicker from '../../utils/Form/DatePicker';
import TimeClockPicker from '../../utils/Form/TimeClockPicker';
import './AddNewAssignShiftForm.scss';
import { getDepartmentList, getEmpDepartmentDetails } from '../../Redux/Actions/departmentActions';
import SelectDropdown from '../../utils/common/SelectDropdown';
import { otherIcons } from '../../components/Helper/icons';
import SubmitButtonPopup from '../../utils/common/SubmitButtonPopup ';

const NewAssignShift = ({ ClosePop, updateList, editData }) => {

    const dispatch = useDispatch();
    const assignShift = useSelector((state) => state?.assignShift);

    const departmentData = useSelector((state) => state?.departmentList);
    const departmentLists = departmentData?.data?.department || [];

    //empDepartment list from redux
    const employeeData = useSelector((state) => state?.empDepartmentDetails);
    const employeeLists = employeeData?.data?.getDepartmentEmp || [];

    //shift list from redux
    const shiftData = useSelector((state) => state?.shiftList);
    const shiftLists = shiftData?.data?.result || [];

    // Fetch data based on current state
    const fetchDepartments = (search = "") => {
        const sendData = {};
        if (search) {
            sendData["search"] = search;
        }
        dispatch(getDepartmentList(sendData));
    };

    const fetchShifts = (search = "") => {
        const sendData = { status: "0" };
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
                if (type === "department") {
                    fetchDepartments(value);
                }
            }, 800);
        }
    };

    useEffect(() => {
        fetchDepartments();
        fetchShifts();
        if (editData?.department_id) {
            const queryParams = {
                department_id: editData?.department_id,
            };
            dispatch(getEmpDepartmentDetails(queryParams));
        }
    }, []);

    const [formData, setFormData] = useState({
        department_id: editData?.department_id,
        user_id: editData?.user_id,
        shifts: [
            {
                start_date: editData?.start_date,
                end_date: 'null',
                shift_id: editData?.shift_id,
                shift_name: editData?.shift_name,
                start_time: editData?.start_time,
                end_time: editData?.end_time,
            },
        ],
        // status: false,// Active/Inactive
        // extra_hours: false
    });

    //error handling
    const [errors, setErrors] = useState({
        department_id: false,
        user_id: false,
        shift_id: false,
        start_date: false,
        // end_date: false,
        start_time: false,
        end_time: false
    });

    const handleSelect = (name, value) => {
        if (name === "department") {
            setFormData((prevData) => ({
                ...prevData,
                department_id: value,
            }));
            const queryParams = {
                department_id: value,
            };
            dispatch(getEmpDepartmentDetails(queryParams));
            setErrors((prevData) => ({
                ...prevData,
                department_id: false,
            }));
        }
        if (name === "employee") {
            setFormData((prevData) => ({
                ...prevData,
                user_id: value,
            }));
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
                    shifts: [
                        {
                            ...prevData.shifts[0],
                            shift_id: value,
                            shift_name: selectedShift?.shift_name,
                            start_time: selectedShift?.start_time,
                            end_time: selectedShift?.end_time,
                        },
                    ],
                }));
            }
            setErrors((prevData) => ({
                ...prevData,
                shift_id: false,
                start_time: false,
                end_time: false
            }));
        }
    };

    const handleDateChange = (name, date) => {
        setFormData((prevData) => ({
            ...prevData,
            shifts: [
                {
                    ...prevData.shifts[0],
                    [name]: date
                },
            ],
        }));
        setErrors((prevData) => ({
            ...prevData,
            [name]: false,
        }));
    };

    const handleTimeChange = (name, time) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: time,
        }));
        setErrors((prevData) => ({
            ...prevData,
            [name]: false,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {
            department_id: formData?.department_id ? false : true,
            user_id: formData?.user_id ? false : true,
            shift_id: formData?.shifts[0]?.shift_id ? false : true,
            start_date: formData?.shifts[0]?.start_date ? false : true,
            // end_date: formData?.shifts[0]?.end_date ? false : true,
            start_time: formData?.shifts[0]?.start_time ? false : true,
            end_time: formData?.shifts[0]?.end_time ? false : true
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
            if (editData?.id) {
                formDataToSubmit['id'] = editData?.id
                formDataToSubmit.shifts[0]['id'] = editData?.shiftId
            }            
            dispatch(assignNewShift(formDataToSubmit)).then((res) => {
                if (res.success) {
                    updateList((prev) => prev + 1);
                    ClosePop();
                }
            })
                .catch((error) => {
                    console.log("error-", error);
                });
        }
    };

    return (
        <div className='NewAttendance_main'>
            <div className="blurBG"></div>
            <div className="formDivLeave">
                <div className="popForm_a_Assign">
                    <div className="Attendance_Head">
                        <h2>{editData?.id ? 'Edit' : 'New Assign Shift'}</h2>
                        <div className='close_icon' onClick={ClosePop}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="form-container-Leave" onSubmit={handleSubmit}>
                        <form >
                            <div id="employeeFormLeave">
                                <div className="form-group">
                                    <label>
                                        Department<b className="color_red">*</b>
                                    </label>
                                    <SelectDropdown
                                        selectedValue={formData?.department_id}
                                        options={departmentLists.map((item) => ({
                                            id: item?.id,
                                            name: item?.department_name,
                                        }))}
                                        placeholder="Select Department"
                                        onSelect={handleSelect}
                                        searchPlaceholder="Search Department"
                                        handleSearch={handleSearch}
                                        type="department"
                                        loading={departmentData?.loading}
                                        showSearchBar={true}
                                        className={
                                            errors?.department_id ? "select-dropdown-error" : ""
                                        }
                                        disabled={editData?.department_id ? true : false}
                                    />
                                    {errors?.department_id && (
                                        <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                            {otherIcons.error_svg}
                                            Please Select Department
                                        </p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Employee<b className='red'>*</b></label>
                                    <SelectDropdown
                                        selectedValue={formData?.user_id}
                                        options={!formData?.department_id ? [] : employeeLists?.map((item) => ({
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
                                        disabled={editData?.user_id ? true : false}
                                    />
                                    {errors?.user_id && (
                                        <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                            {otherIcons.error_svg}
                                            Please Select Employee
                                        </p>
                                    )}
                                </div>
                                <DatePicker label="Date" onDateChange={handleDateChange} initialDate={formData?.shifts[0]?.start_date} type="start_date" error={errors?.start_date} required={true} restrict={true}/>
                                {/* <DatePicker label="End Date" onDateChange={handleDateChange} initialDate={formData?.shifts[0]?.end_date} type="end_date" error={errors?.end_date} required={true} /> */}
                                <div className="form-group">
                                    <label>Shift<b className='color_red'>*</b></label>
                                    <SelectDropdown
                                        selectedValue={formData?.shifts[0]?.shift_id}
                                        options={shiftLists?.map((item) => ({
                                            id: item?.id,
                                            name: item?.shift_name
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
                                    <label htmlFor="">Start Time</label>
                                    <TimeClockPicker
                                        onTimeChange={handleTimeChange}
                                        initialTime={formData?.shifts[0]?.start_time}
                                        ampm={true}
                                        name="start_time"
                                        error={errors?.start_time}
                                        disabled={true}
                                    />
                                </div>
                                <div className="form-group grupdate2">
                                    <label>End Time</label>
                                    <TimeClockPicker
                                        onTimeChange={handleTimeChange}
                                        initialTime={formData?.shifts[0]?.end_time}
                                        ampm={true}
                                        name="end_time"
                                        error={errors?.end_time}
                                        disabled={true}
                                    />
                                </div>
                                {/* <div className="form-group">
                                    <label className=''>Accept Extra Hours </label>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            id="extra_hours"
                                            checked={formData.extra_hours}
                                            onChange={handleChange}
                                            required
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label className=''>Publish</label>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            id="status"
                                            checked={formData.status}
                                            onChange={handleChange}
                                            required
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div> */}
                            </div>
                            {/* Submit Button */}
                            <SubmitButtonPopup loading={assignShift?.loading} id={editData?.id} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewAssignShift; ``