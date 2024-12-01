import { useEffect, useState } from "react";
import { MdDeleteOutline, MdWorkHistory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../../components/Helper/icons.jsx";
import {
  deleteEmployee,
  getEmployeeDetails,
} from "../../../Redux/Actions/employeeActions.js";
import ConfirmPopup from "../../../utils/common/ConfirmPopup.jsx";
import { formatDate3 } from "../../../utils/common/DateTimeFormat.jsx";
import Loader03 from "../../../utils/common/Loader03.jsx";
// import { dummyImageUrl } from "../../../utils/Constant.js";
import Contacts from "./Contacts.jsx";
import Documents from "./Documents.jsx";
import Education from "./Education.jsx";
import "./EmployeeDetails.scss";
import Experience from "./Experience.jsx";
import Health from "./Health.jsx";
import defaultUserImage from "../../../assets/user_2.png";

const EmployeeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  //Data from redux
  const employeeDetails = useSelector((state) => state?.employeeDetails);
  const employeeDetail = employeeDetails?.data?.result;
  console.log("employeeDetail", employeeDetail);
  const employeeLoading = employeeDetails?.loading || false;
  const [activeTab, setActiveTab] = useState("experience");

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getEmployeeDetails(queryParams));
    }
  }, [id]);

  const renderContent = () => {
    switch (activeTab) {
      case "experience":
        return (
          <Experience
            employeeData={employeeDetail?.experiences}
            employeeLoading={employeeLoading}
          />
        );
      case "education":
        return (
          <Education
            employeeData={employeeDetail?.educations}
            employeeLoading={employeeLoading}
          />
        );
      case "documents":
        return (
          <Documents
            employeeData={employeeDetail?.documents}
            employeeLoading={employeeLoading}
          />
        );
      case "contacts":
        return (
          <Contacts
            employeeData={employeeDetail?.contacts}
            employeeLoading={employeeLoading}
          />
        );
      case "health":
        return (
          <Health
            employeeData={employeeDetail?.employee_health}
            employeeLoading={employeeLoading}
          />
        );
      default:
        return <Experience />;
    }
  };

  // HandleDelete
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };
  const handleDeleteEmployee = () => {
    try {
      const sendData = {
        id: id,
      };
      dispatch(deleteEmployee(sendData, navigate)).then((res) => {
        if (res?.success) {
          setShowModal(false);
        }
      });
    } catch (err) {
      setShowModal(false);
      console.log("errr", err);
    }
  };

  const handleCancel = () => {
    navigate("/all-employee-list");
  };
  const handleEditEmployee = () => {
    navigate(`/add-employee/${id}`);
  };
  const handleRefresh = () => {
    // setRefresh(!refresh);
  };

  // const employeeImage = JSON?.parse(employeeDetail?.image || "[]");
  //  const employeeImage = employeeDetail?.image?.startsWith("[") ? JSON.parse(employeeDetail.image) : employeeDetail?.image || "";
  const employeeImage = employeeDetail?.image?.startsWith("[") ? JSON.parse(employeeDetail?.image) : [];
  console.log("employeeImage", employeeImage);

  return (
    <div className="profile-page">
      {employeeLoading ? (
        <Loader03 />
      ) : (
        <>
          {" "}
          <ConfirmPopup
            open={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDeleteEmployee}
            type="delete"
            module="Employee"
          />
          <div className="details">
            <div className="title_top">
              <h2>Employee Details</h2>
              <div className="close_btn" onClick={handleCancel}>
                {otherIcons.cross_svg}
              </div>
            </div>
            <div className="profile_card">
              <div className="img_card">
                <div className="progress-circle" style={{ "--angle": `` }}>
                  <img
                    src={
                      employeeImage?.length > 0
                        ? employeeImage[0]?.url
                        : defaultUserImage
                    }
                    alt={
                      employeeImage?.length > 0
                        ? employeeImage[0]?.name
                        : "user"
                    }
                  />
                </div>
                <div className="about_user">
                  <h3>
                    {(employeeDetail?.first_name || "-") +
                      " " +
                      (employeeDetail?.last_name || "-")}
                  </h3>

                  <div>
                    <h4></h4>
                    <h5>{employeeDetail?.employee_status || "-"}</h5>
                  </div>
                </div>
              </div>

              <div className="action_card">
                {/* <span className="div_box" onClick={handleRefresh}>
                  <div>{otherIcons.refresh_svg}</div>
                </span> */}
                <div onClick={handleEditEmployee}>
                  <span>{otherIcons?.edit_svg}</span> Edit
                </div>
                <div onClick={handleDelete}>
                  <span>
                    <MdDeleteOutline />
                  </span>
                  Delete
                </div>
              </div>
            </div>
            <div className="info_cardsEmp">
              <>
                <div className="card">
                  <div className="top_head">
                    <h3>
                      <span>
                        <MdWorkHistory />
                      </span>
                      Work Information
                    </h3>
                  </div>
                  <div className="contentInformation">
                    <div>
                      <h4>Department</h4>
                      <p>
                        {employeeDetail?.department?.department_name || "-"}
                      </p>
                    </div>
                    <div>
                      <h4>Designation</h4>
                      <p>
                        {employeeDetail?.designation?.designation_name || "-"}
                      </p>
                    </div>
                    <div>
                      <h4>Work Mail</h4>
                      <p>{employeeDetail?.email || "-"}</p>
                    </div>
                    <div>
                      <h4>Employee Type</h4>
                      <p>{employeeDetail?.employment_type || "-"}</p>
                    </div>
                    <div>
                      <h4>Employee Experience</h4>
                      <p>{employeeDetail?.experience || "-"}</p>
                    </div>
                    <div>
                      <h4>Date of Joining</h4>
                      <p>{formatDate3(employeeDetail?.joining_date) || "-"}</p>
                    </div>

                    <div>
                      <h4>Reporting manager</h4>
                      <p>
                        {(employeeDetail?.reporting_manager?.first_name ||
                          "-") +
                          " " +
                          (employeeDetail?.reporting_manager?.last_name || "-")}
                      </p>
                    </div>

                    <div>
                      <h4>Source of Hire</h4>
                      <p>{employeeDetail?.source_of_hire || "-"}</p>
                    </div>

                    <div>
                      <h4>Employment Status</h4>
                      <p>{employeeDetail?.employee_status || "-"}</p>
                    </div>
                    <div>
                      <h4>Date of Exit</h4>
                      <p>{formatDate3(employeeDetail?.date_of_exit) || "-"}</p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="top_head">
                    <h3>
                      <span>
                        <MdWorkHistory />
                      </span>
                      Personal Information
                    </h3>
                  </div>
                  <div className="contentInformation">
                    <div>
                      <h4>Employee ID</h4>
                      <p>{employeeDetail?.employee_id || "-"}</p>
                    </div>
                    <div>
                      <h4>Contact Number</h4>
                      <p>{employeeDetail?.mobile_no || "-"}</p>
                    </div>
                    <div>
                      <h4>Email</h4>
                      <p>{employeeDetail?.email || "-"}</p>
                    </div>
                    <div>
                      <h4>Date of Birth</h4>
                      <p>{formatDate3(employeeDetail?.date_of_birth) || "-"}</p>
                    </div>
                    <div>
                      <h4>Age</h4>
                      <p>{employeeDetail?.age || "-"}</p>
                    </div>
                    <div>
                      <h4>Gender</h4>
                      <p>{employeeDetail?.gender || "-"}</p>
                    </div>
                    <div>
                      <h4>Marital Status</h4>
                      <p>{employeeDetail?.marital || "-"}</p>
                    </div>
                  </div>
                </div>
              </>
            </div>

            <div className="nav-bar">
              <button
                className={activeTab === "experience" ? "activeEmp" : ""}
                onClick={() => setActiveTab("experience")}
              >
                Experience
              </button>
              <button
                className={activeTab === "education" ? "activeEmp" : ""}
                onClick={() => setActiveTab("education")}
              >
                Education
              </button>
              <button
                className={activeTab === "documents" ? "activeEmp" : ""}
                onClick={() => setActiveTab("documents")}
              >
                Documents
              </button>
              <button
                className={activeTab === "contacts" ? "activeEmp" : ""}
                onClick={() => setActiveTab("contacts")}
              >
                Contacts
              </button>
              <button
                className={activeTab === "health" ? "activeEmp" : ""}
                onClick={() => setActiveTab("health")}
              >
                Health
              </button>
            </div>

            <div className="contents">{renderContent()}</div>
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
      )}
    </div>
  );
};

export default EmployeeDetails;
