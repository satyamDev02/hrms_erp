import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../components/Helper/icons.jsx";
import { ResumeUpload } from "../../components/MultiImageUpload.jsx";
import { createNewApplicant, getApplicantDetails, } from "../../Redux/Actions/applicantActions.js";
import { getJobList } from "../../Redux/Actions/jobActions.js";
import { getCityList, getCountryList, getStateList, } from "../../Redux/Actions/locationActions.js";
import SelectDropdown from "../../utils/common/SelectDropdown.jsx";
import { sourceOfHireOptions } from "../../utils/Constant.js";
import DatePicker from "../../utils/Form/DatePicker.jsx";
import "../Employee_onboarding/AddEmployee/AddEmloyee.scss";
import "../Employee_onboarding/AddEmployee/NavbarForm.scss";
import SubmitButton from "../../utils/common/SubmitButton.jsx";

const AddNewApplicantForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //data from redux
  const createUpdateApplicant = useSelector((state) => state?.createApplicant);
  const applicantDetails = useSelector((state) => state?.applicantDetails);
  const applicantDetail = applicantDetails?.data?.result || [];

  const jobData = useSelector((state) => state?.jobList);
  const jobLists = jobData?.data?.job_opening || [];

  const countryData = useSelector((state) => state?.countryList);
  const countryLists = countryData?.data?.country || [];

  const stateData = useSelector((state) => state?.stateList);
  const stateLists = stateData?.data?.country || [];

  const cityData = useSelector((state) => state?.cityList);
  const cityLists = cityData?.data?.country || [];

  const debounceTimeoutRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploading2, setIsUploading2] = useState(false);

  // Fetch data based on current state
  const fetchJobOpening = (search = "") => {
    const sendData = {};
    if (search) {
      sendData["search"] = search;
    }
    dispatch(getJobList(sendData));
  };

  const fetchCountry = (search = "") => {
    const sendData = {};
    if (search) {
      sendData["search"] = search;
    }
    dispatch(getCountryList(sendData));
  };

  const fetchState = (search = "", id = formData?.country_id) => {
    const sendData = {
      country_id: id,
    };
    if (search) {
      sendData["search"] = search;
    }
    dispatch(getStateList(sendData));
  };

  const fetchCity = (search = "", id = formData?.state_id) => {
    const sendData = {
      state_id: id,
    };
    if (search) {
      sendData["search"] = search;
    }
    dispatch(getCityList(sendData));
  };

  const handleSearch = (value, type) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    if (value.trim().length > 0 || value.trim().length === 0) {
      debounceTimeoutRef.current = setTimeout(() => {
        if (type === "job_opening_name") {
          fetchJobOpening(value);
        }
        if (type === "country") {
          fetchCountry(value);
        } else if (type === "state") {
          fetchState(value);
        } else if (type === "city") {
          fetchCity(value);
        }
      }, 800);
    }
  };

  useEffect(() => {
    fetchCountry();
    fetchJobOpening();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_no: "",
    job_opening_id: "",
    job_opening_name: "",
    resume: [],
    cover_letter: [],
    country_id: "",
    state_id: "",
    city_id: "",
    zip_code: "",
    source: "",
    availability_date: null,
    expected_salary: "",
    referred_by: "",
    status: "New"
  });

  //error handling
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    mobile_no: false,
    job_opening_name: false,
    job_opening_id: false,
    resume: false,
    country_id: false,
  });

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getApplicantDetails(queryParams));
      if (applicantDetail) {
        const parsedResume = JSON.parse(applicantDetail?.resume || '[]');
        const parsedCoverLetter = JSON.parse(applicantDetail?.cover_letter || '[]');
        setFormData({
          ...formData,
          name: applicantDetail?.name,
          email: applicantDetail?.email,
          mobile_no: applicantDetail?.mobile_no,
          job_opening_id: applicantDetail?.job_opening_id,
          job_opening_name: applicantDetail?.job_opening_name,
          resume: parsedResume,
          cover_letter: parsedCoverLetter,
          country_id: applicantDetail?.country?.id,
          state_id: applicantDetail?.state?.id,
          city_id: applicantDetail?.city?.id,
          zip_code: applicantDetail?.zip_code,
          source: applicantDetail?.source,
          referred_by: applicantDetail?.referred_by,
          expected_salary: applicantDetail?.expected_salary,
          availability_date: applicantDetail?.availability_date,
          status: applicantDetail?.status,
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
    setErrors((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };

  const handleSelect = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "job_opening_name") {
      setErrors((prevData) => ({
        ...prevData,
        job_opening_name: false,
      }));
    }
    if (name === "country") {
      setFormData((prevData) => ({
        ...prevData,
        country_id: value,
      }));
      fetchState("", value);
    }
    if (name === "state") {
      setFormData((prevData) => ({
        ...prevData,
        state_id: value,
      }));
      fetchCity("", value);
    }
    if (name === "city") {
      setFormData((prevData) => ({
        ...prevData,
        city_id: value,
      }));
    }
    if (name === "source") {
      setFormData((prevData) => ({
        ...prevData,
        source: value,
        referred_by: value === "Referral" ? prevData.referred_by : "",
      }));
    }
  };

  const handleDateChange = (name, date) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newErrors = {
      name: formData?.name ? false : true,
      email: formData?.email ? false : true,
      mobile_no: formData?.mobile_no ? false : true,
      job_opening_name: formData?.job_opening_name ? false : true,
      resume: formData?.resume && formData?.resume.length > 0 ? false : true,
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
      dispatch(createNewApplicant(formDataToSubmit, navigate));
      // .then((res) => {
      //   if (res?.success) {
      //     setTimeout(() => {
      //       navigate("/all-job-list");
      //     }, 1500);
      //   }
      // })
      //   .catch((error) => {
      //   });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="error"
      />
      <div className="">
        <form onSubmit={handleSubmit}>
          <div id="form">
            <div className="from1">
              <div className="form-group">
                <label>
                  Full Name<b className="color_red">*</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  style={{ border: errors?.name ? "1px solid red" : "" }}
                />
                {errors?.name && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Fill Full Name
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>
                  Email ID<b className="color_red">*</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Email ID"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                  style={{ border: errors?.email ? "1px solid red" : "" }}
                />
                {errors?.email && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Fill Email
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>
                  Contact Number<b className="color_red">*</b>
                </label>
                <input
                  type="number"
                  placeholder="Enter Contact Number"
                  name="mobile_no"
                  value={formData?.mobile_no}
                  onChange={handleChange}
                  style={{ border: errors?.mobile_no ? "1px solid red" : "" }}
                />
                {errors?.mobile_no && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Fill Contact Number
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>
                  Job Opening<b className="color_red">*</b>
                </label>
                <SelectDropdown
                  selectedValue={formData?.job_opening_name}
                  options={jobLists?.map((item) => ({
                    id: item?.id,
                    name: item?.job_title,
                  }))}
                  placeholder="Select Job Opening"
                  onSelect={handleSelect}
                  searchPlaceholder="Search Job Opening"
                  handleSearch={handleSearch}
                  type="job_opening_name"
                  loading={jobData?.loading}
                  showSearchBar={true}
                  className={
                    errors?.job_opening_name ? "select-dropdown-error" : ""
                  }
                />
                {errors?.job_opening_name && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Select Job Opening
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>
                  Resume<b className="color_red">*</b>
                </label>
                <ResumeUpload
                  formData={formData}
                  setFormData={setFormData}
                  fieldName="resume"
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                  setErrors={setErrors}
                  errors={errors}
                  className={errors?.resume ? "1px solid red" : ""}
                />
                {errors?.resume && (
                  <p className="error_message" style={{ whiteSpace: "nowrap" }}>
                    {otherIcons.error_svg}
                    Please Upload Resume
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>Cover Letter</label>
                <ResumeUpload
                  formData={formData}
                  setFormData={setFormData}
                  fieldName="cover_letter"
                  isUploading={isUploading2}
                  setIsUploading={setIsUploading2}
                  setErrors={setErrors}
                  errors={errors}
                />
              </div>

              {/* Country Dropdown with Search */}
              <div className="form-group">
                <label>Country/Region</label>
                <SelectDropdown
                  selectedValue={formData?.country_id}
                  options={countryLists?.map((item) => ({
                    id: item?.id,
                    name: item?.name,
                  }))}
                  placeholder="Select Country"
                  onSelect={handleSelect}
                  searchPlaceholder="Search country"
                  handleSearch={handleSearch}
                  type="country"
                  loading={countryData?.loading}
                  showSearchBar={true}
                  className={""}
                />
              </div>

              {/* State Dropdown with Search */}
              <div className="form-group">
                <label>State</label>
                <SelectDropdown
                  selectedValue={formData?.state_id}
                  options={stateLists?.map((item) => ({
                    id: item?.id,
                    name: item?.name,
                  }))}
                  placeholder="Select State"
                  onSelect={handleSelect}
                  searchPlaceholder="Search state"
                  handleSearch={handleSearch}
                  type="state"
                  loading={stateData?.loading}
                  showSearchBar={true}
                  className={""}
                />
              </div>

              {/* City Dropdown with Search */}
              <div className="form-group">
                <label>City</label>
                <SelectDropdown
                  selectedValue={formData?.city_id}
                  options={cityLists?.map((item) => ({
                    id: item?.id,
                    name: item?.name,
                  }))}
                  placeholder="Select City"
                  onSelect={handleSelect}
                  searchPlaceholder="Search city"
                  handleSearch={handleSearch}
                  type="city"
                  loading={cityData?.loading}
                  showSearchBar={true}
                  className={""}
                />
              </div>

              <div className="form-group">
                <label>Zip Code</label>
                <input
                  type="number"
                  placeholder="Enter Zip Code"
                  name="zip_code"
                  value={formData?.zip_code}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Source</label>
                <SelectDropdown
                  selectedValue={formData?.source}
                  options={sourceOfHireOptions?.map((item, index) => ({
                    id: index,
                    name: item,
                  }))}
                  placeholder="Select Source"
                  onSelect={handleSelect}
                  searchPlaceholder="Search..."
                  handleSearch={handleSearch}
                  type="source"
                  loading={false}
                  showSearchBar={false}
                // className={errors?.source ? "select-dropdown-error" : ""}
                />
              </div>

              <div className="form-group">
                <label>Expected Salary</label>
                <input
                  type="number"
                  placeholder="Enter Expected Salary"
                  name="expected_salary"
                  value={formData?.expected_salary}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <DatePicker
                  label="Availability Date"
                  onDateChange={handleDateChange}
                  initialDate={formData?.availability_date}
                  type="availability_date"
                />
              </div>
              {formData?.source == "Referral" && (
                <div className="form-group">
                  <label>Referred Person</label>
                  <input
                    type="text"
                    placeholder="Enter Referred Person"
                    name="referred_by"
                    value={formData?.referred_by}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
          </div>
          <SubmitButton loading={createUpdateApplicant?.loading} navigate={"/applicant_list"} nextSubmit="" showNext={false} id={id} />
        </form>
      </div>
    </>
  );
};

export default AddNewApplicantForm;
