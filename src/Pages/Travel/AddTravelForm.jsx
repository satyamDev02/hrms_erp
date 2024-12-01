import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from '../../utils/Form/DatePicker';
import '../Employee_onboarding/AddEmployee/AddEmloyee.scss';
import '../Employee_onboarding/AddEmployee/NavbarForm.scss';
import SubmitButton from '../../utils/common/SubmitButton';
import { travelBillableOptions } from '../../utils/Constant';
import { getDepartmentList } from '../../Redux/Actions/departmentActions';
import { getEmployeeList } from '../../Redux/Actions/employeeActions';
import { createNewTravel, getTravelDetails } from '../../Redux/Actions/travelActions';
import { calculateDuration } from '../../utils/helper';
import SelectDropdown from '../../utils/common/SelectDropdown';
import { otherIcons } from '../../components/Helper/icons';

const AddTravelForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    //Data from redux
    const createUpdateTravel = useSelector((state) => state?.createTravel);
    const travelDetails = useSelector((state) => state?.travelDetails);
    const travelDetail = travelDetails?.data?.travel;

    const employeeData = useSelector((state) => state?.employeeList);
    const employeeLists = employeeData?.data?.result || [];

    const departmentData = useSelector((state) => state?.departmentList);
    const departmentLists = departmentData?.data?.department || [];

    const fetchEmployee = (search = "") => {
        const sendData = {employee_status: "Active"};
        if (search) {
            sendData["search"] = search;
        }
        dispatch(getEmployeeList(sendData));
    };

    // Fetch data based on current state
    const fetchDepartments = (search = "") => {
        const sendData = {};
        if (search) {
            sendData["search"] = search;
        }
        dispatch(getDepartmentList(sendData));
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
                } else if (type === "department") {
                    fetchDepartments(value);
                }
            }, 800);
        }
    };
    useEffect(() => {
        fetchEmployee();
        fetchDepartments();
    }, []);

    const [formData, setFormData] = useState({
        user_id: '',
        user_name: '',
        department_id: '',
        purposeofvisit: '',
        placeofvisit: '',
        expected_date_of_arrival: '',
        expected_date_of_departure: '',
        expected_duration_in_days: '',
        is_billable: '',
        customer_name: '',
    });

    //error handling
    const [errors, setErrors] = useState({
        user_id: false,
        department_id: false,
        expected_date_of_arrival: false,
        expected_date_of_departure: false,
        customer_name: false,
        // expected_duration_in_days: false
    })

    useEffect(() => {
        if (id) {
            // if (!leaveDetail) {
            const queryParams = {
                id: id,
            };
            dispatch(getTravelDetails(queryParams));
            // }
            if (travelDetail) {
                setFormData({
                    ...formData,
                    user_id: travelDetail?.user_id,
                    user_name: travelDetail?.user_name,
                    department_id: travelDetail?.department_id,
                    purposeofvisit: travelDetail?.purposeofvisit ? travelDetail?.purposeofvisit : '',
                    placeofvisit: travelDetail?.placeofvisit ? travelDetail?.placeofvisit : '',
                    expected_date_of_arrival: travelDetail?.expected_date_of_arrival,
                    expected_date_of_departure: travelDetail?.expected_date_of_departure,
                    expected_duration_in_days: travelDetail?.expected_duration_in_days ? travelDetail?.expected_duration_in_days : '',
                    is_billable: travelDetail?.is_billable,
                    customer_name: travelDetail?.customer_name,
                })
            }
        }
    }, [id]);

    const handleSelect = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === "employee") {
            const selectedEmployee = employeeLists?.find(item => item.user_id === value);
            if (selectedEmployee) {
                setFormData((prevData) => ({
                    ...prevData,
                    user_name: selectedEmployee?.first_name + ' ' + selectedEmployee?.last_name,
                    user_id: value
                }));
            }
            setErrors((prevData) => ({
                ...prevData,
                user_id: false,
            }));
        }
        if (name === "department") {
            setFormData((prevData) => ({
                ...prevData,
                department_id: value,
            }));
            setErrors((prevData) => ({
                ...prevData,
                department_id: false,
            }));
        };
    };

    // Helper function to update date
    const updateFormData = (name, date, calculatedDays) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: date,
            expected_duration_in_days: calculatedDays,
        }));
        setErrors((prevState) => ({ ...prevState, [name]: false }));
    };

    const handleDateChange = (name, date) => {
        const { expected_date_of_departure: from_date, expected_date_of_arrival: to_date } = formData;

        // Parse the input date and existing form dates into valid Date objects
        const parsedDate = new Date(date.split('-').reverse().join('-')); // Convert DD-MM-YYYY to YYYY-MM-DD
        const parsedFromDate = from_date ? new Date(from_date.split('-').reverse().join('-')) : null;
        const parsedToDate = to_date ? new Date(to_date.split('-').reverse().join('-')) : null;

        if (name === "expected_date_of_departure") {
            if (parsedToDate && parsedDate > parsedToDate) {
                toast.error("Departure date cannot be later than the arrival date.", {
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
        if (name === "expected_date_of_arrival") {
            if (parsedFromDate && parsedDate < parsedFromDate) {
                toast.error("Arrival date cannot be earlier than the departure date.", {
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
        if (name === "customer_name") {
            setErrors((prevData) => ({
                ...prevData,
                customer_name: false,
            }));
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        let newErrors = {
            user_id: formData?.user_id ? false : true,
            department_id: formData?.department_id ? false : true,
            expected_date_of_arrival: formData?.expected_date_of_arrival ? false : true,
            expected_date_of_departure: formData?.expected_date_of_departure ? false : true,
            // expected_duration_in_days: formData?.expected_duration_in_days ? false : true,
            customer_name: formData?.customer_name ? false : true
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
            dispatch(createNewTravel(formDataToSubmit, navigate))
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
                            {/* Department Dropdown */}
                            <div className="form-group">

                                <label>Department<b className='color_red'>*</b></label>
                                <SelectDropdown
                                    selectedValue={formData?.department_id}
                                    options={departmentLists.map((item) => ({
                                        id: item?.id,
                                        name: item?.department_name,
                                    }))}
                                    placeholder="Select Department"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search department"
                                    handleSearch={handleSearch}
                                    type="department"
                                    loading={departmentData?.loading}
                                    showSearchBar={true}
                                    className={errors?.department_id ? "select-dropdown-error" : ""}
                                />
                                {errors?.department_id && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Select Department
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Place of visit</label>
                                <input
                                    type="text"
                                    name="placeofvisit"
                                    placeholder='Enter Place of Visit'
                                    value={formData?.placeofvisit}
                                    onChange={handleChange} />
                            </div>

                            <DatePicker label="Expected date of departure" onDateChange={handleDateChange} initialDate={formData?.expected_date_of_departure} type="expected_date_of_departure" error={errors?.expected_date_of_departure} required={true} />
                            <DatePicker label="Expected date of arrival" onDateChange={handleDateChange} initialDate={formData?.expected_date_of_arrival} type="expected_date_of_arrival" error={errors?.expected_date_of_arrival} required={true} />

                            <div className="form-group">
                                <label>Expected duration in days</label>
                                <input
                                    type="text"
                                    name="expected_duration_in_days"
                                    placeholder='Expected duration in days'
                                    disabled
                                    value={formData?.expected_duration_in_days}
                                    onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Purpose of visit</label>
                                <input
                                    type="text"
                                    name="purposeofvisit"
                                    placeholder='Enter Visit Purpose'
                                    value={formData?.purposeofvisit}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Customer Name<b className='color_red'>*</b></label>
                                <div className="input-wrapper">
                                    {/* <span id="dollar-symbol">{formData.cost && '₹'}</span> */}
                                    <input
                                        type="text"
                                        name="customer_name"
                                        placeholder='Enter Customer Name'
                                        value={formData?.customer_name}
                                        onChange={handleChange}
                                        style={{ border: errors?.customer_name ? "1px solid red" : "" }}
                                    />
                                    {errors?.customer_name && (
                                        <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                            {otherIcons.error_svg}
                                            Please Fill Customer Name
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="form-group" >
                                <label>Is billable to customer</label>

                                <SelectDropdown
                                    selectedValue={formData?.is_billable}
                                    options={travelBillableOptions.map((item, index) => ({
                                        id: index,
                                        name: item,
                                    }))}
                                    placeholder="Select"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search..."
                                    handleSearch={handleSearch}
                                    type="is_billable"
                                    loading={false}
                                    showSearchBar={false}
                                    className={""}
                                />
                                <div className="box_red">
                                </div>
                            </div>
                        </div>
                    </div>
                    <SubmitButton loading={createUpdateTravel?.loading} navigate={"/travel"} nextSubmit="" showNext={false} id={id} />
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

export default AddTravelForm;
