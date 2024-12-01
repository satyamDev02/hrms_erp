import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../components/Helper/icons";
import { getUserById } from "../../Redux/Actions/globalActions";
import {
  deleteTraining,
  getTrainingDetails,
} from "../../Redux/Actions/trainingActions";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import {
  formatDate,
  formatDate3,
} from "../../utils/common/DateTimeFormat";
import Loader03 from "../../utils/common/Loader03";
import "../Employee_onboarding/EmployeeDetail/EmployeeDetails.scss";

const TrainingDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const trainingDetails = useSelector((state) => state?.trainingDetails);
  const trainingDetail = trainingDetails?.data?.result;
  const trainingDetailLoading = trainingDetails?.loading || false;

  const userData = useSelector((state) => state?.getUserById?.data);

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getTrainingDetails(queryParams));
    }
  }, [id]);

  useEffect(() => {
    if(trainingDetail?.id){
    const sendData = {
      enteredbyid: trainingDetail?.enteredbyid,
    };
    dispatch(getUserById(sendData));
    }
  }, [trainingDetail?.id]);

  // HandleDelete
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteTraining = () => {
    try {
      const sendData = {
        id: id,
      };
      dispatch(deleteTraining(sendData, navigate)).then((res) => {
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
    navigate("/training");
  };

  const handleEdit = () => {
    navigate(`/new-training/${id}`);
  };
  return (
    <div className="profile-page">
      {trainingDetailLoading ? (
        <Loader03 />
      ) : (
        <>
          <ConfirmPopup
            open={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDeleteTraining}
            type="delete"
            module="Training"
          />
          <div className="details">
            <div className="title_top">
              <h2>Training Details</h2>
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
                  <h3>{trainingDetail?.trainig_type || "-"}</h3>
                  <p>
                    By {trainingDetail?.trainer?.trainer_name || "-"} To{" "}
                    {trainingDetail?.employe?.first_name +
                      " " +
                      trainingDetail?.employe?.last_name || "-"}
                  </p>
                  <div>
                    <h4></h4>
                    <h5>
                      {trainingDetail?.status == 1
                        ? "Inactive"
                        : "Active" || ""}
                    </h5>
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

            <div className="info-cards">
              <div className="card  ">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>
                    {otherIcons.details_information}
                    </span>
                    Training Information
                  </h3>
                </div>
                <div className="contentInformation">
                  <div>
                    <h4>Trainer Assigned</h4>
                    <p>{trainingDetail?.trainer?.trainer_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Start Date</h4>
                    <p>{formatDate3(trainingDetail?.start_date) || "-"}</p>
                  </div>
                  <div>
                    <h4>End Date</h4>
                    <p>{formatDate3(trainingDetail?.end_date) || "-"}</p>
                  </div>

                  <div>
                    <h4>Training Duration</h4>
                    <p>{trainingDetail?.duration || "-"}</p>
                  </div>

                  <div>
                    <h4>Training Cost</h4>
                    <p>
                      {trainingDetail?.training_cost
                        ? "$" + trainingDetail?.training_cost
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <h4>Status</h4>
                    <p>
                      {trainingDetail?.status == 1
                        ? "Inactive"
                        : "Active" || ""}
                    </p>
                  </div>
                  <div>
                    <h4>Created By</h4>
                    <p>{userData?.created_by || "-"}</p>
                  </div>
                  <div>
                    <h4> Created At</h4>
                    <p>{formatDate(trainingDetail?.created_at) || "-"}</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>
                      {otherIcons.details_information}
                    </span>
                    Training Description
                  </h3>
                </div>
                <div className="contentInformation"></div>
                <div id="DescriptionJOB" style={{ marginTop: "-25px" }}>
                  <p className="paragra">
                    {trainingDetail?.description || "-"}
                  </p>
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

export default TrainingDetails;
