import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../components/Helper/icons";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { formatDate, formatDate3 } from "../../utils/common/DateTimeFormat";
import Loader03 from "../../utils/common/Loader03";
import './TicketDetails.scss';
import { useGetNameById } from "../../utils/common/useGetNameById";
import { deleteTicket, getTicketDetails, } from "../../Redux/Actions/ticketActions";
import { getUserById } from "../../Redux/Actions/globalActions";


const TicketDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    //Data from redux
    const ticketDetails = useSelector((state) => state?.ticketDetails);
    const ticketDetail = ticketDetails?.data?.result;
    const ticketDetailLoading = ticketDetails?.loading || false;

    const userData = useSelector((state) => state?.getUserById?.data);

    useEffect(() => {
        if (id) {
            const queryParams = {
                id: id,
            };
            dispatch(getTicketDetails(queryParams));
        }
    }, [id]);

    useEffect(() => {
        if (ticketDetail?.id) {
            const sendData = {
                enteredbyid: ticketDetail?.enteredbyid
            };
            dispatch(getUserById(sendData));
        }
    }, [ticketDetail?.id]);

    // HandleDelete
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        setShowModal(true);
    };

    const handleDeleteHoliday = () => {
        try {
            const sendData = {
                id: id,
            };
            dispatch(deleteTicket(sendData, navigate)).then((res) => {
                if (res?.success) {
                    setShowModal(false);
                    // setTimeout(() => {
                    //   navigate("/all-job-list");
                    // }, 1500);
                }
            })
        } catch (err) {
            setShowModal(false);
            console.log("Error", err);
        }
    };

    const handleCancel = () => {
        navigate("/ticket");
    };

    const name = useGetNameById(ticketDetail?.enteredbyid);

    const handleEdit = () => {
        navigate(`/add-ticket/${id}`);
    };

    const Attachments =
        typeof ticketDetail?.attachment === "string"
            ? JSON.parse(ticketDetail?.attachment)
            : ticketDetail?.attachment || [];

    
    return (
        <div className="profile-page">

            {ticketDetailLoading ? <Loader03 /> :
                <>
                    <ConfirmPopup
                        open={showModal}
                        onClose={() => setShowModal(false)}
                        onConfirm={handleDeleteHoliday}
                        type="delete"
                        module="Ticket"
                    />
                    <div className="details">
                        <div className="title_top">
                            <h2>Ticket Details</h2>
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
                                    <h3> {ticketDetail?.employee[0]?.first_name + " " + ticketDetail?.employee[0]?.last_name || "-"}</h3>
                                    <p>
                                        {ticketDetail?.subject || "-"}
                                    </p>
                                    <div>
                                        <h4></h4>
                                        <h5>{ticketDetail?.status || "-"}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="action_card" >
                                <div
                                    onClick={handleEdit}
                                >
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
                                <div className='top_head head2col'>
                                    <h3>
                                        <span>
                                            {otherIcons.ticket_information}
                                        </span>Ticket  Information
                                    </h3>
                                    {/* <span className="button_Resolve">
                                        Resolve
                                    </span> */}
                                </div>
                                <div className='contentInformation'>
                                    <div>
                                        <h4>Requested to</h4>
                                        <p> {ticketDetail?.requested_to[0]?.first_name + " " + ticketDetail?.requested_to[0]?.last_name || "-"}</p>
                                    </div>
                                    <div>
                                        <h4>Priority</h4>
                                        <p>{ticketDetail?.priority || "-"}</p>
                                    </div>
                                    <div>
                                        <h4>Subject</h4>
                                        <p>{ticketDetail?.subject || "-"}</p>
                                    </div>
                                    <div>
                                        <h4>Status</h4>
                                        <p>{ticketDetail?.status || "-"}</p>
                                    </div>
                                    <div>
                                        <h4>Date</h4>
                                        <p>{formatDate3(ticketDetail?.date) || "-"}</p>
                                    </div>
                                    <div>
                                        <h4>Attachment</h4>
                                        {Attachments.map((img, index) => {
                                            return (
                                                <div key={index} className="tooltip-container">
                                                    <a target="_blank" href={img.url}>
                                                        {otherIcons.attachemnet_preview_svg}
                                                    </a>
                                                    <span className="tooltip-text">{img.name}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div>
                                        <h4>Created By</h4>
                                        <p>{userData?.created_by || "-"}</p>
                                    </div>
                                    <div>
                                        <h4> Created At</h4>
                                        <p>{formatDate(ticketDetail?.created_at) || "-"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className='top_head'> <h3> <span>
                                    {otherIcons.ticket_description}
                                </span>Ticket Description</h3></div>
                                <div className='contentInformation'>
                                </div>
                                <div id='DescriptionJOB' style={{ marginTop: '-25px' }}>
                                    <p className='paragra'>{ticketDetail?.description || "-"}</p>
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
                </>}
        </div>
    );
};

export default TicketDetails;
