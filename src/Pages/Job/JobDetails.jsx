import { useEffect, useState } from "react";
import { MdDeleteOutline, MdWorkHistory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deletejob, getJobDetails } from "../../Redux/Actions/jobActions";
import { otherIcons } from "../../components/Helper/icons";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { formatDate } from "../../utils/common/DateTimeFormat";
import Loader03 from "../../utils/common/Loader03";
import "../Employee_onboarding/EmployeeDetail/EmployeeDetails.scss";
import { getUserById } from "../../Redux/Actions/globalActions";

const JobDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const jobDetails = useSelector((state) => state?.jobDetails);
  const jobDetail = jobDetails?.data?.jobOpening || {};
  const jobDetailLoading = jobDetails?.loading || false;

  const userData = useSelector((state) => state?.getUserById?.data);

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getJobDetails(queryParams));
    }
  }, [id]);

  useEffect(() => {
    if (jobDetail?.id) {
      const sendData = {
        'enteredbyid': jobDetail?.enteredbyid
      };
      dispatch(getUserById(sendData));
    }
  }, [jobDetail?.id]);

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
      dispatch(deletejob(sendData, navigate)).then((res) => {
        if (res?.success) {
          setShowModal(false);
          // setTimeout(() => {
          //   navigate("/all-job-list");
          // }, 1500);
        }
      })
    } catch (err) {
      setShowModal(false);
      console.log("Error", err);
    }
  };

  const handleCancel = () => {
    navigate("/all-job-list");
  };

  const handleEditJob = () => {
    navigate(`/add-job/${id}`);
  };

  return (
    <div className="profile-page">
      {jobDetailLoading ? <Loader03 /> :
        <>
          <ConfirmPopup
            open={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDeleteJob}
            type="delete"
            module="Job"
          />
          <div className="details">
            <div className="title_top">
              <h2>Job Details</h2>
              <div className="close_btn" onClick={handleCancel}>
                {otherIcons.cross_svg}
              </div>
            </div>
            <div className="profile_card">
              <div className="img_card">
                <div className="progress-circle">
                  <img
                    src="https://w7.pngwing.com/pngs/564/690/png-transparent-computer-icons-web-browser-new-job-hand-business-silhouette-thumbnail.png"
                    alt=""

                  />
                </div>
                <div className="about_user">
                  <h3>{jobDetail?.job_title || "-"}</h3>
                  <p>{jobDetail?.department?.department_name || "-"}</p>
                  <div>
                    <h4></h4>
                    <h5>{jobDetail?.job_status || "-"}</h5>
                  </div>
                </div>
              </div>
              <div className="action_card">
                <div onClick={handleEditJob}>
                  <span>{otherIcons.edit_svg}</span>
                  Edit
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
                  <h3>
                    <span>
                      <MdWorkHistory />
                    </span>
                    Job Information
                  </h3>
                </div>
                <div className="contentInformation">
                  <div>
                    <h4>Department</h4>
                    <p>{jobDetail?.department?.department_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Designation</h4>
                    <p>{jobDetail?.designation?.designation_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Required Experience</h4>
                    <p>{jobDetail?.experience || "-"}</p>
                  </div>
                  <div>
                    <h4>Job Location</h4>
                    <p>{jobDetail?.job_location || "-"}</p>
                  </div>
                  <div>
                    <h4>No. Of Positions</h4>
                    <p>{jobDetail?.no_of_position || "-"}</p>
                  </div>
                  <div>
                    <h4>Employee Type</h4>
                    <p>{jobDetail?.employee_type || "-"}</p>
                  </div>
                  <div>
                    <h4>Required Skills</h4>
                    <p>{jobDetail?.skills || "-"}</p>
                  </div>
                  <div>
                    <h4>Created By</h4>
                    <p>{userData?.created_by || "-"}</p>
                  </div>
                  <div>
                    <h4> Created At</h4>
                    <p>{formatDate(jobDetail?.created_at) || "-"}</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="top_head">
                  <h3>
                    <span>
                      <MdWorkHistory />
                    </span>
                    Description
                  </h3>
                </div>
                <div id="DescriptionJOB">
                  <div>
                    <p>{jobDetail?.description || "-"}</p>
                  </div>
                </div>
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
        </>}
    </div>
  );
};

export default JobDetails;
