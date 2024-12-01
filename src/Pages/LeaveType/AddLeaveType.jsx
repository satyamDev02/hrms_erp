import './NewAttendance.scss';
import { useState, useEffect } from 'react';
import { leaveTypeOptions, statusOptions } from '../../utils/Constant';
import TextAreaWithLimit from '../../utils/common/TextAreaWithLimit';
import SelectDropdown from '../../utils/common/SelectDropdown';
import { createNewLeaveType } from '../../Redux/Actions/leaveMasterActions';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButtonPopup from '../../utils/common/SubmitButtonPopup ';
import { otherIcons } from '../../components/Helper/icons';
import { useNavigate } from 'react-router-dom';

const AddLeaveType = ({ ClosePop, refBox, updateList, id }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    //Data from redux
    const createLeaveType = useSelector((state) => state?.createLeaveMaster);
    const leaveTypeDetails = useSelector((state) => state?.leaveTypeDetails);
    const leaveTypeDetail = leaveTypeDetails?.data?.result;

    const handleSearch = (value, type) => {
    };

    const [formData, setFormData] = useState({
        leave_type: '',
        available_days: '',
        status: 0,
        type_of_leave: '',
    });

    const [errors, setErrors] = useState({
        leave_type: false,
        available_days: false,
        type_of_leave: false,
    })

    useEffect(() => {
        if (id) {
            setFormData({
                ...formData,
                leave_type: leaveTypeDetail?.leave_type,
                available_days: leaveTypeDetail?.available_days,
                status: leaveTypeDetail?.status ? leaveTypeDetail?.status : 0,
                type_of_leave: leaveTypeDetail?.type_of_leave
            });
        }
    }, [id])
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === "leave_type") {
            setErrors((prevData) => ({
                ...prevData,
                leave_type: false,
            }));
        }
        if (name === "available_days") {
            setErrors((prevData) => ({
                ...prevData,
                available_days: false,
            }));
        }
    };

    const handleSelect = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === "type_of_leave") {
            setErrors((prevData) => ({
                ...prevData,
                type_of_leave: false,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {
            leave_type: formData?.leave_type ? false : true,
            available_days: formData?.available_days ? false : true,
            type_of_leave: formData?.type_of_leave ? false : true,
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
            dispatch(createNewLeaveType(formDataToSubmit))
                .then((res) => {
                    if (res?.success) {
                        ClosePop();
                        if (id) {
                            navigate("/leave_type");
                            // const queryParams = {
                            //     id: id,
                            // };
                            // dispatch(getDepartmentDetails(queryParams));
                        } else {
                            updateList((prev) => prev + 1);
                        }
                    }
                })
                .catch((error) => {
                    console.log("error-", error);
                });
        }
    };

    return (
        <div className='NewAttendance_main'>
            <div className="blurBG"></div>
            <div className="formDivLeave" >
                <div className="popForm leave_form__" ref={refBox}>
                    <div className="Attendance_Head">
                        <h2>{id ? "Edit Leave Type" : "Add New Leave Type"}</h2>
                        <div className='close_icon' onClick={ClosePop}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="form-container-Leave" onSubmit={handleSubmit}>
                        <form >
                            <div id="employeeFormLeave">
                                {/* Leave Type Input */}
                                <div className="form-group">
                                    <label>Leave Type<b className='color_red'>*</b></label>
                                    <input
                                        type="text"
                                        id="leaveType"
                                        name="leave_type"
                                        placeholder="Enter leave type"
                                        value={formData?.leave_type}
                                        onChange={handleChange}
                                        style={{ border: errors?.leave_type ? "1px solid red" : "" }}
                                    />
                                    {errors?.leave_type && (
                                        <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                            {otherIcons.error_svg}
                                            Please Enter Leave Type
                                        </p>
                                    )}
                                </div>
                                {/* Type Dropdown */}
                                <div className="form-group">
                                    <label>Type<b className='color_red'>*</b></label>
                                    <SelectDropdown
                                        selectedValue={formData?.type_of_leave}
                                        options={leaveTypeOptions?.map((item, index) => ({
                                            id: index,
                                            name: item,
                                        }))}
                                        placeholder="Select Type"
                                        onSelect={handleSelect}
                                        searchPlaceholder="Search..."
                                        handleSearch={handleSearch}
                                        type="type_of_leave"
                                        loading={false}
                                        showSearchBar={false}
                                        className={errors?.type_of_leave ? "select-dropdown-error" : ""}
                                    />
                                    {errors?.type_of_leave && (
                                        <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                            {otherIcons.error_svg}
                                            Please Select Leave Type
                                        </p>
                                    )}
                                </div>

                                {/* Available Input */}
                                <div className="form-group">
                                    <label>Available Days<b className='color_red'>*</b></label>
                                    <input
                                        type="number"
                                        id="available"
                                        name="available_days"
                                        placeholder="Enter number of available days"
                                        value={formData?.available_days}
                                        onChange={handleChange}
                                        style={{ border: errors?.available_days ? "1px solid red" : "" }}
                                    />
                                    {errors?.available_days && (
                                        <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                                            {otherIcons.error_svg}
                                            Please Enter Days
                                        </p>
                                    )}
                                </div>

                                {/* Leave Visibility Dropdown */}
                                <div className="form-group">
                                    <label>Leave Visibility</label>
                                    <SelectDropdown
                                        selectedValue={formData?.status}
                                        options={statusOptions?.map((item) => ({
                                            id: item.value,
                                            name: item?.label,
                                        }))}
                                        placeholder="Select Visibility"
                                        onSelect={handleSelect}
                                        searchPlaceholder="Search Visibility"
                                        handleSearch={handleSearch}
                                        type="status"
                                        loading={false}
                                        showSearchBar={false}
                                        className={""}
                                    />
                                </div>
                            </div>
                            {/* Description Input */}
                            <div id='Description' className='DescriptionJob DescriptionLeave'>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <TextAreaWithLimit
                                        formsValues={{ handleChange, formData }}
                                        placeholder="Enter Description"
                                        name="description"
                                        value={formData?.description}
                                    />
                                </div>
                            </div>
                            {/* Submit Button */}
                            <SubmitButtonPopup loading={createLeaveType?.loading} id={id} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddLeaveType;
