import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import iconEdu from "../../assets/icons/edu.png";
import "../Employee_onboarding/EmployeeDetail/EmployeeDetails.scss";
import { otherIcons } from "../../components/Helper/icons";
import { getUserById } from "../../Redux/Actions/globalActions";
import {
    deleteTrainer,
    getTrainerDetails,
    getTrainerHistoryDetails,
} from "../../Redux/Actions/trainerActions";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import {
    formatDate,
    formatDate3,
} from "../../utils/common/DateTimeFormat";
import Loader03 from "../../utils/common/Loader03";

const TrainerDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    //Data from redux
    const trainerDetails = useSelector((state) => state?.trainerDetails);
    const trainerDetail = trainerDetails?.data?.result || {};
    const trainerDetailLoading = trainerDetails?.loading || false;

    const trainerHistoryDetails = useSelector((state) => state?.trainerHistoryDetail);
    const trainerHistoryDetail = trainerHistoryDetails?.data?.result || [];

    const userData = useSelector((state) => state?.getUserById?.data);

    useEffect(() => {
        if (id) {
            const queryParams = {
                id: id,
            };
            dispatch(getTrainerDetails(queryParams));
        }
    }, [id]);

    useEffect(() => {
        if (trainerDetail?.user_id) {
            const queryParams = {
                trainer_id: trainerDetail?.user_id,
            };
            dispatch(getTrainerHistoryDetails(queryParams));
            const sendData = {
                enteredbyid: trainerDetail?.enteredbyid,
            };
            dispatch(getUserById(sendData));
        }
    }, [trainerDetail?.user_id, dispatch]);

    // HandleDelete
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        setShowModal(true);
    };

    const handleDeleteTrainer = () => {
        try {
            const sendData = {
                id: id,
            };
            dispatch(deleteTrainer(sendData, navigate)).then((res) => {
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
        navigate("/trainers");
    };

    const handleEdit = () => {
        navigate(`/add-trainer/${id}`);
    };
    return (
        <div className="profile-page">
            {trainerDetailLoading ? (
                <Loader03 />
            ) : (
                <>
                    <ConfirmPopup
                        open={showModal}
                        onClose={() => setShowModal(false)}
                        onConfirm={handleDeleteTrainer}
                        type="delete"
                        module="Trainer"
                    />
                    <div className="details">
                        <div className="title_top">
                            <h2>Trainer Details</h2>
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
                                    <h3>{trainerDetail?.trainer_name || "-"}</h3>
                                    <p>{trainerDetail?.trainig_type || "-"}</p>
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
                                        <span>{otherIcons.details_information}</span>Trainer
                                        Information
                                    </h3>
                                </div>
                                <div className="contentInformation">
                                    <div>
                                        <h4>Email ID</h4>
                                        <p>{trainerDetail?.email || "-"}</p>
                                    </div>
                                    <div>
                                        <h4>Start Date</h4>
                                        <p>{formatDate3(trainerDetail?.start_date) || "-"}</p>
                                    </div>
                                    <div>
                                        <h4>End Date</h4>
                                        <p>{formatDate3(trainerDetail?.end_date) || "-"}</p>
                                    </div>

                                    <div>
                                        <h4>Training Duration</h4>
                                        <p>{trainerDetail?.duration || "-"}</p>
                                    </div>

                                    <div>
                                        <h4>Training Cost</h4>
                                        <p>
                                            {trainerDetail?.trainer_cost
                                                ? "$" + trainerDetail?.trainer_cost
                                                : "-"}
                                        </p>
                                    </div>
                                    <div>
                                        <h4>Contact Number</h4>
                                        <p>{trainerDetail?.mobile_no || "-"}</p>
                                    </div>
                                    <div>
                                        <h4>Created By</h4>
                                        <p>{userData?.created_by || "-"}</p>
                                    </div>
                                    <div>
                                        <h4> Created At</h4>
                                        <p>{formatDate(trainerDetail?.created_at) || "-"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="top_head">
                                    {" "}
                                    <h3>
                                        {" "}
                                        <span>{otherIcons.details_information}</span>Trainer
                                        Description
                                    </h3>
                                </div>
                                <div className="contentInformation"></div>
                                <div id="DescriptionJOB" style={{ marginTop: "-25px" }}>
                                    <p className="paragra">{trainerDetail?.description || "-"}</p>
                                </div>
                            </div>
                        </div>
                        {/* history */}
                        <div className="contents">
                            <div>
                                <div className="ProjectList">
                                    <div className="section-header">
                                        <img src={iconEdu} alt="" className="icon" />
                                        <h2>Training History</h2>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Trainer Name</th>
                                                <th>Training Type</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Duration</th>
                                                <th>Traning Cost</th>
                                                <th>Training Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {trainerHistoryDetail?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.trainer_name || "-"}</td>
                                                    <td>{item?.trainig_type || "-"}</td>
                                                    <td>{formatDate3(item?.start_date) || "-"}</td>
                                                    <td>{formatDate3(item?.end_date) || "-"}</td>
                                                    <td>{item?.duration || "-"}</td>
                                                    <td>{item?.training_cost ? "$" + item?.training_cost : "-"}
                                                    </td>
                                                    <td
                                                        className={
                                                            item?.status === "0" ? "completed" : "pending"
                                                        }
                                                    >
                                                        <span className="td">
                                                            {item?.status == "0" ? "Active" : "Inactive"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
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

export default TrainerDetails;
