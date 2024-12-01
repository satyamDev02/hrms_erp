import { useCallback, useEffect, useRef, useState } from "react";
import { HiUserPlus } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeList } from "../../../Redux/Actions/employeeActions.js";
import { otherIcons } from "../../../components/Helper/icons";
import { formatDate2, formatDate3 } from "../../../utils/common/DateTimeFormat";
import Pagination from "../../../utils/common/Pagination";
import SearchBox from "../../../utils/common/SearchBox";
import TableViewSkeleton from "../../../utils/common/TableViewSkeleton";
import NoDataFound from "../../../utils/common/NoDataFound";

const BirthdayList = () => {
  const dispatch = useDispatch();

  //Data from redux
  const employeeData = useSelector((state) => state?.employeeList);
  const employeeLists = employeeData?.data?.result || [];
  const totalItems = employeeData?.data?.count || 0;
  const employeeListLoading = employeeData?.loading || false;


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

  const fetchEmployeeList = useCallback(async () => {
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
          employee_status: status,
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
      dispatch(getEmployeeList(sendData));
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  }, [searchTrigger]);

  useEffect(() => {
    fetchEmployeeList();
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
  const handleRefresh = () => {
    // setStatus("");
    // setSelectedSortBy2("all");
    setSearchTermFromChild("");
    setSpecificDate(null);
    setDateRange([{ startDate: null, endDate: null }]);
    setClearFilter(true);
    setCurrentPage(1);
    setSearchTrigger((prev) => prev + 1);
  };
  // Utility: Format today's date and current month
  const today = new Date();
  const todayStr = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
  }); // e.g., "16-11"
  const currentMonth = today.getMonth() + 1; // Month index starts from 0

  // // Sort employee list by birthday logic
  // const sortedEmployeeList = employeeLists.sort((a, b) => {
  //   const [aDay, aMonth] = a.date_of_birth.split("-").map(Number);
  //   const [bDay, bMonth] = b.date_of_birth.split("-").map(Number);

  //   const isAToday = `${aDay}-${aMonth}` === todayStr;
  //   const isBToday = `${bDay}-${bMonth}` === todayStr;

  //   if (isAToday && !isBToday) return -1;
  //   if (!isAToday && isBToday) return 1;

  //   const isACurrentMonth = aMonth === currentMonth;
  //   const isBCurrentMonth = bMonth === currentMonth;

  //   if (isACurrentMonth && !isBCurrentMonth) return -1;
  //   if (!isACurrentMonth && isBCurrentMonth) return 1;

  //   return 0;
  // });
  // Sort employee list by birthday logic
  const sortedEmployeeList = employeeLists.sort((a, b) => {
    const [aDay, aMonth] = (a?.date_of_birth || "").split("-").map(Number);
    const [bDay, bMonth] = (b?.date_of_birth || "").split("-").map(Number);
  
    const isAToday = `${aDay}-${aMonth}` === todayStr;
    const isBToday = `${bDay}-${bMonth}` === todayStr;

    if (isAToday && !isBToday) return -1;
    if (!isAToday && isBToday) return 1;

    const isACurrentMonth = aMonth === currentMonth;
    const isBCurrentMonth = bMonth === currentMonth;

    if (isACurrentMonth && !isBCurrentMonth) return -1;
    if (!isACurrentMonth && isBCurrentMonth) return 1;

    return 0;
  });

  return (
    <div>
      <div className="EmpOn_main_container">
        <div className="EmpOn_header">
          <div className="top-bar">
            <h2>
              <div className="span">
                <HiUserPlus />
              </div>
              All Birthday List <p>{totalItems} total</p>
            </h2>
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
      <div className="EmpOn_Second_Head" id="birthhead">
        <div className="left"></div>
        <div className="right">
          <div className="refresh divRight" onClick={handleRefresh}>
            <div className="div_box">
              <span id="reload_data_page">{otherIcons.refresh_svg}</span>
            </div>
          </div>
          <SearchBox
            onSearch={onSearch}
            placeholder="Search Employee Name, Email and Mobile Number..."
          />
        </div>
      </div>
      {/* All Employee  List*/}
      <div className="allEmployeeList" id="bdaytab">
        <div className="employee-table">
          {employeeListLoading ? <TableViewSkeleton /> :
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
                      Employee Id
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
                  <th>Email Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Mobile Number</th>
                  <th>Date of birth</th>
                </tr>
              </thead>
              <tbody>
                
                <>
                  {sortedEmployeeList.length >= 1 ? (
                    sortedEmployeeList.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item?.id)}
                            onChange={() => handleCheckboxChange(item?.id)}
                          />
                        </td>
                        <td>{item?.employee_id || "-"}</td>
                        <td className="td">{item?.email || "-"}</td>
                        <td>{item?.first_name || "-"}</td>
                        <td>{item?.last_name || "-"}</td>
                        <td>{item?.mobile_no || "-"}</td>
                        <td>{formatDate3(item?.date_of_birth) || "-"}</td>{" "}
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

export default BirthdayList;
