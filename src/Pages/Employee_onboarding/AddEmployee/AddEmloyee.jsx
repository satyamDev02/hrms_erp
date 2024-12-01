import { useState, useEffect } from 'react';
import './AddEmloyee.scss';
import { HiUserPlus } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import BasicDetailsForm from './BasicDetailsForm';
import ContactsForm from './ContactsForm.jsx';
import ExperienceForm from './ExperienceForm.jsx';
import EducationForm from './EducationForm.jsx';
import DocumentsForm from './DocumentsForm.jsx';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { createNewEmployee, getEmployeeDetails } from '../../../Redux/Actions/employeeActions.js';

const AddEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const employeeDetails = useSelector((state) => state?.employeeDetails);
    const employeeDetail = employeeDetails?.data?.result;
    const employeeLoading = employeeDetails?.loading || false;

    const formNames = ['Basic Details', 'Contacts', 'Experience', 'Education', 'Documents'];
    const [activeFormIndex, setActiveFormIndex] = useState(0);
    const [filledForms, setFilledForms] = useState({
        'Basic Details': false,
        'Contacts': false,
        'Experience': false,
        'Education': false,
        'Documents': false,
    });
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile_no: '',
        date_of_birth: '',
        age: '',
        marital: '',
        gender: '',
        joining_date: '',
        designation_id: '',
        role_id: '',
        department_id: '',
        reporting_manager_id: '',
        date_of_exit: '',
        employment_type: '',
        employee_status: 'Active',
        source_of_hire: '',
        image: null, //
        experience: '',
        contacts: [
            {
                address_type: "Present",
                street_1: '',
                street_2: '',
                zip_code: '',
                city_id: '',
                city_name: '',
                state_id: '',
                state_name: '',
                country_id: '',
                country_name: '',
                personal_contact_no: '',
                emergency_contact_no: '',
                personal_email_id: '',
                is_present_address: "1"
            },
            {
                address_type: "Permanent",
                street_1: '',
                street_2: '',
                zip_code: '',
                city_id: '',
                city_name: '',
                state_id: '',
                state_name: '',
                country_id: '',
                country_name: '',
                personal_contact_no: '',
                emergency_contact_no: '',
                personal_email_id: '',
                is_present_address: "0"
            }
        ],
        experiences: [{
            company_name: "",
            industry: "",
            job_title: "",
            duration: null,
            from_date: null,
            to_date: null,
            description: "",
            experience_letter: null,
        }],
        educations: [{
            institute_name: "",
            degree: "",
            specialization: "",
            attachment: null,
            date_of_completion: null,
            from_date: null,
            to_date: null
        }],
        documents: [{
            document_name: '',
            document_id: '',
            attachment_1: null,
            attachment_2: null
        }]
    }
    );
    useEffect(() => {
        if (id) {
            const queryParams = {
                id: id,
            };
            dispatch(getEmployeeDetails(queryParams));
            if (employeeDetail) {
                // Extract only the necessary fields from contacts
                const filteredContacts = employeeDetail?.contacts?.map((item) => ({
                    address_type: item?.address_type,
                    street_1: item?.street_1 ? item?.street_1 : '',
                    street_2: item?.street_2 ? item?.street_2 : '',
                    zip_code: item?.zip_code ? item?.zip_code : '',
                    city_id: item?.city ? item?.city?.id : '',
                    city_name: item?.city ? item?.city?.name : '',
                    state_id: item?.state ? item?.state?.id : '',
                    state_name: item?.state ? item?.state?.name : '',
                    country_id: item?.country ? item?.country?.id : '',
                    country_name: item?.country ? item?.country?.name : '',
                    personal_contact_no: item?.personal_contact_no ? item?.personal_contact_no : "",
                    emergency_contact_no: item?.emergency_contact_no ? item?.emergency_contact_no : "",
                    personal_email_id: item?.personal_email_id ? item?.personal_email_id : "",
                    is_present_address: item?.is_present_address
                }));

                // Extract only the necessary fields from experiences
                const filteredExperiences = employeeDetail?.experiences?.map((item) => ({
                    company_name: item?.company_name ? item?.company_name : "",
                    industry: item?.industry ? item?.industry : "",
                    job_title: item?.job_title ? item?.job_title : "",
                    duration: item?.duration,
                    from_date: item?.from_date,
                    to_date: item?.to_date,
                    description: item?.description ? item?.description : "",
                    experience_letter: JSON.parse(item?.experience_letter || '[]'),
                }));

                // Extract only the necessary fields from educations
                const filteredEducations = employeeDetail?.educations?.map((item) => ({
                    institute_name: item?.institute_name ? item?.institute_name : "",
                    degree: item?.degree ? item?.degree : "",
                    specialization: item?.specialization ? item?.specialization : "",
                    attachment: JSON.parse(item?.attachment || '[]'),
                    date_of_completion: item?.date_of_completion,
                    from_date: item?.from_date,
                    to_date: item?.to_date
                }));

                // Extract only the necessary fields from documents
                const filteredDocuments = employeeDetail?.documents?.map((item) => ({
                    document_name: item?.document_name,
                    document_id: item?.document_id ? item?.document_id : "",
                    attachment_1: JSON.parse(item?.attachment_1 || '[]'),
                    attachment_2: JSON.parse(item?.attachment_2 || '[]')
                }));
                const employeeImage = employeeDetail?.image?.startsWith("[") ? JSON?.parse(employeeDetail?.image) : [];

                setFormData({
                    ...formData,
                    first_name: employeeDetail?.first_name,
                    last_name: employeeDetail?.last_name,
                    email: employeeDetail?.email,
                    mobile_no: employeeDetail?.mobile_no,
                    date_of_birth: employeeDetail?.date_of_birth,
                    age: employeeDetail?.age,
                    marital: employeeDetail?.marital,
                    gender: employeeDetail?.gender,
                    joining_date: employeeDetail?.joining_date,
                    designation_id: employeeDetail?.designation?.id,
                    role_id: employeeDetail?.role_id ? employeeDetail?.role_id : '',
                    department_id: employeeDetail?.department?.id,
                    reporting_manager_id: employeeDetail?.reporting_manager_id,
                    date_of_exit: employeeDetail?.date_of_exit,
                    employment_type: employeeDetail?.employment_type,
                    employee_status: employeeDetail?.employee_status,
                    source_of_hire: employeeDetail?.source_of_hire,
                    image: employeeImage,
                    experience: employeeDetail?.experience,
                    contacts: filteredContacts,
                    experiences: filteredExperiences,
                    educations: filteredEducations,
                    documents: filteredDocuments
                })
            }
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Filter out empty experiences
        const filteredExperiences = formData.experiences.filter((experience) => {
            // Check if all values are empty/null
            return Object.values(experience).some(value => value !== "" && value !== null);
        });

        // Filter out empty documents
        const filteredDocuments = formData.documents.filter((document) => {
            // Check if all values are empty/null
            return Object.values(document).some(value => value !== "" && value !== null);
        });

        // Create the new formData object to submit
        const dataToSubmit = {
            ...formData,
            experiences: filteredExperiences,
            documents: filteredDocuments,
        };

        // Example: Perform validation or API call
        console.log("Final data to submit:", dataToSubmit);

        // Submit `dataToSubmit` to the API
        // apiCall(dataToSubmit);
    };


    const handleFormData = async (newData) => {
        setFormData((prevData) => ({
            ...prevData,
            ...newData,
        }));
        // Filter out empty experiences
        const filteredExperiences = formData.experiences.filter((experience) => {
            // Check if all values are empty/null
            return Object.values(experience).some(value => value !== "" && value !== null);
        });

        // Filter out empty documents
        const filteredDocuments = formData.documents.filter((document) => {
            // Check if all values are empty/null
            return Object.values(document).some(value => value !== "" && value !== null);
        });
        // Filter out empty educations
        const filteredEducations = formData.educations.filter((education) => {
            // Check if all values are empty/null
            return Object.values(education).some(value => value !== "" && value !== null);
        });
        const formDataToSubmit = {
            ...formData,
            ...newData,
            experiences: filteredExperiences,
            educations: filteredEducations,
            documents: filteredDocuments,
        };
        if (id) {
            formDataToSubmit['id'] = id
        }
        if (!validateFormData(formDataToSubmit)) {
            return;
        }
        dispatch(createNewEmployee(formDataToSubmit, navigate))
    };

    const validateFormData = (formDataApi) => {
        if (!formDataApi.first_name || !formDataApi.email) {
            toast.error('First Name and Email are required!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }
        return true;
    };

    const handleNext = (newData) => {
        setFormData((prevData) => ({
            ...prevData,
            ...newData,
        }));
        const currentForm = formNames[activeFormIndex];
        setFilledForms((prevState) => ({
            ...prevState,
            [currentForm]: true,
        }));
        setActiveFormIndex(activeFormIndex + 1);
    };

    return (
        <>
            <div className="employee-form">
                <div className="top-bar">
                    <h2><HiUserPlus />{id ? "Edit Employee" : "Add Employee"}</h2>
                    <Link to={"/all-employee-list"} className="close_nav">
                        <TfiClose />
                    </Link>
                </div>
                <div className="navbar-items">
                    {formNames?.map((formName, index) => (
                        <span
                            key={formName}
                            className={`${index === activeFormIndex ? 'active' : ''} ${filledForms[formName] ? 'filled' : ''}`}
                            onClick={() => setActiveFormIndex(index)}
                        // onClick={() => handleNext(formData)}
                        >
                            {formName}
                        </span>
                    ))}
                </div>

                <div className="form-content">
                    {activeFormIndex === 0 && <BasicDetailsForm onSubmit={handleFormData} next={handleNext} formData={formData} setFormData={setFormData} id={id} />}
                    {activeFormIndex === 1 && <ContactsForm onSubmit={handleFormData} next={handleNext} formData={formData} setFormData={setFormData} id={id} />}
                    {activeFormIndex === 2 && <ExperienceForm onSubmit={handleFormData} next={handleNext} formData={formData} setFormData={setFormData} id={id} />}
                    {activeFormIndex === 3 && <EducationForm onSubmit={handleFormData} next={handleNext} formData={formData} setFormData={setFormData} id={id} />}
                    {activeFormIndex === 4 && <DocumentsForm onSubmit={handleFormData} next={handleNext} formData={formData} setFormData={setFormData} id={id} />}
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light" />
        </>
    );
};

export default AddEmployee;
