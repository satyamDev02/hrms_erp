import "../../EmployeeHealth/EmployeeHealthDetails.scss";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../../components/Helper/icons";
import { formatDate3 } from "../../../utils/common/DateTimeFormat";

const EmployeeHealthDetails = ({ employeeData, employeeLoading }) => {
  return (
    <div className="details">
      <div className="info-cards">
        <div className="card">
          <div className="top_head">
            {" "}
            <h3>
              {" "}
              <span>{otherIcons.details_information}</span>
              Employee Information
            </h3>
          </div>
          <div className="contentInformation">
            <div>
              <h4>Department </h4>
              <p>{employeeData?.department_head || "-"}</p>
            </div>

            <div>
              <h4>Mobile no.</h4>
              <p>{employeeData?.mobile_no || "-"}</p>
            </div>
            <div>
              <h4>Gender</h4>
              <p>{employeeData?.gender || "-"}</p>
            </div>
            <div>
              <h4>Weight</h4>
              <p>{employeeData?.weight ? employeeData?.weight + " kg" : "-"}</p>
            </div>
            <div>
              <h4>Height</h4>
              <p>{employeeData?.height ? employeeData?.height + " cm" : "-"}</p>
            </div>
            <div>
              <h4>Blood group</h4>
              <p>{employeeData?.blood_group || "-"}</p>
            </div>
          </div>
          <div id="DescriptionJOB">
            <h4>Notes</h4>
            <p className="paragra">{employeeData?.notes || "-"}</p>
          </div>
        </div>
        <div className="card">
          <div className="top_head">
            {" "}
            <h3>
              {" "}
              <span>{otherIcons.details_information}</span>
              Health Information
            </h3>
          </div>
          <div className="Health_Information">
            <div>
              <h4>Overall Health Status</h4>
              <p>{employeeData?.checkup_result || "-"}</p>
            </div>
            <div>
              <h4>Last Health Check Date</h4>
              <p>{formatDate3(employeeData?.last_checkup_date) || "-"}</p>
            </div>
            <div>
              <h4>Next Health Check Date</h4>
              <p>{formatDate3(employeeData?.next_checkup_date) || "-"}</p>
            </div>
            <div>
              <h4>Allergies</h4>
              <p>{employeeData?.allergies || "-"}</p>
            </div>
            <div>
              <h4>Chronic Conditions</h4>
              <p>{employeeData?.chronic_condition || "-"}</p>
            </div>
            <div>
              <h4>Covid affected :</h4>
              <p>{employeeData?.covid_affected || "-"}</p>
            </div>
            <div>
              <h4>Emergency Contact Name</h4>
              <p>{employeeData?.contact_name || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHealthDetails;
