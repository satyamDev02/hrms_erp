import React, { useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineInsertChart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getHolidayList } from "../../../Redux/Actions/holidayActions";
import { formatDate, formatDate3 } from "../../../utils/common/DateTimeFormat";
import { Link } from "react-router-dom";
import { getAnnouncementList } from "../../../Redux/Actions/announcementActions";

const ListSection = () => {
  const dispatch = useDispatch();

  //Data from redux
  const holidayData = useSelector((state) => state?.holidayList);
  const holidayLists = holidayData?.data?.result || [];
  const holidayListLoading = holidayData?.loading || false;

  const announcementData = useSelector((state) => state?.announcementList);
  const announcementLists = announcementData?.data?.announcement || [];
  const totalItems = announcementData?.data?.count || 0;
  const announcementLoading = announcementData?.loading || false;
  console.log("announcementLists", announcementLists);
  const fetchHolidayList = (search = "") => {
    const sendData = {};
    // if (search) {
    //   sendData["search"] = search;
    // }
    dispatch(getHolidayList(sendData));
  };

  const fetchAnnouncementList = (search = "") => {
    const sendData = {};
    // if (search) {
    //   sendData["search"] = search;
    // }
    dispatch(getAnnouncementList(sendData));
  };
  useEffect(() => {
    fetchHolidayList();
    fetchAnnouncementList();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="section upcoming-holidays ">
        <div className="header">
          <h3>Upcoming Holidays</h3>
          {/* <select>
            <option>This Month</option>
            <option>This Week</option>
          </select> */}
          <button onClick={() => navigate("/holiday")}>
            See All
          </button>
        </div>
        <ul>
          {holidayLists?.length > 0 ? (
            holidayLists?.slice(0, 3).map((item, index) => (
              <li key={item.id}>
                <div className="date">
                  {item?.from_date ? item.from_date.split("-")[0] : "-"}
                </div>
                <div className="details">
                  <h4>{item?.holiday_name || "-"}</h4>
                  <p>{item?.description || "-"}</p>
                </div>
                <span>{formatDate3(item?.from_date) || "-"}</span>
                {/* <Link to="/holiday" className="a">
                  View All
                </Link> */}
              </li>
            ))
          ) : (
            <h4
              style={{
                textAlign: "center",
                marginTop: "120px",
                fontWeight: 200,
              }}
            >
              No Upcoming Holiday
            </h4>
          )}
        </ul>
      </div>

      <div className="section announcements">
        <div className="header">
          <h3>Announcements</h3>
          {/* <select>
            <option>Today</option>
          </select> */}
             <button onClick={() => navigate("/announcements")}>
            See All
          </button>
        </div>
        <ul>
          {announcementLists?.length > 0 ? (
            announcementLists.slice(0, 3).map((item) => (
              <li key={item?.id}>
                <div className="icon">
                  <MdOutlineInsertChart />
                </div>
                <div className="details">
                  <h4>{item?.subject || "-"}</h4>
                  <p>{item?.description || "-"}</p>
                </div>
                <span>{formatDate(item?.created_at) || "-"}</span>
                {/* <Link to="/announcements" className="a">
                  View All
                </Link> */}
              </li>
            ))
          ) : (
            <h4
              style={{
                textAlign: "center",
                marginTop: "120px",
                fontWeight: 200,
              }}
            >
              No Announcement
            </h4>
          )}
        </ul>
      </div>

      <div className=" quick-links">
        <div className="header">
          <h3>Quick Links</h3>
          {/* <a href="#" className="seeAll">
            See All
          </a> */}
        </div>
        <ul>
          <li>
            <Link to="/all-job-list" className="a">
              Jobs
            </Link>

            <Link to="/add-job" className="add-job-link">
              <span className="add_avg">+</span>
            </Link>
          </li>
          <li>
            <Link to="/all-employee-list" className="a">
              {" "}
              Employees
            </Link>
            <Link to="/add-employee" className="add-job-link">
              <span className="add_avg">+</span>
            </Link>
          </li>
          <li>
            <Link to="/applicant_list" className="a">
              Applicants
            </Link>
            <Link to="/add_applicant" className="add-job-link">
              <span className="add_avg">+</span>
            </Link>
          </li>
          <li>
            <Link to="/project" className="a">
              Projects
            </Link>
            <Link to="/add-project" className="add-job-link">
              <span className="add_avg">+</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ListSection;
