import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../../components/style.css";
import { otherIcons } from "../../components/Helper/icons";
import { getUserById } from "../../Redux/Actions/globalActions";
import {
  deleteperformance,
  getPerformanceDetails,
} from "../../Redux/Actions/performanceActions";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { formatDate, formatDate3 } from "../../utils/common/DateTimeFormat";
import Loader03 from "../../utils/common/Loader03";
import { dummyImageUrl } from "../../utils/Constant";
import "./PerformanceDetails.scss";
import PerformanceStats, { overallPerformance } from "./PerformanceStats";

const PerformanceDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const performanceDetails = useSelector((state) => state?.performanceDetails);
  const performanceDetail = performanceDetails?.data?.result || {};
  const performanceDetailLoading = performanceDetails?.loading || false;
  // console.log('performanceDetail', performanceDetail)
  const userData = useSelector((state) => state?.getUserById?.data);

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getPerformanceDetails(queryParams));
    }
  }, [id]);

  useEffect(() => {
    if (performanceDetail?.id) {
      const sendData = {
        enteredbyid: performanceDetail?.enteredbyid,
      };
      dispatch(getUserById(sendData));
    }
  }, [performanceDetail?.id]);

  // HandleDelete
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeletePerformance = () => {
    try {
      const sendData = {
        id: id,
      };
      dispatch(deleteperformance(sendData, navigate)).then((res) => {
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
    navigate("/performance");
  };

  const handleEditPerformance = () => {
    navigate(`/add-performance/${id}`);
  };
  const employeeImage = JSON.parse(performanceDetail?.employee?.image || "[]");

  return (
    <div className="profile-page">
      {performanceDetailLoading ? (
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
              onConfirm={handleDeletePerformance}
              type="delete"
              module="Performance"
            />
          </div>
          {/* <ToastContainer className="toast-container" /> */}
          <div className="details">
            <div className="title_top">
              <h2>Employee Performance Detail </h2>
              <div className="close_btn" onClick={handleCancel}>
                {otherIcons.cross_svg}
              </div>
            </div>
            <div className="profile_card">
              <div className="img_card">
                <div className="progress-circle">
                  <img
                    src={
                      employeeImage?.length > 0
                        ? employeeImage[0]?.url
                        : dummyImageUrl
                    }
                    alt={
                      employeeImage?.length > 0
                        ? employeeImage[0]?.name
                        : "Dummy Image"
                    }
                  />
                </div>
                <div className="about_user">
                  <h3>{performanceDetail?.user_name || "-"}</h3>
                </div>
              </div>
              <div className="action_card">
                {/* <span className='div_box' onClick={handleRefresh}>
                            <div>
                                {otherIcons.ref}
                            </div>
                        </span> */}
                <div onClick={handleEditPerformance}>
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
                    <span>{otherIcons.department_information}</span>Employee
                    Information
                  </h3>
                </div>
                <div className="contentInformation">
                  <div>
                    <h4>Employee Name</h4>
                    <p>{performanceDetail?.user_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>{performanceDetail?.employee?.email || "-"}</p>
                  </div>
                  <div>
                    <h4>Department</h4>
                    <p>{performanceDetail?.employee?.department?.department_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Designation</h4>
                    <p>{performanceDetail?.employee?.designation?.designation_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Employee Status</h4>
                    <p>{performanceDetail?.employee?.employee_status || "-"}</p>
                  </div>
                  <div>
                    <h4>Performance Status</h4>
                    <p>{performanceDetail?.status || "-"}</p>
                  </div>

                  <div>
                    <h4>Created At</h4>
                    <p>{formatDate(performanceDetail?.created_at) || "-"}</p>
                  </div>
                  <div>
                    <h4>Created By</h4>
                    <p>{userData?.created_by || "-"}</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>{otherIcons.details_information}</span>Performance
                    Summary
                  </h3>
                </div>
                <div className="Health_Information Performance_Summary">
                  <div className="Overall_Rating">
                    <h4>Review Period :</h4>
                    <p>{overallPerformance}</p>
                  </div>
                  <div>
                    <h4>Appraisal Date:</h4>
                    <p>{formatDate3(performanceDetail?.date) || "-"}</p>
                  </div>
                  <div>
                    <h4>Last Review Date:</h4>
                    <p>{formatDate(performanceDetail?.created_at) || "-"}</p>
                  </div>
                  <div>
                    <h4>Next Review Date:</h4>
                    <p>{formatDate(performanceDetail?.updated_at) || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
            <PerformanceStats apiData={performanceDetail} />
          </div>
        </>
      )}
    </div>
  );
};

export default PerformanceDetails;
