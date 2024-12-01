import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeList } from "../../Redux/Actions/employeeActions";
import { createNewDepartment, getDepartmentList } from "../../Redux/Actions/departmentActions";
import SelectDropdown from "../../utils/common/SelectDropdown";
import { otherIcons } from "../../components/Helper/icons";
import { useNavigate } from "react-router-dom";
import SubmitButtonPopup from "../../utils/common/SubmitButtonPopup ";

const AddNewDepartment = ({ ClosePop, refBox, id, updateList }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Data from redux
  const createUpdateDepartment = useSelector((state) => state?.createDepartment);
  const departmentDetails = useSelector((state) => state?.departmentDetails);
  const departmentDetail = departmentDetails?.data?.department;

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
    department_name: "",
    department_head: "",
    parent_department: "",
  });

  //error handling
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(false);
  };

  const handleSelect = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "employee") {
      setFormData((prevData) => ({
        ...prevData,
        department_head: value,
      }));
    }
    if (name === "department") {
      setFormData((prevData) => ({
        ...prevData,
        parent_department: value,
      }));
    }
  };

  useEffect(() => {
    if (id) {
      setFormData({
        ...formData,
        department_name: departmentDetail?.department_name ? departmentDetail?.department_name : "",
        department_head: departmentDetail?.department_head?.id ? departmentDetail?.department_head?.id : "",
        parent_department: departmentDetail?.parent_department?.id ? departmentDetail?.parent_department?.id : "",
      });
    }
  }, [id])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData?.department_name == "") {
      setError(true);
      return;
    } else {
      const formDataToSubmit = {
        ...formData,
      };
      if (id) {
        formDataToSubmit["id"] = id;
      }
      dispatch(createNewDepartment(formDataToSubmit))
        .then((res) => {
          if (res?.success) {
            ClosePop();
            if (id) {
              navigate("/department");
              // const queryParams = {
              //     id: id,
              // };
              // dispatch(getDepartmentDetails(queryParams));
            } else {
              updateList((prev) => prev + 1);
            }
          }
        })
        .catch((error) => {
          console.log("error-", error);
        });
      // Close the popup after submission
    }
  };

  return (
    <div className="NewAttendance_main">
      <div className="blurBG"></div>
      <div className="formDiv">
        <div className="popForm">
          <div className="Attendance_Head">
            <h2>{id ? "Edit Department" : "Add New Department"}</h2>
            <div className="close_icon" onClick={ClosePop}>
              {otherIcons.cross_svg}
            </div>
          </div>
          <div className="form-container">
            <form id="" onSubmit={handleSubmit}>
              <div className="_btn_form" id="employeeForm">
                <div className="form-group">
                  <label>
                    Department Name<b className="red">*</b>
                  </label>
                  <input
                    type="text"
                    name="department_name"
                    placeholder="Enter Department Name"
                    value={formData?.department_name}
                    onChange={handleChange}
                    style={{ border: error ? "1px solid red" : "" }}
                  />
                  {error && (
                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                      {otherIcons.error_svg}
                      Please Enter Department Name
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>Parent Department</label>
                  <SelectDropdown
                    selectedValue={formData?.parent_department}
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
                  <label>Department Head</label>
                  <SelectDropdown
                    selectedValue={formData?.department_head}
                    options={employeeLists?.map((item, index) => ({
                      id: item?.user_id,
                      name: item?.first_name + " " + item?.last_name,
                    }))}
                    placeholder="Select Department Head"
                    onSelect={handleSelect}
                    searchPlaceholder="Search head of Department"
                    handleSearch={handleSearch}
                    type="employee"
                    loading={employeeData?.loading}
                    showSearchBar={true}
                    className={""}
                  />
                  
                </div>
                {/* <SubmitButtonPopup loading={createUpdateDepartment?.loading} id={id} /> */}
                <div className="buttons">
                  {(createUpdateDepartment?.loading) ?
                    <button id='svg_submit_loading_popup' className="svg_submit_loading_popup" disabled type="submit" >
                      <div className="svg_loading">
                        <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                          viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                          <circle fill="#fff" stroke="none" cx="10" cy="50" r="3" >
                            <animateTransform
                              attributeName="transform"
                              dur="2s"
                              type="translate"
                              values="0 15 ; 0 -15; 0 15"
                              from="0 50 48"
                              to="360 50 52"
                              repeatCount="indefinite"
                              begin="0.1" />
                            <animate
                              attributeName="opacity"
                              dur="1s"
                              values="0;1;0"
                              repeatCount="indefinite"
                              begin="0.2" />
                          </circle>
                          <circle fill="#fff" stroke="none" cx="20" cy="50" r="3">
                            <animateTransform
                              attributeName="transform"
                              dur="2s"
                              type="translate"
                              values="0 10 ; 0 -10; 0 10"
                              repeatCount="indefinite"
                              begin="0.2" />
                            <animate
                              attributeName="opacity"
                              dur="2s"
                              values="0;1;0"
                              repeatCount="indefinite"
                              begin="0.2" />
                          </circle>
                          <circle fill="#fff" stroke="none" cx="30" cy="50" r="3">
                            <animateTransform
                              attributeName="transform"
                              dur="2s"
                              type="translate"
                              values="0 5 ; 0 -5; 0 5"
                              repeatCount="indefinite"
                              begin="0.3" />
                            <animate
                              attributeName="opacity"
                              dur="2s"
                              values="0;1;0"
                              repeatCount="indefinite"
                              begin="0.3" />
                          </circle>
                          <circle fill="#fff" stroke="none" cx="40" cy="50" r="3">
                            <animateTransform
                              attributeName="transform"
                              dur="2s"
                              type="translate"
                              values="0 5 ; 0 -5; 0 5"
                              repeatCount="indefinite"
                              begin="0.4" />
                            <animate
                              attributeName="opacity"
                              dur="2s"
                              values="0;1;0"
                              repeatCount="indefinite"
                              begin="0.4" />
                          </circle>
                          <circle fill="#fff" stroke="none" cx="50" cy="50" r="3">
                            <animateTransform
                              attributeName="transform"
                              dur="2s"
                              type="translate"
                              values="0 5 ; 0 -5; 0 5"
                              repeatCount="indefinite"
                              begin="0.5" />
                            <animate
                              attributeName="opacity"
                              dur="2s"
                              values="0;1;0"
                              repeatCount="indefinite"
                              begin="0.5" />
                          </circle>
                          <circle fill="#fff" stroke="none" cx="60" cy="50" r="3">
                            <animateTransform
                              attributeName="transform"
                              dur="2s"
                              type="translate"
                              values="0 5 ; 0 -5; 0 5"
                              repeatCount="indefinite"
                              begin="0.6" />
                            <animate
                              attributeName="opacity"
                              dur="2s"
                              values="0;1;0"
                              repeatCount="indefinite"
                              begin="0.6" />
                          </circle>

                        </svg>
                      </div>
                    </button>
                    :
                    <button type="submit" className="submit-btn" id="sbt_center">
                      {id ? "Update" : "Submit"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        color="#9b9b9b"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewDepartment;
