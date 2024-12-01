import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { HiUserPlus } from "react-icons/hi2";
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAttendanceList, updateAttendanceStatus, } from "../../Redux/Actions/attendanceActions.js";
import { otherIcons } from "../../components/Helper/icons.jsx";
import { attendanceStatus } from "../../utils/Constant.js";
import { filterAttendanceOptions } from "../../utils/FilterConstant.js";
import ConfirmPopup from "../../utils/common/ConfirmPopup.jsx";
import DatePicker from "../../utils/common/DatePicker.jsx";
import { formatDate2, formatDate3 } from "../../utils/common/DateTimeFormat.jsx";
import FilterByStatus from "../../utils/common/FilterByStatus.jsx";
import NoDataFound from "../../utils/common/NoDataFound.jsx";
import { OutsideClick } from "../../utils/common/OutsideClick.jsx";
import Pagination from "../../utils/common/Pagination.jsx";
import SearchBox from "../../utils/common/SearchBox.jsx";
import TableViewSkeleton from "../../utils/common/TableViewSkeleton.jsx";
import AddNewAttendanceForm from "./AddNewAttendanceForm.jsx";
import "./AttendanceList.scss";

const AllAttendanceList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //data from redux
  const attendanceData = useSelector((state) => state?.attendanceList);
  const attendanceLists = attendanceData?.data?.result || [];
  const totalItems = attendanceData?.data?.total_count || 0;
  const attendanceLoading = attendanceData?.loading || false;

  const importDropDown = OutsideClick();
  const statusDropDown = OutsideClick();
  const newAttendancePopup = OutsideClick();

  //update status in list
  const [isOpen, setIsOpen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusObj, setStatusOj] = useState({});

  const handleUpdateStatus = () => {
    const sendData = {
      id: statusObj?.id,
      status: statusObj?.status,
    };
    dispatch(updateAttendanceStatus(sendData))
      .then((res) => {
        if (res.success) {
          dispatch(getAttendanceList());
          setShowModal(false);
        }
      })
      .catch((error) => {
        setShowModal(false);
        console.log("error-", error);
      });
  };
  const handleStatusChange = (id, status) => {
    setStatusOj({ id: id, status: status });
    setIsOpen(null);
    setShowModal(true);
  };
  //update status in list
  //check box click
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (rowId) => {
    setSelectedRows((prevRows) =>
      prevRows.includes(rowId)
        ? prevRows.filter((id) => id !== rowId)
        : [...prevRows, rowId]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : attendanceLists?.map((row) => row.id));
  };
  //checkbox click

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  //pagination

  const handleRefresh = () => {
    setStatus("");
    setSelectedSortBy2("all");
    setSearchTermFromChild("");
    setSpecificDate(null);
    setDateRange([{ startDate: null, endDate: null }]);
    setClearFilter(true);
    setCurrentPage(1);
    setSearchTrigger((prev) => prev + 1);
  };

  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Set the file name in the state
    }
  };

  const [searchTrigger, setSearchTrigger] = useState(0);

  // reset current page to 1 when any filters are applied
  const resetPageIfNeeded = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

  // filter
  const [selectedSortBy2, setSelectedSortBy2] = useState("all");
  const [status, setStatus] = useState("");
  // filter

  //Search
  // useRef to store the debounce timeout ID
  const debounceTimeout = useRef(null);
  const [searchTermFromChild, setSearchTermFromChild] = useState("");
  //Search

  //date range picker
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [specificDate, setSpecificDate] = useState(null);
  const [clearFilter, setClearFilter] = useState(true);

  //date range picker

  const fetchAttendanceList = useCallback(async () => {
    try {
      const fy = localStorage.getItem("FinancialYear");
      const currentpage = currentPage;

      const sendData = {
        fy,
        noofrec: itemsPerPage,
        currentpage,
        // ...(selectedSortBy !== "Normal" && {
        //   sort_by: selectedSortBy,
        //   sort_order: sortOrder,
        // }),
        ...(status && {
          status: status,
        }),
        ...(searchTermFromChild && { search: searchTermFromChild }),
        ...(clearFilter === false && {
          ...(specificDate
            ? { custom_date: formatDate2(new Date(specificDate)) }
            : dateRange[0]?.startDate &&
              dateRange[0]?.endDate && {
                fromDate: formatDate2(new Date(dateRange[0].startDate)),
                toDate: formatDate2(new Date(dateRange[0].endDate)),
              }),
        }),
      };
      dispatch(getAttendanceList(sendData));
    } catch (error) {
      console.error("Error fetching attendance list:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    if (searchTrigger) fetchAttendanceList();
  }, [searchTrigger]);

  const onSearch = (term) => {
    resetPageIfNeeded();
    setSearchTermFromChild(term);
    if (term?.length > 0) {
      // Clear previous timeout if it exists
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      // Set a new debounce timeout
      debounceTimeout.current = setTimeout(() => {
        setSearchTrigger((prev) => prev + 1);
      }, 800);
    } else {
      if (searchTermFromChild === "") setSearchTrigger((prev) => prev + 1);
    }
  };

  // Cleanup timeout when component unmounts or search term changes
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current); // Clean up any pending timeouts
      }
    };
  }, []);

  const handleRowClicked = (item) => {
    navigate(`/attendance-details/${item?.id}`);
  };

  return (
    <div id="allEmp">
      {newAttendancePopup?.isOpen && (
        <AddNewAttendanceForm
          ClosePop={newAttendancePopup.handleToggle}
          refBox={newAttendancePopup?.ref}
          updateList={setSearchTrigger}
        />
      )}

      <ConfirmPopup
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleUpdateStatus}
        type="update"
        module="Status"
      />
      <div className="EmpOn_main_container">
        <div className="EmpOn_header">
          <div className="top-bar">
            <h2>
              <div className="span">
                <HiUserPlus />
              </div>
              All Attendance list <p>{totalItems} total</p>
            </h2>
            <div className="Emp_Head_Right">
              <div
                className="addEmp"
                onClick={newAttendancePopup?.handleToggle}
                ref={newAttendancePopup.buttonRef}
              >
                <p>
                  <span>
                    <IoMdAdd />
                  </span>{" "}
                  Add New Attendance
                </p>
              </div>
              <div
                className="menu_head"
                onClick={importDropDown.handleToggle}
                ref={importDropDown.buttonRef}
              >
                <div className="div_top">
                  <CiMenuKebab />
                </div>
                <div
                  className={`bottom_import ${
                    !importDropDown?.isOpen ? "bottom_import_hide" : ""
                  }`}
                  ref={importDropDown.buttonRef}
                >
                  {fileName ? "" : <AiOutlineCloudUpload />}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {fileName ? fileName : "Uploaded File"}
                </div>
              </div>
            </div>
            <div className="_div">
              <span className="1"></span>
              <span className="2"></span>
              <span className="3"></span>
              <span className="4"></span>
              <span className="5"></span>
              <span className="6"></span>
              <span className="7"></span>
              <span className="8"></span>
              <span className="9"></span>
              <span className="10"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="Overview">
        <h2>Overview</h2>
        <div className="Overview4">
          <div className="Overview_box">
            <div className="Overview_Left">
              <span className="icon">{otherIcons.overview_svg}</span>
            </div>
            <div className="Overview_Right">
              <p>TOTAL EMPLOYEE</p>
              <h3>{attendanceData?.data?.total_employee || "0"}</h3>
            </div>
          </div>
          <div className="Overview_box">
            <div className="Overview_Left">
              <span className="icon">{otherIcons.present_svg}</span>
            </div>
            <div className="Overview_Right">
              <p>PRESENT</p>
              <h3>{attendanceData?.data?.today_present || "0"}</h3>
              <p>Today</p>
            </div>
          </div>
          <div className="Overview_box">
            <div className="Overview_Left">
              <span className="icon">{otherIcons.absent_svg}</span>
            </div>
            <div className="Overview_Right">
              <p>ABSENT</p>
              <h3>{attendanceData?.data?.today_absent || "0"}</h3>
              <p>Today</p>
            </div>
          </div>
          <div className="Overview_box">
            <div className="Overview_Left">
              <span className="icon">{otherIcons.half_day_svg}</span>
            </div>
            <div className="Overview_Right">
              <p>HALFDAY</p>
              <h3>{attendanceData?.data?.today_halfday || "0"}</h3>
              <p>Today</p>
            </div>
          </div>
        </div>
      </div>
      <div className="EmpOn_Second_Head">
        <FilterByStatus
          setStatus={setStatus}
          selectedSortBy={selectedSortBy2}
          setSearchTrigger={setSearchTrigger}
          setSelectedSortBy={setSelectedSortBy2}
          filterOptions={filterAttendanceOptions}
          resetPageIfNeeded={resetPageIfNeeded}
        />

        <div className="right">
          <div className="refresh divRight" onClick={handleRefresh}>
            <div className="div_box">
              <span id="reload_data_page">{otherIcons.refresh_svg}</span>
            </div>
          </div>
          <SearchBox
            onSearch={onSearch}
            placeholder="Search Employee Name, Date, Shift..."
          />
          <div className="filter divRight">
            <DatePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
              setSpecificDate={setSpecificDate}
              setClearFilter={setClearFilter}
              setSearchTrigger={setSearchTrigger}
              resetPageIfNeeded={resetPageIfNeeded}
            />
          </div>
        </div>
      </div>
      {/* All Employee  List*/}
      <div className="allEmployeeList">
        {/* <div className="head">
                </div> */}
        <div className="employee-table">
          {attendanceLoading ? <TableViewSkeleton /> :
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>
                    {" "}
                    <div>
                      Employee Name
                      <div className="short_ascending_designation">
                        <div className="ascending">
                          {otherIcons.down_arrow_svg}
                        </div>
                        <div className="designation">
                          {otherIcons.up_arrow_svg}
                        </div>
                      </div>
                    </div>
                  </th>
                  <th>Date</th>
                  <th>Shift</th>
                  <th>Punch in</th>
                  <th>Punch out</th>
                  <th>Total Hours Worked</th>
                  {/* <th>Overtime</th> */}
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {attendanceLists?.length >= 1 ? (
                    attendanceLists.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item?.id)}
                            onChange={() => handleCheckboxChange(item?.id)}
                          />
                        </td>
                        <td
                          className="td"
                          onClick={() => handleRowClicked(item)}
                        >
                          {item?.employee?.first_name +
                            "-" +
                            item?.employee?.last_name || "-"}
                        </td>
                        <td
                          className="td"
                          onClick={() => handleRowClicked(item)}
                        >
                          {formatDate3(item?.date) || "-"}
                        </td>
                        <td
                          className="td"
                          onClick={() => handleRowClicked(item)}
                        >
                          {item?.shift_name || "-"}
                        </td>
                        <td
                          className="td"
                          onClick={() => handleRowClicked(item)}
                        >
                          {item?.punch_in || "-"}
                        </td>
                        <td
                          className="td"
                          onClick={() => handleRowClicked(item)}
                        >
                          {item?.punch_out || "-"}
                        </td>
                        <td
                          className="td"
                          onClick={() => handleRowClicked(item)}
                        >
                          {item?.total_hours_worked || "-"}
                        </td>
                        {/* <td
                          className="td"
                          onClick={() => handleRowClicked(item)}
                        >
                          {item?.overtime || "-"}
                        </td> */}

                        <td>
                          <div className="status-dropdown">
                            <div key={index} className="status-container">
                              <div ref={statusDropDown.buttonRef}>
                                <div
                                  className={`status-display ${item?.status == 0
                                    ? "present"
                                    : item?.status == 1
                                      ? "absent"
                                      : item?.status == 2
                                        ? "half-day"
                                        : ""
                                    }`}
                                  onClick={() =>
                                    setIsOpen(isOpen === index ? null : index)
                                  }
                                >
                                  <span
                                    className={`left_dot ${item?.status == 0
                                      ? "present"
                                      : item?.status == 1
                                        ? "absent"
                                        : item?.status == 2
                                          ? "half-day"
                                          : ""
                                      }`}
                                  ></span>
                                  <div>
                                    <div className="">
                                      {item?.status == 0
                                        ? "Present"
                                        : item?.status == 1
                                          ? "Absent"
                                          : item?.status == 2
                                            ? "Half-Day"
                                            : ""}
                                    </div>
                                    <div className="^wdown">
                                      {isOpen === index && isOpen !== null ? (
                                        <IoIosArrowUp />
                                      ) : (
                                        <IoIosArrowDown />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <>
                                {isOpen === index && (
                                  <div
                                    className="status-options"
                                    ref={statusDropDown.ref}
                                  >
                                    {attendanceStatus?.map((status, index) => (
                                      <div
                                        key={index}
                                        className="status-option"
                                        onClick={() =>
                                          handleStatusChange(
                                            item?.id,
                                            status?.value
                                          )
                                        }
                                      >
                                        {status?.label}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                        <td colSpan="8" className="not_found_td">
                        <NoDataFound />
                      </td>
                    </tr>
                  )}
                </>
              
              </tbody>
            </table>
          }
        </div>
        <Pagination
          itemList={totalItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setSearchCall={setSearchTrigger}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="error"
        />
      </div>
    </div>
  );
};

export default AllAttendanceList;
