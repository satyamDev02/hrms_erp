import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { HiUserPlus } from "react-icons/hi2";
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../components/Helper/icons";
import { getJobList, updateNewJobStatus } from "../../Redux/Actions/jobActions";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import DatePicker from "../../utils/common/DatePicker";
import { formatDate2 } from "../../utils/common/DateTimeFormat";
import FilterByStatus from "../../utils/common/FilterByStatus";
import NoDataFound from "../../utils/common/NoDataFound";
import { OutsideClick } from "../../utils/common/OutsideClick";
import Pagination from "../../utils/common/Pagination";
import SearchBox from "../../utils/common/SearchBox";
import TableViewSkeleton from "../../utils/common/TableViewSkeleton";
import { jobStatusOptions } from "../../utils/Constant";
import { filterJobOptions } from "../../utils/FilterConstant";
import "./JobList.scss";

const JobList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Data from redux
  const jobData = useSelector((state) => state?.jobList);
  const jobLists = jobData?.data?.job_opening || [];
  const totalItems = jobData?.data?.count || 0;
  const jobListLoading = jobData?.loading || false;
  const updateStatus = useSelector((state) => state?.updateJobStatus);
  const importDropDown = OutsideClick();
  const statusDropDown = OutsideClick();

  const handleAddNewJob = () => {
    navigate("/add-job");
  };

  const [isOpen, setIsOpen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusObj, setStatusOj] = useState({});

  const handleUpdateStatus = () => {
    const sendData = {
      job_id: statusObj?.id,
      job_status: statusObj?.status,
    };
    dispatch(updateNewJobStatus(sendData))
      .then((res) => {
        if (res.success) {
          dispatch(getJobList());
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

  const toggleDropdown = (i) => {
    setIsOpen((prev) => (prev == i ? null : i));
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // table select checkbox
  // const handleSelectAll = () => {
  //   setAllDel(!allDel);
  //   const updatedEmployees = filteredEmployees?.map((emp) => ({
  //     ...emp,
  //     isChecked: !selectAll,
  //   }));
  //   setFilteredEmployees(updatedEmployees);
  //   setSelectAll(!selectAll);
  // };

  // const handleCheckboxChange = (index) => {
  //   const updatedEmployees = [...filteredEmployees];
  //   updatedEmployees[index].isChecked = !updatedEmployees[index].isChecked;
  //   setFilteredEmployees(updatedEmployees);
  // };

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

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // refresh all page
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
      setFileName(file.name);
    }
  };

  const [searchTrigger, setSearchTrigger] = useState(0);

  // reset current page to 1 when any filters are applied
  const resetPageIfNeeded = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

  //sort from frontend
  const [sortOrder, setSortOrder] = useState("");
  const [sortedJobLists, setSortedJobLists] = useState([...jobLists]);

  useEffect(() => {
    const sortedList = [...jobLists].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.job_title.localeCompare(b.job_title);
      } else {
        return b.job_title.localeCompare(a.job_title);
      }
    });
    setSortedJobLists(sortedList);
  }, [sortOrder, jobLists]);

  // Toggle sorting order between ascending and descending
  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  //sort

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
  const fetchJobList = useCallback(async () => {
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
          job_status: status,
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
      dispatch(getJobList(sendData));
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    if (searchTrigger) fetchJobList();
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

  const handleRowClicked = (jobs) => {
    navigate(`/job-details/${jobs?.id}`);
  };

  return (
    <div id="allEmp">
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
              All Jobs list <p>{totalItems} total</p>
            </h2>
            <div className="Emp_Head_Right">
              <div className="addEmp" onClick={handleAddNewJob}>
                <p>
                  <span>
                    <IoMdAdd />
                  </span>{" "}
                  Add New Job
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
                  {fileName ? fileName : "import"}
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
        {/* <div className="left"> */}

        <FilterByStatus
          setStatus={setStatus}
          selectedSortBy={selectedSortBy2}
          setSearchTrigger={setSearchTrigger}
          setSelectedSortBy={setSelectedSortBy2}
          filterOptions={filterJobOptions}
          resetPageIfNeeded={resetPageIfNeeded}
        />
        {/* </div> */}
        <div className="right">
          <div className="refresh divRight" onClick={handleRefresh}>
            <div className="div_box">
              <span id="reload_data_page">{otherIcons.refresh_svg}</span>
            </div>
          </div>
          <SearchBox
            onSearch={onSearch}
            placeholder="Search Job, Department and Skill..."
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
        <div className="employee-table">
          {jobListLoading ? (
            <TableViewSkeleton />
          ) : (
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
                    <div>
                      Job Title
                      <div
                        className="short_ascending_designation"
                        onClick={handleSort}
                      >
                        <div className="ascending">
                          {otherIcons.down_arrow_svg}
                        </div>
                        <div className="designation">
                          {otherIcons.up_arrow_svg}
                        </div>
                      </div>
                    </div>
                  </th>
                  <th>Department</th>
                  <th>Positions</th>
                  <th>Experience Required</th>
                  <th>Skills Required</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <>
                  {jobLists?.length >= 1 ? (
                    jobLists?.map((item, index) => (
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
                          {item?.job_title || "-"}
                        </td>
                        <td onClick={() => handleRowClicked(item)}>
                          {item?.department?.department_name || "-"}
                        </td>
                        <td onClick={() => handleRowClicked(item)}>
                          {item?.no_of_position || "-"}
                        </td>
                        <td onClick={() => handleRowClicked(item)}>
                          {item?.experience || "-"}
                        </td>
                        <td
                          className="td"
                          onClick={() => handleRowClicked(item)}
                        >
                          {item?.skills || "-"}
                        </td>
                        <td>
                          <div className="status-dropdown">
                            <div key={index} className="status-container">
                              <div ref={statusDropDown.buttonRef}>
                                <div
                                  className={`status-display ${
                                    item?.job_status
                                      ? item?.job_status
                                          .toLowerCase()
                                          .replace(" ", "-")
                                      : ""
                                  }`}
                                  onClick={() => toggleDropdown(index)}
                                >
                                  <span
                                    className={`left_dot ${
                                      item?.job_status
                                        ? item?.job_status
                                            .toLowerCase()
                                            .replace(" ", "-")
                                        : ""
                                    }`}
                                  ></span>
                                  <div
                                  // onClick={() => {
                                  //   UpdateStatusHndle(emp.id);
                                  // }}
                                  >
                                    <div>{item?.job_status}</div>
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

                              {isOpen === index && (
                                <div>
                                  <div
                                    className="status-options"
                                    ref={statusDropDown.ref}
                                  >
                                    {jobStatusOptions?.map((status) => (
                                      <div
                                        key={status}
                                        className="status-option"
                                        onClick={() => {
                                          handleStatusChange(item?.id, status);
                                        }}
                                      >
                                        {status}
                                      </div>
                                    ))}
                                  </div>
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
                  )
                  }
                </>
              </tbody>
            </table>
          )}
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

export default JobList;
