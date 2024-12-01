import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./AnnouncementsDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import "../../components/style.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../components/Helper/icons";
import {
  deleteAnnouncement,
  getAnnouncementDetails,
} from "../../Redux/Actions/announcementActions";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { formatDate, formatDate3 } from "../../utils/common/DateTimeFormat";
import { getUserById } from "../../Redux/Actions/globalActions";
import Loader03 from "../../utils/common/Loader03";

const AnnouncementsDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const announcementDetails = useSelector(
    (state) => state?.announcementDetails
  );
  const announcementDetail = announcementDetails?.data?.announcement || {};
  const announcementDetailLoading = announcementDetails?.loading || false;

  const userData = useSelector((state) => state?.getUserById?.data);

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getAnnouncementDetails(queryParams));
    }
  }, [id]);

  useEffect(() => {
    if (announcementDetail?.id) {
      const sendData = {
        enteredbyid: announcementDetail?.enteredbyid,
      };
      dispatch(getUserById(sendData));
    }
  }, [announcementDetail?.id]);

  // HandleDelete
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteAnnoucement = () => {
    try {
      const sendData = {
        id: id,
      };
      dispatch(deleteAnnouncement(sendData, navigate)).then((res) => {
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
    navigate("/announcements");
  };

  const handleEditAnnouncement = () => {
    navigate(`/add-AddAnnouncements/${id}`);
  };
  const attachments = announcementDetail?.attachment
    ? JSON.parse(announcementDetail?.attachment)
    : [];

  return (
    <div className="profile-page">
      {announcementDetailLoading ? (
        <Loader03 />
      ) : (
        <>
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
              onConfirm={handleDeleteAnnoucement}
              type="delete"
              module="Announcement"
            />
          </div>
          {/* <ToastContainer className="toast-container" /> */}
          <div className="details">
            <div className="title_top">
              <h2>Announcement Detail</h2>
              <div className="close_btn" onClick={handleCancel}>
                {otherIcons.cross_svg}
              </div>
            </div>
            <div className="profile_card">
              <div className="img_card">
                <div className="icon_svg_round">
                  <div>{otherIcons.announcement_svg}</div>
                </div>
                <div className="about_user">
                  <h3>{announcementDetail?.subject || ""}</h3>
                </div>
              </div>
              <div className="action_card">
                {/* <span className='div_box' onClick={handleRefresh}>
                    <div>
                      <svg id='reload_data_page' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#400f6f" fill="none">
                        <path d="M15.1667 0.999756L15.7646 2.11753C16.1689 2.87322 16.371 3.25107 16.2374 3.41289C16.1037 3.57471 15.6635 3.44402 14.7831 3.18264C13.9029 2.92131 12.9684 2.78071 12 2.78071C6.75329 2.78071 2.5 6.90822 2.5 11.9998C2.5 13.6789 2.96262 15.2533 3.77093 16.6093M8.83333 22.9998L8.23536 21.882C7.83108 21.1263 7.62894 20.7484 7.7626 20.5866C7.89627 20.4248 8.33649 20.5555 9.21689 20.8169C10.0971 21.0782 11.0316 21.2188 12 21.2188C17.2467 21.2188 21.5 17.0913 21.5 11.9998C21.5 10.3206 21.0374 8.74623 20.2291 7.39023" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                  </span> */}
                <div onClick={handleEditAnnouncement}>
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
              <div className="card  ">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>{otherIcons.details_information}</span>Announcement
                    Information
                  </h3>
                </div>
                <div className="contentInformation">
                  <div>
                    <h4>Subject</h4>
                    <p>{announcementDetail?.subject || "-"}</p>
                  </div>
                  <div>
                    <h4>Notify All</h4>
                    <p>{announcementDetail?.notify_all || "-"}</p>
                  </div>
                  <div>
                    <h4>Expiry Date</h4>
                    <p>{formatDate3(announcementDetail?.expiry) || "-"}</p>
                  </div>

                  <div>
                    <h4>Created At</h4>
                    <p>{formatDate(announcementDetail?.created_at) || "-"}</p>
                  </div>
                  <div>
                    <h4>Created By</h4>
                    <p>{userData?.created_by || ""}</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>{otherIcons.details_information}</span>Announcement
                    Description
                  </h3>
                </div>
                <div className="contentInformation"></div>
                <div id="DescriptionJOB" style={{ marginTop: "-25px" }}>
                  <h4>{announcementDetail?.description || "-"}</h4>
                </div>
              </div>
            </div>
            {/* table */}
            <div className="contents">
              <div>
                <div className="ProjectList">
                  <div className="section-header">
                    {otherIcons.attachment_detail_svg}
                    <h2 style={{ marginLeft: "10px" }}>Attachments</h2>
                  </div>
                  <div className="contentInformation"></div>
                  <div id="DescriptionJOB" className="img_project_download">
                    {attachments?.map((img, index) => {
                      return (
                        <div key={index} className="tooltip-container">
                          <a target="_blank" href={img?.url || "-"}>
                            {otherIcons.attachemnet_preview_svg}
                          </a>
                          <span className="tooltip-text">{img?.name || "-"}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnnouncementsDetails;
