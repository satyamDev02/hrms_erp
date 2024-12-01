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
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import DatePicker from "../../utils/common/DatePicker";
import { formatDate2, formatDate3 } from "../../utils/common/DateTimeFormat";
import NoDataFound from "../../utils/common/NoDataFound";
import { OutsideClick } from "../../utils/common/OutsideClick";
import Pagination from "../../utils/common/Pagination";
import SearchBox from "../../utils/common/SearchBox";
import TableViewSkeleton from "../../utils/common/TableViewSkeleton";
import { getFileList } from "../../Redux/Actions/fileActions";
import './file.scss'
const File = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Data from redux
    const fileData = useSelector((state) => state?.fileList);
    const fileLists = fileData?.data?.myfile || [];
    const totalItems = fileData?.data?.count || 0;
    const fileListLoading = fileData?.loading || false;
    const importDropDown = OutsideClick();

    const [showModal, setShowModal] = useState(false);


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
        setSelectedRows(selectAll ? [] : fileLists?.map((row) => row.id));
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

    const resetPageIfNeeded = () => {
        if (currentPage > 1) {
            setCurrentPage(1);
        }
    };

    //sort from frontend
    const [sortOrder, setSortOrder] = useState("");
    const [sortedClientLists, setSortedClientLists] = useState([...fileLists]);

    useEffect(() => {
        const sortedList = [...fileLists].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.file_name.localeCompare(b.file_name);
            } else {
                return b.file_name.localeCompare(a.file_name);
            }
        });
        setSortedClientLists(sortedList);
    }, [sortOrder, fileLists]);
    // }, [])

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
                    status: status == "Active" ? "1" : '0',
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
            dispatch(getFileList(sendData));
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

    const handleRowClicked = (clients) => {
        // navigate(`/client-details`);
        navigate(`/file-details/${clients?.id}`);
    };
    const handleAddNew = () => {
        navigate("/add-file");
    };
    // 
    const [activeTab, setActiveTab] = useState('Employee');
    const currentURL = window.location.pathname;
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    let updatedURL = currentURL.replace(/^\/reports/, '');
    let firstWord = updatedURL.split('/').filter(Boolean)[0];
    return (
        <div id="allEmp">
            <ConfirmPopup
                open={showModal}
                onClose={() => setShowModal(false)}
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
                            All File list <p>{totalItems} total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp"
                                onClick={handleAddNew}
                            >
                                <p>
                                    <span>
                                        <IoMdAdd />
                                    </span>{" "}
                                    Add New File
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
                <div className="left">
                    <div className="tabs-container-button" id="switch_file">
                        <button
                            className={`tab-button-swich ${currentURL === '/file/employee' ? 'active-swich' : (firstWord == 'employee') ? 'active-swich' : ''}`}
                            onClick={() => handleTabClick('My') + navigate('/file/employee')}
                        >
                            Employee
                        </button>
                        <button
                            className={`tab-button-swich ${currentURL === '/file/organization' ? 'active-swich' : (firstWord == 'organization') ? 'active-swich' : ''}`}
                            onClick={() => handleTabClick('Organizational') + navigate('/file/organization')}
                        >
                            Organization
                        </button>
                    </div>
                </div>
                <div className="right">
                    <div className="refresh divRight" onClick={handleRefresh}>
                        <div className="div_box">
                            <span id="reload_data_page">{otherIcons.refresh_svg}</span>
                        </div>
                    </div>
                    <SearchBox
                        onSearch={onSearch}
                        placeholder='Search File Name, Deadline, Share With...'
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
                    {fileListLoading ? <TableViewSkeleton /> :
                        <>
                            <>
                                {currentURL === '/file/employee' && (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                                </th>
                                                <th>
                                                    <div>
                                                        Upload file type
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
                                                <th>File name </th>
                                                <th>Deadline</th>
                                                <th>Share With</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fileListLoading ? (
                                                <TableViewSkeleton />
                                            ) : (
                                                <>
                                                    {fileLists?.filter(item => item?.file_type === "Employee").length > 0 ? (
                                                        fileLists
                                                            ?.filter(item => item?.file_type === "Employee")
                                                            ?.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedRows.includes(item?.id)}
                                                                            onChange={() => handleCheckboxChange(item?.id)}
                                                                        />
                                                                    </td>
                                                                    <td className="td " onClick={() => handleRowClicked(item)}>
                                                                        {item?.file_type || "-"}
                                                                    </td>
                                                                    <td className="td " onClick={() => handleRowClicked(item)}>
                                                                        {item?.file_name || "-"}
                                                                    </td>
                                                                    <td onClick={() => handleRowClicked(item)}>
                                                                        {formatDate3(item?.deadline_date) || "-"}
                                                                    </td>
                                                                    <td className="td" onClick={() => handleRowClicked(item)}>
                                                                        {
                                                                            item?.user_id
                                                                                ? (() => {
                                                                                    try {
                                                                                        const parsedData = JSON.parse(item.user_id);
                                                                                        return Array.isArray(parsedData)
                                                                                            ? parsedData.map(dept => dept.name).join(", ")
                                                                                            : "-"; // Fallback if not an array
                                                                                    } catch (error) {
                                                                                        console.error("Invalid JSON:", error);
                                                                                        return "-"; // Fallback for invalid JSON
                                                                                    }
                                                                                })()
                                                                                : "-"
                                                                        }

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
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </>
                            {currentURL === '/file/organization' && (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                            </th>
                                            <th>
                                                <div>
                                                    Upload file type
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
                                            <th>File name </th>
                                            <th>Deadline</th>
                                            <th>Share With</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fileListLoading ? (
                                            <TableViewSkeleton />
                                        ) : (
                                            <>
                                                {fileLists?.filter(item => item?.file_type === "Organization").length > 0 ? (
                                                    fileLists
                                                        ?.filter(item => item?.file_type === "Organization")
                                                        ?.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedRows.includes(item?.id)}
                                                                        onChange={() => handleCheckboxChange(item?.id)}
                                                                    />
                                                                </td>
                                                                <td className="td " onClick={() => handleRowClicked(item)}>
                                                                    {item?.file_type || "-"}
                                                                </td>
                                                                <td className="td " onClick={() => handleRowClicked(item)}>
                                                                    {item?.file_name || "-"}
                                                                </td>
                                                                <td onClick={() => handleRowClicked(item)}>
                                                                    {formatDate3(item?.deadline_date) || "-"}
                                                                </td>
                                                                <td className="td " onClick={() => handleRowClicked(item)}>
                                                                    {
                                                                        item?.department_id
                                                                            ? (() => {
                                                                                try {
                                                                                    const parsedData = JSON.parse(item.department_id);
                                                                                    return Array.isArray(parsedData)
                                                                                        ? parsedData.map(dept => dept.name).join(", ")
                                                                                        : "-"; 
                                                                                } catch (error) {
                                                                                    console.error("Invalid JSON:", error);
                                                                                    return "-"; 
                                                                                }
                                                                            })()
                                                                            : "-"
                                                                    }
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
                                        )}
                                    </tbody>
                                </table>
                            )}

                        </>

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

export default File;
