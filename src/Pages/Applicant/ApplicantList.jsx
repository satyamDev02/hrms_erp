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
import {
  getApplicantList,
  updateApplicantStatus,
} from "../../Redux/Actions/applicantActions";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import DatePicker from "../../utils/common/DatePicker";
import { formatDate2 } from "../../utils/common/DateTimeFormat";
import FilterByStatus from "../../utils/common/FilterByStatus";
import Loader from "../../utils/common/Loader";
import NoDataFound from "../../utils/common/NoDataFound";
import { OutsideClick } from "../../utils/common/OutsideClick";
import Pagination from "../../utils/common/Pagination";
import SearchBox from "../../utils/common/SearchBox";
import TableViewSkeleton from "../../utils/common/TableViewSkeleton";
import { applicantStatus } from "../../utils/Constant";
import { filterApplicantOptions } from "../../utils/FilterConstant";
import "./ApplicantList.scss";

const ApplicantList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Data from Redux
  const applicantData = useSelector((state) => state?.applicantList);
  const applicantLists = applicantData?.data?.result || [];
  const totalItems = applicantData?.data?.count || 0;
  const applicantLoading = applicantData?.loading || false;

  const importDropDown = OutsideClick();
  const statusDropDown = OutsideClick();

  const handleAddNewApplicant = () => {
    navigate("/add_applicant");
  };

  //update status in list
  const [isOpen, setIsOpen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusObj, setStatusOj] = useState({});

  const handleUpdateStatus = () => {
    const sendData = {
      id: statusObj?.id,
      status: statusObj?.status,
    };
    dispatch(updateApplicantStatus(sendData))
      .then((res) => {
        if (res.success) {
          dispatch(getApplicantList());
          setShowModal(false);
        }
      })
      .catch((error) => {
        setShowModal(false);
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

  const fetchApplicantList = useCallback(async () => {
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
      dispatch(getApplicantList(sendData));
    } catch (error) {
      console.error("Error fetching applicant list:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    if (searchTrigger) fetchApplicantList();
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
    navigate(`/applicant_details/${item?.id}`);
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
              All Applicant’s list <p>{totalItems} total</p>
            </h2>
            <div className="Emp_Head_Right">
              <div className="addEmp" onClick={handleAddNewApplicant}>
                <p>
                  <span>
                    <IoMdAdd />
                  </span>
                  Add New Applicant
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
        <FilterByStatus
          setStatus={setStatus}
          selectedSortBy={selectedSortBy2}
          setSearchTrigger={setSearchTrigger}
          setSelectedSortBy={setSelectedSortBy2}
          filterOptions={filterApplicantOptions}
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
            placeholder="Search Applicant, Email and Mobile Number.."
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
          {applicantLoading ? <TableViewSkeleton /> :
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
                      Applicant Name
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
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Job Opening</th>
                  <th>Source</th>

                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
           
                <>
                  {applicantLists.length > 0 ? (
                    applicantLists?.map((item, index) => (
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
                          {item?.name || "-"}
                        </td>
                        <td
                          className="td"
                          onClick={() => handleRowClicked(item)}
                        >
                          {item?.email || "-"}
                        </td>
                        <td
                          className="td"
                          onClick={() => handleRowClicked(item)}
                        >
                          {item?.mobile_no || "-"}
                        </td>
                        <td
                          className="td"
                          onClick={() => handleRowClicked(item)}
                        >
                          {item?.job_opening_name || "-"}
                        </td>
                        <td
                          className="td"
                          onClick={() => handleRowClicked(item)}
                        >
                          {item?.source || "-"}
                        </td>

                        <td>
                          <div className="status-dropdown">
                            <div key={index} className="status-container">
                              <div ref={statusDropDown.buttonRef}>
                                <div
                                  className={`status-display ${item?.status
                                      ? item?.status
                                        .toLowerCase()
                                        .replace(" ", "-")
                                      : ""
                                    }`}
                                  onClick={() =>
                                    setIsOpen(isOpen === index ? null : index)
                                  }
                                >
                                  <span
                                    className={`left_dot ${item?.status
                                        ? item?.status
                                          .toLowerCase()
                                          .replace(" ", "-")
                                        : ""
                                      }`}
                                  ></span>
                                  <div>
                                    <div className="">
                                      {item?.status || "-"}{" "}
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
                                    {applicantStatus.map((status) => (
                                      <div
                                        key={status}
                                        className="status-option"
                                        onClick={() =>
                                          handleStatusChange(item?.id, status)
                                        }
                                      >
                                        {status}
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

export default ApplicantList;
