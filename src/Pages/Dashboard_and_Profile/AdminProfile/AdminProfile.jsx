// import React from 'react'
import { BiEditAlt } from "react-icons/bi";
import { HiUserPlus } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import "./AdminProfile.scss";
// import { FaUserCircle, FaPhone, FaAddressCard, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import imgCheck from "../../../assets/icons/check.png";
import iconEdu from "../../../assets/icons/edu.png";
import defaultUserImage from "../../../assets/user_2.png";
import { otherIcons } from "../../../components/Helper/icons";
import { getEmpDepartmentDetails } from "../../../Redux/Actions/departmentActions";
import { formatDate3 } from "../../../utils/common/DateTimeFormat";
import NoDataFound from "../../../utils/common/NoDataFound";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("HRMS_USER_DATA"));

  //Data from redux
  const employeeDetails = useSelector((state) => state?.employeeDetails);
  const employeeDetail = employeeDetails?.data?.result;
  const employeeLoading = employeeDetails?.loading || false;
  console.log("employeeDetail", employeeDetail);
  useEffect(() => {
    if (data?.id) {
      const queryParams = {
        id: data?.id,
      };
      dispatch(getEmpDepartmentDetails(queryParams));
    }
  }, [data?.id]);

  const handleEditEmployee = () => {
    navigate(`/add-employee/${data?.id}`);
  };
  const employeeImage = JSON.parse(employeeDetail?.image || "[]");
  const employeeDocuments = employeeDetail?.documents?.map((item) => {
    return {
      document_name: item?.document_name,
      document_id: item?.document_id,
      frontAttachments: item?.attachment_1 ? JSON.parse(item.attachment_1) : [],
      backAttachments: item?.attachment_2 ? JSON.parse(item.attachment_2) : [],
    };
  });
  const presentAddress =
  employeeDetail?.contacts?.find((contacts) => contacts.address_type === "Present") || {};
