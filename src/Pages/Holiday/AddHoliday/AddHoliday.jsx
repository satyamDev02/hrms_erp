import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../../components/Helper/icons";
import TextAreaWithLimit from "../../../utils/common/TextAreaWithLimit";
import "../../Employee_onboarding/AddEmployee/AddEmloyee.scss";
import "../../Employee_onboarding/AddEmployee/NavbarForm.scss";
import SubmitButtonPopup from "../../../utils/common/SubmitButtonPopup .jsx";
import DatePicker from '../../../utils/Form/DatePicker';
import { createNewHoliday } from "../../../Redux/Actions/holidayActions.js";

const AddHoliday = ({ ClosePop, refBox, id, updateList }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const createUpdateHoliday = useSelector((state) => state?.createHoliday);

    const holidayData = useSelector((state) => state?.holidayDetails);
    const holidayDetail = holidayData?.data?.result;
    const holidayDetailLoading = holidayData?.loading || false;

    const [formData, setFormData] = useState({
        holiday_name: "",
        from_date: "",
        to_date: "",
        description: "",

    });

    //error handling
    const [errors, setErrors] = useState({
        holiday_name: false,
        from_date: false,
        to_date: false
    })

    useEffect(() => {
        if (id) {
            if (holidayDetail) {
                setFormData({
                    ...formData,
                    holiday_name: holidayDetail?.holiday_name,
                    from_date: holidayDetail?.from_date,
                    to_date: holidayDetail?.to_date,
                    description: holidayDetail?.description ? holidayDetail?.description : "",
                })
            }
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === "holiday_name") {
            setErrors((prevData) => ({
                ...prevData,
                holiday_name: false,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newErrors = {
            holiday_name: formData?.holiday_name ? false : true,
            from_date: formData?.from_date ? false : true,
            to_date: formData?.to_date ? false : true
        };
        setErrors(newErrors);

        const hasAnyError = Object.values(newErrors).some((value) => value === true);
        if (hasAnyError) {
            return;
        }
        else {
            const formDataToSubmit = {
                ...formData,
                // skills: formData?.skills.join(", "),
            };
            if (id) {
                formDataToSubmit['id'] = id
            }
            dispatch(createNewHoliday(formDataToSubmit, navigate))

            setTimeout(() => {
                ClosePop()
                updateList((prev) => prev + 1);
            }, 1500);
            setTimeout(() => {
                navigate("/holiday");
            }, 1000);

            // .then((res) => {
            //   if (res?.success) {
            //   }
            // })
            //   .catch((error) => {
            //     console.log("error-", error);
            //   });
        }
    };
    const handleDateChange = (name, date) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: date,
        }));
        setErrors((prevData) => ({
            ...prevData,
            [name]: false,
        }));
    };
    
    return (
        <div className="NewAttendance_main">
            <div className="blurBG"></div>
            <div className="formDiv">
                <div className="popForm">
                    <div className="Attendance_Head">
                        <h2>{id ? "Edit  Holiday" : "Add New Holiday"}</h2>
                        <div className="close_icon" onClick={ClosePop}>
                            {otherIcons.cross_svg}
                        </div>
                    </div>
                    <div className="form-container">
                        <form id="" onSubmit={handleSubmit}>
                            <div className="_btn_form" id="employeeForm">
                                <div className="form-group">
                                    <label >Holiday Name<b className='color_red'>*</b></label>
                                    <input
                                        type="text"
                                        placeholder="Enter Holiday Name"
                                        name="holiday_name"
                                        value={formData.holiday_name}
                                        onChange={handleChange}
                                        style={{ border: errors?.holiday_name ? "1px solid red" : "" }}
                                    />
                                    {errors?.holiday_name && (
                                        <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                            {otherIcons.error_svg}
                                            Please Fill Holiday Name
                                        </p>
                                    )}
                                </div>
                                <DatePicker label="From Date" onDateChange={handleDateChange} initialDate={formData?.from_date} type="from_date" error={errors?.from_date} required={true} />
                                <DatePicker label="To Date" onDateChange={handleDateChange} initialDate={formData?.to_date} type="to_date" error={errors?.to_date} required={true} />
                            </div>
                            <div id="Description" className="DescriptionJob" style={{ marginTop: '-44px', marginLeft: '0px' }}>
                                <div className="form-group">
                                    <label>Client Description</label>
                                    <TextAreaWithLimit
                                        formsValues={{ handleChange, formData }}
                                        placeholder="Enter Client Description"
                                        name="description"
                                        value={formData?.description}
                                    />
                                </div>
                            </div>
                            <SubmitButtonPopup loading={createUpdateHoliday?.loading} id={id} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddHoliday;
