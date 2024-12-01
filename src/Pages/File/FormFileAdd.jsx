import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { file_notify_allOptions, FileTypeOptions, addMoreOptions } from "../../utils/Constant.js";
import { getEmployeeList } from "../../Redux/Actions/employeeActions.js";
import { getClientList } from "../../Redux/Actions/clientActions.js";
import SelectDropdown from "../../utils/common/SelectDropdown.jsx";
import { useRef } from "react";
import TextAreaWithLimit from "../../utils/common/TextAreaWithLimit.jsx";
import { otherIcons } from "../../components/Helper/icons.jsx";
import { ToastContainer } from "react-toastify";
import DatePicker from '../../utils/Form/DatePicker.jsx';
import { ImageUpload } from '../../components/MultiImageUpload.jsx';
import SubmitButton from "../../utils/common/SubmitButton.jsx";
import MultiSelectDropdown2 from "../../utils/common/MultiSelectDropdown2.jsx";
import { getDepartmentList } from "../../Redux/Actions/departmentActions.js";
import { createNewFile, getFileDetails } from "../../Redux/Actions/fileActions.js";
import MultiSelectDropdown from "../../utils/common/MultiSelectDropdown.jsx";

const FormFileAdd = ({ onSubmit }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();

    const createUpdateFile = useSelector((state) => state?.createFile);

    const fileLeaderData = useSelector((state) => state?.employeeList);
    const fileLeaderLists = fileLeaderData?.data?.result || [];


    const fileData = useSelector((state) => state?.fileDetails);
    const fileDetail = fileData?.data?.myfile;
    console.log('fileDetail', fileDetail)

    const departmentData = useSelector((state) => state?.departmentList);
    const departmentLists = departmentData?.data?.department || [];

    const fileDetailLoading = fileData?.loading || false;
    const debounceTimeoutRef = useRef(null); // Store debounce timeout reference

    // Fetch data based on current state
    const fetchEmployee = (search = "") => {
        const sendData = { employee_status: "Active" };
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

    const handleSearch = (value, type) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current); // Clear previous timeout
        }
        if (value.trim().length > 0 || value.trim().length === 0) {
            debounceTimeoutRef.current = setTimeout(() => {
                if (type === "user_id") {
                    fetchEmployee(value);
                }
                else if (type === "department_id") {
                    fetchDepartments(value);
                }
            }, 800);
        }
    };

    useEffect(() => {
        fetchEmployee();
        dispatch(getDepartmentList());
    }, []);

    const [formData, setFormData] = useState({
        deadline_date: "",
        department_id: [],
        user_id: [],
        attachment: [],
        description: "",
        file_type: '',
        file_name: '',
        notify_all: '',
        notify_any_others: '',
    });

    //error handling
    const [errors, setErrors] = useState({
        file_name: false,
        file_type: false,
        attachment: false,
        notify_all: false,
        notify_any_others: false,
    })

    useEffect(() => {
        if (id) {
            const queryParams = {
                id: id,
            };
            dispatch(getFileDetails(queryParams));
            if (fileDetail) {
                const teamMembers2 = fileDetail?.user_id ? JSON.parse(fileDetail.department_id) : [];
                const teamMembers = fileDetail?.user_id ? JSON.parse(fileDetail.user_id) : [];
                const notify_any_others = JSON.parse(fileDetail.notify_any_others)  /// fileDetail?.notify_any_others?.split(", ").map(skill => skill.trim());
                setSelectedNotify(notify_any_others);
                setFormData({
                    ...formData,
                    // user_id: fileDetail?.user_id?.id,
                    user_id: teamMembers,
                    department_id: teamMembers2,
                    notify_any_others: fileDetail?.notify_any_others || "",
                    file_name: fileDetail?.file_name || "",
                    start_date: fileDetail?.start_date || "",
                    notify_all: fileDetail?.notify_all || "",
                    deadline_date: fileDetail?.deadline_date || "",
                    file_leader: fileDetail?.file_leader || "",
                    file_type: fileDetail?.file_type || "",
                    rate: fileDetail?.rate || "",
                    attachment: JSON.parse(fileDetail?.attachment || '[]'),
                    status: fileDetail?.status || "",
                    description: fileDetail?.description || "",
                    fileDetail: fileDetail?.fileDetail,
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
        setErrors((prevData) => ({
            ...prevData,
            [name]: false,
        }));
        if (name === "file_name") {
            setErrors((prevData) => ({
                ...prevData,
                file_name: false,
            }));
        }
        if (name === "file_type") {
            setErrors((prevData) => ({
                ...prevData,
                file_type: false,
            }));
        }
    };

    const handleSelect = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrors((prevData) => ({
            ...prevData,
            [name]: false,
        }));

        if (name === "file_type") {
            setFormData((prevData) => ({
                ...prevData,
                file_type: value,
            }));
            setErrors((prevData) => ({
                ...prevData,
                file_type: false,
            }));
        }
        if (name === "notify_all") {
            setFormData((prevData) => ({
                ...prevData,
                notify_all: value,
            }));
            setErrors((prevData) => ({
                ...prevData,
                notify_all: false,
            }));
        }
        if (name === "department_id") {
            setFormData((prevData) => ({
                ...prevData,
                department_id: value,
            }));
            setErrors((prevData) => ({
                ...prevData,
                department_id: false,
            }));
        }
    };
    const validateEmails = (emails) => {
        const emailArray = emails.split(',').map((email) => email.trim());
        console.log("emailArray", emailArray);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailArray.every((email) => emailRegex.test(email));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        let newErrors = {
            file_type: formData?.file_type ? false : true,
            file_name: formData?.file_name ? false : true,
            attachment: formData?.attachment?.length > 0 ? false : true,
            notify_all: formData?.notify_all ? false : true,
            notify_any_others: formData?.notify_any_others && !validateEmails(formData?.notify_any_others) ? true : false,
            
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
            dispatch(createNewFile(formDataToSubmit, navigate))

        }
    };

    const [isUploading, setIsUploading] = useState(false);
    const handleDateChange = (name, date) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: date,
        }));
    };
    const [selectedNotify, setSelectedNotify] = useState([]);

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            notify_any_others: selectedNotify,
        }));
    }, [selectedNotify]);

    const handleSkillSelect = (skill) => {
        if (!selectedNotify.includes(skill)) {
            setSelectedNotify([...selectedNotify, skill]);
        }
    };

    const handleSkillRemove = (skill) => {
        setSelectedNotify(selectedNotify.filter(item => item !== skill));
    };

    const handleAddCustomSkill = (skill) => {
        const newSkill = skill?.trim();
        if (
            newSkill &&
            !selectedNotify.includes(newSkill) &&
            !addMoreOptions.includes(newSkill)
        ) {
            setSelectedNotify([...selectedNotify, skill]);
        }
    };
   
    return (
        <>
            <div className="" onSubmit={onSubmit}>
                <form onSubmit={handleSubmit}>
                    <div id="form">
                        <div className="from1">
                            <div className="form-group">
                                <label>File Type <b className='color_red'>*</b></label>
                                <SelectDropdown
                                    selectedValue={formData?.file_type}
                                    options={FileTypeOptions?.map((item, index) => ({
                                        id: index,
                                        name: item,
                                    }))}
                                    placeholder="Select File Type"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search File Type"
                                    handleSearch={handleSearch}
                                    type="file_type"
                                    loading={false}
                                    showSearchBar={false}
                                    className={errors?.file_type ? "select-dropdown-error" : ""}
                                />
                                {errors?.file_type && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Select File Type
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label >File Name<b className='color_red'>*</b></label>
                                <input
                                    type="text"
                                    placeholder="Enter File Name"
                                    name="file_name"
                                    value={formData?.file_name}
                                    onChange={handleChange}
                                    style={{ border: errors?.file_name ? "1px solid red" : "" }}
                                />
                                {errors?.file_name && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Fill File Name
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Attachment<b className='color_red'>*</b></label>
                                <ImageUpload
                                    formData={formData}
                                    setFormData={setFormData}
                                    fieldName="attachment"
                                    isUploading={isUploading}
                                    setIsUploading={setIsUploading}
                                    setError={setErrors}
                                    style={{ border: errors?.attachment ? "1px solid red" : "" }}
                                />
                                {errors?.attachment && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Upload Attachment
                                    </p>
                                )}
                            </div>
                            <DatePicker label="Deadline" onDateChange={handleDateChange} initialDate={formData?.deadline_date} type="deadline_date" />

                            <div className="form-group">
                                <label>Notify All<b className='color_red'>*</b></label>
                                <SelectDropdown
                                    selectedValue={formData?.notify_all}
                                    options={file_notify_allOptions?.map((item, index) => ({
                                        id: index,
                                        name: item,
                                    }))}
                                    placeholder="Select Notify"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search File Type"
                                    handleSearch={handleSearch}
                                    type="notify_all"
                                    loading={false}
                                    showSearchBar={false}
                                    className={errors?.notify_all ? "select-dropdown-error" : ""}
                                />
                                {errors?.notify_all && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Select Notify All
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Notify Any Others On Email</label>
                                {/* <MultiSelectDropdown
                                    options={addMoreOptions}
                                    selectedItems={selectedNotify}
                                    onItemSelect={handleSkillSelect}
                                    onItemRemove={handleSkillRemove}
                                    placeholder="Add Email"
                                    searchPlaceholder="Search Email & Enter New Email"
                                    allowCustomOption={true}
                                    onAddCustomOption={handleAddCustomSkill}
                                /> */}
                                 <input
                                    type="text"
                                    placeholder="Enter emails separated by commas"
                                    name="notify_any_others"
                                    value={formData?.notify_any_others}
                                    onChange={handleChange}
                                    style={{ border: errors?.notify_any_others ? "1px solid red" : "" }}
                                />
                                  {errors?.notify_any_others && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Invalid email(s) provided
                                    </p>
                                )}
                            </div>
                            {formData.file_type === "Employee" && (
                                <div className="form-group">
                                    <label>Add Employee<b className='color_red'></b></label>
                                    <MultiSelectDropdown2
                                        selectedValue={formData?.user_id || []}
                                        options={fileLeaderLists.map((item) => ({
                                            id: item?.id,
                                            name: item?.first_name + " " + item?.last_name,
                                        }))}
                                        placeholder="Select Employee Members"
                                        onSelect={handleSelect}
                                        searchPlaceholder="Search Employee"
                                        handleSearch={handleSearch}
                                        type="user_id"
                                        loading={fileLeaderData?.loading}
                                        showSearchBar={true}
                                    />
                                </div>
                            )}
                            {formData.file_type === "Organization" && (
                                <div className="form-group">
                                    <label>Department<b className='color_red'></b></label>
                                    <MultiSelectDropdown2
                                        selectedValue={formData?.department_id || []}
                                        options={departmentLists.map((item) => ({
                                            id: item?.id,
                                            name: item?.department_name,
                                        }))}
                                        placeholder="Select Department"
                                        onSelect={handleSelect}
                                        searchPlaceholder="Search department"
                                        handleSearch={handleSearch}
                                        type="department_id"
                                        loading={departmentData?.loading}
                                        showSearchBar={true}
                                    />
                                </div>
                            )}
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
                    <SubmitButton loading={createUpdateFile?.loading} navigate={"/file/employee"} nextSubmit="" showNext={false} id={id} />
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />
        </>
    );
};

export default FormFileAdd;
