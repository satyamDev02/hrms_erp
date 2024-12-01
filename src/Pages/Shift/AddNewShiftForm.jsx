import { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './AddNewShiftForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewShift } from '../../Redux/Actions/shiftActions';
import TimeClockPicker from '../../utils/Form/TimeClockPicker';
import SelectDropdown from '../../utils/common/SelectDropdown';
import { statusOptions } from '../../utils/Constant';
import SubmitButtonPopup from '../../utils/common/SubmitButtonPopup ';
import { otherIcons } from '../../components/Helper/icons';

const AddNewShiftForm = ({ ClosePop, id, updateList }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Data from redux
    const createUpdateShift = useSelector((state) => state?.createShift);
    const shiftDetails = useSelector((state) => state?.shiftMasterDetails);
    const shiftDetail = shiftDetails?.data?.result || [];
    const shiftLoading = shiftDetails?.loading || false;

    const handleSearch = (value, type) => {
    };

    const [formData, setFormData] = useState({
        shift_name: '',
        start_time: '',
        end_time: '',
        // totalHours: null,
        break_time: '',
        extra_hours: '',
        status: '' // Active/Inactive
    });

    //error handling
    const [errors, setErrors] = useState({
        shift_name: false,
        start_time: false,
        end_time: false
    })

    useEffect(() => {
        if (id) {
            setFormData({
                ...formData,
                shift_name: shiftDetail?.shift_name ? shiftDetail?.shift_name :'',
                start_time: shiftDetail?.start_time,
                end_time: shiftDetail?.end_time,
                // totalHours: null,
                break_time: shiftDetail?.break_time ? shiftDetail?.break_time : '',
                extra_hours: shiftDetail?.extra_hours ? shiftDetail?.extra_hours : '',
                status: shiftDetail?.status // Active/Inactive
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors((prevData) => ({
            ...prevData,
            [name]: false,
        }));
    };

    const handleSelect = (name, value) => {
        if (name === "status") {
            setFormData((prevData) => ({
                ...prevData,
                status: value,
            }));
        }
    }

    const handleTimeChange = (name, time) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: time,
        }));
        setErrors((prevData) => ({
            ...prevData,
            [name]: false,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {
            shift_name: formData?.shift_name ? false : true,
            start_time: formData?.start_time ? false : true,
            end_time: formData?.end_time ? false : true
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
            dispatch(createNewShift(formDataToSubmit))
                .then((res) => {
                    if (res?.success) {
                        if (id) {
                            navigate('/new-shift')
                            // const queryParams = {
                            //     id: id,
                            // };
                            // dispatch(getShiftMasterDetails(queryParams));
                        }
                        else {
                            updateList((prev) => prev + 1);
                        }
                        ClosePop();
                    }
                })
                .catch((error) => {
                    console.log("error-", error);
                });
        }
    }
    return (
        <div className='NewAttendance_main'>
            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="error"
            /> */}
            <div className="blurBG"></div>
            <div className="formDivLeave">
                <div className="popForm" style={{paddingBottom:'50px'}}>
                    <div className="Attendance_Head">
                        <h2>{id ? 'Edit Shift' : 'Add Shift'}</h2>
                        <div className='close_icon' onClick={ClosePop}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="form-container-Leave" onSubmit={handleSubmit}>
                        <form>
                            <div id="employeeFormLeave">
                                <div className="form-group">
                                    <label>Shift Name<b className='red'>*</b></label>
                                    <input
                                        type="text"
                                        name="shift_name"
                                        placeholder="Enter Shift Name"
                                        value={formData?.shift_name}
                                        onChange={handleChange}
                                        style={{ border: errors?.shift_name ? "1px solid red" : "" }}
                                    />
                                    {errors?.shift_name && (
                                        <p className="error_message" style={{ whiteSpace: "nowrap", marginBottom: "0px important" }}>
                                            {otherIcons.error_svg}
                                            Please Fill Shift Name
                                        </p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className=''>Status </label>
                                    <SelectDropdown
                                        selectedValue={formData?.status}
                                        options={statusOptions?.map((item) => ({
                                            id: item?.value,
                                            name: item?.label
                                        }))}
                                        placeholder="Select Status"
                                        onSelect={handleSelect}
                                        searchPlaceholder="Search Status"
                                        handleSearch={handleSearch}
                                        type="status"
                                        loading={false}
                                        showSearchBar={false}
                                        className={""}
                                    />
                                </div>
                                {/* <div className="form-group">
                                    <label>Start Time<b className='red'>*</b></label>
                                    <input
                                        type="time"
                                        id="startTime"
                                        value={formData?.start_time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div> */}
                                <div className="form-group grupdate2">
                                    <label htmlFor="">Start Time<b className='red'>*</b></label>
                                    <TimeClockPicker
                                        onTimeChange={handleTimeChange}
                                        initialTime={formData?.start_time}
                                        ampm={true}
                                        name="start_time"
                                        error={errors?.start_time}
                                    />
                                    {errors?.start_time && (
                                        <p className="error_message" style={{ whiteSpace: "nowrap", marginBottom: "0px important" }}>
                                            {otherIcons.error_svg}
                                            Please Select Time
                                        </p>
                                    )}
                                </div>
                                {/* <div className="form-group">
                                    <label>End Time<b className='red'>*</b></label>
                                    <input
                                        type="time"
                                        id="endTime"
                                        value={formData?.end_time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div> */}
                                <div className="form-group grupdate2">
                                    <label>End Time<b className='red'>*</b></label>
                                    <TimeClockPicker
                                        onTimeChange={handleTimeChange}
                                        initialTime={formData?.end_time}
                                        ampm={true}
                                        name="end_time"
                                        error={errors?.end_time}
                                    />
                                    {errors?.end_time && (
                                        <p className="error_message" style={{ whiteSpace: "nowrap", marginBottom: "0px important" }}>
                                            {otherIcons.error_svg}
                                            Please Select Time
                                        </p>
                                    )}
                                </div>
                                <div className="form-group grupdate2">
                                    <label>Break Time( in Minutes)</label>
                                    <TimeClockPicker
                                        onTimeChange={handleTimeChange}
                                        initialTime={formData?.break_time}
                                        ampm={false}
                                        name="break_time"
                                        showOnlyMinutes={true}
                                    />
                                </div>
                                <div className="form-group grupdate2">
                                    <label htmlFor="">Extra Hours</label>
                                    <TimeClockPicker
                                        onTimeChange={handleTimeChange}
                                        initialTime={formData?.extra_hours}
                                        ampm={false}
                                        name="extra_hours"
                                    />
                                </div>
                                {/* <div className="form-group">
                                    <label className=''>Extra Hours</label>
                                    <div className="time-selector">
                                        <div className="dropdown">
                                            <div className="dropdown-button" ref={extraHoursHoursButtonRef} onClick={toggleExtraHoursHours}>
                                                <div>{formData.extraHours.hours} hours</div>
                                                <span>{!isExtraHoursHoursOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                            </div>
                                            {isExtraHoursHoursOpen && (
                                                <div className="dropdown-menu" ref={extraHoursHoursRef}>
                                                    <div className="dropdown_I">
                                                        {Array.from({ length: 24 }, (_, i) => (
                                                            <div className="dropdown-item" onClick={() => selectTimeOption('extraHours', { hours: String(i).padStart(2, '0'), minutes: formData.extraHours.minutes })} key={i}>
                                                                {String(i).padStart(2, '0')}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="dropdown">
                                            <div className="dropdown-button" ref={extraHoursMinutesButtonRef} onClick={toggleExtraHoursMinutes}>
                                                <div>{formData.extraHours.minutes} minutes</div>
                                                <span>{!isExtraHoursMinutesOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                            </div>
                                            {isExtraHoursMinutesOpen && (
                                                <div className="dropdown-menu" ref={extraHoursMinutesRef}>
                                                    <div className="dropdown_I">
                                                        {Array.from({ length: 60 }, (_, j) => (
                                                            <div className="dropdown-item" onClick={() => selectTimeOption('extraHours', { hours: formData.extraHours.hours, minutes: String(j).padStart(2, '0') })} key={j}>
                                                                {String(j).padStart(2, '0')}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <SubmitButtonPopup loading={createUpdateShift?.loading} id={id} />
                            {/* <div className="buttons">
                                <button type="submit" className="submit-btn">Submit</button>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddNewShiftForm;
