import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { HiUserPlus } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../components/Helper/icons";
import { getTrainerList } from "../../Redux/Actions/trainerActions";
import DatePicker from "../../utils/common/DatePicker";
import { formatDate2, formatDate3 } from "../../utils/common/DateTimeFormat";
import NoDataFound from "../../utils/common/NoDataFound";
import { OutsideClick } from "../../utils/common/OutsideClick";
import Pagination from "../../utils/common/Pagination";
import SearchBox from "../../utils/common/SearchBox";
import TableViewSkeleton from "../../utils/common/TableViewSkeleton";

const Trainers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Data from redux
  const trainerData = useSelector((state) => state?.trainerList);
  const trainerLists = trainerData?.data?.result || [];
  const totalItems = trainerData?.data?.count || 0;
  const trainerListLoading = trainerData?.loading || false;

  const importDropDown = OutsideClick();

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
    setSelectedRows(selectAll ? [] : trainerLists?.map((row) => row.id));
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
  const fetchProjectList = useCallback(async () => {
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
          status: status == "Active" ? "1" : "0",
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
      dispatch(getTrainerList(sendData));
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    if (searchTrigger > 0) {
      fetchProjectList();
    }
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
    console.log("item", item?.id);
    navigate(`/trainer-details/${item?.id}`);
  };
  const handleAddNew = () => {
    navigate("/add-trainer");
  };

  return (
    <div id="allEmp">
      <div className="EmpOn_main_container">
        <div className="EmpOn_header">
          <div className="top-bar">
            <h2>
              <div className="span">
                <HiUserPlus />
              </div>
              All Trainers list <p>{totalItems} total</p>
            </h2>
            <div className="Emp_Head_Right">
              <div className="addEmp" onClick={handleAddNew}>
                <p>
                  <span>
                    <IoMdAdd />
                  </span>{" "}
                  Add New Trainer
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
        <div className="left"></div>

        <div className="right">
          <div className="refresh divRight" onClick={handleRefresh}>
            <div className="div_box">
              <span id="reload_data_page">{otherIcons.refresh_svg}</span>
            </div>
          </div>
          <SearchBox
            onSearch={onSearch}
            placeholder="Search Trainer Name, Type, Email, Contact Number...."
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
          {trainerListLoading ? (
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
                      Trainer Name
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

                  <th>Training Type</th>
                  <th>Trainer Cost</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Duration</th>
                  <th>Contact Number</th>
                  <th>Trainer Email</th>
                </tr>
              </thead>
              <tbody>
                {trainerListLoading ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {trainerLists?.length > 0 ? (
                      trainerLists?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(item?.id)}
                              onChange={() => handleCheckboxChange(item?.id)}
                            />
                          </td>
                          <td
                            className="td "
                            onClick={() => handleRowClicked(item)}
                          >
                            {item?.trainer_name || "-"}
                          </td>

                          <td
                            className="td "
                            onClick={() => handleRowClicked(item)}
                          >
                            {item?.trainig_type || "-"}
                          </td>
                          <td
                            className="td"
                            id="Description2"
                            onClick={() => handleRowClicked(item)}
                          >
                            {item?.trainer_cost
                              ? "$" + item?.trainer_cost
                              : "-"}
                          </td>
                          <td onClick={() => handleRowClicked(item)}>
                            {formatDate3(item?.start_date) || "-"}
                          </td>
                          <td onClick={() => handleRowClicked(item)}>
                            {formatDate3(item?.end_date) || "-"}
                          </td>

                          <td
                            className="td"
                            onClick={() => handleRowClicked(item)}
                          >
                            {item?.duration || "-"}
                          </td>
                          <td
                            className="td "
                            onClick={() => handleRowClicked(item)}
                          >
                            {item?.mobile_no || "-"}
                          </td>
                          <td
                            className="td "
                            onClick={() => handleRowClicked(item)}
                          >
                            {item?.email || "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                              <td colSpan="9" className="not_found_td">
                          <NoDataFound />
                        </td>
                      </tr>
                    )}
                  </>
                )}
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

export default Trainers;
