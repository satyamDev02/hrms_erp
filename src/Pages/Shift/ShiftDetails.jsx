import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { otherIcons } from "../../components/Helper/icons";
import { getUserById } from "../../Redux/Actions/globalActions";
import {
  deleteShift,
  getShiftMasterDetails,
} from "../../Redux/Actions/shiftActions";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { formatDate } from "../../utils/common/DateTimeFormat";
import Loader03 from "../../utils/common/Loader03";
import { OutsideClick } from "../../utils/common/OutsideClick";
import AddNewShiftForm from "./AddNewShiftForm";
import "./SiftDetails.scss";

const ShiftDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const shiftDetails = useSelector((state) => state?.shiftMasterDetails);
  const shiftDetail = shiftDetails?.data?.result || {};
  const shiftLoading = shiftDetails?.loading || false;

  const userData = useSelector((state) => state?.getUserById?.data);

  const editShiftPopup = OutsideClick();

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getShiftMasterDetails(queryParams));
    }
  }, [id]);

  useEffect(() => {
    if (shiftDetail?.id) {
      const sendData = {
        enteredbyid: shiftDetail?.enteredbyid,
      };
      dispatch(getUserById(sendData));
    }
  }, [shiftDetail?.id]);

  // HandleDelete
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteShift = () => {
    try {
      const sendData = {
        id: id,
      };
      dispatch(deleteShift(sendData, navigate)).then((res) => {
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
    navigate("/shift");
  };

  return (
    <div className="profile-page">
      {shiftLoading ? (
        <Loader03 />
      ) : (
        <>
          {editShiftPopup.isOpen && (
            <AddNewShiftForm ClosePop={editShiftPopup.handleToggle} id={id} />
          )}
          <ConfirmPopup
            open={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDeleteShift}
            type="delete"
            module="Attendance"
          />

          <div className="details">
            <div className="title_top">
              <h2>Shift Detail</h2>
              <div className="close_btn" onClick={handleCancel}>
                {otherIcons.cross_svg}
              </div>
            </div>
            <div className="profile_card">
              <div className="img_card">
                {otherIcons.shiftdetail_icon_svg}
                <div className="about_user">
                  <h3>{shiftDetail?.shift_name || "-"}</h3>

                  <div>
                    <h4></h4>{" "}
                    <h5>{shiftDetail?.status == 0 ? "Active" : "Inactive"} </h5>
                  </div>
                </div>
              </div>
              <div className="action_card">
                {/* <span className='div_box' onClick={handleRefresh}>
                            <div>
                                {otherIcons.refresh_svg}
                            </div>
                        </span> */}
                <div onClick={editShiftPopup.handleToggle}>
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
            <div className="info-cards">
              <div className="card">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>{otherIcons.details_information}</span>Shif
                    Information
                  </h3>
                </div>
                <div className="contentInformation_shift">
                  <div>
                    <h4>Shift Name</h4>
                    <p>{shiftDetail?.shift_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Start Time</h4>
                    <p>{shiftDetail?.start_time || "-"}</p>
                  </div>
                  <div>
                    <h4>End Time</h4>
                    <p>{shiftDetail?.end_time || "-"}</p>
                  </div>
                  <div>
                    <h4>Extra Hours</h4>
                    <p>{shiftDetail?.extra_hours ? `${shiftDetail?.extra_hours} ${"Hours"}` : "-"}</p>
                  </div>
                  <div>
                    <h4>Break Time</h4>
                    <p>{shiftDetail?.break_time ? `${shiftDetail?.break_time} ${"Minutes"}` : "-"}</p>
                  </div>

                  <div>
                    <h4>Created At</h4>
                    <p>{formatDate(shiftDetail?.created_at) || "-"} </p>
                  </div>
                  <div>
                    <h4>Created By</h4>
                    <p>{userData?.created_by || "-"}</p>
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
          </div>
        </>
      )}
    </div>
  );
};

export default ShiftDetails;
