import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../components/Helper/icons.jsx";
import SubmitButton from "../../utils/common/SubmitButton.jsx";
import TextAreaWithLimit from "../../utils/common/TextAreaWithLimit.jsx";
import "../Employee_onboarding/AddEmployee/AddEmloyee.scss";
import "../Employee_onboarding/AddEmployee/NavbarForm.scss";
import DatePicker from '../../utils/Form/DatePicker.jsx';
import { calculateDuration } from '../../utils/helper.js';
import { createNewTrainer, getTrainerDetails } from "../../Redux/Actions/trainerActions.js";
import { getEmployeeList } from "../../Redux/Actions/employeeActions.js";
import SelectDropdown from "../../utils/common/SelectDropdown.jsx";

const AddNewTrainerForm = ({ onSubmit }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();

    //Data from redux
    const createUpdateTrainer = useSelector((state) => state?.createTrainer);
    const trainerData = useSelector((state) => state?.trainerDetails);
    const trainerDetail = trainerData?.data?.result;
    const trainersDetailLoading = trainerData?.loading || false;

    const employeeData = useSelector((state) => state?.employeeList);
    const employeeLists = employeeData?.data?.result || [];

    const fetchEmployee = (search = "") => {
        const sendData = { employee_status: "Active" };
        if (search) {
            sendData["search"] = search;
        }
        dispatch(getEmployeeList(sendData));
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
            }, 800);
        }
    };

    useEffect(() => {
        fetchEmployee();
    }, []);


    const [formData, setFormData] = useState({
        user_id: "",
        trainer_name: "",
        role: "",
        email: "",
        mobile_no: "",
        start_date: "",
        end_date: "",
        duration: "",
        trainig_type: "",
        trainer_cost: "",
        description: "",
    });

    //error handling
    const [errors, setErrors] = useState({
        user_id: false,
        email: false,
        trainig_type: false,
    });

    const handleSelect = (name, value) => {
        if (name === "employee") {
            const selectedEmployee = employeeLists?.find(item => item.user_id === value);
            if (selectedEmployee) {
                setFormData((prevData) => ({
                    ...prevData,
                    trainer_name: selectedEmployee?.first_name + ' ' + selectedEmployee?.last_name,
                    user_id: value,
                }));
            }
            setErrors((prevData) => ({
                ...prevData,
                user_id: false,
            }));
        }
    };

    useEffect(() => {
        if (id) {
            const queryParams = {
                id: id,
            };
            dispatch(getTrainerDetails(queryParams));
            if (trainerDetail) {
                setFormData({
                    ...formData,
                    user_id: trainerDetail?.user_id,
                    email: trainerDetail?.email || "",
                    description: trainerDetail?.description ? trainerDetail?.description : "",
                    trainig_type: trainerDetail?.trainig_type || "",
                    trainer_name: trainerDetail?.trainer_name || "",
                    mobile_no: trainerDetail?.mobile_no || "",
                    start_date: trainerDetail?.start_date || "",
                    end_date: trainerDetail?.end_date || "",
                    duration: trainerDetail?.duration || "",
                    trainer_cost: trainerDetail?.trainer_cost || "",
                    role: trainerDetail?.role || "",
                })
            }
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrors((prevState) => ({
            ...prevState,
            [name]: false,
        }));
    };

    const updateFormData = (name, date, calculatedDays) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: date,
            duration: calculatedDays,
        }));
    };

    const handleDateChange = (name, date) => {
        const { start_date, end_date } = formData;

        // Parse the input date and existing form dates into valid Date objects
        const parsedDate = new Date(date.split('-').reverse().join('-')); // Convert DD-MM-YYYY to YYYY-MM-DD
        const parsedFromDate = start_date ? new Date(start_date.split('-').reverse().join('-')) : null;
        const parsedToDate = end_date ? new Date(end_date.split('-').reverse().join('-')) : null;

        // Copy existing formData
        // const updatedFormData = { ...formData };
        // Update start_date or end_date
        // updatedFormData[name] = date;

        // Calculate duration when start_date or end_date is updated
        if (name === "start_date") {
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
            const calculateDate = calculateDuration(date, end_date);
            updateFormData(name, date, calculateDate);
        }
        if (name === "end_date") {
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
            const calculateDate = calculateDuration(start_date, date);
            updateFormData(name, date, calculateDate);
        }
        // Update state with new data
        // setFormData(updatedFormData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newErrors = {
            user_id: formData?.user_id ? false : true,
            trainig_type: formData?.trainig_type ? false : true,
            email: formData?.email ? false : true,
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
            dispatch(createNewTrainer(formDataToSubmit, navigate))
        }
    };

    return (
        <>
            <div className="" onSubmit={onSubmit}>
                <form onSubmit={handleSubmit}>
                    <div id="form">
                        <div className="from1">
                            <div className="form-group">
                                <label >Traniner Name<b className='color_red'>*</b></label>
                                <SelectDropdown
                                    selectedValue={formData?.user_id}
                                    options={employeeLists?.map((item) => ({
                                        id: item?.user_id,
                                        name: item?.first_name + ' ' + item?.last_name
                                    }))}
                                    placeholder="Select Traniner Name"
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
                                        Please Select Traniner Name
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label >Email ID<b className='color_red'>*</b></label>
                                <input
                                    type="text"
                                    placeholder="Enter Email ID"
                                    name="email"
                                    value={formData?.email}
                                    onChange={handleChange}
                                    style={{ border: errors?.email ? "1px solid red" : "" }}
                                />
                                {errors?.email && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Fill Email ID
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label >Training Type<b className='color_red'>*</b></label>
                                <input
                                    type="text"
                                    placeholder="Enter Training Type"
                                    name="trainig_type"
                                    value={formData?.trainig_type}
                                    onChange={handleChange}
                                    style={{ border: errors?.trainig_type ? "1px solid red" : "" }}
                                />
                                {errors?.trainig_type && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Fill Training Type
                                    </p>
                                )}
                            </div>
                            <DatePicker
                                label="Start Date"
                                onDateChange={handleDateChange}
                                initialDate={formData?.start_date}
                                type="start_date"
                            />
                            <DatePicker
                                label="End Date"
                                onDateChange={handleDateChange}
                                initialDate={formData?.end_date}
                                type="end_date"
                            />
                            <div className="form-group">
                                <label>Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData?.duration}
                                    readOnly
                                    placeholder="Select Start - End Date"
                                />
                            </div>
                            <div className="form-group">
                                <label >Contact Number<b className=''></b></label>
                                <input
                                    type="text"
                                    placeholder="Enter Contact Number"
                                    name="mobile_no"
                                    value={formData?.mobile_no}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label >Role<b className=''></b></label>
                                <input
                                    type="text"
                                    placeholder="Enter Role"
                                    name="role"
                                    value={formData?.role}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label >Trainer Cost</label>
                                <div className="input-wrapper">
                                    <span id="dollar-symbol">{formData?.trainer_cost && '$'}</span>
                                    <input
                                        type="number"
                                        placeholder="Enter Trainer Cost"
                                        name="trainer_cost"
                                        value={formData?.trainer_cost}
                                        onChange={handleChange}
                                        style={{
                                            paddingLeft: formData.trainer_cost ? '20px' : '10px'
                                        }}
                                        id='doller'
                                        min='0'
                                    />
                                </div>
                            </div>
                        </div>

                        <div id="Description" className="DescriptionJob">
                            <div className="form-group">
                                <label>Description</label>
                                <TextAreaWithLimit
                                    formsValues={{ handleChange, formData }}
                                    placeholder="Enter Description"
                                    name="description"
                                    value={formData?.description}
                                />
                            </div>
                        </div>
                    </div>
                    <SubmitButton loading={createUpdateTrainer?.loading} navigate={"/trainers"} nextSubmit="" showNext={false} id={id} />
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

export default AddNewTrainerForm;
