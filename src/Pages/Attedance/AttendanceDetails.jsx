import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteAttendance, getAttendanceDetails,
  getAttendanceSummary,
} from "../../Redux/Actions/attendanceActions";
import { otherIcons } from "../../components/Helper/icons";
import { dummyImageUrl } from "../../utils/Constant";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { formatDate, formatDay } from "../../utils/common/DateTimeFormat";
import Loader03 from "../../utils/common/Loader03";
import { OutsideClick } from "../../utils/common/OutsideClick";
import AddNewAttendanceForm from "./AddNewAttendanceForm";
import "./AttendanceDetails.scss";
import "./Calendar.scss";
import CalendarAttendance from "../../utils/Calendar/Attendance/CalendarAttendance";
import { getUserById } from "../../Redux/Actions/globalActions";

const AttendanceDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const attendanceDetails = useSelector((state) => state?.attendanceDetails);
  const attendanceDetail = attendanceDetails?.data?.result || {};
  const attendanceLoading = attendanceDetails?.loading || false;

  const attendanceSummary = useSelector((state) => state?.attendanceSummary);
  const attendanceDetailSummary = attendanceSummary?.data?.attendanceSummary || [];
  const attendanceSummaryLoading = attendanceSummary?.loading || false;
  console.log("atteendanceSummary", attendanceDetailSummary)

  const userData = useSelector((state) => state?.getUserById?.data);

  const editAttendancePopup = OutsideClick();

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getAttendanceDetails(queryParams));
    }
  }, [id]);
console.log("attendanceDetail", attendanceDetail?.user_id)
  useEffect(() => {
    if(attendanceDetail?.id) {
    const sendData = {
      'enteredbyid': attendanceDetail?.enteredbyid
    };
    dispatch(getUserById(sendData));
    const sendData2 = {
      'user_id': attendanceDetail?.user_id
    };
    dispatch(getAttendanceSummary(sendData2));
    }
  }, [attendanceDetail?.id]);

  // HandleDelete
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteAttendance = () => {
    try {
      const sendData = {
        id: id,
      };
      dispatch(deleteAttendance(sendData, navigate)).then((res) => {
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
    navigate("/all-attendance-list");
  };

  return (
    <div className="profile-page">
      {attendanceLoading ? (
        <Loader03 />
      ) : (
        <>
          {editAttendancePopup?.isOpen && (
            <AddNewAttendanceForm
              ClosePop={editAttendancePopup.handleToggle}
              refBox={editAttendancePopup?.ref}
              id={id}
              data={attendanceDetail}
            />
          )}
          <ConfirmPopup
            open={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDeleteAttendance}
            type="delete"
            module="Attendance"
          />
          <div className="details">
            <div className="title_top">
              <h2>Attendance Details</h2>
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
                  <h3>{attendanceDetail?.user_name || "-"}</h3>
                 
                </div>
              </div>
              <div className="action_card">
                <div onClick={editAttendancePopup.handleToggle}>
                  {otherIcons.edit_svg}
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
            <div className="info_cards_at" style={{ paddingBottom: "30px" }}>
              <div className="card_at">
                <div className="top_head">
                  {" "}
                  <h3>
                    <span>{otherIcons.details_information}</span>
                    Personal Information
                  </h3>
                </div>
                <div className="contentInformation">
                <div>
                    <h4>Employee Name</h4>
                    <p>{attendanceDetail?.user_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Employee ID</h4>
                    <p>{attendanceDetail?.employee?.employee_id || "-"}</p>
                  </div>
                  <div>
                    <h4>Department</h4>
                    <p>{attendanceDetail?.employee?.department?.department_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Designation</h4>
                    <p>{attendanceDetail?.employee?.designation?.designation_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Created at</h4>
                    <p>{formatDate(attendanceDetail?.created_at) || "-"}</p>
                  </div>
                  <div>
                    <h4>Created By</h4>
                    <p>{userData?.created_by || "-"}</p>
                  </div>
                </div>
              </div>
              <div className="card_at">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>{otherIcons?.details_information}</span>
                    Attendance Statistics
                  </h3>
                </div>
                <div className="contentInformation">
                  <div>
                    <h4>Shift</h4>
                    <p>{attendanceDetail?.shift_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Status</h4>
                    <p>{attendanceDetail?.status == 1 ? "Absent" : attendanceDetail?.status == 0 ? "Present" : attendanceDetail?.status == 2 ? "Half Day" : "-"}</p>
                  </div>
                  <div>
                    <h4>Punch in</h4>
                    <p>{attendanceDetail?.punch_in || "-"}</p>
                  </div>
                  <div>
                    <h4>Punch out</h4>
                    <p>{attendanceDetail?.punch_out || "-"}</p>
                  </div>
                  <div>
                    <h4>Total Hours Worked</h4>
                    <p>{attendanceDetail?.total_hours_worked || "-"}</p>
                  </div>
                  {/* <div>
                    <h4>Overtime</h4>
                    <p>{attendanceDetail?.overtime || ""}</p>
                  </div>                   */}
                  <div>
                    <h4>Day</h4>
                    <p>{formatDay(attendanceDetail?.created_at) || "-"}</p>
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
            </div>
            <div className="info_cards_at" style={{ paddingBottom: "30px" }}>
              <div className="card_at">
                <div className="top_head">
                  <h3>
                    {" "}
                    <span>{otherIcons.details_information}</span>
                    Attendance Summary
                  </h3>
                </div>
                <CalendarAttendance attendanceDetail={attendanceDetailSummary} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceDetails;
