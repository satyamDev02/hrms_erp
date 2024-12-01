import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { HiUserPlus } from "react-icons/hi2";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteAssignShift,
  getAssignShiftList,
} from "../../Redux/Actions/shiftActions";
import { otherIcons } from "../../components/Helper/icons";
import DatePicker from "../../utils/common/DatePicker";
import { formatDate2 } from "../../utils/common/DateTimeFormat";
import { OutsideClick } from "../../utils/common/OutsideClick";
import Pagination from "../../utils/common/Pagination";
import SearchBox from "../../utils/common/SearchBox";
import {
  getDatesForWeek,
  getFormattedDate,
  getStartOfWeek,
} from "../../utils/helper";
import "../Shift/ShiftList.scss";
import NewAssignShift from "./AddNewAssignShiftForm";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import NoDataFound from "../../utils/common/NoDataFound";

const Shift = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Data from Redux
  const assignShiftData = useSelector((state) => state?.assignShiftList);
  const assignShiftLists = assignShiftData?.data?.result || [];
  const totalItems = assignShiftData?.data?.count || 0;
  const shiftLoading = assignShiftData?.loading || false;

  const importDropDown = OutsideClick();
  const selectweekDropdown = OutsideClick();
  const newAssignShiftPopup = OutsideClick();

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
    setSelectedRows(selectAll ? [] : assignShiftLists?.map((row) => row.id));
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

  const fetchAssignShiftList = useCallback(async () => {
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
      dispatch(getAssignShiftList(sendData));
    } catch (error) {
      console.error("Error fetching assign shift list:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    if (searchTrigger) fetchAssignShiftList();
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

  // Function to calculate total working hours
  const calculateTotalHours = (shifts) => {
    return shifts?.reduce((total, shift) => {
      const startTime = new Date(`1970-01-01T${shift.start}:00`);
      const endTime = new Date(`1970-01-01T${shift.end}:00`);
      if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1); // Handle overnight shifts
      }
      const hours = (endTime - startTime) / 3600000; // Convert ms to hours
      return total + hours;
    }, 0);
  };

  const [startDate, setStartDate] = useState(getStartOfWeek(new Date()));

  // Handle date change and set the selected week's start date
  const handleDateChange = (newDate) => {
    const selectedStartDate = getStartOfWeek(new Date(newDate));
    setStartDate(selectedStartDate);
  };

  // Get the current week's dates
  const weekDates = getDatesForWeek(startDate);

  const today = new Date().toLocaleDateString();
  const [shiftData, setShiftData] = useState(null);

  // HandleDelete
  const [showModal, setShowModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);

  const handleDelete = (item) => {
    setSelectedShift(item);
    setShowModal(true);
  };

  const handleDeleteShift = () => {
    try {
      const sendData = {
        id: selectedShift?.id,
      };
      dispatch(deleteAssignShift(sendData)).then((res) => {
        if (res?.success) {
          setShowModal(false);
          dispatch(getAssignShiftList());
        }
      });
    } catch (err) {
      setShowModal(false);
      console.log("Error", err);
    }
  };
  const handleEditShift = (shift, item) => {
    const data = {
      id: item?.id,
      department_id: item?.department_id,
      user_id: item?.user_id,
      start_date: shift?.start_date,
      end_date: "null",
      shift_id: shift?.shift_id,
      start_time: shift?.start_time,
      end_time: shift?.end_time,
      shiftId: shift?.id,
    };
    setShiftData(data);
    newAssignShiftPopup.handleToggle();
  };

  const handleAssignShift = (item, date) => {
    const data = {
      id: "",
      department_id: item?.department_id,
      user_id: item?.user_id,
      start_date: getFormattedDate(date),
      end_date: "null",
      shift_id: "",
      start_time: "",
      end_time: "",
    };
    newAssignShiftPopup.handleToggle();
    setShiftData(data);
  };

  const handleAddShift = () => {
    const data = {
      department_id: "",
      user_id: "",
      start_date: getFormattedDate(new Date()),
      end_date: "null",
      shift_id: "",
      start_time: "",
      end_time: "",
    };
    newAssignShiftPopup.handleToggle();
    setShiftData(data);
  };

  return (
    <div id="allEmp">
      <ConfirmPopup
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteShift}
        type="delete"
        module="Assign Shift"
      />
      {newAssignShiftPopup.isOpen && (
        <NewAssignShift
          ClosePop={newAssignShiftPopup.handleToggle}
          updateList={setSearchTrigger}
          editData={shiftData}
        />
      )}

      <div className="EmpOn_main_container">
        <div className="EmpOn_header">
          <div className="top-bar">
            <h2>
              <div className="span">
                <HiUserPlus />
              </div>
              Daily Scheduling list <p>{totalItems} total</p>
            </h2>
            <div className="Emp_Head_Right">
              <div className="addEmp" onClick={handleAddShift}>
                <p>
                  <span>{otherIcons.employee_svg}</span> Assign shift
                </p>
              </div>

              {/* <div
                className="addEmp"
                style={{ marginLeft: "20px" }}
                onClick={() => navigate("/shift")}
              >
                <p>Shift List</p>
              </div> */}
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
                    !importDropDown.isOpen ? "bottom_import_hide" : ""
                  }`}
                  ref={importDropDown.ref}
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
      <div className="EmpOn_Second_Head">
        <div id=""></div>
        <div
          className={`left ${!"" ? "filterLeftOpen" : "filterLeftClose"}`}
        ></div>
        <div className="right">
          <div
            className="toggle_selectIcon divRight"
            onClick={selectweekDropdown.handleToggle}
            ref={selectweekDropdown.ref}
          >
            <div className="div_box">
              <span id="toggle_selectIcon">
                Select Week{" "}
                {!selectweekDropdown.isOpen ? (
                  <IoIosArrowDown />
                ) : (
                  <IoIosArrowUp />
                )}
              </span>
            </div>
            {selectweekDropdown.isOpen && (
              <div id="DateDropdowns" ref={selectweekDropdown.ref}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    onChange={(newDate) => handleDateChange(newDate)}
                  />
                </LocalizationProvider>
              </div>
            )}
          </div>
          <div className="refresh divRight" onClick={handleRefresh}>
            <div className="div_box">
              <span id="reload_data_page">{otherIcons.refresh_svg}</span>
            </div>
          </div>
          <SearchBox
            onSearch={onSearch}
            placeholder="Search Employee Name..."
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
        <div className="employee-table week_sift">
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
                <th className="stick stick2">
                  <div>
                    Scheduled Shift
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
                {weekDates.map((date, index) => (
                  <th
                    className="week_TD"
                    key={index}
                    style={{
                      backgroundColor:
                        today === date.toLocaleDateString()
                          ? "#730fad3d"
                          : "#946fb618",
                      color: "black",
                    }}
                  >
                    {`${date.toLocaleDateString("en-US", {
                      weekday: "short",
                    })} ${date.getDate()} ${
                      today === date.toLocaleDateString() ? "(Today)" : ""
                    }`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assignShiftLists?.length > 0 ? (
                assignShiftLists?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item?.id)}
                        onChange={() => handleCheckboxChange(item?.id)}
                      />
                    </td>
                    <td className="td stick">
                      <div className="pic_flex">
                        <div>
                          {`${item?.employee?.first_name || "-"} ${
                            item?.employee?.last_name || "-"
                          }` || "-"}{" "}
                          <br />
                          {item?.department?.department_name || "-"}
                        </div>
                      </div>
                    </td>
                    {weekDates.map((date, dateIndex) => {
                      const dateStr = getFormattedDate(date);

                      const shiftsForDate = item?.shifts?.filter(
                        (shift) =>
                          shift.start_date == dateStr &&
                          shift?.is_disabled === "0"
                      );
                      const totalHours = calculateTotalHours(shiftsForDate);

                      // Correct Date comparison logic
                      const todayDate = new Date(); // Today's date
                      todayDate.setHours(0, 0, 0, 0); // Set time to midnight to ignore time part
                      const compareDate = new Date(date); // Date to compare
                      compareDate.setHours(0, 0, 0, 0); // Set time to midnight to ignore time part

                      let cellColor = "black"; // Default future date color (black)
                      if (compareDate.getTime() < todayDate.getTime()) {
                        cellColor = "grey"; // Past date color (grey)
                      } else if (
                        compareDate.getTime() === todayDate.getTime()
                      ) {
                        cellColor = "green"; // Current date color (green)
                      }

                      return (
                        <td
                          className="sift_td "
                          key={dateIndex}
                          style={{
                            backgroundColor:
                              today === dateStr ? "#730fad0f" : "transparent",
                            color: cellColor, // Setting text color based on date comparison
                          }}
                        >
                          {shiftsForDate?.length > 0 ? (
                            <div
                              className="sift_hours_td"
                              style={{
                                border: `1px dashed ${cellColor}`,
                              }}
                            >
                              {shiftsForDate.map((shift, index) => (
                                <div key={index}>
                                  <div>Shift - {shift.shift_name || "-"}</div>
                                  <div>
                                    {`${shift.start_time || "-"} - ${
                                      shift?.end_time || "-"
                                    }`}
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "5px",
                                      marginTop: "5px",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    {/* Edit Icon */}
                                    <div
                                      onClick={() =>
                                        handleEditShift(shift, item)
                                      }
                                      style={{ cursor: "pointer" }}
                                    >
                                      {otherIcons.edit_svg2}
                                    </div>

                                    {/* Delete Icon */}
                                    <div
                                      onClick={() => handleDelete(shift)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      {otherIcons.delete_svg}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="week_sift_icon">
                              {compareDate.getTime() < todayDate.getTime() ? (
                                <span>{otherIcons.add_assign_shift_svg}</span>
                              ) : (
                                <span
                                  onClick={() =>
                                    handleAssignShift(item, compareDate)
                                  }
                                >
                                  {otherIcons.add_assign_shift_svg}
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="not_found_td">
                    <NoDataFound />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

export default Shift;
