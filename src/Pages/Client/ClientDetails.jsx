import { useEffect, useState } from "react";
import { MdDeleteOutline, MdWorkHistory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clientDefaultImage from "../../assets/client_2.jpg";
import iconEdu from "../../assets/icons/edu.png";
import { otherIcons } from "../../components/Helper/icons";
import {
  deleteclient,
  getClientDetails,
  getClientProjectDetails,
} from "../../Redux/Actions/clientActions";
import { getUserById } from "../../Redux/Actions/globalActions";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { formatDate, formatDate3 } from "../../utils/common/DateTimeFormat";
import Loader03 from "../../utils/common/Loader03";
import "../Employee_onboarding/EmployeeDetail/EmployeeDetails.scss";

const ClientDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const clientDetails = useSelector((state) => state?.clientDetails);
  const clientDetail = clientDetails?.data?.result || {};
  const clientDetailLoading = clientDetails?.loading || false;

  const clientProjectDetails = useSelector((state) => state?.clientprojectDetails);
  const clientProjecDetail = clientProjectDetails?.data?.result || [];

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getClientDetails(queryParams));
      const sendData2 = {
        client_id: id,
      };
      dispatch(getClientProjectDetails(sendData2));
    }
  }, [id]);

  useEffect(() => {
    if (clientDetail?.id) {
      const sendData = {
        enteredbyid: clientDetail?.enteredbyid,
      };
      dispatch(getUserById(sendData));
    }
  }, [dispatch]);

  // HandleDelete
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteClient = () => {
    try {
      const sendData = {
        id: id,
      };
      dispatch(deleteclient(sendData, navigate)).then((res) => {
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
    navigate("/client");
  };

  const handleEdit = () => {
    navigate(`/new-client/${id}`);
  };
  const clientImage = JSON.parse(clientDetail?.client_image || "[]");

  return (
    <div className="profile-page">
      {clientDetailLoading ? (
        <Loader03 />
      ) : (
        <>
          <ConfirmPopup
            open={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDeleteClient}
            type="delete"
            module="Client"
          />
          <div className="details">
            <div className="title_top">
              <h2>Client Details</h2>
              <div className="close_btn" onClick={handleCancel}>
                {otherIcons.cross_svg}
              </div>
            </div>
            <div className="profile_card">
              <div className="img_card">
                <div className="progress-circle">
                  <img
                    src={
                      clientImage?.length > 0
                        ? clientImage[0]?.url
                        : clientDefaultImage
                    }
                    alt={
                      clientImage?.length > 0 ? clientImage[0]?.name : "client"
                    }
                  />
                </div>
                <div className="about_user">
                  <h3>{clientDetail?.full_name || "-"}</h3>
                  <p>{clientDetail?.company_name || "-"}</p>
                  <div>
                    <h4></h4>
                    <h5>
                      {clientDetail?.status == 1 ? "Inactive" : "Active" || "-"}
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
            <div className="info-cards" style={{ paddingBottom: "30px" }}>
              <div className="card">
                <div className="top_head">
                  <h3>
                    <span>
                      <MdWorkHistory />
                    </span>
                    Client Information
                  </h3>
                </div>
                <div className="contentInformation">
                  <div>
                    <h4>Client Name</h4>
                    <p>{clientDetail?.full_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Gender</h4>
                    <p>{clientDetail?.gender || "-"}</p>
                  </div>
                  <div>
                    <h4>Email ID</h4>
                    <p>{clientDetail?.email || "-"}</p>
                  </div>
                  <div>
                    <h4>Mobile number</h4>
                    <p>{clientDetail?.mobile_no || "-"}</p>
                  </div>
                  <div>
                    <h4>Company name</h4>
                    <p>{clientDetail?.company_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Company address</h4>
                    <p>{clientDetail?.client_address || "-"}</p>
                  </div>
                  <div>
                    <h4> Created At</h4>
                    <p>{formatDate(clientDetail?.created_at) || "-"}</p>
                  </div>
                  <div>
                    <h4>Designation</h4>
                    <p>{clientDetail?.designation || "-"}</p>
                  </div>

                  <div>
                    <h4>Website</h4>
                    <p>{clientDetail?.website || "-"}</p>
                  </div>

                  {/* <div>
                                        <h4>Created By</h4>
                                        <p>{clientDetail?.enteredbyid || ""}</p>
                                    </div> */}
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
                    <p>{clientDetail?.description || "-"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contents">
              <div>
                <div className="ProjectList">
                  <div className="section-header">
                    {/* <FaGraduationCap className="icon" /> */}
                    <img src={iconEdu} alt="" className="icon" />
                    <h2>Client Project History</h2>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Project Leader</th>

                        <th>Project Team</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Project Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientProjecDetail?.map((item, index) => {

                        let teamMembers = [];
                        try {
                          teamMembers = JSON.parse(item?.team_id || "[]");
                        } catch (error) {
                          console.error("Invalid team_id JSON format", error);
                        }

                        return (
                          <tr key={index}>
                            <td>{item?.project_name || "-"}</td>
                            <td>{item?.project_leader || "-"}</td>
                            <td>
                              {teamMembers.length > 0
                                ? teamMembers
                                  .map((member) => member.name)
                                  .join(", ")
                                : "-"}
                            </td>
                            <td>{formatDate3(item?.start_date) || "-"}</td>
                            <td>{formatDate3(item?.end_date) || "-"}</td>
                            <td
                              className={
                                item?.status === "Completed"
                                  ? "completed"
                                  : "pending"
                              }
                            >
                              <span className="td">{item?.status || "-"}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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

export default ClientDetails;
