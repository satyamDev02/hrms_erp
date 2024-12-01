import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Employee_onboarding/AddEmployee/AddEmloyee.scss";
import "../Employee_onboarding/AddEmployee/NavbarForm.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getEmployeeList } from "../../Redux/Actions/employeeActions";
import {
  createNewPerformance,
  getPerformanceDetails,
} from "../../Redux/Actions/performanceActions";
import { otherIcons } from "../../components/Helper/icons";
import {
  performanceOrganizational,
  performanceSkillStatus,
  performanceStatuOptions,
  performanceTechnicalSkill,
} from "../../utils/Constant";
import DatePicker from "../../utils/Form/DatePicker";
import SelectDropdown from "../../utils/common/SelectDropdown";
import SubmitButton from "../../utils/common/SubmitButton";

const AddPerformanceForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //data from redux
  const createUpdatePerformance = useSelector(
    (state) => state?.createPerformance
  );
  const employeeData = useSelector((state) => state?.employeeList);
  const employeeLists = employeeData?.data?.result || [];

  const performanceDetails = useSelector((state) => state?.performanceDetails);
  const performanceDetail = performanceDetails?.data?.result || {};

  // Fetch data based on current state
  const fetchEmployees = (search = "") => {
    const sendData = {employee_status: "Active"};
    if (search) {
      sendData["search"] = search;
    }
    dispatch(getEmployeeList(sendData));
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
      }, 800);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const [formData, setFormData] = useState({
    user_id: "",
    user_name: "",
    date: "",
    status: "",
    technical: [
      {
        customer_experience: "",
        marketing: "",
        management: "",
        administration: "",
        presentation_skill: "",
        quality_of_work: "",
        Efficiency: "",
      },
    ],
    organisation: [
      {
        integrity: "",
        professionalism: "",
        team_work: "",
        critical_thinking: "",
        conflict_management: "",
        attendance: "",
        ability_to_meet_deadline: "",
      },
    ],
  });

  const [errors, setErrors] = useState({
    user_id: false,
    employee_name: false,
    status: false,
  });

  const handleDateChange = (name, date) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  const handleSelect = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "performance_status") {
      setFormData((prevData) => ({
        ...prevData,
        status: value,
      }));
      setErrors((prevData) => ({
        ...prevData,
        status: false,
      }));
    }
    setFormData((prevState) => {
      const updatedData = { ...prevState };
      // Handle technical fields
      if (name in updatedData.technical[0]) {
        updatedData.technical[0][name] = value;
      }
      // Handle organisation fields
      if (name in updatedData.organisation[0]) {
        updatedData.organisation[0][name] = value;
      }
      return updatedData;
    });

    if (name === "employee") {
      const selectedEmployee = employeeLists?.find(
        (item) => item.user_id === value
      );
      if (selectedEmployee) {
        setFormData((prevData) => ({
          ...prevData,
          user_name:
            selectedEmployee?.first_name + " " + selectedEmployee?.last_name,
        }));
      }
      setFormData((prevData) => ({
        ...prevData,
        user_id: value,
      }));
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
      dispatch(getPerformanceDetails(queryParams));
      const parsedTechincal = JSON.parse(performanceDetail?.technical || "[]");
      const parsedOrganisation = JSON.parse(
        performanceDetail?.organisation || "[]"
      );

      setFormData({
        ...formData,
        user_id: performanceDetail?.user_id,
        user_name: performanceDetail?.user_name,
        status: performanceDetail?.status,
        date: performanceDetail?.date,
        technical: parsedTechincal,
        organisation: parsedOrganisation
      });
    }
  }, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let newErrors = {
      user_id: formData?.user_id ? false : true,
      user_name: formData?.user_name ? false : true,
      status: formData?.status ? false : true,
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
      dispatch(createNewPerformance(formDataToSubmit, navigate));
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

  const [activeTab, setActiveTab] = useState("Technical"); // Default Tab

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="" onSubmit={onSubmit}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="error"
        />
        <form onSubmit={handleSubmit}>
          <div id="form">
            <div className="from1">
              <div className="form-group">
                <label>
                  Employee Name<b className="color_red">*</b>
                </label>
                <SelectDropdown
                  selectedValue={formData?.user_id}
                  options={employeeLists?.map((item, index) => ({
                    id: item?.user_id,
                    name: item?.first_name + " " + item?.last_name,
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
                <DatePicker
                  label="Appraisal Date"
                  onDateChange={handleDateChange}
                  initialDate={formData?.date}
                  type="date"
                />
              </div>
              <div className="form-group">
                <label>
                  Status<b className="color_red">*</b>
                </label>
                <SelectDropdown
                  selectedValue={formData?.status}
                  options={performanceStatuOptions.map((item, index) => ({
                    id: index,
                    name: item,
                  }))}
                  placeholder="Select Status"
                  onSelect={handleSelect}
                  searchPlaceholder="Search Status"
                  handleSearch={handleSearch}
                  type="performance_status"
                  loading={false}
                  showSearchBar={false}
                  className={errors?.status ? "select-dropdown-error" : ""}
                />
                {errors?.status && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Select Status
                  </p>
                )}
              </div>
            </div>

            <div className="competency-form-container">
              {/* Tabs */}
              <div className="tabs-container">
                <button
                  className={`tab-button ${
                    activeTab === "Technical" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Technical")}
                  type="button"
                >
                  Technical
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "Organizational" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Organizational")}
                  type="button"
                >
                  Organizational
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === "Technical" && (
                  <form className="form-content">
                    <table className="competency-table">
                      <thead>
                        <tr>
                          <th>COMPETENCIES</th>
                          <th>EXPECTED VALUE</th>
                          <th>CURRENT VALUE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {performanceTechnicalSkill.map((skill, index) => (
                          <tr key={index}>
                            <td>{skill.name}</td>
                            <td>{skill.level}</td>
                            <td>
                              <SelectDropdown
                                selectedValue={
                                  formData.technical[0]?.[skill.field]
                                }
                                options={performanceSkillStatus.map(
                                  (item, index) => ({
                                    id: index,
                                    name: item,
                                  })
                                )}
                                placeholder="Select"
                                onSelect={(name, value) =>
                                  handleSelect(skill.field, value)
                                }
                                searchPlaceholder="Search..."
                                handleSearch={handleSearch}
                                type={skill.field}
                                loading={false}
                                showSearchBar={false}
                                className={""}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </form>
                )}

                {activeTab === "Organizational" && (
                  <form className="form-content">
                    <table className="competency-table">
                      <thead>
                        <tr>
                          <th>COMPETENCIES</th>
                          <th>EXPECTED VALUE</th>
                          <th>CURRENT VALUE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {performanceOrganizational.map((skill, index) => (
                          <tr key={index}>
                            <td>{skill.name}</td>
                            <td>{skill.level}</td>
                            <td>
                              <SelectDropdown
                                selectedValue={
                                  formData.organisation[0]?.[skill.field]
                                }
                                options={performanceSkillStatus.map(
                                  (item, idx) => ({
                                    id: idx,
                                    name: item,
                                  })
                                )}
                                placeholder="Select"
                                onSelect={(name, value) =>
                                  handleSelect(skill.field, value)
                                }
                                searchPlaceholder="Search..."
                                handleSearch={handleSearch}
                                type={skill.field}
                                loading={false}
                                showSearchBar={false}
                                className={""}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </form>
                )}
              </div>
            </div>
          </div>
          <SubmitButton
            loading={createUpdatePerformance?.loading}
            navigate={"/performance"}
            nextSubmit=""
            showNext={false}
            id={id}
          />
        </form>
      </div>
    </>
  );
};

export default AddPerformanceForm;
