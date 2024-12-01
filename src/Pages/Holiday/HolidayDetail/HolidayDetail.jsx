import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../../components/Helper/icons";
import ConfirmPopup from "../../../utils/common/ConfirmPopup";
import { formatDate, formatDate3 } from "../../../utils/common/DateTimeFormat";
import Loader03 from "../../../utils/common/Loader03";
import "../../Employee_onboarding/EmployeeDetail/EmployeeDetails.scss";
import { deleteholiday, getHolidayDetails } from "../../../Redux/Actions/holidayActions";
import { OutsideClick } from "../../../utils/common/OutsideClick";
import AddHoliday from '../AddHoliday/AddHoliday';
import { useGetNameById } from "../../../utils/common/useGetNameById";
import { calculateDays } from "../../../utils/helper";

const HolidayDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    //Data from redux
    const holidayDetails = useSelector((state) => state?.holidayDetails);
    const holidayDetail = holidayDetails?.data?.result;
    const holidayDetailLoading = holidayDetails?.loading || false;
    const formDropDown = OutsideClick();
    useEffect(() => {
        if (id) {
            const queryParams = {
                id: id,
            };
            dispatch(getHolidayDetails(queryParams));
        }
    }, [id]);

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
            dispatch(deleteholiday(sendData, navigate)).then((res) => {
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
        navigate("/holiday");
    };

   
    const name = useGetNameById(holidayDetail?.enteredbyid);

    return (
        <div className="profile-page">
           
            {formDropDown.isOpen && <AddHoliday ClosePop={formDropDown.handleToggle} id={id} refBox={formDropDown.ref} />}
            {holidayDetailLoading ? <Loader03 /> :
                <>
                    <ConfirmPopup
                        open={showModal}
                        onClose={() => setShowModal(false)}
                        onConfirm={handleDeleteHoliday}
                        type="delete"
                        module="Holiday"
                    />
                    <div className="details">
                        <div className="title_top">
                            <h2>Holiday Details</h2>
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
                                    <h3>{holidayDetail?.holiday_name || ""}</h3>
                                    <p> {calculateDays(holidayDetail?.from_date, holidayDetail?.to_date)}
                                        {calculateDays(holidayDetail?.from_date, holidayDetail?.to_date) > 1 ? " Days" : " Day"} Holiday
                                    </p>
                                    <div>
                                        {/* <h4></h4> */}
                                        {/* <h5>{holidayDetail?.job_status || ""}</h5> */}
                                    </div>
                                </div>
                            </div>
                            <div className="action_card">
                                <div
                                    onClick={formDropDown.handleToggle}
                                    ref={formDropDown.buttonRef}
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
                            <div className="card">
                                <div className='top_head'> <h3> <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                        <path d="M7 9.00183C4.82497 9.01495 3.64706 9.11944 2.87868 9.95185C2 10.9038 2 12.4358 2 15.4999C2 18.5641 2 20.0961 2.87868 21.048C3.75736 21.9999 5.17157 21.9999 8 21.9999H16C18.8284 21.9999 20.2426 21.9999 21.1213 21.048C22 20.0961 22 18.5641 22 15.4999C22 12.4358 22 10.9038 21.1213 9.95185C20.3529 9.11944 19.175 9.01495 17 9.00183" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6 12L10.5 14.625M18 19L13.8 16.55M13.8 16.55L18 13.75M13.8 16.55L10.5 14.625M10.5 14.625L6 17.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 7C13.3807 7 14.5 5.88071 14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5C9.5 5.88071 10.6193 7 12 7ZM12 7V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </span>Holiday Information</h3></div>
                                <div className='contentInformation'>
                                    <div>
                                        <h4>Holiday Name</h4>
                                        <p>{holidayDetail?.holiday_name}</p>
                                    </div>

                                    <div>
                                        <h4>From Date</h4>
                                        <p>{formatDate3(holidayDetail?.from_date) || '-'}</p>
                                    </div>
                                    <div>
                                        <h4>To Date</h4>
                                        <p>{formatDate3(holidayDetail?.to_date) || '-'}</p>
                                    </div>
                                    <div>
                                        <h4>Total Holiday </h4>
                                        <p> {calculateDays(holidayDetail?.from_date, holidayDetail?.to_date)}
                                            {calculateDays(holidayDetail?.from_date, holidayDetail?.to_date) > 1 ? " Days" : " Day"}
                                        </p>
                                    </div>
                                    <div>
                                        <h4>Created By</h4>
                                        <p>{name}</p>
                                    </div>
                                    <div>
                                        <h4> Created At</h4>
                                        <p>{formatDate(holidayDetail?.created_at) || ""}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className='top_head'> <h3> <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                        <path d="M7 9.00183C4.82497 9.01495 3.64706 9.11944 2.87868 9.95185C2 10.9038 2 12.4358 2 15.4999C2 18.5641 2 20.0961 2.87868 21.048C3.75736 21.9999 5.17157 21.9999 8 21.9999H16C18.8284 21.9999 20.2426 21.9999 21.1213 21.048C22 20.0961 22 18.5641 22 15.4999C22 12.4358 22 10.9038 21.1213 9.95185C20.3529 9.11944 19.175 9.01495 17 9.00183" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6 12L10.5 14.625M18 19L13.8 16.55M13.8 16.55L18 13.75M13.8 16.55L10.5 14.625M10.5 14.625L6 17.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 7C13.3807 7 14.5 5.88071 14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5C9.5 5.88071 10.6193 7 12 7ZM12 7V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </span>Holiday Details</h3></div>

                                <div id='DescriptionJOB'>
                                    <p className='paragra'>{holidayDetail?.description || '-'}</p>
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

export default HolidayDetail;
