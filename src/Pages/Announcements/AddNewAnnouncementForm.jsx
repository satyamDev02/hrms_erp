import { useState, useEffect } from 'react';
import '../Employee_onboarding/AddEmployee/AddEmloyee.scss';
import '../Employee_onboarding/AddEmployee/NavbarForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from '../../utils/Form/DatePicker';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImageUpload } from '../../components/MultiImageUpload';
import { travelBillableOptions } from '../../utils/Constant';
import TextAreaWithLimit from '../../utils/common/TextAreaWithLimit';
import SelectDropdown from '../../utils/common/SelectDropdown';
import SubmitButton from '../../utils/common/SubmitButton';
import { createNewAnnouncement, getAnnouncementDetails } from '../../Redux/Actions/announcementActions';
import { otherIcons } from '../../components/Helper/icons';

const AddNewAnnouncementForm = ({ onSubmit }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    //Data from redux
    const createUpdateAnnouncement = useSelector((state) => state?.createAnnouncement);
    const announcementDetails = useSelector((state) => state?.announcementDetails);
    const announcementDetail = announcementDetails?.data?.announcement || {};
    const announcementDetailLoading = announcementDetails?.loading || false;

    const handleSearch = (value, type) => {
    };

    const [formData, setFormData] = useState({
        subject: '',
        expiry: '',
        notify_all: '',
        notify_any_others: '',
        description: '',
        attachment: []
    });

    //error handling
    const [errors, setErrors] = useState({
        subject: false,
        notify_all: false,
        attachment: false,
        notify_any_others: false,
    })

    useEffect(() => {
        if (id) {
            const queryParams = {
                id: id,
            };
            dispatch(getAnnouncementDetails(queryParams));
            if (announcementDetail) {

                setFormData({
                    ...formData,
                    subject: announcementDetail?.subject,
                    expiry: announcementDetail?.expiry,
                    notify_all: announcementDetail?.notify_all,
                    notify_any_others: JSON.parse(announcementDetail?.notify_any_others),
                    description: announcementDetail?.description ? announcementDetail?.description : '',
                    attachment: JSON.parse(announcementDetail?.attachment || '[]')
                })
            }
        }
    }, [id]);

    const [isUploading, setIsUploading] = useState(false);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrors((prevData) => ({
            ...prevData,
            [name]: false,
        }));
    };

    const handleSelect = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrors((prevData) => ({
            ...prevData,
            notify_all: false,
        }));

    };

    const handleDateChange = (name, date) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: date,
        }));
    };

    const validateEmails = (emails) => {
        const emailArray = emails.split(',').map((email) => email.trim());
        console.log("emailArray", emailArray);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailArray.every((email) => emailRegex.test(email));
    };

    const handleSubmit = (event) => {
        event.preventDefault();  // Prevent default form submission
        let newErrors = {
            subject: formData?.subject ? false : true,
            notify_all: formData?.notify_all ? false : true,
            attachment: formData?.attachment?.length > 0 ? false : true,
            notify_any_others: formData?.notify_any_others && !validateEmails(formData?.notify_any_others) ? true : false,
        };
        setErrors(newErrors);

        const hasAnyError = Object.values(newErrors).some((value) => value === true);
        if (hasAnyError) {
            return;
        }
        else {
            const formDataToSubmit = {
                ...formData,
            };
            if (id) {
                formDataToSubmit['id'] = id
            }
            dispatch(createNewAnnouncement(formDataToSubmit, navigate))
        }
    };

    return (
        <>
            <div className="" onSubmit={onSubmit}>
                <form onSubmit={handleSubmit}>
                    <div id='form'>
                        <div className="from1">
                            <div className="form-group" style={{ width: "500px" }}>
                                <label>Subject<b className='color_red'>*</b></label>
                                <input
                                    type="text"
                                    placeholder="Enter Subject"
                                    name="subject"
                                    value={formData?.subject}
                                    onChange={handleChange}
                                    style={{ border: errors?.subject ? "1px solid red" : "" }}
                                />
                                {errors?.subject && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Enter Subject
                                    </p>
                                )}
                            </div>
                            <DatePicker label="Expiry" onDateChange={handleDateChange} initialDate={formData?.expiry} type="expiry" />

                            <div className="form-group">
                                <label>Attachment<b className='color_red'>*</b></label>
                                <ImageUpload
                                    formData={formData}
                                    setFormData={setFormData}
                                    fieldName="attachment"  // Unique field for resume
                                    isUploading={isUploading}
                                    setIsUploading={setIsUploading}
                                    setError={setErrors}
                                />
                                {errors?.attachment && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Upload Attachment
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="from1">
                            <div className="form-group">
                                <label>Notify all Employees<b className='color_red'>*</b></label>
                                <SelectDropdown
                                    selectedValue={formData?.notify_all}
                                    options={travelBillableOptions.map((item, index) => ({
                                        id: index,
                                        name: item,
                                    }))}
                                    placeholder="Select"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search..."
                                    handleSearch={handleSearch}
                                    type="notify_all"
                                    loading={false}
                                    showSearchBar={false}
                                    className={errors?.notify_all ? "select-dropdown-error" : ""}
                                />
                                {errors?.notify_all && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Select Option
                                    </p>
                                )}
                            </div>
                            {/* Employee Dropdown */}
                            <div className="form-group">
                                <label className=''>Notify any others on Email</label>
                                <input
                                    type="text"
                                    placeholder="Enter emails separated by commas"
                                    name="notify_any_others"
                                    value={formData?.notify_any_others}
                                    onChange={handleChange}
                                    style={{ border: errors?.notify_any_others ? "1px solid red" : "" }}
                                />
                                {errors?.notify_any_others && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Invalid email(s) provided
                                    </p>
                                )}
                            </div>
                        </div>
                        <div id='Description' className='DescriptionJob'>
                            <div className="form-group">
                                <label>Description</label>
                                <TextAreaWithLimit
                                    formsValues={{ handleChange, formData }}
                                    placeholder="Enter Description"
                                    name="description"
                                    value={formData?.description}
                                />
                            </div>
                        </div>
                    </div>
                    <SubmitButton loading={createUpdateAnnouncement?.loading} navigate={"/announcements"} nextSubmit="" showNext={false} id={id} />
                </form>
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
    );
};

export default AddNewAnnouncementForm;