import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmployeeList } from "../../../Redux/Actions/employeeActions";
import { dummyImageUrl } from "../../../utils/Constant";

const NewEmp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Data from redux
  const employeeData = useSelector((state) => state?.employeeList);
  const employeeLists = employeeData?.data?.result || [];
  const totalItems = employeeData?.data?.count || 0;
  const employeeListLoading = employeeData?.loading || false;

  const fetchEmpList = () => {
    const sendData = {};
    dispatch(getEmployeeList(sendData));
  };

  useEffect(() => {
    fetchEmpList();
  }, []);

  return (
    <div className="center_Cart">
      <div className="newEmployee employeesOnLeave">
        <div className="header_newEmp">
          <div className="number_new_hire">
            <h3>New Employees </h3>
            <div>
              {/* <h2>04</h2> */}
              <h3>New Hires</h3>
            </div>
          </div>
          <button onClick={() => navigate("/all-employee-list")}>
            See All
          </button>
        </div>
        <div className="top_border"></div>
        <div className="Emp">
          {employeeLists?.length > 0 ? (
            employeeLists?.map((item, index) => {
              let imageUrl = dummyImageUrl;
              let parsedImage = [];

              try {
                parsedImage = item?.image ? JSON.parse(item?.image) : [];
              } catch (error) {
                console.error("Failed to parse JSON:", item?.image, error);
              }

              imageUrl =
                parsedImage?.length > 0 ? parsedImage[0]?.url : dummyImageUrl;

              return (
                <div key={index} className="div_dob">
                  <div className="img_dob_name">
                    <img src={imageUrl} alt={item.name} />
                    <div>
                      <h3>
                        {item?.first_name || "-"} {item?.last_name || "-"}
                      </h3>
                      <p> {item?.department?.department_name || "-"}</p>
                    </div>
                  </div>
                  <p>{item?.mobile_no || "-"}</p>
                </div>
              );
            })
          ) : (
            <h4
              style={{
                textAlign: "center",
                marginTop: "120px",
                fontWeight: 200,
              }}
            >
              No New Employee Hire
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewEmp;
