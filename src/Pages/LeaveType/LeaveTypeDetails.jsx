import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  deleteLeaveType,
  getLeaveTypeDetails,
} from "../../Redux/Actions/leaveMasterActions";
import { otherIcons } from "../../components/Helper/icons";
import { dummyImageUrl } from "../../utils/Constant";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { formatDate } from "../../utils/common/DateTimeFormat";
import Loader03 from "../../utils/common/Loader03";
import { OutsideClick } from "../../utils/common/OutsideClick";
import "../../Pages/Leave/LeaveDetails.scss";
import AddLeaveType from "./AddLeaveType";
import { getUserById } from "../../Redux/Actions/globalActions";

const LeaveTypeDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const leaveTypeDetails = useSelector((state) => state?.leaveTypeDetails);
  const leaveTypeDetail = leaveTypeDetails?.data?.result || {};
  const leaveTypeLoading = leaveTypeDetails?.loading || false;

  const userData = useSelector((state) => state?.getUserById?.data);

  const editLeaveTypePopup = OutsideClick();

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getLeaveTypeDetails(queryParams));
    }
  }, [id]);

  useEffect(() => {
    if(leaveTypeDetail?.id){
    const sendData = {
      'enteredbyid': leaveTypeDetail?.enteredbyid
    };
    dispatch(getUserById(sendData));
    }
  }, [leaveTypeDetail?.id]);

  // HandleDelete
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteLeaveType = () => {
    try {
      const sendData = {
        id: id,
      };
      dispatch(deleteLeaveType(sendData, navigate)).then((res) => {
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
    navigate("/leave_type");
  };
  const [searchTrigger, setSearchTrigger] = useState(0);

  return (
    <div className="profile-page">
      {leaveTypeLoading ? (
        <Loader03 />
      ) : (
        <>
          <div className="">
            {editLeaveTypePopup?.isOpen && (
              <AddLeaveType
                ClosePop={editLeaveTypePopup.handleToggle}
                refBox={editLeaveTypePopup?.ref}
                updateList={setSearchTrigger}
                id={id}
              />
            )}

            <ConfirmPopup
              open={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={handleDeleteLeaveType}
              type="delete"
              module="Leave Type"
            />
          </div>

          <div className="details">
            <div className="title_top">
              <h2>Leave Details</h2>
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
                  <h3>{leaveTypeDetail?.leave_type || "-"}</h3>
                  <p>{leaveTypeDetail?.type_of_leave || "-"}</p>
                  <div>
                    <h4></h4>{" "}
                    <h5>
                      {leaveTypeDetail?.status == 0
                        ? "Active"
                        : leaveTypeDetail?.status == 1
                          ? "Inacive"
                          : ""}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="action_card">
                {/* <span className="div_box" onClick={handleRefresh}>
              <div>{otherIcons.refresh_svg}</div>
            </span> */}
                <div onClick={editLeaveTypePopup.handleToggle}>
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
                  <h3>
                    <span>{otherIcons.details_information}</span> Leave Details
                  </h3>
                </div>
                <div className="contentInformation">
                  <div>
                    <h4> Type of Leave</h4>
                    <p>{leaveTypeDetail?.type_of_leave || "-"}</p>
                  </div>
                  <div>
                    <h4>Available Days</h4>
                    <p>{leaveTypeDetail?.available_days || "-"}</p>
                  </div>
                  <div>
                    <h4>Status</h4>
                    <p>
                      {leaveTypeDetail?.status == 0
                        ? "Active"
                        : leaveTypeDetail?.status == 1
                          ? "Inacive"
                          : "" || ""}
                    </p>
                  </div>

                  <div>
                    <h4>Created At</h4>
                    <p>{formatDate(leaveTypeDetail?.created_at) || "-"}</p>
                  </div>
                  <div>
                    <h4>Created By</h4>
                    <p>{userData?.created_by || "-"}</p>
                  </div>
                </div>
                <div id="DescriptionJOB">
                  <div>
                    <h4 style={{ marginLeft: "-15px" }}>Description</h4>
                    <p>{leaveTypeDetail?.description || ""}</p>
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
        </>
      )}
    </div>
  );
};

export default LeaveTypeDetails;
