import { useState, useEffect } from 'react';
import './AddEmloyee.scss';
import './NavbarForm.scss';
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { DocumentUploader } from '../../../components/MultiImageUpload.jsx';
import DatePicker from '../../../utils/Form/DatePicker';
import { calculateDuration } from '../../../utils/helper.js';
import TextAreaWithLimit from '../../../utils/common/TextAreaWithLimit.jsx';
import { useSelector } from 'react-redux';
import SubmitButton from '../../../utils/common/SubmitButton.jsx';
import { toast } from "react-toastify";
const ExperienceForm = ({ onSubmit, next, formData, setFormData, id }) => {

    const createUpdateEmployee = useSelector((state) => state?.createEmployee);
    const [imageUploading, setImageUploading] = useState(false);

    const handleDateChange = (index, date, name) => {
        const newItems = [...formData?.experiences];
        const { from_date, to_date } = newItems[index];

        // Parse the input date and existing form dates into valid Date objects
        const parsedDate = new Date(date.split('-').reverse().join('-')); // Convert DD-MM-YYYY to YYYY-MM-DD
        const parsedFromDate = from_date ? new Date(from_date.split('-').reverse().join('-')) : null;
        const parsedToDate = to_date ? new Date(to_date.split('-').reverse().join('-')) : null;

        if (name === "from_date") {
            if (parsedToDate && parsedDate > parsedToDate) {
                toast.error("From date cannot be later than the to date.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
            const calculateDate = calculateDuration(date, to_date);
            newItems[index].duration = calculateDate
            newItems[index][name] = date;
        }
        if (name === "to_date") {
            if (parsedFromDate && parsedDate < parsedFromDate) {
                toast.error("To date cannot be earlier than the from date.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
            const calculateDate = calculateDuration(from_date, date);
            newItems[index].duration = calculateDate;
            newItems[index][name] = date;
        }
        //  const days = calculateDaysDifference(newItems[index]?.from_date, newItems[index]?.to_date);
        //     console.log("Number of Days", days);
        setFormData({
            ...formData,
            experiences: newItems,
        });
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newItems = [...formData?.experiences];
        newItems[index][name] = value;
        setFormData({
            ...formData,
            experiences: newItems,
        });
    };

    const handleAddExperience = () => {
        const newItems = [
            ...formData?.experiences,
            {
                company_name: "",
                industry: "",
                job_title: "",
                duration: "",
                from_date: "",
                to_date: "",
                description: "",
                experience_letter: null  // Add photo field for new form
            },
        ];
        setFormData({ ...formData, experiences: newItems });
    };

    const handleRemoveExperience = (index) => {
        const newItems = formData?.experiences.filter((item, i) => i !== index);
        setFormData({
            ...formData,
            experiences: newItems,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    const nextSubmit = (event) => {
        event.preventDefault();
        next(formData);
    };

    return (
        <div id="Experience_form">
            <form onSubmit={handleSubmit}>
                {formData?.experiences?.map((form, index) => (
                    <div key={index} id='form'>
                        <div className='div_heading add_exp'>
                            <h2>Experience {index + 1}</h2>
                            {index > 0 &&
                                <div
                                    id='removeBtn'
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onClick={() => handleRemoveExperience(index)}
                                >
                                    <li className='li_add_emp'>
                                        <IoMdCloseCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Remove</p>
                                            <div></div>
                                        </div>
                                    </li>
                                </div>
                            }
                            {index === 0 &&
                                <div type="button" onClick={handleAddExperience}>
                                    <li className='li_add_emp'>
                                        <IoMdAddCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Add More</p>
                                            <div></div>
                                        </div>
                                    </li>
                                </div>
                            }
                        </div>

                        <div className="from1">
                            <div className="form-group">
                                <label>Company Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Company name"
                                    name="company_name"
                                    value={form?.company_name}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Industry</label>
                                <input
                                    type="text"
                                    name="industry"
                                    placeholder='Enter Industry Name'
                                    value={form?.industry}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Job Title</label>
                                <input
                                    type="text"
                                    name="job_title"
                                    placeholder='Enter Job Title'
                                    value={form?.job_title}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>

                            <div className="form-group" id='form_group_Duration'>
                                <div className='divDate'>
                                    <DatePicker label="From" onDateChange={(name, date) => handleDateChange(index, date, name)}
                                        initialDate={form?.from_date} type="from_date" />
                                    <DatePicker label="to" onDateChange={(name, date) => handleDateChange(index, date, name)}
                                        initialDate={form?.to_date} type="to_date" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={form?.duration}
                                    readOnly
                                    placeholder="Select From - To Date"
                                />
                            </div>
                            <div className="form-group">
                                <label className=''>Experience Letter</label>
                                <DocumentUploader
                                    formData={formData}
                                    setFormData={setFormData}
                                    loading={imageUploading}
                                    setLoading={setImageUploading}
                                    section="experiences"
                                    index={index}
                                    fieldName="experience_letter"
                                />
                            </div>
                        </div>
                        <div id='Description'>
                            <div className="form-group">
                                <label>Description</label>
                                <TextAreaWithLimit
                                    placeholder="Enter Description"
                                    name="description"
                                    value={form?.description}
                                    formsValues={{
                                        handleChange: (e) => handleChange(index, e), form
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                < SubmitButton loading={createUpdateEmployee?.loading} navigate={"/all-employee-list"} nextSubmit={nextSubmit} showNext={true} id={id} />
            </form>
        </div>
    );
};
export default ExperienceForm;