const permanentAddress =
employeeDetail?.contacts?.find((contacts) => contacts.address_type === "Permanent") ||
  {};
  return (
    <div className="AdminProfile_main">
      {/* patter top header */}
      <div className="top-bar">
        <h2>
          <div className="span">
            <HiUserPlus />
          </div>
          My Profile
        </h2>
        <span className="close_nav">
          <TfiClose />
        </span>
        <div className="">
          <span className="1"></span>
          <span className="2"></span>
          <span className="3"></span>
          <span className="4"></span>
          <span className="5"></span>
          <span className="6"></span>
          <span className="7"></span>
          <span className="8"></span>
          <span className="9"></span>
          <span className="10"></span>
        </div>
      </div>
      {/* second header */}
      <div className="mainContainers">
        <div className="Top_Head_Admin_Dashboard">
          {/* left */}
          <div className="Left_admin_hello">
            <img
              className="header_img_rounded"
              src={
                employeeImage?.length > 0
                  ? employeeImage[0]?.url
                  : defaultUserImage
              }
              alt={employeeImage?.length > 0 ? employeeImage[0]?.name : "user"}
            />
            <div>
              <div>
                <h2>
                  {(employeeDetail?.first_name || "-") +
                    " " +
                    (employeeDetail?.last_name || "-")}{" "}
                </h2>
                <div>
                  <h4>{employeeDetail?.employee_status || "-"}</h4>
                </div>
              </div>
              <p>{employeeDetail?.email || "-"}</p>
            </div>
          </div>
          {/* right */}
          <div className="Right_Time">
            <div className="Check_in_time" onClick={handleEditEmployee}>
              <span>{otherIcons?.edit_svg}</span> Edit
            </div>
          </div>
        </div>
        {/* data form cart */}
        <div className="containers">
          <div className="info">
            {/* Basic details */}
            <div className="div_details">
              <div className="section_header">
                <span className="icon">{otherIcons.details_information}</span>
                <h2>Basic details</h2>
              </div>
              <div className="data">
                <div>
                  <h4>Employee ID</h4>
                  <span>:</span>
                  <p>{employeeDetail?.employee_id || "-"}</p>
                </div>
                <div>
                  <h4>Date of Birth</h4>
                  <span>:</span>
                  <p>{formatDate3(employeeDetail?.date_of_birth) || "-"}</p>
                </div>
                <div>
                  <h4>Age</h4>
                  <span>:</span>
                  <p>{employeeDetail?.age || "-"}</p>
                </div>
                <div>
                  <h4>Marital Status</h4>
                  <span>:</span>
                  <p>{employeeDetail?.marital || "-"}</p>
                </div>
                <div>
                  <h4>Department</h4>
                  <span>:</span>
                  <p>{employeeDetail?.department?.department_name || "-"}</p>
                </div>
                <div>
                  <h4>Designation</h4>
                  <span>:</span>
                  <p>
                    {employeeDetail?.designation?.designation_detail || "-"}
                  </p>
                </div>
                <div>
                  <h4>Employment Type</h4>
                  <span>:</span>
                  <p>{employeeDetail?.employment_type || "-"}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="div_details">
              <div className="section_header">
                <span className="icon">{otherIcons.details_information}</span>
                <h2>Contact Information</h2>
              </div>
              <div className="data">
                <div>
                  <h4>Work Contact Number</h4>
                  <span>:</span>
                  <p>{employeeDetail?.mobile_no || "-"}</p>
                </div>
                <div>
                  <h4>Personal Phone Number</h4>
                  <span>:</span>
                  <p>{employeeDetail?.mobile_no || "-"}</p>
                </div>
                <div>
                  <h4>Country</h4>
                  <span>:</span>
                  <p>{presentAddress?.country?.name  || "-"}</p>
                </div>
                <div>
                  <h4>State</h4>
                  <span>:</span>
                  <p>{presentAddress?.state?.name || "-"}</p>
                </div>
                <div>
                  <h4>City</h4>
                  <span>:</span>
                  <p>{presentAddress?.city?.name || "-"}</p>
                </div>
                <div>
                  <h4>Present Address</h4>
                  <span>:</span>
                  <p>{presentAddress?.street_1 || "-"} ,{presentAddress?.street_2 || "-"}, {presentAddress?.zip_code || "-"}</p>
                </div>
                <div>
                  <h4>Permanent Address</h4>
                  <span>:</span>
                  <p>{permanentAddress?.street_1 || "-"}, {permanentAddress?.street_2 || "-"}, {permanentAddress?.zip_code || "-"}</p>
                </div>
                {/* <div>
                  <h4>Zip Code</h4>
                  <span>:</span>
                  <p>{presentAddress?.zip_code || "-"}</p>
                </div> */}
              </div>
            </div>

            {/* Identity Information */}
            <div className="div_details">
              <div className="section_header">
                <span className="icon">{otherIcons.details_information}</span>
                <h2>Identity Information</h2>
              </div>
              
                {employeeDocuments?.length>0 ?( employeeDocuments?.map((item, index) => (
                  <div className="data DataIdentity" key={index}>
                  <div className="box_Identity" >
                    <div className="preview_pdf">
                      <div className="img">
                        {/* <img src={ImgPDF} alt="pdf" /> */}
                        {otherIcons.document_svg}
                      </div>

                      <div className="text">
                        <h3>{item?.document_name || "-"}</h3>
                      </div>
                    </div>
                    <div className="preview_eye">
                      {/* <img src={ImgEye} alt="" /> */}
                      {otherIcons.attachemnet_preview_svg}
                    </div>
                  </div>
                   </div>
                ))):(<div className="" style={{textAlign:"center", marginTop:"150px"}}> No Data Found</div>)
               }
             
            </div>
          </div>

          {/* Education Section */}
          <div className="education">
            <div className="section-header">
              {/* <FaGraduationCap className="icon" /> */}
              <img src={iconEdu} alt="" className="icon" />
              <h2>Education</h2>
            </div>
            <table>
              <thead>
                <tr>
                  <th>INSTITUTE NAME</th>
                  <th>DEGREE</th>
                  <th>SPECIALIZATION</th>
                  <th>FROM DATE</th>
                  <th>TO DATE</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {employeeDetail?.educations?.length > 0 ? (
                    employeeDetail?.educations.map((item, index) => (
                      <tr key={index}>
                        <td>{item?.institute_name || "-"}</td>
                        <td>{item?.degree || "-"}</td>
                        <td>{item?.specialization || "-"}</td>
                        <td>{formatDate3(item?.from_date) || "-"}</td>
                        <td>{formatDate3(item?.to_date) || "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="not_found_td">
                        <NoDataFound />
                      </td>
                    </tr>
                  )}
                </>
              </tbody>
            </table>
          </div>

          {/* Experience Section */}
          <div className="experience">
            <div className="section-header">
              <img src={imgCheck} alt="" className="icon" />
              <h2>Experience</h2>
            </div>
            {employeeDetail?.experiences?.length > 0 ? (
              employeeDetail?.experiences.map((item, index) => (
                <div className="experience-grid">
                  <div className="experience-card" key={index}>
                    <div className="logo_title">
                      {otherIcons.employee_experience_svg}
                      <div>
                        <h3>{item?.job_title || "-"}</h3>
                        <p>
                          {formatDate3(item?.from_date) || "-"} -{" "}
                          {formatDate3(item?.to_date) || "-"}
                        </p>
                      </div>
                    </div>
                    <h3>{item?.company_name || "-"}</h3>
                    <p>{item?.description || "-"}</p>
                    <button>{item?.job_title || "-"}</button>
                  </div>
                </div>
              ))
            ) : (
              <>
                <NoDataFound />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
