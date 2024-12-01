import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDepartmentList } from "../../Redux/Actions/departmentActions";
import { createNewDesignation } from "../../Redux/Actions/designationActions";
import SelectDropdown from "../../utils/common/SelectDropdown";
import TextAreaWithLimit from "../../utils/common/TextAreaWithLimit";
import { otherIcons } from "../../components/Helper/icons";
import SubmitButtonPopup from "../../utils/common/SubmitButtonPopup ";

const AddNewDesignation = ({ ClosePop, refBox, id, updateList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Data from redux
  const createUpdateDesignation = useSelector((state) => state?.createDesignation);
  const designationDetails = useSelector((state) => state?.designationDetails);
  const designationDetail = designationDetails?.data?.designation;

  const departmentData = useSelector((state) => state?.departmentList);
  const departmentLists = departmentData?.data?.department || [];

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
        if (type === "department") {
          fetchDepartments(value);
        }
      }, 800);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const [formData, setFormData] = useState({
    designation_name: "",
    department_id: "",
    description: "",
  });

  //error handling
  const [errors, setErrors] = useState({
    designation_name: false,
    department_id: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      designation_name: false,
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
      setErrors((prevData) => ({
        ...prevData,
        department_id: false,
      }));
    }
  };

  useEffect(() => {
    if (id) {
      setFormData({
        ...formData,
        designation_name: designationDetail?.designation_name,
        department_name: designationDetail?.department?.department_name,
        department_id: designationDetail?.department?.id,
        description: designationDetail?.description
          ? designationDetail?.description
          : "",
      });
    }
  }, [id])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {
      department_id: formData?.department_id ? false : true,
      designation_name: formData?.designation_name ? false : true,
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
      dispatch(createNewDesignation(formDataToSubmit))
        .then((res) => {
          if (res?.success) {
            ClosePop();
            if (id) {
              navigate('/designation')
              // const queryParams = {
              //     id: id,
              // };
              // dispatch(getDepartmentDetails(queryParams));
            }
            else {
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
    <>
      <div className="NewAttendance_main">
        <div className="blurBG"></div>
        <div className="formDiv">
          <div className="popForm">
            <div className="Attendance_Head">
              <h2>{id ? "Edit Designation" : "Add New Designation"}</h2>
              <div className="close_icon" onClick={ClosePop}>
                {otherIcons.cross_svg}
              </div>
            </div>
            <div className="form-container">
              <form id="" onSubmit={handleSubmit}>
                <div className='_btn_form' id="employeeForm">

                  <div className="form-group">
                    <label className="">
                      Designation Name<b className="color_red">*</b>
                    </label>
                    <input
                      type="text"
                      name="designation_name"
                      placeholder="Enter Designation Name"
                      value={formData?.designation_name}
                      onChange={handleChange}
                      style={{
                        border: errors?.designation_name ? "1px solid red" : "",
                      }}
                    />
                    {errors?.designation_name && (
                      <p
                        className="error_message"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {otherIcons.error_svg}
                        Please Fill Designation Name
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>
                      Department<b className="color_red">*</b>
                    </label>
                    <SelectDropdown
                      selectedValue={formData?.department_id}
                      options={departmentLists.map((item) => ({
                        id: item?.id,
                        name: item?.department_name,
                      }))}
                      placeholder="Select Department"
                      onSelect={handleSelect}
                      searchPlaceholder="Search Department"
                      handleSearch={handleSearch}
                      type="department"
                      loading={departmentData?.loading}
                      showSearchBar={true}
                      className={
                        errors?.department_id ? "select-dropdown-error" : ""
                      }
                    />
                    {errors?.department_id && (
                      <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                        {otherIcons.error_svg}
                        Please Select Department
                      </p>
                    )}
                  </div>
                  <div
                    id="Description"
                    className="DescriptionJob"
                    style={{ width: "186%" }}
                  >
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


                  {/* <div className="buttons">
                  {(createUpdateDesignation?.loading) ?
                    <button id='svg_submit_loading_popup' disabled type="submit" >
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
                    <button type="submit" className="submit-btn" id='sbt_center2'>
                      {id ? "Update" : "Submit"}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9b9b9b" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  }
                </div> */}
                </div>
                <div style={{ marginTop: '-50px' }}>
                  <SubmitButtonPopup loading={createUpdateDesignation?.loading} id={id} />

                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewDesignation;
