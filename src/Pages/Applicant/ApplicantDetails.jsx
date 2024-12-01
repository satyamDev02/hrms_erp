import { useEffect, useState } from "react";
import "../Employee_onboarding/EmployeeDetail/EmployeeDetails.scss";
import { FiFileText } from "react-icons/fi";
import { MdDeleteOutline, MdWorkHistory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../components/Helper/icons";
import {
  deleteApplicant,
  getApplicantDetails,
} from "../../Redux/Actions/applicantActions";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { formatDate, formatDate3 } from "../../utils/common/DateTimeFormat";
import Loader03 from "../../utils/common/Loader03";
import { dummyImageUrl } from "../../utils/Constant";
import { getUserById } from "../../Redux/Actions/globalActions";

const ApplicantDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const applicantDetails = useSelector((state) => state?.applicantDetails);
  const applicantDetail = applicantDetails?.data?.result || {};
  const applicantDetailLoading = applicantDetails?.loading || false;

  const userData = useSelector((state) => state?.getUserById?.data);

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getApplicantDetails(queryParams));
    }
  }, [id]);

  useEffect(() => {
    if(applicantDetail?.id){
    const sendData = {
      enteredbyid: applicantDetail?.enteredbyid,
    };
    dispatch(getUserById(sendData));
    }
  }, [applicantDetail?.id]);

  // HandleDelete
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteJob = () => {
    try {
      const sendData = {
        id: id,
      };
      dispatch(deleteApplicant(sendData, navigate)).then((res) => {
        if (res?.success) {
          setShowModal(false);
          // setTimeout(() => {
          //   navigate("/all-job-list");
          // }, 1500);
        }
      });
    } catch (err) {
      setShowModal(false);
      console.log("Error", err);
    }
  };

  const handleCancel = () => {
    navigate("/applicant_list");
  };

  const handleEditAppicant = () => {
    navigate(`/add_applicant/${id}`);
  };

  const ApplicantResume = JSON.parse(applicantDetail?.resume || "[]");
  const ApplicantCoverLetter = JSON.parse(
    applicantDetail?.cover_letter || "[]"
  );

  return (
    <div className="profile-page">
      {applicantDetailLoading ? (
        <Loader03 />
      ) : (
        <>
          <ConfirmPopup
            open={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDeleteJob}
            type="delete"
            module="Applicant"
          />
          <div className="details">
            <div className="title_top">
              <h2>Applicant Details</h2>
              <div className="close_btn" onClick={handleCancel}>
                {otherIcons.cross_svg}
              </div>
            </div>
            <div className="profile_card">
              <div className="img_card">
                <div className="progress-circle">
                  <img src={dummyImageUrl} alt="Dummy Image" />
                </div>
                <div className="about_user">
                  <h3>{applicantDetail?.name || "-"}</h3>

                  <div className="">
                    <h5>{applicantDetail?.status || "-"}</h5>
                  </div>
                </div>
              </div>
              <div className="action_card">
                <div onClick={handleEditAppicant}>
                  <span>{otherIcons.edit_svg}</span> Edit
                </div>
                <div onClick={handleDelete}>
                  <span>
                    <MdDeleteOutline />
                  </span>
                  Delete
                </div>
              </div>
            </div>
            <div className="info-cards" style={{ paddingBottom: "30px" }}>
              <div className="card">
                <div className="top_head">
                  {" "}
                  <h3>
                    <span>
                      <MdWorkHistory />
                    </span>
                    Personal Information
                  </h3>
                </div>
                <div className="contentInformation">
                  <div>
                    <h4>Email ID</h4>
                    <p>{applicantDetail?.email || "-"}</p>
                  </div>
                  <div>
                    <h4>Contact Number</h4>
                    <p>{applicantDetail?.mobile_no || "-"}</p>
                  </div>
                  <div>
                    <h4>Country</h4>
                    <p>{applicantDetail?.country?.name || "-"}</p>
                  </div>
                  <div>
                    <h4>State</h4>
                    <p>{applicantDetail?.state?.name || "-"}</p>
                  </div>
                  <div>
                    <h4>City</h4>
                    <p>{applicantDetail?.city?.name || "-"}</p>
                  </div>
                  <div>
                    <h4>Zip code</h4>
                    <p>{applicantDetail?.zip_code || "-"}</p>
                  </div>
                  <div>
                    <h4>Resume</h4>
                    <p>
                      {ApplicantResume?.length > 0 &&
                        ApplicantResume?.map((file, index) => (
                          <div key={index} className="resume-item">
                            <span title={file?.name}>
                              {file?.name.substring(0, 10)}
                              {file?.name.length > 10 ? "..." : ""}
                            </span>

                            <a
                              href={file?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FiFileText
                                style={{ marginLeft: "8px", cursor: "pointer" }}
                              />
                            </a>
                          </div>
                        ))}
                    </p>
                  </div>
                  <div>
                    <h4>Cover Letter</h4>
                    <p>
                      {ApplicantCoverLetter?.length > 0 &&
                        ApplicantCoverLetter?.map((file, index) => (
                          <div key={index} className="resume-item">
                            <span title={file?.name}>
                              <span>
                                {file?.name.length > 15
                                  ? file.name.substring(0, 15) + "..."
                                  : file.name}
                              </span>
                            </span>

                            <a
                              href={file?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FiFileText
                                style={{ marginLeft: "8px", cursor: "pointer" }}
                              />
                            </a>
                          </div>
                        ))}
                    </p>
                  </div>
                </div>
              </div>
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
                    <h4>Applied for</h4>
                    <p>{applicantDetail?.job_opening_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Source</h4>
                    <p>{applicantDetail?.source || "-"}</p>
                  </div>
                  
                  <div>
                    <h4>Referral Employee</h4>
                    <p>{applicantDetail?.referred_by || "-"}</p>
                  </div>
                  <div>
                    <h4>Availability Date</h4>
                    <p>
                      {formatDate3(applicantDetail?.availability_date) || "-"}
                    </p>
                  </div>
                  <div>
                    <h4>Expected Salary</h4>
                    <p>{applicantDetail?.expected_salary || "-"}</p>
                  </div>
                  <div>
                    <h4>Created at</h4>

                    <p>{formatDate(applicantDetail?.created_at) || "-"}</p>
                  </div>
                  <div>
                    <h4>Created By</h4>
                    <p>{userData?.created_by || "-"}</p>
                  </div>
                </div>
                {/* Personal information content */}
              </div>
            </div>
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

export default ApplicantDetails;
