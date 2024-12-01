import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../components/Helper/icons.jsx";
import { ImageUpload } from '../../components/MultiImageUpload.jsx';
import { createNewClient, getClientDetails } from "../../Redux/Actions/clientActions.js";
import SelectDropdown from "../../utils/common/SelectDropdown.jsx";
import SubmitButton from "../../utils/common/SubmitButton.jsx";
import TextAreaWithLimit from "../../utils/common/TextAreaWithLimit.jsx";
import { genderOptions } from "../../utils/Constant.js";
import "../Employee_onboarding/AddEmployee/AddEmloyee.scss";
import "../Employee_onboarding/AddEmployee/NavbarForm.scss";

const AddNewClientForm = ({ onSubmit }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();

    const createUpdateJob = useSelector((state) => state?.createClient);

    const clientData = useSelector((state) => state?.clientDetails);
    const clientDetail = clientData?.data?.result;
    const clientDetailLoading = clientData?.loading || false;

    const handleSearch = (value, type) => {
    };

    const [formData, setFormData] = useState({
        full_name: "",
        company_name: "",
        email: "",
        mobile_no: "",
        company_no: "",
        designation: "",
        gender: "",
        website: "",
        description: "",
        client_address: "",
        client_image: [],
    });

    //error handling
    const [errors, setErrors] = useState({
        full_name: false,
        email: false,
        designation: false,
        mobile_no: false,
    })
    useEffect(() => {
        if (id) {
            const queryParams = {
                id: id,
            };
            dispatch(getClientDetails(queryParams));
            if (clientDetail) {
                setFormData({
                    ...formData,
                    client_address: clientDetail?.client_address ? clientDetail?.client_address : "",
                    description: clientDetail?.description ? clientDetail?.description : "",
                    designation: clientDetail?.designation,
                    gender: clientDetail?.gender,
                    full_name: clientDetail?.full_name,
                    mobile_no: clientDetail?.mobile_no,
                    company_no: clientDetail?.company_no,
                    company_name: clientDetail?.company_name,
                    email: clientDetail?.email,
                    client_image: JSON.parse(clientDetail?.client_image || '[]'),
                    website: clientDetail?.website,
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
        setErrors((prevState) => ({
            ...prevState,
            [name]: false,
        }));
    };

    const handleSelect = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === "gender") {
            setErrors((prevData) => ({
                ...prevData,
                gender: false,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newErrors = {
            full_name: formData?.full_name ? false : true,
            email: formData?.email ? false : true,
            mobile_no: formData?.mobile_no ? false : true,
            designation: formData?.designation ? false : true,
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
            dispatch(createNewClient(formDataToSubmit, navigate))
            // .then((res) => {
            //   if (res?.success) {
            //     setTimeout(() => {
            //       navigate("/all-job-list");
            //     }, 1500);
            //   }
            // })
            //   .catch((error) => {
            //     console.log("error-", error);
            //   });
        }
    };
    const [isUploading, setIsUploading] = useState(false);

    return (
        <>
            <div className="" onSubmit={onSubmit}>
                <form onSubmit={handleSubmit}>
                    <div id="form">
                        <div className="from1">
                            <div className="form-group">
                                <label >Full Name<b className='color_red'>*</b></label>
                                <input
                                    type="text"
                                    placeholder="Enter Full Name"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    style={{ border: errors?.full_name ? "1px solid red" : "" }}
                                />
                                {errors?.full_name && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Fill Full Name
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label >Email ID<b className='color_red'>*</b></label>
                                <input
                                    type="text"
                                    placeholder="Enter Email ID"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ border: errors?.email ? "1px solid red" : "" }}
                                />
                                {errors?.email && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Fill Email ID
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Gender<b className=''></b></label>
                                <SelectDropdown
                                    selectedValue={formData?.gender}
                                    options={genderOptions?.map((item, index) => ({
                                        id: index,
                                        name: item,
                                    }))}
                                    placeholder="Select Gender"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search Gender"
                                    handleSearch={handleSearch}
                                    type="gender"
                                    loading={false}
                                    showSearchBar={false}
                                />

                            </div>
                            <div className="form-group">
                                <label >Company Name<b className=''></b></label>
                                <input
                                    type="text"
                                    placeholder="Enter Company Name"
                                    name="company_name"
                                    value={formData.company_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label >Designation<b className='color_red'>*</b></label>
                                <input
                                    type="text"
                                    placeholder="Enter Designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className={errors?.designation ? "select-dropdown-error" : ""}
                                />
                                {errors?.designation && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Fill Designation
                                    </p>
                                )}
                            </div>
                            {/* <div className="form-group">
                                <label>Designation <b className='color_red'>*</b></label>
                                <SelectDropdown
                                    selectedValue={formData?.designation}
                                    options={designationLists.map((item) => ({
                                        id: item.id,
                                        name: item?.designation,
                                    }))}
                                    placeholder="Select Designation"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search designation"
                                    handleSearch={handleSearch}
                                    type="designation"
                                    loading={designationData?.loading}
                                    showSearchBar={true}
                                    className={errors?.designation ? "select-dropdown-error" : ""}
                                />
                                {errors?.designation && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Select Designation
                                    </p>
                                )}
                            </div> */}
                            <div className="form-group">
                                <label >Client Phone Number<b className=''></b></label>
                                <input
                                    type="tel"
                                    placeholder="Enter Client Phone Number"
                                    name="mobile_no"
                                    value={formData.mobile_no}
                                    onChange={handleChange}
                                    className={errors?.mobile_no ? "select-dropdown-error" : ""}
                                />
                                {errors?.mobile_no && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Select Phone Number
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label >Company Phone Number<b className=''></b></label>
                                <input
                                    type="tel"
                                    placeholder="Enter Company Phone Number"
                                    name="company_no"
                                    value={formData.company_no}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Client Picture<b className=''></b></label>
                                <ImageUpload
                                    formData={formData}
                                    setFormData={setFormData}
                                    fieldName="client_image"
                                    isUploading={isUploading}
                                    setIsUploading={setIsUploading}
                                    setError={setErrors}
                                />
                            </div>

                            <div className="form-group">
                                <span>
                                    <label>Website<b className=''></b></label>
                                    <input
                                        type="text"
                                        placeholder="Enter website’s URL"
                                        name="website"
                                        value={formData?.website}
                                        onChange={handleChange}
                                    />
                                </span>
                            </div>
                        </div>

                        <div id="Description" className="DescriptionJob">
                            <div className="form-group">
                                <label>Client Address</label>
                                <TextAreaWithLimit
                                    formsValues={{ handleChange, formData }}
                                    placeholder="Enter Client Address"
                                    name="client_address"
                                    value={formData?.client_address}
                                />
                            </div>
                        </div>
                        <div id="Description" className="DescriptionJob">
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
                    <SubmitButton loading={createUpdateJob?.loading} navigate={"/client"} nextSubmit="" showNext={false} id={id} />
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

export default AddNewClientForm;
