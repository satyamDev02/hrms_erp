import { useEffect, useState } from "react";
import { MdDeleteOutline, MdWorkHistory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../../components/Helper/icons";
import ConfirmPopup from "../../../utils/common/ConfirmPopup";
import { formatDate, formatDate3 } from "../../../utils/common/DateTimeFormat";
import Loader03 from "../../../utils/common/Loader03";
import "../../Employee_onboarding/EmployeeDetail/EmployeeDetails.scss";
import {
  deleteProject,
  getProjectDetails,
} from "../../../Redux/Actions/projectActions";
import { calculateDuration } from "../../../utils/helper";
import "./ProjectDetails.scss";
import { useGetNameById } from "../../../utils/common/useGetNameById";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const projectDetails = useSelector((state) => state?.projectDetails);
  const projectDetail = projectDetails?.data?.result;
  const projectDetailLoading = projectDetails?.loading || false;

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getProjectDetails(queryParams));
    }
  }, [id]);

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
      dispatch(deleteProject(sendData, navigate)).then((res) => {
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
    navigate("/project");
  };

  const handleEdit = () => {
    navigate(`/add-project/${id}`);
  };

  const attachments =
    typeof projectDetail?.attachments === "string"
      ? JSON.parse(projectDetail?.attachments)
      : projectDetail?.attachments || [];


  const name = useGetNameById(projectDetail?.enteredbyid);

  return (
    <div className="profile-page">
      {projectDetailLoading ? (
        <Loader03 />
      ) : (
        <>
          <ConfirmPopup
            open={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDeleteJob}
            type="delete"
            module="Project"
          />
          <div className="details">
            <div className="title_top">
              <h2>Project Details</h2>
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
                  <h3>{projectDetail?.project_name || "-"}</h3>
                  <p>{projectDetail?.priority || "-"}</p>
                  <div>
                    <h4></h4>
                    <h5>{projectDetail?.status || "-"}</h5>
                  </div>
                </div>
              </div>
              <div className="action_card">
                <div onClick={handleEdit}>
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
                    Project Information
                  </h3>
                </div>
                <div className="contentInformation">
                  <div>
                    <h4>Project Name</h4>
                    <p>{projectDetail?.project_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Client Name</h4>
                    <p>{projectDetail?.client?.full_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Priority</h4>
                    <p>{projectDetail?.priority || "-"}</p>
                  </div>
                  <div>
                    <h4>Project Leader</h4>
                    <p>{projectDetail?.project_leader || "-"}</p>
                  </div>
                  <div>
                    <h4>Project Team</h4>
                    <p>
                      {projectDetail?.team_id
                        ? JSON.parse(projectDetail.team_id)
                            .map((member) => member.name)
                            .join(", ")
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <h4>Start Date</h4>
                    <p>{formatDate3(projectDetail?.start_date) || "-"}</p>
                  </div>
                  <div>
                    <h4>Project Deadline</h4>
                    <p>{formatDate3(projectDetail?.end_date) || "-"}</p>
                  </div>

                  <div>
                    <h4>Duration</h4>
                    <p>
                      {calculateDuration(
                        projectDetail?.start_date,
                        projectDetail?.end_date
                      ) || "-"}
                    </p>
                  </div>

                  <div>
                    <h4>Project Status</h4>
                    <p>{projectDetail?.status || "-"}</p>
                  </div>

                  <div>
                    <h4> Created At</h4>
                    <p>{formatDate(projectDetail?.created_at) || "-"}</p>
                  </div>
                  <div>
                    <h4>Created By</h4>
                    <p>{name}</p>
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
                    <p>{projectDetail?.description || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-cards">
              <div className="card">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>
                     {otherIcons.attachment_detail_svg}
                    </span>{" "}
                    Attachments
                  </h3>
                </div>
                <div className="contentInformation"></div>
                <div id="DescriptionJOB" className="img_project_download">
                  {attachments.map((img, index) => {
                    return (
                      <div key={index} className="tooltip-container">
                        <a target="_blank" href={img.url}>
                          {otherIcons.attachemnet_preview_svg}
                        </a>
                        <span className="tooltip-text">{img.name}</span>
                      </div>
                    );
                  })}
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
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
