import { useState, useEffect, useRef } from 'react';
import './AddEmloyee.scss';
import './NavbarForm.scss';
import { ImageUpload } from '../../../components/MultiImageUpload.jsx';
import DatePicker from '../../../utils/Form/DatePicker';
import { employeeStatusOptions, employmentOptions, experienceOptions, genderOptions, roleOptions, sourceOfHireOptions, maritalStatus } from '../../../utils/Constant.js';
import { otherIcons } from '../../../components/Helper/icons.jsx';
import SelectDropdown from '../../../utils/common/SelectDropdown.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartmentList } from '../../../Redux/Actions/departmentActions.js';
import { getDesignationList } from '../../../Redux/Actions/designationActions.js';
import { calculateAge } from '../../../utils/helper.js';
import SubmitButton from '../../../utils/common/SubmitButton.jsx';
import { getEmployeeList } from '../../../Redux/Actions/employeeActions.js';

const BasicDetailsForm = ({ onSubmit, next, formData, setFormData, id }) => {

    const dispatch = useDispatch();
    const createUpdateEmployee = useSelector((state) => state?.createEmployee);

    const departmentData = useSelector((state) => state?.departmentList);
    const departmentLists = departmentData?.data?.department || [];

    const designationData = useSelector((state) => state?.designationList);
    const designationLists = designationData?.data?.designation || [];

    const employeeData = useSelector((state) => state?.employeeList);
    const employeeLists = employeeData?.data?.result || [];

    // Fetch data based on current state
    const fetchDepartments = (search = "") => {
        const sendData = {};
        if (search) {
            sendData["search"] = search;
        }
        dispatch(getDepartmentList(sendData));
    };

    const fetchDesignation = (search = "") => {
        const sendData = {};
        if (search) {
            sendData["search"] = search;
        }
        dispatch(getDesignationList(sendData));
    };

    const fetchEmployee = (search = "") => {
        const sendData = {employee_status: "Active"};
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
                if (type === "department") {
                    fetchDepartments(value);
                }
                else if (type === "designation") {
                    fetchDesignation(value);
                }
                else if (type === "employee") {
                    fetchEmployee(value);
                }
            }, 800);
        }
    };
    useEffect(() => {
        fetchDepartments();
        fetchDesignation();
        fetchEmployee();
    }, []);

    const [isUploading, setIsUploading] = useState(false);
    //error handling
    const [errors, setErrors] = useState({
        first_name: false,
        last_name: false,
        email: false,
        mobile_no: false,
    })

    const handleDateChange = (name, date) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: date,
        }));
        if (name === "date_of_birth") {
            setFormData((prevState) => ({
                ...prevState,
                age: calculateAge(date),
            }));
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors((prevState) => ({
            ...prevState,
            [name]: false,
        }));
    };

    const handleSelect = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === "department") {
            setFormData((prevData) => ({
                ...prevData,
                department_id: value,
            }));
        }
        if (name === "role") {
            setFormData((prevData) => ({
                ...prevData,
                role_id: value,
            }));
        }
        if (name === "designation") {
            setFormData((prevData) => ({
                ...prevData,
                designation_id: value,
            }));
        }
        if (name === "employee") {
            setFormData((prevData) => ({
                ...prevData,
                // user_name: selectedEmployee?.first_name + ' ' + selectedEmployee?.last_name,
                reporting_manager_id: value,
            }));
            // const selectedEmployee = employeeLists?.find(item => item.user_id === value);
            // if (selectedEmployee) {
            // }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let newErrors = {
            first_name: formData?.first_name ? false : true,
            last_name: formData?.last_name ? false : true,
            email: formData?.email ? false : true,
            mobile_no: formData?.mobile_no ? false : true,
        };
        setErrors(newErrors);

        const hasAnyError = Object.values(newErrors).some((value) => value === true);
        if (hasAnyError) {
            return;
        }
        else {
            onSubmit(formData)
        }
    };

    const nextSumbit = (event) => {
        event.preventDefault();
        let newErrors = {
            first_name: formData?.first_name ? false : true,
            last_name: formData?.last_name ? false : true,
            email: formData?.email ? false : true,
            mobile_no: formData?.mobile_no ? false : true,
        };
        setErrors(newErrors);

        const hasAnyError = Object.values(newErrors).some((value) => value === true);
        if (hasAnyError) {
            return;
        }
        else {
            next(formData);
        }
    }

    return (
        <>
            <div className="" onSubmit={handleSubmit}>
                <form >
                    <div className="from1">
                        <div className="form-group">
                            <label>Profile Picture<b className='color_red'>*</b></label>
                            <ImageUpload
                                formData={formData}
                                setFormData={setFormData}
                                fieldName="image"
                                isUploading={isUploading}
                                setIsUploading={setIsUploading}
                                setError={setErrors}
                            />
                        </div>
                        <div className="form-group">
                            <label>First Name<b className='color_red'>*</b></label>
                            <input
                                type="text"
                                placeholder="Enter first name"
                                name="first_name"
                                value={formData?.first_name}
                                onChange={handleChange}
                                style={{ border: errors?.first_name ? "1px solid red" : "" }}
                            />
                            {errors?.first_name && (
                                <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                    {otherIcons.error_svg}
                                    Please Fill First Name
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Last Name<b className='color_red'>*</b></label>
                            <input
                                type="text"
                                placeholder="Enter last name"
                                name="last_name"
                                value={formData?.last_name}
                                onChange={handleChange}
                                style={{ border: errors?.last_name ? "1px solid red" : "" }}
                            />
                            {errors?.last_name && (
                                <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                    {otherIcons.error_svg}
                                    Please Fill Last Name
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Email ID<b className='color_red'>*</b></label>
                            <input
                                type="email"
                                placeholder="Enter email id"
                                name="email"
                                value={formData?.email}
                                onChange={handleChange}
                                style={{ border: errors?.email ? "1px solid red" : "" }}
                            />
                            {errors?.email && (
                                <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                    {otherIcons.error_svg}
                                    Please Fill Email
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Contact Number<b className='color_red'>*</b></label>
                            <input
                                type="number"
                                placeholder="Enter contact number"
                                name="mobile_no"
                                value={formData?.mobile_no}
                                onChange={handleChange}
                                style={{ border: errors?.mobile_no ? "1px solid red" : "" }}
                            />
                            {errors?.mobile_no && (
                                <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                    {otherIcons.error_svg}
                                    Please Fill Contact Number
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <DatePicker label="Date of Birth" onDateChange={handleDateChange} initialDate={formData?.date_of_birth} type="date_of_birth" />
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input
                                type="text"
                                placeholder={formData?.age == null ? 'Select Date of Birth' : formData?.age}
                                name="age"
                                value={formData?.age > 0 ? formData?.age + ' Year Old' : ''}
                                disabled
                                onChange={handleChange}
                            />
                        </div>
                        {/* Gender Dropdown */}
                        <div className="form-group">
                            <label>Gender</label>
                            <SelectDropdown
                                selectedValue={formData?.gender}
                                options={genderOptions.map((item, index) => ({
                                    id: index,
                                    name: item,
                                }))}
                                placeholder="Select Gender"
                                onSelect={handleSelect}
                                searchPlaceholder="Search gender"
                                handleSearch={handleSearch}
                                type="gender"
                                loading={false}
                                showSearchBar={false}
                                className={""}
                            />
                        </div>
                        {/* Reporting Manager Dropdown */}
                        <div className="form-group">
                            <label>Reporting Manager</label>
                            <SelectDropdown
                                selectedValue={formData?.reporting_manager_id}
                                options={employeeLists?.map((item, index) => ({
                                    id: item?.user_id,
                                    name: item?.first_name + ' ' + item?.last_name
                                }))}
                                placeholder="Select Reporting Manager"
                                onSelect={handleSelect}
                                searchPlaceholder="Search reporting manager"
                                handleSearch={handleSearch}
                                type="employee"
                                loading={employeeData?.loading}
                                showSearchBar={true}
                                className={""}
                            />
                        </div>
                    </div>
                    <div className="from1 form2">
                        {/* Department Dropdown */}
                        <div className="form-group">
                            <label>Department</label>
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
                                className={""}
                            />
                        </div>

                        <div className="form-group">
                            <label>Designation</label>
                            <SelectDropdown
                                selectedValue={formData?.designation_id}
                                options={designationLists.map((item) => ({
                                    id: item.id,
                                    name: item?.designation_name,
                                }))}
                                placeholder="Select Designation"
                                onSelect={handleSelect}
                                searchPlaceholder="Search designation"
                                handleSearch={handleSearch}
                                type="designation"
                                loading={designationData?.loading}
                                showSearchBar={true}
                                className={""}
                            />
                        </div>

                        <div className="form-group">
                            <label>Role</label>
                            <SelectDropdown
                                selectedValue={formData?.role_id}
                                options={roleOptions.map((item, index) => ({
                                    id: index,
                                    name: item,
                                }))}
                                placeholder="Select Role"
                                onSelect={handleSelect}
                                searchPlaceholder="Search role"
                                handleSearch={handleSearch}
                                type="role"
                                loading={false}
                                showSearchBar={false}
                                className={""}
                            />
                        </div>

                        <div className="form-group">
                            <DatePicker label="Date of Joining" onDateChange={handleDateChange} initialDate={formData?.joining_date} type="joining_date" />
                        </div>

                        <div className="form-group">
                            <label>Experience</label>
                            <SelectDropdown
                                selectedValue={formData?.experience}
                                options={experienceOptions?.map((item, index) => ({
                                    id: index,
                                    name: item,
                                }))}
                                placeholder="Select Experience"
                                onSelect={handleSelect}
                                searchPlaceholder="Search experience"
                                handleSearch={handleSearch}
                                type="experience"
                                loading={false}
                                showSearchBar={false}
                                className={""}
                            />
                        </div>
                        {/* Marital Status Dropdown */}
                        <div className="form-group">
                            <label>Marital Status</label>
                            <SelectDropdown
                                selectedValue={formData?.marital}
                                options={maritalStatus?.map((item, index) => ({
                                    id: index,
                                    name: item,
                                }))}
                                placeholder="Select Marital Status"
                                onSelect={handleSelect}
                                searchPlaceholder="Search status"
                                handleSearch={handleSearch}
                                type="marital"
                                loading={false}
                                showSearchBar={false}
                                className={""}
                            />
                        </div>
                        <div className="form-group">
                            <DatePicker label="Date of Exit" onDateChange={handleDateChange} initialDate={formData?.date_of_exit} type="date_of_exit" />
                        </div>

                        {/* Employment Type Dropdown */}
                        <div className="form-group">
                            <label>Employment Type</label>
                            <SelectDropdown
                                selectedValue={formData?.employment_type}
                                options={employmentOptions?.map((item, index) => ({
                                    id: index,
                                    name: item,
                                }))}
                                placeholder="Select Employment Type"
                                onSelect={handleSelect}
                                searchPlaceholder="Search..."
                                handleSearch={handleSearch}
                                type="employment_type"
                                loading={false}
                                showSearchBar={false}
                                className={""}
                            />
                        </div>

                        {/* Employee Status Dropdown */}
                        <div className="form-group">
                            <label>Employee Status</label>
                            <SelectDropdown
                                selectedValue={formData?.employee_status}
                                options={employeeStatusOptions?.map((item, index) => ({
                                    id: index,
                                    name: item,
                                }))}
                                placeholder="Select Employee Status"
                                onSelect={handleSelect}
                                searchPlaceholder="Search employee status"
                                handleSearch={handleSearch}
                                type="employee_status"
                                loading={false}
                                showSearchBar={false}
                                className={""}
                            />
                        </div>

                        {/* Source of Hire Dropdown */}
                        <div className="form-group">
                            <label>Source of Hire</label>
                            <SelectDropdown
                                selectedValue={formData?.source_of_hire}
                                options={sourceOfHireOptions?.map((item, index) => ({
                                    id: index,
                                    name: item,
                                }))}
                                placeholder="Select Source"
                                onSelect={handleSelect}
                                searchPlaceholder="Search source"
                                handleSearch={handleSearch}
                                type="source_of_hire"
                                loading={false}
                                showSearchBar={false}
                                className={""}
                            />
                        </div>
                    </div>
                    < SubmitButton loading={createUpdateEmployee?.loading} navigate={"/all-employee-list"} nextSubmit={nextSumbit} showNext={true} id={id} />
                </form>
            </div>
            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="error"
            /> */}
        </>
    );
};
export default BasicDetailsForm;
// 