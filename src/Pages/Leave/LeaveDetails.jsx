import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  deleteLeave,
  getEmpLeaveDetails,
  getLeaveDetails,
  getLeaveSummaryDetails,
} from "../../Redux/Actions/leaveActions";
import { otherIcons } from "../../components/Helper/icons";
import "../../components/style.css";
import { dummyImageUrl } from "../../utils/Constant";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { formatDate, formatDate3 } from "../../utils/common/DateTimeFormat";
import "./LeaveDetails.scss";
import { getUserById } from "../../Redux/Actions/globalActions";
import Loader03 from "../../utils/common/Loader03";

const LeaveDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const leaveDetails = useSelector((state) => state?.leaveDetails);
  const leaveDetail = leaveDetails?.data?.result || {};
  const leaveLoading = leaveDetails?.loading || false;

  const empLeaveDetails = useSelector((state) => state?.empLeaveDetails);
  const empLeaveDetail = empLeaveDetails?.data?.leaveByuserId || [];

  const leaveSummaryDetails = useSelector((state) => state?.leaveSummaryDetails);
  const leaveSummmaryDetail = leaveSummaryDetails?.data?.leave_summary || [];

  const userData = useSelector((state) => state?.getUserById?.data);

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getLeaveDetails(queryParams));
    }
  }, [id]);

  useEffect(() => {
    if (leaveDetail?.id) {
      const queryParams = {
        user_id: leaveDetail?.user_id,
      };
      dispatch(getEmpLeaveDetails(queryParams));
      const queryParams2 = {
        user_id: leaveDetail?.user_id,
      };
      dispatch(getLeaveSummaryDetails(queryParams2));

      const sendData = {
        enteredbyid: leaveDetail?.enteredbyid,
      };
      dispatch(getUserById(sendData));
    }
  }, [leaveDetail?.id]);

  // HandleDelete
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteLeave = () => {
    try {
      const sendData = {
        id: id,
      };
      dispatch(deleteLeave(sendData, navigate)).then((res) => {
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
    navigate("/all-leave");
  };

  const handleEditLeave = () => {
    navigate(`/new-leave/${id}`);
  };

  return (
    <div className="profile-page">
      {leaveLoading ? (
        <Loader03 />
      ) : (
        <>
          {" "}
          <div className="">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
              theme="error"
            />
            <ConfirmPopup
              open={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={handleDeleteLeave}
              type="delete"
              module="Leave"
            />
          </div>
          <div className="details">
            <div className="title_top">
              <h2>Employee Leave Details</h2>
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
                  <h3>{leaveDetail?.name || "-"}</h3>
                  <p>{leaveDetail?.leave_type_name || "-"}</p>
                  <div>
                    <h4></h4> <h5>{leaveDetail?.status || "-"}</h5>
                  </div>
                </div>
              </div>
              <div className="action_card">
                {/* <span className="div_box" onClick={handleRefresh}>
              <div>{otherIcons.refresh_svg}</div>
            </span> */}
                <div onClick={handleEditLeave}>
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
                    <h4>Employee Name</h4>
                    <p>{leaveDetail?.name || "-"}</p>
                  </div>
                  <div>
                    <h4> Type Of Leave</h4>
                    <p>{leaveDetail?.leave_type_name || "-"}</p>
                  </div>

                  <div>
                    <h4> Type</h4>
                    <p>{leaveDetail?.type_of_leave || "-"}</p>
                  </div>
                  <div>
                    <h4> Leave Start Date</h4>
                    <p>{formatDate3(leaveDetail?.from_date) || "-"}</p>
                  </div>
                  <div>
                    <h4> Leave End Date</h4>
                    <p>{formatDate3(leaveDetail?.to_date) || "-"}</p>
                  </div>

                  <div>
                    <h4> No of Days</h4>
                    <p>{leaveDetail?.days || "-"}</p>
                  </div>
                  <div>
                    <h4>Leave Status</h4>
                    <p>{leaveDetail?.status || "-"}</p>
                  </div>
                  <div>
                    <h4>Created At</h4>
                    <p>{formatDate(leaveDetail?.created_at) || "-"}</p>
                  </div>
                  <div>
                    <h4>Created By</h4>
                    <p>{userData?.created_by || "-"}</p>
                  </div>
                  
                </div>
                <div id="DescriptionJOB">
                    <h4> Reason</h4>
                    <p className="paragra">{leaveDetail?.resion || "-"}</p>
                  </div>
                <div></div>
              </div>
              <div className="card4">
                <div className="top_head4">
                  <h3>
                    <span>{otherIcons.details_information}</span>
                    Leave Summary
                  </h3>
                </div>

                <div className="Emp4">
                  {leaveSummmaryDetail?.map((item, index) => (
                    <div className="Leave_Summary" key={index}>
                      <p>{item?.leave_type || "-"}</p>
                      <p>Available - {item?.available_days || "0"}</p>
                      <p>Booked - {item?.booked_days || "0"}</p>
                      <p>
                        Remaining -{" "}
                        {(item?.available_days || 0) - (item?.booked_days || 0)}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Personal information content */}
              </div>
            </div>
            {/* table */}
            <div className="contents">
              <div>
                <div className="ProjectList">
                  <div className="section-header-title">
                    {/* <FaGraduationCap className="icon" /> */}
                    {otherIcons.details_information}
                    <h2>Leave History</h2>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empLeaveDetail.map((item, index) => (
                        <tr key={index}>
                          <td>{item?.leave_type_name || "-"}</td>
                          <td>{formatDate3(item?.from_date) || "-"}</td>
                          <td>{formatDate3(item?.from_date) || "-"}</td>
                          <td title={item?.resion || "-"}>
                            {item?.resion?.substring(0, 10) || "-"}
                            {item?.resion?.length > 10 ? "..." : "-"}
                          </td>
                          <td
                            className={
                              item?.status == "Approved"
                                ? "completed"
                                : item?.status == "Pending"
                                  ? "pending"
                                  : item?.status == "Declined"
                                    ? "declined"
                                    : ""
                            }
                          >
                            <span className="td">{item?.status || "-"}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeaveDetails;
