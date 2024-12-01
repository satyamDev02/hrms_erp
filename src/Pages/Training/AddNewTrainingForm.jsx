import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../components/Helper/icons.jsx";
import { getEmployeeList } from "../../Redux/Actions/employeeActions.js";
import { getTrainerList } from "../../Redux/Actions/trainerActions.js";
import {
  createNewTraining,
  getTrainingDetails,
} from "../../Redux/Actions/trainingActions.js";
import SelectDropdown from "../../utils/common/SelectDropdown.jsx";
import SubmitButton from "../../utils/common/SubmitButton.jsx";
import TextAreaWithLimit from "../../utils/common/TextAreaWithLimit.jsx";
import DatePicker from "../../utils/Form/DatePicker.jsx";
import { calculateDuration } from "../../utils/helper.js";
import "../Employee_onboarding/AddEmployee/AddEmloyee.scss";
import "../Employee_onboarding/AddEmployee/NavbarForm.scss";

const AddNewTrainingForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const createUpdateTraining = useSelector((state) => state?.createTraining);
  const trainingData = useSelector((state) => state?.trainingDetails);
  const trainingDetail = trainingData?.data?.result || {};

  const employeeData = useSelector((state) => state?.employeeList);
  const employeeLists = employeeData?.data?.result || [];

  const trainerData = useSelector((state) => state?.trainerList);
  const trainerLists = trainerData?.data?.result || [];

  const debounceTimeoutRef = useRef(null);

  const fetchEmployee = (search = "") => {
    const sendData = { employee_status: "Active" };
    if (search) {
      sendData["search"] = search;
    }
    dispatch(getEmployeeList(sendData));
  };
  const fetchTrainer = (search = "") => {
    const sendData = {};
    if (search) {
      sendData["search"] = search;
    }
    dispatch(getTrainerList(sendData));
  };
  const handleSearch = (value, type) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current); // Clear previous timeout
    }
    if (value.trim().length > 0 || value.trim().length === 0) {
      debounceTimeoutRef.current = setTimeout(() => {
        if (type === "user_id") {
          fetchEmployee(value);
        }
      }, 800);
    }
    if (value.trim().length > 0 || value.trim().length === 0) {
      debounceTimeoutRef.current = setTimeout(() => {
        if (type === "trainer_id" || type === "trainig_type") {
          fetchTrainer(value);
        }
      }, 800);
    }
  };
  useEffect(() => {
    fetchEmployee();
    fetchTrainer();
  }, []);

  const [formData, setFormData] = useState({
    user_id: "",
    user_name: "",
    trainer_name: "",
    trainer_id: "",
    trainig_type: "",
    start_date: "",
    end_date: "",
    duration: "",
    training_cost: "",
    description: "",
  });

  //error handling
  const [errors, setErrors] = useState({
    trainig_type: false,
    trainer_id: false,
    user_id:false
  });

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getTrainingDetails(queryParams));
      if (trainingDetail) {
        setFormData({
          ...formData,
          trainig_type: trainingDetail?.trainig_type || "",
          trainer_id: trainingDetail?.trainer_id || "",
          trainer_name: trainingDetail?.trainer_name || "",
          user_name: trainingDetail?.user_name || "",
          user_id: trainingDetail?.user_id || "",
          start_date: trainingDetail?.start_date || "",
          end_date: trainingDetail?.end_date || "",
          duration: trainingDetail?.duration || "",
          training_cost: trainingDetail?.training_cost || "",
          description: trainingDetail?.description
            ? trainingDetail?.description
            : "",
        });
      }
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
     if (name === "no_of_position") {
      setErrors((prevData) => ({
        ...prevData,
        no_of_position: false,
      }));
    } if (name === "trainig_type") {
        setErrors((prevData) => ({
          ...prevData,
          trainig_type: false,
        }));
      }
  };

  const handleSelect = (name, value) => {
    if (name === "employee") {
      const selectedEmployee = employeeLists?.find(
        (item) => item.user_id === value
      );
      if (selectedEmployee) {
        setFormData((prevData) => ({
          ...prevData,
          user_name:
            selectedEmployee?.first_name + " " + selectedEmployee?.last_name,
          user_id: value,
        }));
      }
      setErrors((prevData) => ({
        ...prevData,
        user_id: false,
      }));
    }
    if (name === "traniner") {
      const selectedTrannier = trainerLists?.find((item) => item.user_id === value);
      if (selectedTrannier) {
        setFormData((prevData) => ({
          ...prevData,
          trainer_name: selectedTrannier?.trainer_name,
          trainer_id: value,
        }));
      }
      setErrors((prevData) => ({
        ...prevData,
        trainer_id: false,
      }));
    }
  };

  // Helper function to update date
  const updateFormData = (name, date, calculatedDays) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
      duration: calculatedDays,
    }));
  };

  const handleDateChange = (name, date) => {
    const { start_date, end_date } = formData;

    // Parse the input date and existing form dates into valid Date objects
    const parsedDate = new Date(date.split("-").reverse().join("-")); // Convert DD-MM-YYYY to YYYY-MM-DD
    const parsedFromDate = start_date
      ? new Date(start_date.split("-").reverse().join("-"))
      : null;
    const parsedToDate = end_date
      ? new Date(end_date.split("-").reverse().join("-"))
      : null;

    // Copy existing formData
    // const updatedFormData = { ...formData };
    // Update start_date or end_date
    // updatedFormData[name] = date;

    // Calculate duration when start_date or end_date is updated
    if (name === "start_date") {
      if (parsedToDate && parsedDate > parsedToDate) {
        toast.error("Start date cannot be later than the end date.", {
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
      const calculateDate = calculateDuration(date, end_date);
      updateFormData(name, date, calculateDate);
    }
    if (name === "end_date") {
      if (parsedFromDate && parsedDate < parsedFromDate) {
        toast.error("End date cannot be earlier than the start date.", {
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
      const calculateDate = calculateDuration(start_date, date);
      updateFormData(name, date, calculateDate);
    }
    // Update state with new data
    // setFormData(updatedFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newErrors = {
      trainer_id: formData?.trainer_id ? false : true,
      user_id: formData?.user_id ? false : true,
      trainig_type: formData?.trainig_type ? false : true,
    };
    setErrors(newErrors);

    const hasAnyError = Object.values(newErrors).some(
      (value) => value === true
    );
    if (hasAnyError) {
      return;
    } else {
      const formDataToSubmit = {
        ...formData,
      };
      if (id) {
        formDataToSubmit["id"] = id;
      }
      dispatch(createNewTraining(formDataToSubmit, navigate));
    }
  };
console.log("formData", formData)
  return (
    <>
      <div className="" onSubmit={onSubmit}>
        <form onSubmit={handleSubmit}>
          <div id="form">
            <div className="from1">
              <div className="form-group">
                <label>
                  Trainer Assigned<b className="color_red">*</b>
                </label>
                <SelectDropdown
                  selectedValue={formData?.trainer_id}
                  options={trainerLists?.map((item) => ({
                    id: item?.user_id,
                    name: item?.trainer_name,
                  }))}
                  placeholder="Select Trainer"
                  onSelect={handleSelect}
                  searchPlaceholder="Search Trainer "
                  handleSearch={handleSearch}
                  type="traniner"
                  loading={trainerLists?.loading}
                  showSearchBar={true}
                  className={errors?.trainer_id ? "select-dropdown-error" : ""}
                  // selectedName={formData?.trainer_id}
                />
                {errors?.trainer_id && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Select Trainer
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>
                  Training Type<b className="color_red">*</b>
                </label>

                <input
                  type="text"
                  placeholder="Enter Trainning Type"
                  name="trainig_type"
                  value={formData.trainig_type}
                  onChange={handleChange}
                  style={{ border: errors?.trainig_type? "1px solid red" : "" }}

                />
                {errors?.trainig_type && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Enter Trainer Type
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>
                  Employees<b className="color_red">*</b>
                </label>
                <SelectDropdown
                  selectedValue={formData?.user_id}
                  options={employeeLists?.map((item) => ({
                    id: item?.user_id,
                    name: item?.first_name + " " + item?.last_name,
                  }))}
                  placeholder="Select Employees"
                  onSelect={handleSelect}
                  searchPlaceholder="Search Employees"
                  handleSearch={handleSearch}
                  type="employee"
                  loading={trainingData?.loading}
                  showSearchBar={true}
                  // selectedName={formData?.user_id}
                  className={errors?.user_id ? "select-dropdown-error" : ""}
                />
                {errors?.user_id && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Select Employee
                  </p>
                )}
              </div>
              <DatePicker
                label="Start Date"
                onDateChange={handleDateChange}
                initialDate={formData?.start_date}
                type="start_date"
              />
              <DatePicker
                label="End Date"
                onDateChange={handleDateChange}
                initialDate={formData?.end_date}
                type="end_date"
              />
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData?.duration}
                  readOnly
                  placeholder="Select Start - End Date"
                />
              </div>

              <div className="form-group">
                <label>Training Cost</label>
                <div className="input-wrapper">
                  <span id="dollar-symbol">
                    {formData?.training_cost && "$"}
                  </span>
                  <input
                    type="number"
                    placeholder="Enter Training Cost"
                    name="training_cost"
                    value={formData.training_cost}
                    onChange={handleChange}
                    style={{
                      paddingLeft: formData.training_cost ? "20px" : "10px",
                    }}
                    id="doller"
                    min="0"
                  />
                </div>
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
          <SubmitButton
            loading={createUpdateTraining?.loading}
            navigate={"/training"}
            nextSubmit=""
            showNext={false}
            id={id}
          />
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

export default AddNewTrainingForm;
