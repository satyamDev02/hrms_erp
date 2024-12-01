const Contacts = ({ employeeData }) => {
  const presentAddress =
    employeeData.find((contacts) => contacts.address_type === "Present") || {};
  const permanentAddress =
    employeeData.find((contacts) => contacts.address_type === "Permanent") ||
    {};

  return (
    <>
      <div className="info_cardsEmp">
        {/* Present Address Card */}
        <div className="card">
          <div className="top_head">
            <h3>
              <span></span>Present Address
            </h3>
          </div>
          {presentAddress && (
            <div className="contentInformation">
              <div>
                <h4>Country</h4>
                <p>{presentAddress?.country?.name || "-"}</p>
              </div>
              <div>
                <h4>State</h4>
                <p>{presentAddress?.state?.name || "-"}</p>
              </div>
              <div>
                <h4>City</h4>
                <p>{presentAddress?.city?.name || "-"}</p>
              </div>
              <div>
                <h4>Street 1</h4>
                <p>{presentAddress?.street_1 || "-"}</p>
              </div>
              <div>
                <h4>Street 2</h4>
                <p>{presentAddress?.street_2 || "-"}</p>
              </div>
              <div>
                <h4>Zip Code</h4>
                <p>{presentAddress?.zip_code || "-"}</p>
              </div>
              <div>
                <h4>Personal Contact</h4>
                <p>{presentAddress?.personal_contact_no || "-"}</p>
              </div>
              <div>
                <h4>Emergency Contact</h4>
                <p>{presentAddress?.emergency_contact_no || "-"}</p>
              </div>
              <div>
                <h4>Personal Email</h4>
                <p>{presentAddress?.personal_email_id || "-"}</p>
              </div>
            </div>
          )}
        </div>

        {/* Permanent Address Card */}
        <div className="card card222">
          <div className="top_head">
            <h3>
              <span></span>Permanent Address
            </h3>
          </div>
          <div className="contentInformation">
            <div>
              <h4>Country</h4>
              <p>{permanentAddress?.country?.name || "-"}</p>
            </div>
            <div>
              <h4>State</h4>
              <p>{permanentAddress?.state?.name || "-"}</p>
            </div>
            <div>
              <h4>City</h4>
              <p>{permanentAddress?.city?.name || "-"}</p>
            </div>
            <div>
              <h4>Street 1</h4>
              <p>{permanentAddress?.street_1 || "-"}</p>
            </div>
            <div>
              <h4>Street 2</h4>
              <p>{permanentAddress?.street_2 || "-"}</p>
            </div>
            <div>
              <h4>Zip Code</h4>
              <p>{permanentAddress?.zip_code || "-"}</p>
            </div>
            <div>
              <h4>Personal Contact</h4>
              <p>{permanentAddress?.personal_contact_no || "-"}</p>
            </div>
            <div>
              <h4>Emergency Contact</h4>
              <p>{permanentAddress?.emergency_contact_no || "-"}</p>
            </div>
            <div>
              <h4>Personal Email</h4>
              <p>{permanentAddress?.personal_email_id || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
