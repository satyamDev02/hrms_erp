import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../components/Helper/icons";
import { getDepartmentList } from "../../Redux/Actions/departmentActions";
import { getDesignationList } from "../../Redux/Actions/designationActions";
import { createNewJob, getJobDetails } from "../../Redux/Actions/jobActions";
import MultiSelectDropdown from "../../utils/common/MultiSelectDropdown";
import SelectDropdown from "../../utils/common/SelectDropdown";
import SubmitButton from "../../utils/common/SubmitButton";
import TextAreaWithLimit from "../../utils/common/TextAreaWithLimit";
import { employmentOptions, experienceOptions, jobLocationOptions, jobStatusOptions, skillsOptions } from "../../utils/Constant";
import "../Employee_onboarding/AddEmployee/AddEmloyee.scss";
import "../Employee_onboarding/AddEmployee/NavbarForm.scss";

const AddNewJobForm = ({ onSubmit }) => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams();

 //Data from redux
  const createUpdateJob = useSelector((state) => state?.createJob);
  const departmentData = useSelector((state) => state?.departmentList);
  const departmentLists = departmentData?.data?.department || [];

  const designationData = useSelector((state) => state?.designationList);
  const designationLists = designationData?.data?.designation || [];

  const jobData = useSelector((state) => state?.jobDetails);
  const jobDetail = jobData?.data?.jobOpening;
  const jobDetailLoading = jobData?.loading || false;

  const debounceTimeoutRef = useRef(null); // Store debounce timeout reference
  const [selectedSkills, setSelectedSkills] = useState([]);

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
      }, 800);
    }
  };

  useEffect(() => {
    dispatch(getDepartmentList());
    dispatch(getDesignationList());
  }, []);

  const [formData, setFormData] = useState({
    job_title: "",
    designation: "",
    department: "",
    job_location: "",
    job_status: "",
    no_of_position: "",
    employee_type: "",
    experience: "",
    skills: [],
    description: "",
  });
  console.log('formData', formData)
  //error handling
  const [errors, setErrors] = useState({
    job_title: false,
    designation: false,
    department: false,
    job_location: false,
    job_status: false,
    no_of_position: false,
    employee_type: false,
    experience: false,
  })
  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getJobDetails(queryParams));
      if (jobDetail) {
        const skills = jobDetail?.skills?.split(", ").map(skill => skill.trim());
        setSelectedSkills(skills);
        setFormData({
          ...formData,
          department: jobDetail?.department?.id,
          description: jobDetail?.description ? jobDetail?.description : "",
          designation: jobDetail?.designation?.id,
          employee_type: jobDetail?.employee_type,
          experience: jobDetail?.experience,
          job_location: jobDetail?.job_location,
          job_status: jobDetail?.job_status,
          job_title: jobDetail?.job_title,
          no_of_position: jobDetail?.no_of_position,
          skills: jobDetail?.skills,
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
    if (name === "job_title") {
      setErrors((prevData) => ({
        ...prevData,
        job_title: false,
      }));
    }
    if (name === "no_of_position") {
      setErrors((prevData) => ({
        ...prevData,
        no_of_position: false,
      }));
    }
  };

  const handleSelect = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "designation") {
      setErrors((prevData) => ({
        ...prevData,
        designation: false,
      }));
    }
    if (name === "department") {
      setErrors((prevData) => ({
        ...prevData,
        department: false,
      }));
    }
    if (name === "job_status") {
      setErrors((prevData) => ({
        ...prevData,
        job_status: false,
      }));
    }
    if (name === "employee_type") {
      setErrors((prevData) => ({
        ...prevData,
        employee_type: false,
      }));
    }
    if (name === "experience") {
      setErrors((prevData) => ({
        ...prevData,
        experience: false,
      }));
    }
};

  const handleLocationChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      job_location: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      job_location: false,
    }));
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: selectedSkills,
    }));
  }, [selectedSkills]);


  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSkillRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter(item => item !== skill));
  };

  const handleAddCustomSkill = (skill) => {
    const newSkill = skill?.trim();
    if (
      newSkill &&
      !selectedSkills.includes(newSkill) &&
      !skillsOptions.includes(newSkill)
    ) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newErrors = {
      job_title: formData?.job_title ? false : true,
      designation: formData?.designation ? false : true,
      department: formData?.department ? false : true,
      job_location: formData?.job_location ? false : true,
      job_status: formData?.job_status ? false : true,
      no_of_position: formData?.no_of_position ? false : true,
      employee_type: formData?.employee_type ? false : true,
      experience: formData?.experience ? false : true,
    };
    setErrors(newErrors);

    const hasAnyError = Object.values(newErrors).some((value) => value === true);
    if (hasAnyError) {
      return;
    }
    else {
      const formDataToSubmit = {
        ...formData,
        skills: formData?.skills.join(", "),
      };
      if (id) {
        formDataToSubmit['id'] = id
      }
      dispatch(createNewJob(formDataToSubmit, navigate))
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
          <div id="form">
            <div className="from1">
              <div className="form-group">
                <label >Job Title<b className='color_red'>*</b></label>
                <input
                  type="text"
                  placeholder="Enter Job title"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleChange}
                  style={{ border: errors?.job_title ? "1px solid red" : "" }}
                />
                {errors?.job_title && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Fill Job Title
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Designation <b className='color_red'>*</b></label>
                <SelectDropdown
                  selectedValue={formData?.designation}
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
                  className={errors?.designation ? "select-dropdown-error" : ""}
                />
                {errors?.designation && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Select Designation
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Department<b className='color_red'>*</b></label>
                <SelectDropdown
                  selectedValue={formData?.department}
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
                  className={errors?.department ? "select-dropdown-error" : ""}
                />
                {errors?.department && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Select Department
                  </p>
                )}
              </div>
              <div className="form-group">
                <span>
                  <label>Job Location<b className='color_red'>*</b></label>
                  <div id="checkbox" className="checkbox">
                    {jobLocationOptions.map((location) => (
                      <div
                        className="checkboxDivJob"
                        key={location}
                        onClick={() => handleLocationChange(location)}
                        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                      >
                        <input
                          type="radio"
                          value={location}
                          name="job_location"
                          checked={formData?.job_location === location}
                          onChange={handleChange} // Use original handleChange
                          style={{ width: "12px", cursor: "pointer" }}
                          onClick={(e) => e.stopPropagation()} // Prevent double trigger on direct click
                        />
                        <label
                          className="checkboxLabel"
                          style={{ cursor: "pointer", marginLeft: "5px" }}
                          onClick={() => handleLocationChange(location)}
                        >
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </span>
                {errors?.job_location && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Select Location
                  </p>
                )}
              </div>

              {/* Job Status Dropdown */}
              <div className="form-group">
                <label>Job Status<b className='color_red'>*</b></label>
                <SelectDropdown
                  selectedValue={formData?.job_status}
                  options={jobStatusOptions?.map((item, index) => ({
                    id: index,
                    name: item,
                  }))}
                  placeholder="Select Job Status"
                  onSelect={handleSelect}
                  searchPlaceholder="Search status"
                  handleSearch={handleSearch}
                  type="job_status"
                  loading={false}
                  showSearchBar={false}
                  className={errors?.job_status ? "select-dropdown-error" : ""}
                />
                {errors?.job_status && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Select Job Status
                  </p>
                )}
              </div>

              <div className="form-group">
                <span>
                  <label>No. of Positions<b className='color_red'>*</b></label>
                  <input
                    type="number"
                    placeholder="Enter No. of Positions"
                    name="no_of_position"
                    value={formData?.no_of_position}
                    onChange={handleChange}
                    style={{ border: errors?.no_of_position ? "1px solid red" : "" }}
                  />
                </span>
                {errors?.no_of_position && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Fill No. of Positions
                  </p>
                )}
              </div>

              {/* Employment Type Dropdown */}
              <div className="form-group">
                <label>Employment Type<b className='color_red'>*</b></label>
                <SelectDropdown
                  selectedValue={formData?.employee_type}
                  options={employmentOptions?.map((item, index) => ({
                    id: index,
                    name: item,
                  }))}
                  placeholder="Select Employment Type"
                  onSelect={handleSelect}
                  searchPlaceholder="Search..."
                  handleSearch={handleSearch}
                  type="employee_type"
                  loading={false}
                  showSearchBar={false}
                  className={errors?.employee_type ? "select-dropdown-error" : ""}
                />
                {errors?.employee_type && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Select Employment Type
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>Experience<b className='color_red'>*</b></label>
                <SelectDropdown
                  selectedValue={formData?.experience}
                  options={experienceOptions?.map((item, index) => ({
                    id: index,
                    name: item,
                  }))}
                  placeholder="Select Experience"
                  onSelect={handleSelect}
                  searchPlaceholder="Search..."
                  handleSearch={handleSearch}
                  type="experience"
                  loading={false}
                  showSearchBar={false}
                  className={errors?.experience ? "select-dropdown-error" : ""}
                />
                {errors?.experience && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Select Experience
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>Required Skills</label>
                <MultiSelectDropdown
                  options={skillsOptions}
                  selectedItems={selectedSkills}
                  onItemSelect={handleSkillSelect}
                  onItemRemove={handleSkillRemove}
                  placeholder="Select Skills"
                  searchPlaceholder="Search skills"
                  allowCustomOption={true}
                  onAddCustomOption={handleAddCustomSkill}
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
          <SubmitButton loading={createUpdateJob?.loading} navigate={"/all-job-list"} nextSubmit="" showNext={false} id={id} />
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

export default AddNewJobForm;
