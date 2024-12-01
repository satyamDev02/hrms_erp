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
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import DatePicker from "../../utils/common/DatePicker";
import { formatDate2, formatDate3 } from "../../utils/common/DateTimeFormat";
import FilterByStatus from "../../utils/common/FilterByStatus";
import NoDataFound from "../../utils/common/NoDataFound";
import { OutsideClick } from "../../utils/common/OutsideClick";
import Pagination from "../../utils/common/Pagination";
import SearchBox from "../../utils/common/SearchBox";
import TableViewSkeleton from "../../utils/common/TableViewSkeleton";
import { ticketStatusOptions } from "../../utils/Constant";
import { filterTicketOptions } from "../../utils/FilterConstant";
import './TicketList.scss';
import { getTicketList, updateNewTicketsStatus } from "../../Redux/Actions/ticketActions";
import { useGetNameById } from "../../utils/common/useGetNameById";

const TicketList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Data from redux
    const ticketData = useSelector((state) => state?.ticketList);
    const ticketLists = ticketData?.data?.result || [];
    const totalItems = ticketData?.data?.totalCount || 0;
    const ticketListLoading = ticketData?.loading || false;
    const updateStatus = useSelector((state) => state?.updateTrainingStatus);
    const importDropDown = OutsideClick();
    const statusDropDown = OutsideClick();
    console.log('ticketData ✅', ticketData)
    // console.log('object', ticketLists)
    const handleAddNew = () => {
        navigate("/add-ticket");
    };

    const [isOpen, setIsOpen] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [statusObj, setStatusOj] = useState({});

    const handleUpdateStatus = () => {
        const sendData = {
            id: statusObj?.id,
            status: statusObj?.status,
        };
        dispatch(updateNewTicketsStatus(sendData))
            .then((res) => {
                if (res.success) {
                    dispatch(getTicketList());
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

    const handleCheckboxChange = (rowId) => {
        setSelectedRows((prevRows) =>
            prevRows.includes(rowId)
                ? prevRows.filter((id) => id !== rowId)
                : [...prevRows, rowId]
        );
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setSelectedRows(selectAll ? [] : ticketLists?.map((row) => row.id));
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
    const [sortedClientLists, setSortedClientLists] = useState([...ticketLists]);

    useEffect(() => {
        const sortedList = [...ticketLists].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.employee[0]?.first_name.localeCompare(b.employee[0]?.first_name);
            } else {
                return b.employee[0]?.first_name.localeCompare(a.employee[0]?.first_name);
            }
        });
        setSortedClientLists(sortedList);
    }, [sortOrder, ticketLists]);
    // }, [])

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
                    status: status
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
            // console.log('sendData📍', sendData)
            dispatch(getTicketList(sendData));
        } catch (error) {
            console.error("Error fetching job list:", error);
        }
    }, [searchTrigger]);

    useEffect(() => {
        if (searchTrigger) fetchProjectList();
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

    const handleRowClicked = (tickets) => {
        navigate(`/ticket-details/${tickets?.id}`);
    };
    const name = useGetNameById(ticketLists?.user_id);
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
                            All Ticket list <p>{totalItems} total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp" onClick={handleAddNew}>
                                <p>
                                    <span>
                                        <IoMdAdd />
                                    </span>{" "}
                                    Add Ticket
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
                                    className={`bottom_import ${!importDropDown.isOpen ? "bottom_import_hide" : ""
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
            <div className="Overview">
                <h2>Overview</h2>
                <div className="Overview4">
                    <div className="Overview_box">
                        <div className="Overview_Left">
                            <span className="icon">
                                {otherIcons.total_ticket_svg}
                            </span>
                        </div>
                        <div className="Overview_Right">
                            <p>TOTAL TICKETS</p>
                            <h3>{ticketData?.data?.totalCount || 0}</h3>
                        </div>
                    </div>
                    <div className="Overview_box">
                        <div className="Overview_Left">
                            <span className="icon">
                                {otherIcons.approved_count_svd}
                            </span>
                        </div>
                        <div className="Overview_Right">
                            <p> APPROVED TICKETS </p>
                            <h3>{ticketData?.data?.approvedCount || 0}</h3>
                        </div>
                    </div>
                    <div className="Overview_box">
                        <div className="Overview_Left">
                            <span className="icon">
                                {otherIcons.rejectedCount_svg}
                            </span>
                        </div>
                        <div className="Overview_Right">
                            <p>REJECTED  TICKETS</p>
                            <h3>{ticketData?.data?.rejectedCount || 0}</h3>
                        </div>
                    </div>
                    <div className="Overview_box">
                        <div className="Overview_Left">
                            <span className="icon">
                               {otherIcons.pending_ticket_svg}
                            </span>
                        </div>
                        <div className="Overview_Right">
                            <p>PENDING TICKETS</p>
                            <h3>{ticketData?.data?.pendingCount || 0}</h3>
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
                    filterOptions={filterTicketOptions}
                    resetPageIfNeeded={resetPageIfNeeded}
                    topCss="topSecondStatus"
                />

                <div className="right">
                    <div className="refresh divRight" onClick={handleRefresh}>
                        <div className="div_box">
                            <span id="reload_data_page">{otherIcons.refresh_svg}</span>
                        </div>
                    </div>
                    <SearchBox
                        onSearch={onSearch}
                        placeholder='Search Employee Name, Requested To...'
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
                    {ticketListLoading ? <TableViewSkeleton /> :
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                    </th>
                                    <th>
                                        <div>
                                            Employee Name
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
                                    <th>Requested To</th>
                                    <th>Priority</th>
                                    <th>Subject</th>
                                    <th>Creation Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {ticketListLoading ? (
                                    <TableViewSkeleton />
                                ) : (
                                    <>

                                        {sortedClientLists?.length >= 1 ? (sortedClientLists?.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(item?.id)}
                                                        onChange={() => handleCheckboxChange(item?.id)}
                                                    />
                                                </td>
                                                <td className="td" onClick={() => handleRowClicked(item)}>
                                                    {item?.employee[0]?.first_name + " " + item?.employee[0]?.last_name || "-"}
                                                </td>
                                                <td onClick={() => handleRowClicked(item)}>
                                                    {item?.requested_to[0]?.first_name + " " + item?.requested_to[0]?.last_name || "-"}
                                                </td>
                                                <td onClick={() => handleRowClicked(item)}>
                                                    {item?.priority ||  "-"}
                                                </td>
                                                <td className="td" onClick={() => handleRowClicked(item)}>
                                                    {item?.subject ||  "-"}
                                                </td>
                                                <td className="td" onClick={() => handleRowClicked(item)}>
                                                    {formatDate3(item?.date) || "-"}
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
                                                                    onClick={() => toggleDropdown(index)}
                                                                >
                                                                    <span
                                                                        className={`left_dot ${item?.status
                                                                            ? item?.status
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
                                                                        <div>{item?.status}</div>
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
                                                            {/* {isOpen && (
                          <> */}
                                                            {isOpen === index && (
                                                                <div>
                                                                    <div
                                                                        className="status-options"
                                                                        ref={statusDropDown.ref}
                                                                    >
                                                                        {ticketStatusOptions?.map((status) => (
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
                                                            {/* </>
                        )} */}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))) : (<tr>
                                                    <td colSpan="7" className="not_found_td">
                                                <NoDataFound />
                                            </td>
                                        </tr>)
                                        }
                                    </>
                                )}
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

export default TicketList;