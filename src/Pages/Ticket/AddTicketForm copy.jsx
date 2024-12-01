import axios from 'axios';
import { useEffect, useState } from 'react';
import { CiCircleChevRight } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImageUpload } from '../../components/MultiImageUpload';
import '../Employee_onboarding/AddEmployee/AddEmloyee.scss';
import '../Employee_onboarding/AddEmployee/NavbarForm.scss';
import DatePicker from '../../utils/Form/DatePicker';
import { OutsideClick } from '../Employee_onboarding/AddEmployee/OutsideClick';

const AddTicketForm = ({ onSubmit }) => {
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.job.jobs);
    const { isOpen: isDesignationOpen, ref: designationRef, buttonRef: designationButtonRef, handleToggle: toggleDesignation, setIsOpen: setDesignationOpen } = OutsideClick();
    const { isOpen: isDepartmentOpen, ref: departmentRef, buttonRef: departmentButtonRef, handleToggle: toggleDepartment, setIsOpen: setDepartmentOpen } = OutsideClick();
    const { isOpen: isMaritalStatusOpen, ref: maritalStatusRef, buttonRef: maritalStatusButtonRef, handleToggle: toggleMaritalStatus, setIsOpen: setMaritalStatusOpen } = OutsideClick();
    const { isOpen: isEmploymentTypeOpen, ref: employmentTypeRef, buttonRef: employmentTypeButtonRef, handleToggle: toggleEmploymentType, setIsOpen: setEmploymentTypeOpen } = OutsideClick();
    const { isOpen: isExperienceOpen, ref: experienceRef, buttonRef: experienceButtonRef, handleToggle: toggleExperience, setIsOpen: setSExperienceOpen } = OutsideClick();
    const { isOpen: isRequiredSkills, ref: requiredSkillsRef, buttonRef: requiredSkillsButtonRef, handleToggle: toggleRequiredSkills, setIsOpen: setRequiredSkillsOpen } = OutsideClick();
    const { isOpen: isEmployeeOpen, ref: employeeRef, buttonRef: employeeButtonRef, handleToggle: toggleEmployee, setIsOpen: setEmployeeOpen } = OutsideClick();

    const [sms, setSms] = useState('')

    const [showAlert, setShowAlert] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const [empList, setEmpList] = useState([]);

    console.log('jobRRR', jobs)
    const [formData, setFormData] = useState({
        attachment: [],
        jobTitle: '',
        client: '',
        startingDate: '',
        deadline: '',
        employeeName: '',
        employeeId: '',
        designation: '',
        department: '',
        jobLocation: [],
        jobStatus: '',
        noOfPositions: '',
        employmentType: '',
        experience: '',
        description: ''
    });
    const [isUploading, setIsUploading] = useState(false);
    console.log('formData', formData)
    const [dropdowns, setDropdowns] = useState({
        designation: false,
        department: false,
        jobStatus: false,
        employmentType: false,
        experience: false,
        requiredSkills: false
    });
    //  filter search
    const [searchQueryEmploymentType, setSearchQueryEmploymentType] = useState('');
    const [searchQueryDepartment, setSearchQueryDepartment] = useState('');
    const [searchQueryDesignation, setSearchQueryDesignation] = useState('');
    const [searchQueryRequiredSkills, setSearchQueryRequiredSkills] = useState('');
    const [searchQueryEmployee, setSearchQueryEmployee] = useState('');
    const [startDate, setStartDate] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    // filter search
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            jobLocation: value
        }));
    };


    // };
    const [loading, setLoading] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]);


    const token = localStorage.getItem('access_token');
    console.log('formData.requiredSkills.join(', ')', formData)
    const handleSubmit = (event) => {
        event.preventDefault();  // Prevent default form submission
        // setLoading(true)
        axios.post(`https://hrms.dragnilifecare.in/public/api/jobopening/create/update`,
            {
                job_title: formData.jobTitle,
                department: formData.department,
                designation: formData.designation,
                job_location: formData.jobLocation,
                job_status: formData.jobStatus,
                no_of_position: formData.noOfPositions,
                employee_type: formData.employmentType,
                experience: formData.experience,
                skills: formData.requiredSkills.join(', '),
                description: formData.description,
            }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Job Data Submit successfully **:', response);
                setSms('New Job Data Create successfully')
                // alert(error)
                if (response.status === 200) {
                    toast.success('New Job Create successfully.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false)
                    setShowAlert(true)
                    setTimeout(() => {
                        setShowAlert(false)
                        navigate('/all-job-list')
                    }, 2000);
                }
                // Clear the form after successful submission

            })
            .catch(error => {
                setLoading(false)
                console.error('Error:', error);
                const er = error.message
                setSms(`${er}`)
                // alert(error)
                setShowAlertError(true)
                setTimeout(() => {
                    setShowAlertError(false)
                }, 4000);
                toast.error('Error during create', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    };



    const toggleDropdown = (dropdown) => {
        // Reset all dropdowns to false, then toggle the selected one
        setDropdowns({
            designation: false,
            department: false,
            jobStatus: false,
            employmentType: false,
            experience: false,
            requiredSkills: false,
            [dropdown]: !dropdowns[dropdown]
        });
    };
    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            requiredSkills: selectedSkills
        }));
    }, [selectedSkills]);
    const handleSkillSelection = (dropdown, skill) => {
        // Check if skill already exists in selectedSkills
        if (!selectedSkills.includes(skill)) {
            setSelectedSkills(prevSkills => [...prevSkills, skill]);
        }
        setRequiredSkillsOpen(false)

    };

    const selectOption = (dropdown, value) => {
        setFormData(prevState => ({
            ...prevState,
            [dropdown]: value
        }));
        setDropdowns(prevState => ({
            ...prevState,
            [dropdown]: false
        }));
        if (dropdown === 'employee') {
            // Full name ko store karo aur user_id ko bhi alag se store karo
            setFormData(prevState => ({
                ...prevState,
                employeeName: `${value.first_name} ${value.last_name}`, // Full name
                employeeId: value.id // user_id ko alag se store karo
            }));
        }
        setDesignationOpen(false)
        setDepartmentOpen(false)
        setMaritalStatusOpen(false)
        setEmploymentTypeOpen(false)
        setSExperienceOpen(false)
        setRequiredSkillsOpen(false)
        // if (!selectedSkills.includes(value)) {
        //     setSelectedSkills(prevState => [...prevState, value]);
        // }
        // // setRequiredSkillsOpen(false);
        setSearchQueryRequiredSkills('');
    };
    useEffect(() => {
        axios.post('https://hrms.dragnilifecare.in/public/api/employee/list', {
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const employees = response.data.result;

                // Department heads ko extract karo
                // const departmentHeads = employees
                //     .map(emp => `${emp.first_name} ${emp.last_name}`);

                setEmpList(employees);
                console.log('Department Heads:❗', employees);

                // setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                // setLoading(false);
            });
    }, []);
    if (loading) {
        return <div id='notFounPageID'><img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="" /></div>; // Loading state
    }

    // filter search

    const handleSearchQueryChangeDepartment = (e) => setSearchQueryDepartment(e.target.value);


    return (
        <>
            <div className="" onSubmit={onSubmit}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="error"
                />
                {/* {showAlert ? <div> <div id='showAlert' ><p> {sms}</p></div> </div> : ''} */}
                {/* {showAlertError ? <div> <div id='showAlertError' ><p>{sms}</p></div> </div> : ''} */}

                <form onSubmit={handleSubmit}>
                    <div id='form'>
                        <div className="from1">
                            <div className="form-group">
                                <label className='starred'>Employee Name*</label>
                                <input
                                    type="text"
                                    placeholder="Enter Employee"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Employee Dropdown */}
                            <div className="form-group">
                                <label className='starred'>Requested To*</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={employeeButtonRef} onClick={toggleEmployee}>
                                        <div>{formData.employeeName || "Select Requestor Name"}</div>
                                        <span>{!isEmployeeOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                    </div>
                                    {isEmployeeOpen && (
                                        <div className="dropdown-menu" ref={employeeRef}>
                                            <input
                                                type="search"
                                                id='searchDepartmentHead'

                                                placeholder="Search Team"
                                                value={searchQueryEmployee}
                                                onChange={(e) => setSearchQueryEmployee(e.target.value)}
                                                required
                                            />
                                            <div className="dropdown_I">
                                                {empList.filter(option =>
                                                    (`${option.first_name} ${option.first_name}`).toLowerCase().includes(searchQueryEmployee.toLowerCase())
                                                ).map(option => (
                                                    <div
                                                        className="dropdown-item"
                                                        onClick={() => selectOption('employee', option)}
                                                        key={option.id}
                                                    >
                                                        {option.first_name + ' ' + option.last_name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Designation Dropdown */}
                            <div className="form-group">
                                <label className='starred'>Priority*</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={designationButtonRef} onClick={toggleDesignation}>
                                        <div>{formData.designation || "Set Priority"}</div>
                                        <span id='toggle_selectIcon'> {!isDesignationOpen ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                    </div>
                                    {isDesignationOpen && (
                                        <div className="dropdown-menu" ref={designationRef}>
                                            {/* <input
                                                type="search"
                                                className='search22'
                                                placeholder="Search designation"
                                                value={searchQueryDesignation}
                                                id='searchDepartmentHead'
                                                onChange={handleSearchQueryChangeDesignation}
                                            /> */}
                                            <div className="dropdown_I">
                                                {['High', 'Medium', 'Low'].filter(option =>
                                                    option.toLowerCase().includes(searchQueryDesignation.toLowerCase())
                                                ).map(option => (
                                                    <div className="dropdown-item" onClick={() => selectOption('designation', option)} key={option}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className='starred'>Subject*</label>
                                <input
                                    type="text"
                                    placeholder="Enter subject"
                                    name="noOfPositions"
                                    value={formData.noOfPositions}
                                    onChange={handleChange}

                                />
                            </div>

                            <div className="form-group">
                                <label className=''>Attachment</label>
                                <ImageUpload
                                    formData={formData}
                                    setFormData={setFormData}
                                    fieldName="attachment"  // Unique field for resume
                                    isUploading={isUploading}
                                    setIsUploading={setIsUploading}
                                />
                            </div>
                            <DatePicker label="Date" onDateChange={handleStartDateChange} />

                        </div>

                        <div id='Description' className='DescriptionJob'>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    placeholder="Enter Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}

                                />
                            </div>
                        </div>
                    </div>
                    <div id='submitBtn_next_main'>
                        <div id='submitBtn' >
                            <div className='div'>
                                <button type="submit" >Submit </button>
                                <span><CiCircleChevRight /></span>
                            </div>
                            <div className="lineBar"></div>
                            <div className='x'>
                                <span> <TfiClose /></span>
                            </div>
                        </div>
                        {/* <div className="form">
                            <p>Next Page</p>
                            <span className='not_active'><IoIosArrowDropleft /></span>
                            <button type='submit'><IoIosArrowDropright /></button>
                        </div> */}
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddTicketForm;