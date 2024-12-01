import React from "react";
import { otherIcons } from "../../../components/Helper/icons";
import { formatDate, formatDate3 } from "../../../utils/common/DateTimeFormat";
import Loader03 from "../../../utils/common/Loader03";
import NoDataFound from "../../../utils/common/NoDataFound";
import "./EmployeeDetails.scss";

const Experience = ({ employeeData, employeeLoading }) => {
 
  return (
    <div>
     
        {employeeLoading ? (
          <Loader03 />
        ) : (
          <>
            {employeeData?.length > 0 ? (
              employeeData.map((item, index) => (
                <div className="experience-grid">
                <div className="experience-card" key={index}>
                  <div className="logo_title">
                    {otherIcons.employee_experience_svg}
                    <div>
                      <h3>{item?.job_title || "-"}</h3>
                      <p>
                        {formatDate3(item?.from_date) || "-"} -{" "}
                        {formatDate3(item?.to_date) || "-"}
                      </p>
                    </div>
                  </div>
                  <h3>{item?.company_name || "-"}</h3>
                  <p>{item?.description || "-"}</p>
                  <button>{item?.job_title || "-"}</button>
                </div>
                </div>
              ))
            ) : (
              <>
                <NoDataFound />
               
              </>
            )}
          </>
        )}
 
    </div>
  );
};

export default Experience;
