import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { HiUserPlus } from "react-icons/hi2";
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../../components/Helper/icons";
import ConfirmPopup from "../../../utils/common/ConfirmPopup";
import DatePicker from "../../../utils/common/DatePicker";
import { formatDate2, formatDate3 } from "../../../utils/common/DateTimeFormat";
import FilterByStatus from "../../../utils/common/FilterByStatus";
import Loader from "../../../utils/common/Loader";
import NoDataFound from "../../../utils/common/NoDataFound";
import { OutsideClick } from "../../../utils/common/OutsideClick";
import Pagination from "../../../utils/common/Pagination";
import SearchBox from "../../../utils/common/SearchBox";
import TableViewSkeleton from "../../../utils/common/TableViewSkeleton";
import { ProjectStatusOptions } from "../../../utils/Constant";
import {  filterProjectStatusOptions } from "../../../utils/FilterConstant";
import "./Project.scss";
import { getProjectList, updateNewProjectStatus } from "../../../Redux/Actions/projectActions";

const Project = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Data from redux
    const projectData = useSelector((state) => state?.projectList);
    const projectLists = projectData?.data?.result || [];

    const totalItems = projectData?.data?.count || 0;
    const projectListLoading = projectData?.loading || false;
    const updateStatus = useSelector((state) => state?.updateProjectStatus);

    const importDropDown = OutsideClick();
    const statusDropDown = OutsideClick();

    const handleAddNew = () => {
        navigate("/add-project");
    };

    const [isOpen, setIsOpen] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [statusObj, setStatusOj] = useState({});

    const handleUpdateStatus = () => {
        const sendData = {
            id: statusObj?.id,
            status: statusObj?.status,
        };
        dispatch(updateNewProjectStatus(sendData))
            .then((res) => {
                if (res.success) {
                    dispatch(getProjectList());
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
        setSelectedRows(selectAll ? [] : projectLists?.map((row) => row.id));
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
    const [sortedProjectLists, setSortedProjectLists] = useState([...projectLists]);
    console.log('sortedProjectLists👻', sortedProjectLists)
    useEffect(() => {
        const sortedList = [...projectLists].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.project_name.localeCompare(b.project_name);
            } else {
                return b.project_name.localeCompare(a.project_name);
            }
        });
        setSortedProjectLists(sortedList);
    }, [sortOrder, projectLists]);
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
            dispatch(getProjectList(sendData));
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

    const handleRowClicked = (projects) => {
        // navigate(`/project-details`);
        navigate(`/project-details/${projects?.id}`);
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
                            All Project list <p>{totalItems} total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp" onClick={handleAddNew}>
                                <p>
                                    <span>
                                        <IoMdAdd />
                                    </span>{" "}
                                    Add Project
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
            <div className="EmpOn_Second_Head">
                {/* <div className="left"> */}
                <FilterByStatus
                    setStatus={setStatus}
                    selectedSortBy={selectedSortBy2}
                    setSearchTrigger={setSearchTrigger}
                    setSelectedSortBy={setSelectedSortBy2}
                    filterOptions={filterProjectStatusOptions}
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
                        placeholder='Search Project Title, Client, Assigned to...'
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
                    {projectListLoading ? <TableViewSkeleton /> :
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                    </th>
                                    <th>
                                        <div>
                                            Project Title
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
                                    <th>Client Name</th>
                                    <th>Priority</th>
                                    <th>Date Assigned</th>
                                    <th>Deadline</th>
                                    <th>Assigned to</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {projectListLoading ? (
                                    <TableViewSkeleton />
                                ) : (
                                    <>
                                        {projectLists?.length >= 1 ? (projectLists?.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(item?.id)}
                                                        onChange={() => handleCheckboxChange(item?.id)}
                                                    />
                                                </td>
                                                <td className="td" onClick={() => handleRowClicked(item)}>
                                                    {item?.project_name || "-"}
                                                </td>
                                                <td onClick={() => handleRowClicked(item)}>
                                                    {item?.client?.full_name || "-"}
                                                </td>
                                                <td onClick={() => handleRowClicked(item)}>
                                                    <div className='status-dropdown'>
                                                        <div className="status-container" >
                                                            <div
                                                                className={`status-dis ${item.priority ? item.priority.toLowerCase().replace(' ', '-') : ''}`}
                                                            >
                                                                <span className={`left_d ${item.priority ? item.priority.toLowerCase().replace(' ', '-') : ''}`}></span>
                                                                <div >
                                                                    <div
                                                                    >
                                                                        {item?.priority || "-"}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td onClick={() => handleRowClicked(item)}>
                                                    {item?.start_date
                                                        ? formatDate3(item?.start_date)
                                                        : ""}
                                                </td>
                                                <td onClick={() => handleRowClicked(item)}>
                                                    {item?.end_date
                                                        ? formatDate3(item?.end_date)
                                                        : ""}
                                                </td>
                                                <td className="td" onClick={() => handleRowClicked(item)}>
                                                    {item?.project_leader || "-"}
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
                                                                        {ProjectStatusOptions?.map((status) => (
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
                                            <td colSpan="7">
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

export default Project;