import { useState, useEffect } from 'react';
import './AddEmloyee.scss';
import './NavbarForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCityList, getCountryList, getStateList } from '../../../Redux/Actions/locationActions.js';
import SelectDropdown from '../../../utils/common/SelectDropdown.jsx';
import { useRef } from 'react';
import SubmitButton from '../../../utils/common/SubmitButton.jsx';

const ContactsForm = ({ onSubmit, next, formData, setFormData, id }) => {

    const dispatch = useDispatch();
    const createUpdateEmployee = useSelector((state) => state?.createEmployee);

    // const countryData = useSelector((state) => state?.countryList);
    // const countryLists = countryData?.data?.country || [];

    // const stateData = useSelector((state) => state?.stateList);
    // const stateLists = stateData?.data?.country || [];

    // const cityData = useSelector((state) => state?.cityList);
    // const cityLists = cityData?.data?.country || [];

    const [presentCountryList, setPresentCountryList] = useState([]);
    const [permanentCountryList, setPermanentCountryList] = useState([]);
    const [presentStateList, setPresentStateList] = useState([]);
    const [permanentStateList, setPermanentStateList] = useState([]);
    const [presentCityList, setPresentCityList] = useState([]);
    const [permanentCityList, setPermanentCityList] = useState([]);

    useEffect(() => {
        fetchCountry("present");
        fetchCountry("permanent");
    }, []);

    // Fetch data based on current state
    // const fetchCountry = (search = "") => {
    //     const sendData = {};
    //     if (search) {
    //         sendData["search"] = search;
    //     }
    //     dispatch(getCountryList(sendData));
    // };

    const fetchCountry = (section, search = "") => {
        const sendData = search ? { search } : {};
        dispatch(getCountryList(sendData)).then((response) => {
            const countryList = response?.data?.country || [];
            if (section === "present") setPresentCountryList(countryList);
            if (section === "permanent") setPermanentCountryList(countryList);
        });
    };

    // const fetchState = (search = "", id = formData?.country_id) => {
    //     const sendData = {
    //         country_id: id
    //     };
    //     if (search) {
    //         sendData["search"] = search;
    //     }
    //     dispatch(getStateList(sendData));
    // };

    const fetchState = (section, search = "", countryId) => {
        const sendData = { country_id: countryId };
        if (search) sendData["search"] = search;
        dispatch(getStateList(sendData)).then((response) => {
            const stateList = response?.data?.country || [];
            if (section === "present") setPresentStateList(stateList);
            if (section === "permanent") setPermanentStateList(stateList);
        });
    };

    // const fetchCity = (search = "", id = formData?.state_id) => {
    //     const sendData = {
    //         state_id: id,
    //     };
    //     if (search) {
    //         sendData["search"] = search;
    //     }
    //     dispatch(getCityList(sendData));
    // };

    const fetchCity = (section, search = "", stateId) => {
        const sendData = { state_id: stateId };
        if (search) sendData["search"] = search;
        dispatch(getCityList(sendData)).then((response) => {
            const cityList = response?.data?.country || [];
            if (section === "present") setPresentCityList(cityList);
            if (section === "permanent") setPermanentCityList(cityList);
        });
    };

    const debounceTimeoutRef = useRef(null); // Store debounce timeout reference
    const handleSearch = (section, name, value) => {
        if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = setTimeout(() => {
            if (name === "country") fetchCountry(section, value);
            if (name === "state") fetchState(section, value, formData?.contacts[section === "present" ? 0 : 1]?.country_id);
            if (name === "city") fetchCity(section, value, formData?.contacts[section === "present" ? 0 : 1]?.state_id);
        }, 800);
    };

    const [sameAsPresent, setSameAsPresent] = useState(false);

    useEffect(() => {
    if (sameAsPresent) {
        setFormData((prevData) => {
            // Find Present and Permanent addresses
            const presentAddress = prevData.contacts.find(
                (contact) => contact.address_type === "Present"
            );
            const permanentAddressIndex = prevData.contacts.findIndex(
                (contact) => contact.address_type === "Permanent"
            );
            if (!presentAddress || permanentAddressIndex === -1) {
                console.error("Present or Permanent address not found");
                return prevData;
            }
            // Update only the Permanent address while keeping address_type and is_present_address unchanged
            const updatedContacts = prevData.contacts.map((contact, index) =>
                index === permanentAddressIndex
                    ? {
                          ...contact,
                          street_1: presentAddress?.street_1,
                          street_2: presentAddress?.street_2,
                          zip_code: presentAddress?.zip_code,
                          city_id: presentAddress?.city_id,
                          city_name: presentAddress?.city_name,
                          state_id: presentAddress?.state_id,
                          state_name: presentAddress?.state_name,
                          country_id: presentAddress?.country_id,
                          country_name: presentAddress?.country_name,
                          personal_contact_no: presentAddress?.personal_contact_no,
                          emergency_contact_no: presentAddress?.emergency_contact_no,
                          personal_email_id: presentAddress?.personal_email_id,
                          address_type: contact?.address_type, // Keep the original
                          is_present_address: contact?.is_present_address, // Keep the original
                      }
                    : contact
            );
            return {
                ...prevData,
                contacts: updatedContacts,
            };
        });
    }
}, [sameAsPresent]);


    // Helper function to update form data
    const updateContactField = (index, field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            contacts: prevData.contacts.map((contact, i) =>
                i === index ? { ...contact, [field]: value } : contact
            )
        }));
        if (field === "country_id") {
            const country = (index === 0) ? presentCountryList : permanentCountryList
            const selectedCountry = country?.find(item => item.id === value);
            if (selectedCountry) {
                setFormData((prevData) => ({
                    ...prevData,
                    contacts: prevData.contacts.map((contact, i) =>
                        i === index ? { ...contact, country_name: selectedCountry?.name } : contact
                    )
                }));
            }
        }
        if (field === "state_id") {
            const state = (index === 0) ? presentStateList : permanentStateList
            const selectedState = state?.find(item => item.id === value);
            if (selectedState) {
                setFormData((prevData) => ({
                    ...prevData,
                    contacts: prevData.contacts.map((contact, i) =>
                        i === index ? { ...contact, state_name: selectedState?.name } : contact
                    )
                }));
            }
        }
        if (field === "city_id") {
            const city = (index === 0) ? presentCityList : permanentCityList
            const selectedCity = city?.find(item => item.id === value);
            if (selectedCity) {
                setFormData((prevData) => ({
                    ...prevData,
                    contacts: prevData.contacts.map((contact, i) =>
                        i === index ? { ...contact, city_name: selectedCity?.name } : contact
                    )
                }));
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Determine if updating Present (index 0) or Permanent (index 1) address
        const isPermanent = name.startsWith("permanent");
        const field = isPermanent ? name.replace("permanent_", "").toLowerCase() : name;

        const index = isPermanent ? 1 : 0;
        updateContactField(index, field, value);
    };

    const handleSelect = (name, value) => {
        const isPermanent = name.startsWith("permanent");
        const field = isPermanent ? name.replace("permanent_", "").toLowerCase() : name;
        const index = isPermanent ? 1 : 0;

        updateContactField(index, field, value);

        // Trigger state or city list fetch if necessary
        if (field === "country_id") fetchState(isPermanent ? 'permanent' : 'present', "", value);
        if (field === "state_id") fetchCity(isPermanent ? 'permanent' : 'present', "", value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit(formData)
        setSameAsPresent(false);
    };

    const nextSubmit = (event) => {
        event.preventDefault();
        next(formData)
    }

    return (
        <>
            <div className="" onSubmit={handleSubmit}>
                <form >
                    <div id='form'>
                        <div className='div_heading'>
                            <h2>Present Address</h2>
                        </div>
                        <div className="from1">
                            <div className="form-group">
                                <label>Country/Region</label>
                                <SelectDropdown
                                    selectedValue={formData?.contacts[0]?.country_id}
                                    options={presentCountryList?.map((item) => ({
                                        id: item?.id,
                                        name: item?.name,
                                    }))}
                                    placeholder="Select Country"
                                    onSelect={(name, value) => handleSelect("country_id", value)}
                                    searchPlaceholder="Search country"
                                    handleSearch={(value, name) => handleSearch("present", name, value)}
                                    type="country"
                                    loading={false}
                                    showSearchBar={true}
                                    className={""}
                                    selectedName={formData?.contacts[0]?.country_name}
                                />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <SelectDropdown
                                    selectedValue={formData?.contacts[0]?.state_id}
                                    options={presentStateList?.map((item) => ({
                                        id: item?.id,
                                        name: item?.name,
                                    }))}
                                    placeholder="Select State"
                                    onSelect={(name, value) => handleSelect("state_id", value)}
                                    searchPlaceholder="Search state"
                                    handleSearch={(value, name) => handleSearch("present", name, value)}
                                    type="state"
                                    loading={false}
                                    showSearchBar={true}
                                    className={""}
                                    selectedName={formData?.contacts[0]?.state_name}
                                />
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <SelectDropdown
                                    selectedValue={formData?.contacts[0]?.city_id}
                                    options={presentCityList?.map((item) => ({
                                        id: item?.id,
                                        name: item?.name,
                                    }))}
                                    placeholder="Select City"
                                    onSelect={(name, value) => handleSelect("city_id", value)}
                                    searchPlaceholder="Search city"
                                    handleSearch={(value, name) => handleSearch("present", name, value)}
                                    type="city"
                                    loading={false}
                                    showSearchBar={true}
                                    className={""}
                                    selectedName={formData?.contacts[0]?.city_name}
                                />
                            </div>
                            <div className="form-group">
                                <label>Street 1</label>
                                <input
                                    type="text"
                                    placeholder="Enter street 1"
                                    name="street_1"
                                    value={formData?.contacts[0]?.street_1}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Street 2</label>
                                <input
                                    type="text"
                                    placeholder="Enter street 2"
                                    name="street_2"
                                    value={formData?.contacts[0]?.street_2}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Zip Code</label>
                                <input
                                    type="text"
                                    placeholder="Enter zip code"
                                    name="zip_code"
                                    value={formData?.contacts[0]?.zip_code}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="form-group">
                                <label>Personal Contact Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter personal contact number"
                                    name="personal_contact_no"
                                    value={formData?.contacts[0]?.personal_contact_no}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Emergency Contact Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter emergency contact number"
                                    name="emergency_contact_no"
                                    value={formData?.contacts[0]?.emergency_contact_no}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Personal Email ID</label>
                                <input
                                    type="email"
                                    placeholder="Enter personal email ID"
                                    name="personal_email_id"
                                    value={formData?.contacts[0]?.personal_email_id}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div id='form'>
                        <div className='div_heading' id='div_headingBit'>
                            <h2>Permanent Address</h2>
                            <div className='SameAddress'>
                                <input
                                    type="checkbox"
                                    checked={sameAsPresent}
                                    onChange={() => setSameAsPresent(prev => !prev)}
                                />
                                <p>Same as present address</p>
                            </div>
                        </div>
                        <div className="from1">
                            <div className="form-group">
                                <label>Country/Region</label>
                                <SelectDropdown
                                    selectedValue={formData?.contacts[1]?.country_id}
                                    options={permanentCountryList?.map((item) => ({
                                        id: item?.id,
                                        name: item?.name,
                                    }))}
                                    placeholder="Select Country"
                                    onSelect={(name, value) => handleSelect("permanent_country_id", value)}
                                    searchPlaceholder="Search country"
                                    handleSearch={(value, name) => handleSearch("permanent", name, value)}
                                    type="country"
                                    loading={false}
                                    showSearchBar={true}
                                    className={""}
                                    disabled={sameAsPresent}
                                    selectedName={formData?.contacts[1]?.country_name}
                                />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <SelectDropdown
                                    selectedValue={formData?.contacts[1]?.state_id}
                                    options={permanentStateList?.map((item) => ({
                                        id: item?.id,
                                        name: item?.name,
                                    }))}
                                    placeholder="Select State"
                                    onSelect={(name, value) => handleSelect("permanent_state_id", value)}
                                    searchPlaceholder="Search state"
                                    handleSearch={(value, name) => handleSearch("permanent", name, value)}
                                    type="state"
                                    loading={false}
                                    showSearchBar={true}
                                    className={""}
                                    disabled={sameAsPresent}
                                    selectedName={formData?.contacts[1]?.state_name}
                                />
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <SelectDropdown
                                    selectedValue={formData?.contacts[1]?.city_id}
                                    options={permanentCityList?.map((item) => ({
                                        id: item?.id,
                                        name: item?.name,
                                    }))}
                                    placeholder="Select City"
                                    onSelect={(name, value) => handleSelect("permanent_city_id", value)}
                                    searchPlaceholder="Search city"
                                    handleSearch={(value, name) => handleSearch("permanent", name, value)}
                                    type="city"
                                    loading={false}
                                    showSearchBar={true}
                                    className={""}
                                    disabled={sameAsPresent}
                                    selectedName={formData?.contacts[1]?.city_name}
                                />
                            </div>
                            <div className="form-group">
                                <label>Street 1</label>
                                <input
                                    type="text"
                                    placeholder="Enter street 1"
                                    name="permanent_street_1"
                                    value={formData?.contacts[1]?.street_1}
                                    onChange={handleChange}
                                    disabled={sameAsPresent}
                                />
                            </div>
                            <div className="form-group">
                                <label>Street 2</label>
                                <input
                                    type="text"
                                    placeholder="Enter street 2"
                                    name="permanent_street_2"
                                    value={formData?.contacts[1]?.street_2}
                                    onChange={handleChange}
                                    disabled={sameAsPresent}
                                />
                            </div>
                            <div className="form-group">
                                <label>Zip Code</label>
                                <input
                                    type="text"
                                    placeholder="Enter zip code"
                                    name="permanent_zip_code"
                                    value={formData?.contacts[1]?.zip_code}
                                    onChange={handleChange}
                                    disabled={sameAsPresent}
                                />
                            </div>
                            <div className="form-group">
                                <label>Personal Contact Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter personal contact number"
                                    name="permanent_personal_contact_no"
                                    value={formData?.contacts[1]?.personal_contact_no}
                                    onChange={handleChange}
                                    disabled={sameAsPresent}
                                />
                            </div>
                            <div className="form-group">
                                <label>Emergency Contact Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter emergency contact number"
                                    name="permanent_emergency_contact_no"
                                    value={formData?.contacts[1]?.emergency_contact_no}
                                    onChange={handleChange}
                                    disabled={sameAsPresent}
                                />
                            </div>
                            <div className="form-group">
                                <label>Personal Email ID</label>
                                <input
                                    type="email"
                                    placeholder="Enter personal email ID"
                                    name="permanent_personal_email_id"
                                    value={formData?.contacts[1]?.personal_email_id}
                                    onChange={handleChange}
                                    disabled={sameAsPresent}
                                />
                            </div>
                        </div>
                    </div>
                    < SubmitButton loading={createUpdateEmployee?.loading} navigate={"/all-employee-list"} nextSubmit={nextSubmit} showNext={true} id={id} />
                </form>
            </div>
            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="error"
            /> */}
        </>
    );
};

export default ContactsForm;
