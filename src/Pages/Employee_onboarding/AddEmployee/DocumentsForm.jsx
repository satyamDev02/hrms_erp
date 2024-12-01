import { useEffect, useState } from 'react';
import './AddEmloyee.scss';
import './NavbarForm.scss';
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { DocumentUploader } from '../../../components/MultiImageUpload';
import { documentOptions } from '../../../utils/Constant.js';
import { useSelector } from 'react-redux';
import SelectDropdown from '../../../utils/common/SelectDropdown.jsx';
import SubmitButton from '../../../utils/common/SubmitButton.jsx';

const DocumentsForm = ({ onSubmit, next, formData, setFormData, id }) => {

    const createUpdateEmployee = useSelector((state) => state?.createEmployee);
    const [imageUploading, setImageUploading] = useState(false);

    // select
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [selectOneOp, setSelectOneOp] = useState();

    const handleSearch = (value, type) => {
    };

    useEffect(() => {
        if (id) {
            const documentNames = formData?.documents?.map(item => item?.document_name);
            setSelectedDocuments(documentNames);
        }
        setSelectOneOp(formData?.documents[formData?.documents?.length - 1]?.document_name)
    }, [formData?.documents])

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newItems = [...formData?.documents];
        newItems[index][name] = value;

        setFormData({
            ...formData,
            documents: newItems,
        });
    };

   
    // 
    // Add a new document form
    const handleAddDocument = () => {
        const newItems = [
            ...formData.documents,
            {
                document_name: "",
                document_id: "",
                attachment_1: null,
                attachment_2: null,
            },
        ];
        setFormData({ ...formData, documents: newItems });
    };

    // Remove a document form
    const handleRemoveDocument = (index) => {
        // Find the document type to be removed
        const documentTypeToRemove = formData?.documents[index]?.document_name;

        // Remove the document type from the selectedDocuments array
        const updatedSelectedDocuments = selectedDocuments.filter(
            (docType) => docType !== documentTypeToRemove
        );

        const newItems = formData.documents.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            documents: newItems,
        });
        setSelectedDocuments(updatedSelectedDocuments);
    };

    // Handle select changes
    const handleSelect = (name, value, index) => {
        const newItems = [...formData.documents];
        const previousValue = newItems[index][name];

        // Update the selected value
        newItems[index][name] = value;
        setFormData({ ...formData, documents: newItems });

        if (name === "document_name") {
            let updatedSelectedDocuments = [...selectedDocuments];

            // Remove the previous value from selectedDocuments if it exists
            if (previousValue) {
                updatedSelectedDocuments = updatedSelectedDocuments.filter(
                    (docType) => docType !== previousValue
                );
            }

            // Add the new value to selectedDocuments
            if (value) {
                updatedSelectedDocuments.push(value);
            }

            setSelectedDocuments(updatedSelectedDocuments);
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData)
    };
    const nextSubmit = (event) => {
        event.preventDefault();
        next(formData)
    };

    return (
        <div id="Education_form">
            <form onSubmit={handleSubmit}>
                {formData?.documents?.map((form, index) => (
                    <div key={index} id='form'>
                        <div className='div_heading add_exp'>
                            <h2 id='indexTitile'>Identity Information {index + 1}</h2>
                            {index === 0 ?
                                <div>
                                    {(selectOneOp !== '' && formData?.documents?.length !== documentOptions?.length) ?
                                        <div type="button" onClick={handleAddDocument}>
                                            <li className='li_add_emp'>
                                                <IoMdAddCircleOutline />
                                                <div id='hover_P'>
                                                    <p id='remove_p'>Add More</p>
                                                    <div></div>
                                                </div>
                                            </li>
                                        </div>
                                        : ''
                                    }
                                </div>
                                :
                                <div id='removeBtn' style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleRemoveDocument(index)}>
                                    <li className='li_add_emp '>
                                        <IoMdCloseCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Remove</p>
                                            <div></div>
                                        </div>
                                    </li>
                                </div>
                            }
                        </div>
                        <div className="from1">
                            <div className="form-group">
                                <label> Document Name </label>
                                <SelectDropdown
                                    selectedValue={form?.document_name}
                                    options={documentOptions?.map((item) => ({
                                        id: index,
                                        name: item,
                                    }))}
                                    placeholder="Select Document"
                                    onSelect={(name, value) => handleSelect(name, value, index)}
                                    searchPlaceholder="Search document type"
                                    handleSearch={handleSearch}
                                    type="document_name"
                                    loading={false}
                                    showSearchBar={false}
                                    className={""}
                                    itemClassName={(item) => selectedDocuments?.includes(item.name) ? 'disabled' : ''} // Add 'disabled' class conditionally
                                />
                            </div>

                            <div className="form-group">
                                <label>Document Id</label>
                                <input
                                    type="text"
                                    name="document_id"
                                    value={form?.document_id}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="Document Number"
                                />
                            </div>
                            <div className="form-group">
                                <label>{form?.document_name === 'Aadhaar' ? 'Front  Attachment' : 'Attachment'}</label>
                                <DocumentUploader
                                    formData={formData}
                                    setFormData={setFormData}
                                    loading={imageUploading}
                                    setLoading={setImageUploading}
                                    section="documents"
                                    index={index}
                                    fieldName="attachment_1"
                                />
                            </div>
                            {form?.document_name === 'Aadhaar' &&
                                <div className="form-group">
                                    <label>Back  Attachment</label>
                                    <DocumentUploader
                                        formData={formData}
                                        setFormData={setFormData}
                                        loading={imageUploading}
                                        setLoading={setImageUploading}
                                        section="documents"
                                        index={index}
                                        fieldName="attachment_2"
                                    />
                                </div>
                            }
                        </div>
                    </div>
                ))}
                < SubmitButton loading={createUpdateEmployee?.loading} navigate={"/all-employee-list"} nextSubmit={nextSubmit} showNext={true} id={id} />
            </form>
        </div>
    );
};

export default DocumentsForm;
