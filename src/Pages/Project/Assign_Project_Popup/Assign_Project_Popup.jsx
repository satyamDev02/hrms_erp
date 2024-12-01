import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OutsideClick } from '../../Employee_onboarding/AddEmployee/OutsideClick';
import './Assign_Project_Popup.scss';
const Assign_Project_Popup = ({ ClosePop }) => {

    const { isOpen: isDepartmentOpen, ref: departmentRef, buttonRef: departmentButtonRef, handleToggle: toggleDepartment, setIsOpen: setDepartmentOpen } = OutsideClick();
    const { isOpen: isEmployeeOpen, ref: employeeRef, buttonRef: employeeButtonRef, handleToggle: toggleEmployee, setIsOpen: setEmployeeOpen } = OutsideClick();
    const { isOpen: isEmployeeOpen1, ref: employeeRef1, buttonRef: employeeButtonRef1, handleToggle: toggleEmployee1, setIsOpen: setEmployeeOpen1 } = OutsideClick();

    const { isOpen: isShiftOpen, ref: shiftRef, buttonRef: shiftButtonRef, handleToggle: toggleShift, setIsOpen: setShiftOpen } = OutsideClick();
    const [departments, setDepartments] = useState([]); // Store department list from API
    const [empList, setEmpList] = useState([]);
    const [shiftList, setShiftList] = useState([]);

    // console.log('departments::', departments)
    const [formData, setFormData] = useState({
        departmentName: '',
        departmentId: '',
        departmentName1: '',
        departmentId1: '',
        employeeName: '',
        employeeId: '',
        date: '',
        shift: '',
        shiftId: '',
        startTime: '',
        endTime: '',
        status: false,// Active/Inactive
        extra_hours: false
    });
    const [searchQueryDepartment, setSearchQueryDepartment] = useState('');
    const [searchQueryEmployee, setSearchQueryEmployee] = useState('');
    const [searchQueryEmployee1, setSearchQueryEmployee1] = useState('');

    const [searchQueryShift, setSearchQueryShift] = useState('');

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value
        });
    };

    const selectOption = (dropdown, value, id) => {
        setFormData(prevState => ({
            ...prevState,
            [dropdown]: value
        }));
        if (dropdown === 'department') {
            // Full name ko store karo aur user_id ko bhi alag se store karo
            setFormData(prevState => ({
                ...prevState,
                departmentName: `${value.department_name}`, // Full name
                departmentId: value.id // user_id ko alag se store karo
            }));
        }
        if (dropdown === 'employee') {
            // Full name ko store karo aur user_id ko bhi alag se store karo
            setFormData(prevState => ({
                ...prevState,
                employeeName: `${value.first_name} ${value.last_name}`, // Full name
                employeeId: value.id // user_id ko alag se store karo
            }));
        }
        if (dropdown === 'employee1') {
            // Full name ko store karo aur user_id ko bhi alag se store karo
            setFormData(prevState => ({
                ...prevState,
                employeeName1: `${value.first_name} ${value.last_name}`, // Full name
                employeeId1: value.id // user_id ko alag se store karo
            }));
        }
        if (dropdown === 'shift') {
            // Full name ko store karo aur user_id ko bhi alag se store karo
            setFormData(prevState => ({
                ...prevState,
                shift: `${value.shift_name} `, // Full name
                shiftId: value.id // user_id ko alag se store karo
            }));
        }
        setDepartmentOpen(false)
        setEmployeeOpen(false)
        setShiftOpen(false)
        setEmployeeOpen1(false)
    };

    const token = localStorage.getItem('access_token');

    // console.log('Form Data:', formData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            date: formData.date,
            department_id: formData.departmentId,
            employee_id: formData.employeeId,
            shift_name: formData.shift,
            shift_id: formData.shiftId,
            start_time: formData.startTime,
            end_time: formData.endTime,
            status: formData.status ? '0' : '1',
            extra_hours: formData.extra_hours ? '0' : '1'
        };
        // console.log('requestData', requestData)
        try {
            const response = await axios.post(`https://hrms.dragnilifecare.in/public/api/assing/shift/create/update`, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                toast.success(response.data.message || 'Created successfully.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setTimeout(() => {
                    ClosePop();
                }, 2000);
            }
        } catch (error) {
            console.error('Error:', error);
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
        }
    };

    // Fetch departments from API when component mounts
    useEffect(() => {
        axios.post('https://hrms.dragnilifecare.in/public/api/department/list', {
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const data = response.data.department;
                setDepartments(data);
                // console.log('setDepartments❗setDepartments', data);

                // setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                // setLoading(false);
            });
    }, []);

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
    // sift list
    useEffect(() => {
        axios.post('https://hrms.dragnilifecare.in/public/api/shift/master/list', {

        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {


                setShiftList(response.data.result);
                console.log('🥳 response list shift 🥳', response.data.result);
                // setSms()
            })
            .catch(error => {
                console.error("Error fetching data: ", error);


            },
            );
    }, []);

    return (
        <div className='NewAttendance_main'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="error"
            />
            <div className="blurBG"></div>
            <div className="formDivLeave">
                <div className="popForm_a">
                    <div className="Attendance_Head">
                        <h2> Assign project</h2>
                        <div className='close_icon' onClick={ClosePop}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="form-container-Leave" onSubmit={handleSubmit}>
                        <form >
                            <div id="formProject">
                                {/* project */}
                                <div className="form-group">
                                    <label className=''>Project</label>
                                    <div className="dropdown">
                                        <div className="dropdown-button" ref={shiftButtonRef} onClick={toggleShift}>
                                            <div>{formData.shift || "Select Shift"}</div>
                                            <span>{!isShiftOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                        </div>
                                        {isShiftOpen && (
                                            <div className="dropdown-menu" ref={shiftRef}>
                                                <input
                                                    type="search"
                                                    placeholder="Search shift"
                                                    value={searchQueryShift}
                                                    id='searchDepartmentHead'
                                                    onChange={(e) => setSearchQueryShift(e.target.value)}
                                                    required
                                                />
                                                <div className="dropdown_I">
                                                    {shiftList.filter(option =>
                                                        (`${option.shift_name}`).toLowerCase().includes(searchQueryShift.toLowerCase())
                                                    ).map(option => (
                                                        <div
                                                            className="dropdown-item"
                                                            onClick={() => selectOption('shift', option)}
                                                            key={option.id}
                                                        >
                                                            {option.shift_name}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Employee Dropdown */}
                                <div className="form-group">
                                    <label className=''>Team leader</label>
                                    <div className="dropdown">
                                        <div className="dropdown-button" ref={employeeButtonRef1} onClick={toggleEmployee1}>
                                            <div>{formData.employeeName1 || "Select Team leader"}</div>
                                            <span>{!isEmployeeOpen1 ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                        </div>
                                        {isEmployeeOpen1 && (
                                            <div className="dropdown-menu" ref={employeeRef1}>
                                                <input
                                                    type="search"
                                                    id='searchDepartmentHead'

                                                    placeholder="Search employee"
                                                    value={searchQueryEmployee1}
                                                    onChange={(e) => setSearchQueryEmployee1(e.target.value)}
                                                    required
                                                />
                                                <div className="dropdown_I">
                                                    {empList.filter(option =>
                                                        (`${option.first_name} ${option.first_name}`).toLowerCase().includes(searchQueryEmployee1.toLowerCase())
                                                    ).map(option => (
                                                        <div
                                                            className="dropdown-item"
                                                            onClick={() => selectOption('employee1', option)}
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
                                {/* Employee Dropdown */}
                                <div className="form-group">
                                    <label className=''>Team Member</label>
                                    <div className="dropdown">
                                        <div className="dropdown-button" ref={employeeButtonRef} onClick={toggleEmployee}>
                                            <div>{formData.employeeName || "Select employee"}</div>
                                            <span>{!isEmployeeOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                        </div>
                                        {isEmployeeOpen && (
                                            <div className="dropdown-menu" ref={employeeRef}>
                                                <input
                                                    type="search"
                                                    id='searchDepartmentHead'

                                                    placeholder="Search employee"
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

                            </div>
                            {/* Description Input */}

                            {/* Submit Button */}
                            <div className="buttons">
                                <button type="submit" className="submit-btn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assign_Project_Popup;
// 