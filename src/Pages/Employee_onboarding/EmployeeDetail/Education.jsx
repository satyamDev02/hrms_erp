// Education.js
import React from "react";
import { formatDate3 } from "../../../utils/common/DateTimeFormat";
import NoDataFound from "../../../utils/common/NoDataFound";
import TableViewSkeleton from "../../../utils/common/TableViewSkeleton";

const Education = ({ employeeData, employeeLoading }) => {
  return (
    <div>
      <div className="education">
        <table>
          <thead>
            <tr>
              <th>INSTITUTE NAME</th>
              <th>DEGREE</th>
              <th>SPECIALIZATION</th>
              <th>FROM DATE</th>
              <th>TO DATE</th>
            </tr>
          </thead>
          <tbody>
            {employeeLoading ? (
              <TableViewSkeleton />
            ) : (
              <>
                {employeeData?.length > 0 ? (
                  employeeData.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.institute_name || "-"}</td>
                      <td>{item?.degree || "-"}</td>
                      <td>{item?.specialization || "-"}</td>
                      <td>{formatDate3(item?.from_date) || "-"}</td>
                      <td>{formatDate3(item?.to_date) || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                        <td colSpan="7" className="not_found_td">
                      <NoDataFound />
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Education;
