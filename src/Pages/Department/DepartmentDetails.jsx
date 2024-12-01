import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  deleteDepartment,
  getDepartmentDetails,
  getEmpDepartmentDetails,
  getProjectDepartmentDetails,
} from "../../Redux/Actions/departmentActions";
import { getUserById } from "../../Redux/Actions/globalActions";
import iconEdu from "../../assets/icons/edu.png";
import { otherIcons } from "../../components/Helper/icons";
import "../../components/style.css";
import { dummyImageUrl } from "../../utils/Constant";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { formatDate, formatDate3 } from "../../utils/common/DateTimeFormat";
import Loader03 from "../../utils/common/Loader03";
import { OutsideClick } from "../../utils/common/OutsideClick";
import AddNewDepartment from "./AddNewDepartment";
import "./DepartmentDetails.scss";

const DepartmentDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const departmentDetails = useSelector((state) => state?.departmentDetails);
  const departmentDetail = departmentDetails?.data?.department || {};
  const departmentDetailLoading = departmentDetails?.loading || false;

  //empDepartment list from redux
  const employeeData = useSelector((state) => state?.empDepartmentDetails);
  const employeeLists = employeeData?.data?.getDepartmentEmp || [];

  //projectDepartment list from redux
  const projectData = useSelector((state) => state?.projectDepartmentDetails);
  const projectLists = projectData?.data?.getProject || [];

  const userData = useSelector((state) => state?.getUserById?.data);

  const editDepartmentPopup = OutsideClick();

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getDepartmentDetails(queryParams));
      const queryParams2 = {
        department_id: id,
      };
      dispatch(getEmpDepartmentDetails(queryParams2));
      const sendData2 = {
        department_id: id
      };
      dispatch(getProjectDepartmentDetails(sendData2));
    }
  }, [id]);

  useEffect(() => {
    if (departmentDetail?.id) {
      const sendData = {
        'enteredbyid': departmentDetail?.enteredbyid
      };
      dispatch(getUserById(sendData));
    }
  }, [departmentDetail?.id]);

  // HandleDelete
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteDepartment = () => {
    try {
      const sendData = {
        id: id,
      };
      dispatch(deleteDepartment(sendData, navigate)).then((res) => {
        if (res?.success) {
          setShowModal(false);
          // setTimeout(() => {
          //   navigate("/all-job-list");
          // }, 1500);
        }
      });
    } catch (err) {
      setShowModal(false);
      console.log("Error", err);
    }
  };

  const handleCancel = () => {
    navigate("/department");
  };

  const [currentSlide, setCurrentSlide] = useState(0); // State to track current slide

  

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const employeeChunks = chunkArray(employeeLists, 4);


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(employeeLists.length, 1),
    slidesToScroll: 1,

    customPaging: (i) => (
      <div
        style={{
          width: i === currentSlide ? "20px" : "15px",
          height: "3px",
          background: i === currentSlide ? "purple" : "gray",
          borderRadius: "10px",
          transition: "all 0.3s ease",
        }}
      />
    ),
    appendDots: (dots) => (
      <div
        style={{
          marginBottom: "-10px",
          position: "absolute",
          bottom: "-20px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {dots}
      </div>
    ),
  };

  return (
    <div className="profile-page">
      {departmentDetailLoading ? (
        <Loader03 />
      ) : (
        <>
          {" "}
          <div className="">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
              theme="error"
            />
            {editDepartmentPopup?.isOpen && (
              <AddNewDepartment
                ClosePop={editDepartmentPopup.handleToggle}
                refBox={editDepartmentPopup?.ref}
                id={id}
                data={departmentDetail}
              />
            )}

            <ConfirmPopup
              open={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={handleDeleteDepartment}
              type="delete"
              module="Department"
            />
          </div>
          {/* <ToastContainer className="toast-container" /> */}
          <div className="details">
            <div className="title_top">
              <h2>Department Detail</h2>
              <div className="close_btn" onClick={handleCancel}>
                {otherIcons.cross_svg}
              </div>
            </div>
            <div className="profile_card">
              <div className="img_card">
                <div className="progress-circle">
                  <img src={dummyImageUrl} alt="Dummy Image" />
                </div>
                <div className="about_user">
                  <h3>{departmentDetail?.department_name || "-"}</h3>
                  <p>{departmentDetail?.parent_department?.department_name ||"-"}</p>
                </div>
              </div>
              <div className="action_card">
                {/* <span className="div_box" onClick={handleRefresh}>
              <div>{otherIcons.refresh_svg}</div>
            </span> */}
                <div onClick={editDepartmentPopup.handleToggle}>
                  <span>{otherIcons.edit_svg}</span> Edit
                </div>
                <div onClick={handleDelete}>
                  <span>
                    <MdDeleteOutline />
                  </span>
                  Delete
                </div>
              </div>
            </div>
            <div className="info-cards">
              <div className="card  ">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>{otherIcons.department_information}</span>
                    Department Information
                  </h3>
                </div>
                <div className="contentInformation">
                  <div>
                    <h4> Department</h4>
                    <p>{departmentDetail?.department_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Parent Department</h4>
                    <p>
                      {departmentDetail?.parent_department?.department_name ||
                        "-"}
                    </p>
                  </div>

                  <div>
                    <h4>Department Head</h4>
                    <p>{`${departmentDetail?.department_head?.first_name || "-"} ${departmentDetail?.department_head?.last_name || "-"}` || "-"}</p>
                  </div>

                  <div>
                    <h4>Created By</h4>
                    <p>{userData?.created_by ||"-"}</p>
                  </div>

                  <div>
                    <h4>Created On</h4>
                    <p>{formatDate(departmentDetail?.created_at) || "-"}</p>
                  </div>
                </div>
              </div>
              <div className="card4">
                <div className="top_head4">
                  {" "}
                  <h3>
                    {" "}
                    <span>{otherIcons.department_information}</span>
                    Employees in Department
                  </h3>
                </div>

                <div className="Emp4">
                  <Slider {...settings}>
                    {employeeChunks.map((chunk, index) => {
                      return (
                        <div key={`slide-${index}`} className="slide-content">
                          {chunk.map((emp, i) => {
                            let imageUrl = dummyImageUrl;
                            let parsedImage = [];

                            try {
                              parsedImage = emp?.image
                                ? JSON.parse(emp?.image)
                                : [];
                            } catch (error) {
                              console.error(
                                "Failed to parse JSON:",
                                emp?.image,
                                error
                              );
                            }

                            imageUrl =
                              parsedImage?.length > 0
                                ? parsedImage[0]?.url
                                : dummyImageUrl;

                            return (
                              <div
                                key={`employee-${index}-${i}`}
                                className="div_dob-item"
                              >
                                <div className="img_dob_name">
                                  <div
                                    className="progress-circle"
                                    style={{ height: "74px", width: "77px" }}
                                  >
                                    <img
                                      src={imageUrl}
                                      alt={`${emp?.first_name || "Employee"
                                        }'s profile`}
                                      style={{
                                        borderRadius: "50%",
                                        width: "77%",
                                        height: "75%",
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <h4>
                                      {emp?.first_name + " " + emp?.last_name}
                                    </h4>
                                    <p>{emp?.department?.department_name}</p>
                                    <span>
                                      {emp?.designation?.designation_name}
                                    </span>
                                  </div>
                                </div>
                                <p className="p4">{emp?.mobile_no}</p>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
            {/* table */}
            <div className="contents">
              <div>
                <div className="ProjectList">
                  <div className="section-header">
                    {/* <FaGraduationCap className="icon" /> */}
                    <img src={iconEdu} alt="" className="icon" />
                    <h2>PROJECT</h2>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>PROJECT NAME</th>
                        <th>PROJECT LEADER</th>
                        {/* <th>CONTACT</th> */}
                        <th>START DATE</th>
                        <th>END DATE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectLists.map((project, index) => (
                        <tr key={index}>
                          <td>{project?.project_name || "-"}</td>
                          <td>{project?.project_leader || "-"}</td>
                          <td>{formatDate3(project?.start_date) || "-"}</td>
                          <td>{formatDate3(project?.end_date) || "-"}</td>
                          <td
                            className={
                              project.status === "Completed"
                                ? "completed"
                                : "pending"
                            }
                          >
                            <span className="td">
                              {project?.status || "-"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DepartmentDetails;
