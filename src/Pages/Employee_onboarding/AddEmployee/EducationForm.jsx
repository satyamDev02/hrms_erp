import { useState, useEffect } from 'react';
import './AddEmloyee.scss';
import './NavbarForm.scss';
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { DocumentUploader } from '../../../components/MultiImageUpload';
import DatePicker from '../../../utils/Form/DatePicker';
import SubmitButton from '../../../utils/common/SubmitButton';
import { useSelector } from 'react-redux';

const EducationForm = ({ onSubmit, next, formData, setFormData, id }) => {

    const createUpdateEmployee = useSelector((state) => state?.createEmployee);
    const [imageUploading, setImageUploading] = useState(false);
    const handleDateChange = (index, date, name) => {
        const newItems = [...formData?.educations];
        newItems[index][name] = date;
        setFormData({
            ...formData,
            educations: newItems,
        });
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newItems = [...formData?.educations];
        newItems[index][name] = value;
        setFormData({
            ...formData,
            educations: newItems,
        });
    };

    // Add a new education form
    const handleAddEducation = () => {
        const newItems = [
            ...formData.educations,
            {
                institute_name: "",
                degree: "",
                specialization: "",
                attachment: null,
                date_of_completion: "",
                from_date: "",
                to_date: ""
            }
        ];
        setFormData({ ...formData, educations: newItems });
    };

    // Remove an education form
    const handleRemoveEducation = (index) => {
        const newItems = formData.educations.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            educations: newItems,
        });
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);  // Send only the educations array
    };

    // Handle "Next" button click
    const nextSubmit = (event) => {
        event.preventDefault();
        next(formData);
    };

    return (
        <div onSubmit={handleSubmit} id="Education_form">
            <form>
                {formData?.educations?.map((form, index) => (
                    <div key={index} id='form'>
                        <div className='div_heading add_exp'>
                            <h2>Education {index + 1}</h2>
                            {index === 0 ? (
                                <div
                                    type="button"
                                    onClick={handleAddEducation}
                                >
                                    <li className='li_add_emp'>
                                        <IoMdAddCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Add More</p>
                                            <div></div>
                                        </div>
                                    </li>
                                </div>
                            ) : (
                                <div
                                    id='removeBtn'
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onClick={() => handleRemoveEducation(index)}
                                >
                                    <li className='li_add_emp'>
                                        <IoMdCloseCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Remove</p>
                                            <div></div>
                                        </div>
                                    </li>
                                </div>
                            )}
                        </div>

                        <div className="from1">
                            <div className="form-group">
                                <label>Institute Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Institute Name"
                                    name="institute_name"
                                    value={form?.institute_name}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Degree</label>
                                <input
                                    type="text"
                                    name="degree"
                                    placeholder='Enter Degree'
                                    value={form?.degree}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={form?.specialization}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder='Enter Specialization'
                                />
                            </div>
                            <div className="form-group">
                                <label>Attachment</label>
                                <DocumentUploader
                                    formData={formData}
                                    setFormData={setFormData}
                                    loading={imageUploading}
                                    setLoading={setImageUploading}
                                    section="educations"
                                    index={index}
                                    fieldName="attachment"
                                />
                            </div>
                            <div className="form-group">
                                <DatePicker label="Date of Completion" onDateChange={(name, date) => handleDateChange(index, date, name)}
                                    initialDate={form?.date_of_completion} type="date_of_completion" />
                            </div>
                            <div className="form-group" id='form_group_Duration'>
                                <div className='divDate'>
                                    <DatePicker label="From" onDateChange={(name, date) => handleDateChange(index, date, name)}
                                        initialDate={form?.from_date} type="from_date" />
                                    <DatePicker label="to" onDateChange={(name, date) => handleDateChange(index, date, name)}
                                        initialDate={form?.to_date} type="to_date" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                < SubmitButton loading={createUpdateEmployee?.loading} navigate={"/all-employee-list"} nextSubmit={nextSubmit} showNext={true} id={id}/>
            </form>
        </div>
    );
};

export default EducationForm;
