import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { TicketPriorityOptions } from "../../utils/Constant.js";
import { getEmployeeList } from "../../Redux/Actions/employeeActions.js";
import { getClientList } from "../../Redux/Actions/clientActions.js";
import SelectDropdown from "../../utils/common/SelectDropdown.jsx";
import { useRef } from "react";
import TextAreaWithLimit from "../../utils/common/TextAreaWithLimit.jsx";
import { otherIcons } from "../../components/Helper/icons.jsx";
import { ToastContainer } from "react-toastify";
import DatePicker from '../../utils/Form/DatePicker.jsx';
import { ImageUpload } from '../../components/MultiImageUpload.jsx';
import SubmitButton from "../../utils/common/SubmitButton.jsx";
import { getDepartmentList } from "../../Redux/Actions/departmentActions.js";
import { createNewTicket, getTicketDetails } from "../../Redux/Actions/ticketActions.js";

const AddTicketForm = ({ onSubmit }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();

    const createUpdateTicket = useSelector((state) => state?.createTicket);

    const ticketLeaderData = useSelector((state) => state?.employeeList);
    const ticketLeaderLists = ticketLeaderData?.data?.result || [];

    const clientData = useSelector((state) => state?.clientList);
    const clientLists = clientData?.data?.result || [];

    const ticketData = useSelector((state) => state?.ticketDetails);
    const ticketDetail = ticketData?.data?.result;


    const Attachments =
        typeof ticketDetail?.attachment === "string"
            ? JSON.parse(ticketDetail?.attachment)
            : ticketDetail?.attachment || [];

    console.log('ticketDetail', Attachments)

    const ticketDetailLoading = ticketData?.loading || false;
    const debounceTimeoutRef = useRef(null); // Store debounce timeout reference

    // Fetch data based on current state
    const fetchEmployee = (search = "") => {
        const sendData = {employee_status: "Active"};
        if (search) {
            sendData["search"] = search;
        }
        dispatch(getEmployeeList(sendData));
    };

    const fetchClient = (search = "") => {
        const sendData = {};
        if (search) {
            sendData["search"] = search;
        }
        dispatch(getClientList(sendData));
    };
    
    const handleSearch = (value, type) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current); // Clear previous timeout
        }
        if (value.trim().length > 0 || value.trim().length === 0) {
            debounceTimeoutRef.current = setTimeout(() => {
                if (type === "user_id" || type === "requested_to") {
                    fetchEmployee(value);
                }
            }, 800);
        }
    };

    useEffect(() => {
        fetchEmployee();
    }, []);

    const [formData, setFormData] = useState({
        subject: "",
        date: "",
        user_id: "",
        requested_to: '',
        attachment: [],
        description: "",
        status: 'Pending',
    });
    console.log('form',formData)

    //error handling
    const [errors, setErrors] = useState({
        user_id: false,
        requested_to: false,
        priority: false,
        subject: false
    })

    useEffect(() => {
        if (id) {
            const queryParams = {
                id: id,
            };
            dispatch(getTicketDetails(queryParams));
            if (ticketDetail) {
                setFormData({
                    ...formData,
                    requested_to: ticketDetail?.requested_to[0]?.id,
                    client_id: ticketDetail?.client_id || "", // client_id from ticketDetail
                    subject: ticketDetail?.subject || "",
                    date: ticketDetail?.date || "",
                    user_id: ticketDetail?.user_id || "",
                    priority: ticketDetail?.priority || "",
                    attachment: Attachments || '[]',
                    status: ticketDetail?.status || "",
                    description: ticketDetail?.description || "",
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
        if (name === "subject") {
            setErrors((prevData) => ({
                ...prevData,
                subject: false,
            }));
        }
        if (name === "rate") {
            setErrors((prevData) => ({
                ...prevData,
                rate: false,
            }));
        }
    };

    const handleSelect = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrors((prevData) => ({
            ...prevData,
            [name]: false,
        }));

        if (name === "client") {
            setFormData((prevData) => ({
                ...prevData,
                client_id: value,
            }));
            setErrors((prevData) => ({
                ...prevData,
                client_id: false,
            }));
        }
        if (name === "department") {
            setFormData((prevData) => ({
                ...prevData,
                department_id: value,
            }));
            setErrors((prevData) => ({
                ...prevData,
                department_id: false,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let newErrors = {
            user_id: formData?.user_id ? false : true,
            requested_to: formData?.requested_to ? false : true,
            priority: formData?.priority ? false : true,
            subject: formData?.subject ? false : true
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
            dispatch(createNewTicket(formDataToSubmit, navigate))
            // .then((res) => {
            //   if (res?.success) {
            //     setTimeout(() => {
            //       navigate("/all-list");
            //     }, 1500);
            //   }
            // })
            //   .catch((error) => {
            //     console.log("error-", error);
            //   });
        }
    };

    const [isUploading, setIsUploading] = useState(false);
    const handleDateChange = (name, date) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: date,
        }));
    };

    return (
        <>
            <div className="" onSubmit={onSubmit}>
                <form onSubmit={handleSubmit}>
                    <div id="form">
                        <div className="from1">
                         
                            <div className="form-group">
                                <label>Employee Name<b className='color_red'>*</b></label>
                                <SelectDropdown
                                    selectedValue={formData?.user_id}
                                    options={ticketLeaderLists?.map((item) => ({
                                        id: item?.user_id,
                                        name: item?.first_name + " " + item?.last_name,
                                    }))}
                                    placeholder="Select Employee Name"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search Employee Name"
                                    handleSearch={handleSearch}
                                    type="user_id"
                                    loading={ticketLeaderData?.loading}
                                    showSearchBar={true}
                                    className={errors?.user_id ? "select-dropdown-error" : ""}
                                    // selectedName={formData?.user_id}
                                />
                                {errors?.user_id && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Select Employee Name
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Requested To<b className='color_red'>*</b></label>
                                <SelectDropdown
                                    selectedValue={formData?.requested_to || []}
                                    options={ticketLeaderLists.map((item) => ({
                                        id: item?.user_id,
                                        name: item?.first_name + " " + item?.last_name,
                                    }))}
                                    placeholder="Select Requested To"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search Requested To"
                                    handleSearch={handleSearch}
                                    type="requested_to"
                                    loading={ticketLeaderData?.loading}
                                    showSearchBar={true}
                                    className={errors?.requested_to ? "select-dropdown-error" : ""}
                                />
                                {(errors?.requested_to) && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Select Requested To
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Priority <b className='color_red'>*</b></label>
                                <SelectDropdown
                                    selectedValue={formData?.priority}
                                    options={TicketPriorityOptions?.map((item, index) => ({
                                        id: index,
                                        name: item,
                                    }))}
                                    placeholder="Select Priority"
                                    onSelect={handleSelect}
                                    searchPlaceholder="Search status"
                                    handleSearch={handleSearch}
                                    type="priority"
                                    loading={false}
                                    showSearchBar={false}
                                    className={errors?.priority ? "select-dropdown-error" : ""}
                                />
                                {errors?.priority && (
                                    <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                        {otherIcons.error_svg}
                                        Please Select Priority
                                    </p>
                                )}

                            </div>
                            <div className="form-group">
                                <label >Subject<b className='color_red'>*</b></label>
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
                                        Please Fill Subject
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Attachments<b className=''></b></label>
                                <ImageUpload
                                    formData={formData}
                                    setFormData={setFormData}
                                    fieldName="attachment"
                                    isUploading={isUploading}
                                    setIsUploading={setIsUploading}
                                    // setError={setErrors}
                                />
                            </div>
                            <DatePicker label="Date" onDateChange={handleDateChange} initialDate={formData?.date} type="date" />

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
                    <SubmitButton loading={createUpdateTicket?.loading} navigate={"/ticket"} nextSubmit="" showNext={false} id={id} />
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

export default AddTicketForm;
