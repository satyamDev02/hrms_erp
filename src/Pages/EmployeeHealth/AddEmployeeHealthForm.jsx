import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getDepartmentList } from "../../Redux/Actions/departmentActions";
import { getEmployeeList } from "../../Redux/Actions/employeeActions";
import { createNewEmpHealth, getEmpHealthDetails } from "../../Redux/Actions/employeeHealthActions";
import { MultiImageUpload } from "../../components/MultiImageUpload";
import { bloodGroupOptions, covidAffectedOptions, covidVacinationOptions, genderOptions, healthCheckOptions} from "../../utils/Constant";
import DatePicker from "../../utils/Form/DatePicker";
import SelectDropdown from "../../utils/common/SelectDropdown";
import SubmitButton from "../../utils/common/SubmitButton";
import "../Employee_onboarding/AddEmployee/NavbarForm.scss";
import "./AddEmployeeHealthForm.scss";
import { otherIcons } from "../../components/Helper/icons";
import TextAreaWithLimit from "../../utils/common/TextAreaWithLimit";

const AddEmployeeHealthForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const createUpdateEmpHealth = useSelector((state) => state?.createEmpHealth);
  const employeeData = useSelector((state) => state?.employeeList);
  const employeeLists = employeeData?.data?.result || [];

  const empHealthDetails = useSelector((state) => state?.empHealthDetails);
  const empHealthDetail = empHealthDetails?.data?.result || [];

  const departmentData = useSelector((state) => state?.departmentList);
  const departmentLists = departmentData?.data?.department || [];

  const [isUploading, setIsUploading] = useState(false);

  const fetchEmployee = (search = "") => {
    const sendData = { employee_status: "Active", health_status: "0" };
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
        } else if (type === "shift") {
          fetchShift(value);
        }
      }, 800);
    }
  };

  useEffect(() => {
    fetchEmployee();
    fetchDepartments();
  }, []);

  // filter
  const [formData, setFormData] = useState({
    user_id: "",
    employee_name: "",
    department_head: "",
    mobile_no: "",
    contact_name: "",
    blood_group: "",
    weight: "",
    height: "",
    allergies: "",
    chronic_condition: "",
    current_medications: "",
    last_checkup_date: "",
    next_checkup_date: "",
    checkup_result: "",
    covid_affected: "",
    covid_status: "",
    attachment: [],
    notes: "",
  });

  //error handling
  const [errors, setErrors] = useState({
    user_id: false,
    employee_name: false,
    blood_group: false,
    covid_affected: false,
    covid_status: false,
  });

  const handleSelect = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "department") {
      setFormData((prevData) => ({
        ...prevData,
        department_head: value,
      }));
    }
    if (name === "gender") {
      setFormData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    }
    if (name === "blood_group") {
      setErrors((prevData) => ({
        ...prevData,
        blood_group: false,
      }));
    }
    if (name === "covid_affected") {
      setErrors((prevData) => ({
        ...prevData,
        covid_affected: false,
      }));
    }
    if (name === "covid_status") {
      setErrors((prevData) => ({
        ...prevData,
        covid_status: false,
      }));
    }
    if (name === "checkup_result") {
      setFormData((prevData) => ({
        ...prevData,
        checkup_result: value,
      }));
    }
    if (name === "employee") {
      const selectedEmployee = employeeLists?.find(
        (item) => item.user_id === value
      );
      if (selectedEmployee) {
        setFormData((prevData) => ({
          ...prevData,
          employee_name:
            selectedEmployee?.first_name + " " + selectedEmployee?.last_name,
        }));
      }
      setFormData((prevData) => ({
        ...prevData,
        user_id: value,
      }));
      setErrors((prevData) => ({
        ...prevData,
        employee_name: false,
      }));
    }
  };

  const handleDateChange = (name, date) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };
  
  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getEmpHealthDetails(queryParams));
      const parsedAttachment = JSON.parse(empHealthDetail?.attachment || "[]");

      setFormData({
        ...formData,
        user_id: empHealthDetail?.user_id,
        employee_name: empHealthDetail?.employee_name,
        department_head: empHealthDetail?.department_head?.id,
        gender: empHealthDetail?.gender,
        mobile_no: empHealthDetail?.mobile_no,
        contact_name: empHealthDetail?.contact_name,
        blood_group: empHealthDetail?.blood_group,
        weight: empHealthDetail?.weight,
        height: empHealthDetail?.height,
        allergies: empHealthDetail?.allergies,
        chronic_condition: empHealthDetail?.chronic_condition,
        current_medications: empHealthDetail?.current_medications,
        last_checkup_date: empHealthDetail?.last_checkup_date,
        next_checkup_date: empHealthDetail?.next_checkup_date,
        checkup_result: empHealthDetail?.checkup_result,
        covid_affected: empHealthDetail?.covid_affected,
        covid_status: empHealthDetail?.covid_status,
        attachment: parsedAttachment,
        notes: empHealthDetail?.notes,
      });
    }
  }, [id]);

  // Handle input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange2 = (event) => {
    const { name, value } = event.target;
    if (name === "weight") {
      // Validate weight for numbers and floating-point
      const weightRegex = /^-?\d*\.?\d*$/;
      if (weightRegex.test(value) || value === "") {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else if (name === "height") {
      // Validate height for integers only
      const heightRegex = /^-?\d*\.?\d*$/;
      if (heightRegex.test(value) || value === "") {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = {
      user_id: formData?.user_id ? false : true,
      employee_name: formData?.employee_name ? false : true,
      blood_group: formData?.blood_group ? false : true,
      covid_affected: formData?.covid_affected ? false : true,
      covid_status: formData?.covid_status ? false : true,
    };
    setErrors(newErrors);

    const hasAnyError = Object.values(newErrors).some(
      (value) => value === true
    );
    if (hasAnyError) {
      return;
    } else {
      const formDataToSubmit = {
        ...formData,
      };
      if (id) {
        formDataToSubmit["id"] = id;
      }
      dispatch(createNewEmpHealth(formDataToSubmit, navigate));
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
          <div className="from1">
            <h3 className="titleForm_h3">Personal Information</h3>
            <div></div>
            <div></div>
            <div className="form-group">
              <label>
                Employee Name
                <b className="red" style={{ color: "red" }}>
                  *
                </b>
              </label>
              <SelectDropdown
                selectedValue={formData?.user_id}
                options={employeeLists?.map((item, index) => ({
                  id: item?.user_id,
                  name: item?.first_name + " " + item?.last_name,
                }))}

                placeholder="Select Employee"
                onSelect={handleSelect}
                searchPlaceholder="Search Employee"
                handleSearch={handleSearch}
                type="employee"
                loading={employeeData?.loading}
                showSearchBar={true}
                className={errors?.employee_name ? "select-dropdown-error" : ""}
              />
              {errors?.employee_name && (
                <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                  {otherIcons.error_svg}
                  Please Select Employee
                </p>
              )}
            </div>
            {/* Department Dropdown */}
            <div className="form-group">
              <label>Department Head</label>
              <SelectDropdown
                selectedValue={formData?.department_head}
                options={departmentLists.map((item) => ({
                  id: item?.department_head?.id,
                  name:
                    item?.department_head?.first_name +
                    " " +
                    item?.department_head?.last_name,
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
            <div className="form-group">
              <label>Emergency Contact Number</label>
              <input
                type="text"
                placeholder="Enter Emergency Contact Number"
                name="mobile_no"
                value={formData?.mobile_no}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Emergency Contact Name</label>
              <input
                type="text"
                placeholder="Enter Emergency Contact Name"
                name="contact_name"
                value={formData?.contact_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div id="form">
            <div className="from1 form2">
              <h3 className="titleForm_h3">Health Information</h3>
              <div></div>
              <div></div>
              {/* Department Dropdown */}
              <div className="form-group">
                <label>
                  Blood Group
                  <b className="red" style={{ color: "red" }}>
                    *
                  </b>
                </label>
                <SelectDropdown
                  selectedValue={formData?.blood_group}
                  options={bloodGroupOptions?.map((item, index) => ({
                    id: index,
                    name: item,
                  }))}
                  placeholder="Select Blood Group"
                  onSelect={handleSelect}
                  searchPlaceholder="Search Blood Group"
                  handleSearch={handleSearch}
                  type="blood_group"
                  loading={false}
                  showSearchBar={false}
                  className={errors?.blood_group ? "select-dropdown-error" : ""}
                />
                {errors?.blood_group && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Select Blood Group
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Weight</label>
                <input
                  type="text"
                  placeholder="Enter Weight"
                  name="weight"
                  value={formData?.weight}
                  onChange={handleChange2}
                  className="weight-input"
                />
                <span className="unit-label">kg</span>
              </div>
              <div className="form-group">
                <label>Height</label>
                <input
                  type="text"
                  placeholder="Enter Height"
                  name="height"
                  value={formData?.height}
                  onChange={handleChange2}
                  className="weight-input"
                />
                <span className="unit-label">cm</span>
              </div>
              <div className="form-group">
                <label>Allergies</label>
                <input
                  type="text"
                  placeholder="Enter Allergies"
                  name="allergies"
                  className="In_inputRightTitle"
                  value={formData?.allergies}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Chronic Conditions</label>
                <input
                  type="text"
                  placeholder="Enter Chronic Conditions"
                  name="chronic_condition"
                  value={formData?.chronic_condition}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Current Medications</label>
                <input
                  type="text"
                  placeholder="Enter Current Medications"
                  name="current_medications"
                  value={formData?.current_medications}
                  onChange={handleChange}
                />
              </div>

              <DatePicker
                label="Last Health Checkup Date"
                onDateChange={handleDateChange}
                initialDate={formData?.last_checkup_date}
                type="last_checkup_date"
              />
              <DatePicker
                label="Next Scheduled Check-Up Date"
                onDateChange={handleDateChange}
                initialDate={formData?.next_checkup_date}
                type="next_checkup_date"
              />
              <div className="form-group">
                <label>Health Check Results</label>
                <SelectDropdown
                  selectedValue={formData?.checkup_result}
                  options={healthCheckOptions?.map((item, index) => ({
                    id: index,
                    name: item,
                  }))}
                  placeholder="Select Results"
                  onSelect={handleSelect}
                  searchPlaceholder="Search Results"
                  handleSearch={handleSearch}
                  type="checkup_result"
                  loading={false}
                  showSearchBar={false}
                  className={""}
                />
              </div>
              <div className="form-group">
                <label>
                  COVID Affected
                  <b className="red" style={{ color: "red" }}>
                    *
                  </b>
                </label>
                <SelectDropdown
                  selectedValue={formData?.covid_affected}
                  options={covidAffectedOptions?.map((item, index) => ({
                    id: index,
                    name: item,
                  }))}
                  placeholder="Select Status"
                  onSelect={handleSelect}
                  searchPlaceholder="Search Status"
                  handleSearch={handleSearch}
                  type="covid_affected"
                  loading={false}
                  showSearchBar={false}
                  className={
                    errors?.covid_affected ? "select-dropdown-error" : ""
                  }
                />
                {errors?.covid_affected && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Select COVID Status
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>
                  COVID Vaccination Status
                  <b className="red" style={{ color: "red" }}>
                    *
                  </b>
                </label>
                <SelectDropdown
                  selectedValue={formData?.covid_status}
                  options={covidVacinationOptions?.map((item, index) => ({
                    id: index,
                    name: item,
                  }))}
                  placeholder="Select Status"
                  onSelect={handleSelect}
                  searchPlaceholder="Search Status"
                  handleSearch={handleSearch}
                  type="covid_status"
                  loading={false}
                  showSearchBar={false}
                  className={
                    errors?.covid_status ? "select-dropdown-error" : ""
                  }
                />
                {errors?.covid_status && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Select Vaccination Status
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Attachment</label>
                <MultiImageUpload
                  formData={formData}
                  setFormData={setFormData}
                  fieldName="attachment"
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                />
              </div>
            </div>
            <div id="Description" className="DescriptionJob">
              <div className="form-group">
                <label>Notes</label>
                <TextAreaWithLimit
                  formsValues={{ handleChange, formData }}
                  placeholder="Enter Notes"
                  name="notes"
                  value={formData?.notes}
                />
              </div>
            </div>
          </div>
          <SubmitButton
            loading={createUpdateEmpHealth?.loading}
            navigate={"/health"}
            nextSubmit=""
            showNext={false}
            id={id}
          />
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
export default AddEmployeeHealthForm;
