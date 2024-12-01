import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../components/Helper/icons";
import {
  deleteEmpHealth,
  getEmpHealthDetails,
} from "../../Redux/Actions/employeeHealthActions";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { dummyImageUrl } from "../../utils/Constant";
import "./EmployeeHealthDetails.scss";
import Loader03 from "../../utils/common/Loader03";
import { formatDate3 } from "../../utils/common/DateTimeFormat";

const EmployeeHealthDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const empHealthDetails = useSelector((state) => state?.empHealthDetails);
  const empHealthDetail = empHealthDetails?.data?.result || [];
  const empHealthDetailLoading = empHealthDetails?.loading || false;

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getEmpHealthDetails(queryParams));
    }
  }, [id]);

  // HandleDelete
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteEmpHealth = () => {
    try {
      const sendData = {
        id: id,
      };
      dispatch(deleteEmpHealth(sendData, navigate)).then((res) => {
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
    navigate("/health");
  };

  const handleEditNewEmpHealth = () => {
    navigate(`/addemployeehealth/${id}`);
  };

  return (
    <div className="profile-page">
      {empHealthDetailLoading ? (
        <Loader03 />
      ) : (
        <>
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
            onConfirm={handleDeleteEmpHealth}
            type="delete"
            module="Employee Health"
          />
          <div className="details">
            <div className="title_top">
              <h2>Employee Health Detail</h2>
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
                  <h3>{empHealthDetail?.employee_name || "-"}</h3>
                  <p> {empHealthDetail?.department_head?.first_name +
                        " " +
                        empHealthDetail?.department_head?.last_name || "-"}
                  </p>
                  <div>
                    <h5>{empHealthDetail?.covid_status || "-"}</h5>
                  </div>
                </div>
              </div>
              <div className="action_card">
                {/* <span className='div_box' onClick={handleRefresh}>
                            <div>
                                {otherIcons.refresh_svg}
                            </div>
                        </span> */}
                <div onClick={handleEditNewEmpHealth}>
                  <span>{otherIcons.edit_svg}</span>Edit
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
                    <span>{otherIcons.details_information}</span>Employee
                    Information
                  </h3>
                </div>
                <div className="contentInformation">
                  <div>
                    <h4>Department Head </h4>
                    <p>
                      {empHealthDetail?.department_head?.first_name +
                        " " +
                        empHealthDetail?.department_head?.last_name || "-"}
                    </p>
                  </div>

                  <div>
                    <h4>Mobile no.</h4>
                    <p>{empHealthDetail?.mobile_no || "-"}</p>
                  </div>
                  <div>
                    <h4>Gender</h4>
                    <p>{empHealthDetail?.gender || "-"}</p>
                  </div>
                  <div>
                    <h4>Weight</h4>
                    <p>{empHealthDetail?.weight + " " + "kg" || "-"}</p>
                  </div>
                  <div>
                    <h4>Height</h4>
                    <p>{empHealthDetail?.height + " " + "cm" || "-"}</p>
                  </div>
                  <div>
                    <h4>Blood group</h4>
                    <p>{empHealthDetail?.blood_group || "-"}</p>
                  </div>
                </div>
                <div id="DescriptionJOB">
                  <h4>Notes</h4>
                  <p className="paragra">{empHealthDetail?.notes || "-"}</p>
                </div>
              </div>
              <div className="card">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>{otherIcons.details_information}</span>Health
                    Information
                  </h3>
                </div>
                <div className="Health_Information">
                  <div>
                    <h4>Overall Health Status</h4>
                    <p>{empHealthDetail?.checkup_result || "-"}</p>
                  </div>
                  <div>
                    <h4>Last Health Check Date</h4>
                    <p>
                      {formatDate3(empHealthDetail?.last_checkup_date) || "-"}
                    </p>
                  </div>
                  <div>
                    <h4>Next Health Check Date</h4>
                    <p>
                      {formatDate3(empHealthDetail?.next_checkup_date) || "-"}
                    </p>
                  </div>
                  <div>
                    <h4>Allergies</h4>
                    <p>{empHealthDetail?.allergies || "-"}</p>
                  </div>
                  <div>
                    <h4>Chronic Conditions</h4>
                    <p>{empHealthDetail?.chronic_condition || "-"}</p>
                  </div>
                  <div>
                    <h4>Covid affected :</h4>
                    <p>{empHealthDetail?.covid_affected || "-"}</p>
                  </div>
                  <div>
                    <h4>Emergency Contact Name</h4>
                    <p>{empHealthDetail?.contact_name || "-"}</p>
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

export default EmployeeHealthDetails;
