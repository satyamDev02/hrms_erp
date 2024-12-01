import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  deleteTravel,
  getTravelDetails,
  getTravelHistoryDetails,
} from "../../Redux/Actions/travelActions";
import { otherIcons } from "../../components/Helper/icons";
import "../../components/style.css";
import { dummyImageUrl } from "../../utils/Constant";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { formatDate, formatDate3 } from "../../utils/common/DateTimeFormat";
import "./TravelDetails.scss";
import { getUserById } from "../../Redux/Actions/globalActions";
import Loader03 from "../../utils/common/Loader03";

const TravelDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const travelDetails = useSelector((state) => state?.travelDetails);
  const travelDetail = travelDetails?.data?.travel || {};
  const travelDetailLoading = travelDetails?.loading || false;

  const userData = useSelector((state) => state?.getUserById?.data);

  const travelHistoryDetails = useSelector(
    (state) => state?.travelHistoryDetails
  );
  const travelHistoryDetail = travelHistoryDetails?.data?.travelByuserId || [];
  console.log("travelHistoryDetail", travelHistoryDetails);

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getTravelDetails(queryParams));
    }
  }, [id]);

  useEffect(() => {
    if (travelDetail?.id) {
      const sendData = {
        enteredbyid: travelDetail?.enteredbyid,
      };
      dispatch(getUserById(sendData));

      const sendData2 = {
        user_id: travelDetail?.user_id,
      };
      dispatch(getTravelHistoryDetails(sendData2));
    }
  }, [travelDetail?.id]);

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
      dispatch(deleteTravel(sendData, navigate)).then((res) => {
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
    navigate("/travel");
  };

  const handleEditTravel = () => {
    navigate(`/add-travel/${id}`);
  };
  return (
    <div className="profile-page">
      {travelDetailLoading ? (
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
              module="Travel"
            />
          </div>
          <div className="details">
            <div className="title_top">
              <h2>Employee Travel Detail</h2>
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
                  <h3>{travelDetail?.user_name || "-"}</h3>
                  <p>{travelDetail?.department?.department_name || "-"}</p>
                </div>
              </div>
              <div className="action_card">
                {/* <span className="div_box" onClick={handleRefresh}>
              <div>
                {otherIcons.refresh_svg}
              </div>
            </span> */}
                <div onClick={handleEditTravel}>
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
                    <span>{otherIcons.details_information}</span>
                    Employee Information
                  </h3>
                </div>
                <div className="contentInformation">
                  <div>
                    <h4>Department</h4>
                    <p>{travelDetail?.department?.department_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Employee Name</h4>
                    <p>{travelDetail?.user_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Purpose of Travel</h4>
                    <p className="paragra">
                      {travelDetail?.purposeofvisit || "-"}{" "}
                    </p>
                  </div>
                  <div>
                    <h4>Customer Name</h4>
                    <p>{travelDetail?.customer_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Is Billable To Customer</h4>
                    <p>{travelDetail?.is_billable || "-"}</p>
                  </div>
                  <div>
                    <h4>Created at</h4>
                    <p>{formatDate(travelDetail?.created_at) || "-"}</p>
                  </div>

                  <div>
                    <h4>Created by</h4>
                    <p>{userData?.created_by || "-"}</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>{otherIcons.details_information}</span>
                    Travel Information
                  </h3>
                </div>
                <div className="Health_Information">
                  <div>
                    <h4>Destination :</h4>
                    <p>{travelDetail?.placeofvisit || "-"}</p>
                  </div>
                  <div>
                    <h4>Departure Date :</h4>
                    <p>
                      {formatDate3(travelDetail?.expected_date_of_departure) ||
                        "-"}
                    </p>
                  </div>
                  <div>
                    <h4>Arrival Date :</h4>
                    <p>
                      {formatDate3(travelDetail?.expected_date_of_arrival) ||
                        "-"}
                    </p>
                  </div>
                  <div>
                    <h4>Stay Duration :</h4>
                    <p>{travelDetail?.expected_duration_in_days || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* table */}
            <div className="contents">
              <div>
                <div className="ProjectList">
                  <div className="section-header">
                    {/* <FaGraduationCap className="icon" /> */}
                    {otherIcons.details_information}
                    <h2 style={{ marginLeft: "10px" }}>Travel History</h2>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Destination</th>
                        <th>Departure Date</th>
                        <th>Arrived Date</th>
                        <th>Duration</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {travelHistoryDetail?.map((item, index) => (
                        <tr key={index}>
                          <td>{item?.placeofvisit || "-"}</td>
                          <td>
                            {formatDate3(item?.expected_date_of_departure) ||
                              "-"}
                          </td>
                          <td>
                            {formatDate3(item?.expected_date_of_arrival) || "-"}
                          </td>
                          <td>{item?.expected_duration_in_days || "-"}</td>
                          <td title={item?.purposeofvisit || ""}>
                            {item?.purposeofvisit.substring(0, 20) || "-"}
                            {item?.purposeofvisit.length > 0 ? "..." : "-"}
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

export default TravelDetails;
