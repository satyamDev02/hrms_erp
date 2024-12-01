import { useState, useEffect } from "react";
import "../../Employee_onboarding/AddEmployee/AddEmloyee.scss";
import "../../Employee_onboarding/AddEmployee/NavbarForm.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ProjectPriorityOptions } from "../../../utils/Constant.js";
import { getEmployeeList } from "../../../Redux/Actions/employeeActions.js";
import { getClientList } from "../../../Redux/Actions/clientActions.js";
import SelectDropdown from "../../../utils/common/SelectDropdown.jsx";
import { useRef } from "react";
import TextAreaWithLimit from "../../../utils/common/TextAreaWithLimit.jsx";
import { otherIcons } from "../../../components/Helper/icons.jsx";
import { ToastContainer } from "react-toastify";
import DatePicker from '../../../utils/Form/DatePicker.jsx';
import { MultiImageUpload } from '../../../components/MultiImageUpload.jsx';
import SubmitButton from "../../../utils/common/SubmitButton.jsx";
import { createNewProject, getProjectDetails } from "../../../Redux/Actions/projectActions.js";
import MultiSelectDropdown2 from "../../../utils/common/MultiSelectDropdown2.jsx";
import { getDepartmentList } from "../../../Redux/Actions/departmentActions.js";

const FormProjectAdd = ({ onSubmit }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();

    const createUpdateProject = useSelector((state) => state?.createProject);

    const projectLeaderData = useSelector((state) => state?.employeeList);
    const projectLeaderLists = projectLeaderData?.data?.result || [];

    const clientData = useSelector((state) => state?.clientList);
    const clientLists = clientData?.data?.result || [];

    const projectData = useSelector((state) => state?.projectDetails);
    const projectDetail = projectData?.data?.result;

    const departmentData = useSelector((state) => state?.departmentList);
    const departmentLists = departmentData?.data?.department || [];

    const projectDetailLoading = projectData?.loading || false;
    const debounceTimeoutRef = useRef(null); // Store debounce timeout reference

    // Fetch data based on current state
    const fetchEmployee = (search = "") => {
        const sendData = {employee_status: "Active"};
        if (search) {
            sendData["search"] = search;
        }
        dispatch(getEmployeeList(sendData));
    };

    const fetchClient = (search = "") => {
        const sendData = {status:"0"};
        if (search) {
            sendData["search"] = search;
        }
        dispatch(getClientList(sendData));
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
                if (type === "project_leader" || type === "team_id") {
                    fetchEmployee(value);
                }
                else if (type === "client_id") {
                    fetchClient(value);
                }
                else if (type === "department") {
                    fetchDepartments(value);
                }
            }, 800);
        }
    };

    useEffect(() => {
        fetchEmployee();
        fetchClient();
        dispatch(getDepartmentList());
    }, []);

    const [formData, setFormData] = useState({
        project_name: "",
        client_id: '',
        rate: "",
        start_date: "",
        end_date: "",
        project_leader: "",
        department_id: "",
        team_id: [],
        attachments: [],
        description: "",
        status: 'Ongoing',
    });

    //error handling
    const [errors, setErrors] = useState({
        project_name: false,
        client_id: false,
        project_leader: false,
        team_id: false,
        department_id: false
    })

    useEffect(() => {
        if (id) {
            const queryParams = {
                id: id,
            };
            dispatch(getProjectDetails(queryParams));
            if (projectDetail) {
                const teamMembers = projectDetail?.team_id ? JSON.parse(projectDetail.team_id) : [];
                setFormData({
                    ...formData,
                    // team_id: projectDetail?.team_id?.id,
                    team_id: teamMembers,
                    client_id: projectDetail?.client_id || "", // client_id from projectDetail
                    project_name: projectDetail?.project_name || "",
                    start_date: projectDetail?.start_date || "",
                    end_date: projectDetail?.end_date || "",
                    project_leader: projectDetail?.project_leader || "",
                    priority: projectDetail?.priority || "",
                    rate: projectDetail?.rate || "",
                    attachments: JSON.parse(projectDetail?.attachments || '[]'),
                    status: projectDetail?.status || "",
                    description: projectDetail?.description || "",
                    department_id: projectDetail?.department_id,
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
        if (name === "project_name") {
            setErrors((prevData) => ({
                ...prevData,
                project_name: false,
            }));
        }
        if (name === "rate") {
            setErrors((prevData) => ({
                ...prevData,
                rate: false,
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

        if (name === "client") {
            setFormData((prevData) => ({
                ...prevData,
                client_id: value,
            }));
            setErrors((prevData) => ({
                ...prevData,
                client_id: false,
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
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let newErrors = {
            project_name: formData?.project_name ? false : true,
            client_id: formData?.client_id ? false : true,
            project_leader: formData?.project_leader ? false : true,
            team_id: formData?.team_id?.length > 0 ? false : true,
            department_id: formData?.department_id ? false : true
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
            dispatch(createNewProject(formDataToSubmit, navigate))
            // .then((res) => {
            //   if (res?.success) {
            //     setTimeout(() => {
            //       navigate("/all-list");
            //     }, 1500);
            //   }
            // })
            //   .catch((error) => {
            //     console.log("error-", error);
            //   });
        }
    };

    const [isUploading, setIsUploading] = useState(false);
    const handleDateChange = (name, date) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: date,
        }));
    };

    return (
        <>
            <div className="" onSubmit={onSubmit}>
                <form onSubmit={handleSubmit}>
                    <div id="form">
                        <h2>New project</h2>
                        <div className="from1">
                            <div className="form-group">
                                <label >Project Name<b className='color_red'>*</b></label>
                                <input
                                    type="text"
                                    placeholder="Enter Project Name"
                                    name="project_name"
                                    value={formData?.project_name}
                                    onChange={handleChange}
                                    style={{ border: errors?.project_name ? "1px solid red" : "" }}
                                />
                                {errors?.project_name && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Fill Project Name
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Client <b className='color_red'>*</b></label>
                                <SelectDropdown
                                    selectedValue={formData?.client_id}
                                    options={clientLists.map((item) => ({
                                        id: item?.id,
                                        name: item?.full_name,
                                    }))}
                                    placeholder="Select Client"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search client"
                                    handleSearch={handleSearch}
                                    type="client"
                                    loading={clientData?.loading}
                                    showSearchBar={true}
                                    className={errors?.client_id ? "select-dropdown-error" : ""}
                                />
                                {errors?.client_id && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Fill Client
                                    </p>
                                )}
                            </div>
                            {/* Priority  Dropdown */}
                            <div className="form-group">
                                <label>Priority</label>
                                <SelectDropdown
                                    selectedValue={formData?.priority}
                                    options={ProjectPriorityOptions?.map((item, index) => ({
                                        id: index,
                                        name: item,
                                    }))}
                                    placeholder="Select Priority"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search status"
                                    handleSearch={handleSearch}
                                    type="priority"
                                    loading={false}
                                    showSearchBar={false}
                                />

                            </div>
                            <div className="form-group">
                                <label >Rate</label>
                                <div className="input-wrapper">
                                    <span id="dollar-symbol">{formData?.rate && '₹'}</span>
                                    <input
                                        type="number"
                                        placeholder="Enter rate"
                                        name="rate"
                                        value={formData.rate}
                                        onChange={handleChange}
                                        style={{
                                            paddingLeft: formData.rate ? '20px' : '10px'
                                        }}
                                        id='doller'
                                        min='0'
                                    />
                                </div>
                            </div>

                            <DatePicker label="Start Date" onDateChange={handleDateChange} initialDate={formData?.start_date} type="start_date" />
                            <DatePicker label="Deadline" onDateChange={handleDateChange} initialDate={formData?.end_date} type="end_date" />

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
                                <label>Project Leader<b className='color_red'>*</b></label>
                                <SelectDropdown
                                    selectedValue={formData?.project_leader}
                                    options={projectLeaderLists?.map((item) => ({
                                        id: item?.id,
                                        name: item?.first_name + " " + item?.last_name,
                                    }))}
                                    placeholder="Select Leader"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search Project Leader"
                                    handleSearch={handleSearch}
                                    type="project_leader"
                                    loading={projectLeaderData?.loading}
                                    showSearchBar={true}
                                    className={errors?.project_leader ? "select-dropdown-error" : ""}
                                    selectedName={formData?.project_leader}
                                />
                                {errors?.project_leader && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Select Leader
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Add Team<b className='color_red'>*</b></label>
                                <MultiSelectDropdown2
                                    selectedValue={formData?.team_id || []}
                                    options={projectLeaderLists.map((item) => ({
                                        id: item?.id,
                                        name: item?.first_name + " " + item?.last_name,
                                    }))}
                                    placeholder="Select Team Members"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search Team"
                                    handleSearch={handleSearch}
                                    type="team_id"
                                    loading={projectLeaderData?.loading}
                                    showSearchBar={true}
                                    className={errors?.team_id ? "select-dropdown-error" : ""}
                                />
                                {(errors?.team_id) && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Select Member
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Attachments<b className='color_red'>*</b></label>
                                <MultiImageUpload
                                    formData={formData}
                                    setFormData={setFormData}
                                    fieldName="attachments"
                                    isUploading={isUploading}
                                    setIsUploading={setIsUploading}
                                />
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
                    <SubmitButton loading={createUpdateProject?.loading} navigate={"/project"} nextSubmit="" showNext={false} id={id} />
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

export default FormProjectAdd;
