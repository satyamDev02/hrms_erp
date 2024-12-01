import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getEmployeeList } from '../../Redux/Actions/employeeActions';
import { createNewLeave, getLeaveDetails } from '../../Redux/Actions/leaveActions';
import { getLeaveTypeList } from '../../Redux/Actions/leaveMasterActions';
import SelectDropdown from '../../utils/common/SelectDropdown';
import SubmitButton from '../../utils/common/SubmitButton';
import TextAreaWithLimit from '../../utils/common/TextAreaWithLimit';
import { leaveOptions } from '../../utils/Constant';
import DatePicker from '../../utils/Form/DatePicker';
import { calculateDuration } from '../../utils/helper';
import '../Employee_onboarding/AddEmployee/AddEmloyee.scss';
import '../Employee_onboarding/AddEmployee/NavbarForm.scss';
import { otherIcons } from '../../components/Helper/icons';

const AddNewLeaveForm = ({ onSubmit }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    //Data from redux
    const leaveDetails = useSelector((state) => state?.leaveDetails);
    const leaveDetail = leaveDetails?.data?.result;

    const createUpdateLeave = useSelector((state) => state?.createLeave);

    const employeeData = useSelector((state) => state?.employeeList);
    const employeeLists = employeeData?.data?.result || [];

    const leaveTypeData = useSelector((state) => state?.leaveMasterList);
    const leaveTypeLists = leaveTypeData?.data?.result || [];

    const debounceTimeoutRef = useRef(null); // Store debounce timeout reference

    // Fetch data based on current state
    const fetchEmployees = (search = "") => {
        const sendData = {employee_status: "Active"};
        if (search) {
            sendData["search"] = search;
        }
        dispatch(getEmployeeList(sendData));
    };

    const fetchLeaveTypes = (search = "") => {
        const sendData = { status: "0" };
        if (search) {
            sendData["search"] = search;
        }
        dispatch(getLeaveTypeList(sendData));
    };

    const handleSearch = (value, type) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current); // Clear previous timeout
        }
        if (value.trim().length > 0 || value.trim().length === 0) {
            debounceTimeoutRef.current = setTimeout(() => {
                if (type === "employee") {
                    fetchEmployees(value);
                }
                else if (type === "leave_type") {
                    fetchLeaveTypes(value);
                }
            }, 800);
        }
    };

    useEffect(() => {
        fetchEmployees();
        fetchLeaveTypes();
    }, []);

    const [formData, setFormData] = useState({
        user_id: '',
        name: '',
        leave_type_id: '',
        leave_type_name: '',
        from_date: '',
        to_date: '',
        days: '',
        resion: '',
        type_of_leave: ''
    });

    //error handling
    const [errors, setErrors] = useState({
        user_id: false,
        leave_type_id: false,
        from_date: false,
        to_date: false,
        type_of_leave: false
    })

    useEffect(() => {
        if (id) {
            // if (!leaveDetail) {
            const queryParams = {
                id: id,
            };
            dispatch(getLeaveDetails(queryParams));
            // }
            if (leaveDetail) {
                setFormData({
                    ...formData,
                    user_id: leaveDetail?.user_id,
                    name: leaveDetail?.name ? leaveDetail?.name : '',
                    leave_type_id: leaveDetail?.leave_type_id,
                    leave_type_name: leaveDetail?.leave_type_name ? leaveDetail?.leave_type_name : '',
                    from_date: leaveDetail?.from_date ? leaveDetail?.from_date : '',
                    to_date: leaveDetail?.to_date ? leaveDetail?.to_date : '',
                    days: leaveDetail?.days ? leaveDetail?.days : '',
                    resion: leaveDetail?.resion ? leaveDetail?.resion : '',
                    type_of_leave: leaveDetail?.type_of_leave ? leaveDetail?.type_of_leave : ''
                })
            }
        }
    }, [id]);

    const handleSelect = (name, value) => {
        if (name === "type_of_leave") {
            setFormData((prevData) => ({
                ...prevData,
                type_of_leave: value,
            }));
            setErrors((prevData) => ({
                ...prevData,
                type_of_leave: false,
            }));
        }
        if (name === "employee") {
            const selectedEmployee = employeeLists?.find(item => item.user_id === value);
            if (selectedEmployee) {
                setFormData((prevData) => ({
                    ...prevData,
                    name: `${selectedEmployee?.first_name} ${selectedEmployee?.last_name}`,
                    user_id: value
                }));
            }
            setErrors((prevData) => ({
                ...prevData,
                user_id: false,
            }));
        }
        if (name === "leave_type") {
            const selectedLeave = leaveTypeLists?.find(item => item.id === value);
            if (selectedLeave) {
                setFormData((prevData) => ({
                    ...prevData,
                    leave_type_name: `${selectedLeave?.leave_type}`,
                    leave_type_id: value
                }));
            }
            setErrors((prevData) => ({
                ...prevData,
                leave_type_id: false,
            }));
        }
    };

    // Helper function to update date
    const updateFormData = (name, date, calculatedDays) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: date,
            days: calculatedDays,
        }));
        setErrors((prevState) => ({ ...prevState, [name]: false }));
    };

    const handleDateChange = (name, date) => {
        const { from_date, to_date } = formData;

        // Parse the input date and existing form dates into valid Date objects
        const parsedDate = new Date(date.split('-').reverse().join('-')); // Convert DD-MM-YYYY to YYYY-MM-DD
        const parsedFromDate = from_date ? new Date(from_date.split('-').reverse().join('-')) : null;
        const parsedToDate = to_date ? new Date(to_date.split('-').reverse().join('-')) : null;

        if (name === "from_date") {
            if (parsedToDate && parsedDate > parsedToDate) {
                toast.error("Start date cannot be later than the end date.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
            const calculateDate = calculateDuration(date, to_date);
            updateFormData(name, date, calculateDate);
        }
        if (name === "to_date") {
            if (parsedFromDate && parsedDate < parsedFromDate) {
                toast.error("End date cannot be earlier than the start date.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
            const calculateDate = calculateDuration(from_date, date);
            updateFormData(name, date, calculateDate);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newErrors = {
            user_id: formData?.user_id ? false : true,
            leave_type_id: formData?.leave_type_id ? false : true,
            from_date: formData?.from_date ? false : true,
            to_date: formData?.to_date ? false : true,
            type_of_leave: formData?.type_of_leave ? false : true
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
            dispatch(createNewLeave(formDataToSubmit, navigate))
            // .then((res) => {
            //   if (res?.success) {
            //     setTimeout(() => {
            //       navigate("/all-job-list");
            //     }, 1500);
            //   }
            // })
            //   .catch((error) => {
            //     console.log("error-", error);
            //   });
        }
    };

    // if (createUpdateLeave?.loading) {
    //     return <div id='notFounPageID'><img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="loading" /></div>;
    // }

    return (
        <>
            <div className="" onSubmit={onSubmit}>
                <form onSubmit={handleSubmit}>
                    <div id='form'>
                        <div className="from1">
                            <div className="form-group">
                                <label>Employee Name<b className='color_red'>*</b></label>
                                <SelectDropdown
                                    selectedValue={formData?.user_id}
                                    options={employeeLists?.map((item, index) => ({
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

                            {/* Leave Type Dropdown */}
                            <div className="form-group">
                                <label>Leave Type<b className='color_red'>*</b></label>
                                <SelectDropdown
                                    selectedValue={formData?.leave_type_id}
                                    options={leaveTypeLists?.map((item, index) => ({
                                        id: item?.id,
                                        name: item?.leave_type
                                    }))}
                                    placeholder="Select Leave Type"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search Leave Type"
                                    handleSearch={handleSearch}
                                    type="leave_type"
                                    loading={leaveTypeData?.loading}
                                    showSearchBar={true}
                                    className={errors?.leave_type_id ? "select-dropdown-error" : ""}
                                />
                                {errors?.user_id && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Select Employee
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label >Type*</label>
                                <SelectDropdown
                                    selectedValue={formData?.type_of_leave}
                                    options={leaveOptions?.map((item, index) => ({
                                        id: index,
                                        name: item
                                    }))}
                                    placeholder="Select Type"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search..."
                                    handleSearch={handleSearch}
                                    type="type_of_leave"
                                    loading={false}
                                    showSearchBar={false}
                                    className={errors?.type_of_leave ? "select-dropdown-error" : ""}
                                />
                                {errors?.type_of_leave && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Select Type
                                    </p>
                                )}
                            </div>

                            <DatePicker label="Start Date" onDateChange={handleDateChange} initialDate={formData?.from_date} type="from_date" error={errors?.from_date} required={true} />
                            <DatePicker label="End Date" onDateChange={handleDateChange} initialDate={formData?.to_date} type="to_date" error={errors?.to_date} required={true} />

                            <div className="form-group">
                                <label>Duration</label>
                                <input type="text"
                                    name="days"
                                    placeholder='Select Start and End Date'
                                    disabled
                                    value={formData?.days}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div id='Description' className='DescriptionJob'>
                            <div className="form-group">
                                <label>Reason</label>
                                <TextAreaWithLimit
                                    formsValues={{ handleChange, formData }}
                                    placeholder="Enter Reason"
                                    name="resion"
                                    value={formData?.resion}
                                />
                            </div>
                        </div>
                    </div>
                    <SubmitButton loading={createUpdateLeave?.loading} navigate={"/all-leave"} nextSubmit="" showNext={false} id={id} />
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="error"
            />
        </>
    );
};

export default AddNewLeaveForm;
