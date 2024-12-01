import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { otherIcons } from "../../../components/Helper/icons";
import { getTodayLeaveList } from "../../../Redux/Actions/leaveActions";
import { formatDate, formatDate3 } from "../../../utils/common/DateTimeFormat";

const EmpOnLeave = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Data from redux
  const empOnLeaveData = useSelector((state) => state?.todayEmpOnLeave);
  const employeeLists = empOnLeaveData?.data?.onLeave || [];
  const totalItems = empOnLeaveData?.data?.total_count || 0;
  const employeeListLoading = empOnLeaveData?.loading || false;

  console.log("employeeLists", employeeLists);
  const fetchEmpOnLeaveList = () => {
    const sendData = {};
    dispatch(getTodayLeaveList(sendData));
  };

  useEffect(() => {
    fetchEmpOnLeaveList();
  }, []);

  const handleOpenDetails = (item) => {
    navigate(`/leave-details/${item?.id}`);
  };

  return (
    <div className="Right_cart">
      <div className="employeesOnLeave">
        <div className="newEmployee">
          <div className="header_newEmp">
            <div className="number_new_hire">
              <h3> Employees On Leave </h3>
              <div>
                <p>{formatDate(new Date())}</p>
              </div>
            </div>
            <button onClick={() => navigate("/all-leave")}>See All</button>
          </div>
          <div className="top_border"></div>
          <div className="Emp">
            {employeeLists?.length > 0 ? (
              employeeLists?.slice(0, 4)?.map((item, index) => (
                <div key={index} className="div_dob">
                  <div className="img_dob_name">
                    {/* <img src={emp.Image} alt={emp.name} /> */}
                    <div>
                      <h3>{item.name || "-"}</h3>

                      <p>
                        {formatDate3(item?.from_date) +
                          " " +
                          "to" +
                          " " +
                          formatDate3(item?.to_date) || "-"}
                      </p>
                      <div>
                        <p className="content_dot_red">
                          {" "}
                          {item?.leave_type_name || "-"}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span onClick={() => handleOpenDetails(item)}>
                    {otherIcons.right_arrow_svg}
                  </span>
                </div>
              ))
            ) : (
              <h4
                style={{
                  textAlign: "center",
                  marginTop: "120px",
                  fontWeight: 200,
                }}
              >
                No Employee On Leave
              </h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpOnLeave;
