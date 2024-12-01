import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { HiUserPlus } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getLeaveTypeList, updateLeaveTypeStatus } from "../../Redux/Actions/leaveMasterActions.js";
import { otherIcons } from "../../components/Helper/icons.jsx";
import { statusOptions } from "../../utils/Constant.js";
import { filterLeavesTypeOptions } from "../../utils/FilterConstant.js";
import ConfirmPopup from "../../utils/common/ConfirmPopup.jsx";
import DatePicker from "../../utils/common/DatePicker.jsx";
import { formatDate2 } from "../../utils/common/DateTimeFormat.jsx";
import FilterByStatus from "../../utils/common/FilterByStatus.jsx";
import NoDataFound from "../../utils/common/NoDataFound.jsx";
import { OutsideClick } from "../../utils/common/OutsideClick.jsx";
import Pagination from "../../utils/common/Pagination.jsx";
import SearchBox from "../../utils/common/SearchBox.jsx";
import TableViewSkeleton from "../../utils/common/TableViewSkeleton.jsx";
import AddLeaveType from "./AddLeaveType.jsx";
import "./LeaveTypeList.scss";

const LeaveTypeList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Data from Redux
  const leaveMasterData = useSelector((state) => state?.leaveMasterList);
  const leaveMasterLists = leaveMasterData?.data?.result || [];
  const totalItems = leaveMasterData?.data?.count || 0;
  const leaveMasterLoading = leaveMasterData?.loading || false;

  const importDropDown = OutsideClick();
  const statusDropDown = OutsideClick();
  const newLeaveTypePopup = OutsideClick();

  //update status in list
  const [isOpen, setIsOpen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusObj, setStatusOj] = useState({});

  const handleUpdateStatus = () => {
    const sendData = {
      id: statusObj?.id,
      status: statusObj?.status,
    };
    dispatch(updateLeaveTypeStatus(sendData))
      .then((res) => {
        if (res.success) {
          dispatch(getLeaveTypeList());
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
    setSelectedRows(selectAll ? [] : jobLists?.map((row) => row.id));
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

  const fetchLeavesTypeList = useCallback(async () => {
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
      dispatch(getLeaveTypeList(sendData));
    } catch (error) {
      console.error("Error fetching least type list:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    if (searchTrigger) fetchLeavesTypeList();
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
    navigate(`/leave_type_details/${item?.id}`);
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Initially 4 boxes shown
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    customPaging: (i) => (
      <div
        style={{
          width: i === currentSlide ? "1vw" : "1vw",
          height: "0.2vw",
          background: i === currentSlide ? "#400F6F" : "#e3d0f180",
          borderRadius: "0.7vw",
          transition: "all 2s ease",
          marginTop: i === currentSlide ? "0.9vw" : "1vw",
        }}
      />
    ),
    dotsClass: "slick-dots slick-thumb custom-dots",
    responsive: [
      {
        breakpoint: 1124, // Large screens (1024px and above)
        settings: {
          slidesToShow: 3, // Show 4 boxes
        },
      },
      {
        breakpoint: 888, // Medium screens (768px - 1024px)
        settings: {
          slidesToShow: 2, // Show 3 boxes
        },
      },
      {
        breakpoint: 640, // Tablet screens (640px - 768px)
        settings: {
          slidesToShow: 1.5, // Show 2 boxes
        },
      },
      {
        breakpoint: 480, // Mobile screens (below 640px)
        settings: {
          slidesToShow: 1, // Show 1 box
        },
      },
    ],
  };

  return (
    <div id="allEmp">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="error"
      />
      <ConfirmPopup
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleUpdateStatus}
        type="update"
        module="Status"
      />
      {newLeaveTypePopup?.isOpen && (
        <AddLeaveType
          ClosePop={newLeaveTypePopup.handleToggle}
          refBox={newLeaveTypePopup?.ref}
          updateList={setSearchTrigger}
        />
      )}
      <div className="EmpOn_main_container">
        <div className="EmpOn_header">
          <div className="top-bar">
            <h2>
              <div className="span">
                <HiUserPlus />
              </div>
              All Leave Type list <p>{totalItems} total</p>
            </h2>
            <div className="Emp_Head_Right">
              <div
                className="addEmp"
                onClick={newLeaveTypePopup.handleToggle}
                ref={newLeaveTypePopup.buttonRef}
              >
                <p>
                  <span>
                    <IoMdAdd />
                  </span>{" "}
                  Add New Leave
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
                  className={`bottom_import ${!importDropDown?.isOpen ? "bottom_import_hide" : ""
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
      {/* <div className="LeavesOverview">
        <h2>Overview</h2>
        {leaveMasterLists.filter((emp) => emp.status == 1).length > 3 ? (
          <div className="Overview_slide">
            <Slider {...settings}>
              <div className="Overview_box1">
                <div className="Overview_Top">
                  <p>Today Presents</p>
                  <span className="icon">{otherIcons.today_present_svg}</span>
                </div>
                <div className="Overview_Bottom">
                  <h3>28</h3>
                  <p>TOTAL EMPLOYEE</p>
                </div>
              </div>
              {leaveMasterLists
                .filter((emp) => emp.status == 1)
                .map((emp, index) => (
                  <div className="Overview_box1" key={index}>
                    <div className="Overview_Top">
                      <p>{emp.leave_type}</p>
                      <span className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          color="#9b9b9b"
                          fill="none"
                        >
                          <path
                            d="M3.07818 7.5C2.38865 8.85588 2 10.39 2 12.0148C2 17.5295 6.47715 22 12 22C17.5228 22 22 17.5295 22 12.0148C22 10.39 21.6114 8.85588 20.9218 7.5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <ellipse
                            cx="12"
                            cy="4"
                            rx="10"
                            ry="2"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7 10.5C7 9.67154 7.67157 8.99997 8.5 8.99997C9.32843 8.99997 10 9.67154 10 10.5M14 10.4999C14 9.67151 14.6716 8.99994 15.5 8.99994C16.3284 8.99994 17 9.67151 17 10.4999"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="Overview_Bottom">
                      <h3>{emp.available_days}</h3>
                      <p>Today</p>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        ) : (
          <div className="Overview_sl">
            <div className="Overview_box">
              <div className="Overview_Top">
                <p>Today Presents</p>
                <span className="icon">{otherIcons.today_present_svg}</span>
              </div>
              <div className="Overview_Bottom">
                <h3>28</h3>
                <p>TOTAL EMPLOYEE</p>
              </div>
            </div>
            {leaveMasterLists
              .filter((emp) => emp.status == 1)
              .map((emp, index) => (
                <div className="Overview_box" key={index}>
                  <div className="Overview_Top">
                    <p>{emp.leave_type}</p>
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#9b9b9b"
                        fill="none"
                      >
                        <path
                          d="M3.07818 7.5C2.38865 8.85588 2 10.39 2 12.0148C2 17.5295 6.47715 22 12 22C17.5228 22 22 17.5295 22 12.0148C22 10.39 21.6114 8.85588 20.9218 7.5"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <ellipse
                          cx="12"
                          cy="4"
                          rx="10"
                          ry="2"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7 10.5C7 9.67154 7.67157 8.99997 8.5 8.99997C9.32843 8.99997 10 9.67154 10 10.5M14 10.4999C14 9.67151 14.6716 8.99994 15.5 8.99994C16.3284 8.99994 17 9.67151 17 10.4999"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="Overview_Bottom">
                    <h3>{emp.available_days}</h3>
                    <p>Today</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div> */}
      <div className="EmpOn_Second_Head">
        <FilterByStatus
          setStatus={setStatus}
          selectedSortBy={selectedSortBy2}
          setSearchTrigger={setSearchTrigger}
          setSelectedSortBy={setSelectedSortBy2}
          filterOptions={filterLeavesTypeOptions}
          resetPageIfNeeded={resetPageIfNeeded}
        />
        <div className="right">
          <div className="refresh divRight" onClick={handleRefresh}>
            <div className="div_box">
              <span id="reload_data_page">{otherIcons.refresh_svg}</span>
            </div>
          </div>
          <SearchBox onSearch={onSearch} placeholder="Search Leave Type, Type, Available Days ..." />
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
        <div className="employee-table">
          {leaveMasterLoading ? (
            <TableViewSkeleton />
          ) :
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
                      Leave Type
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
                  <th> Type</th>
                  <th>Available Days</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {" "}
                  {leaveMasterLists?.length > 0 ? (
                    leaveMasterLists.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item?.id)}
                            onChange={() => handleCheckboxChange(item?.id)}
                          />
                        </td>
                        <td onClick={() => handleRowClicked(item)}>
                          {item?.leave_type || "-"}
                        </td>
                        <td onClick={() => handleRowClicked(item)}>
                          {item?.type_of_leave || "-"}
                        </td>
                        <td onClick={() => handleRowClicked(item)}>
                          {item?.available_days || "-"}
                        </td>
                        <td onClick={() => handleRowClicked(item)}>
                          {item?.description || "-"}
                        </td>
                        <td>
                          <div className="status-dropdown">
                            <div key={index} className="status-container">
                              <div ref={statusDropDown.buttonRef}>
                                <div
                                  className={`status-display ${item?.status == 0 ? "active" : "inactive"
                                    }`}
                                  onClick={() =>
                                    setIsOpen(isOpen === index ? null : index)
                                  }
                                >
                                  <span
                                    className={`left_dot ${item?.status == 0
                                      ? "active"
                                      : item?.status == 1
                                        ? "inactive"
                                        : ""
                                      }`}
                                  ></span>
                                  <div>
                                    <div className="EmpS">
                                      {item?.status == 0
                                        ? "Active"
                                        : item?.status == 1
                                          ? "Inactive"
                                          : ""}
                                    </div>
                                    <div className="^wdown">
                                      <MdOutlineKeyboardArrowDown />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {isOpen === index && (
                                <div
                                  className="status-options"
                                  ref={statusDropDown.ref}
                                >
                                  {statusOptions?.map((status) => (
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
                            </div>
                          </div>
                        </td>
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
      </div>
    </div>
  );
};

export default LeaveTypeList;
