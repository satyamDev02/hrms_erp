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
  deleteDesignation,
  getDesignationDetails,
  getEmpDesignationDetails,
} from "../../Redux/Actions/designationActions";
import { otherIcons } from "../../components/Helper/icons";
import { dummyImageUrl } from "../../utils/Constant";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { formatDate } from "../../utils/common/DateTimeFormat";
import Loader03 from "../../utils/common/Loader03";
import { OutsideClick } from "../../utils/common/OutsideClick";
import AddNewDesignation from "./AddNewDesignation";
import "./DesignationDetails.scss";
import { getUserById } from "../../Redux/Actions/globalActions";

const DesignationDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const designationDetails = useSelector((state) => state?.designationDetails);
  const designationDetail = designationDetails?.data?.designation;
  const designationDetailLoading = designationDetails?.loading || false;

   //Data from redux
   const employeeData = useSelector((state) => state?.empDesignationDetails);
   const employeeLists = employeeData?.data?.getDesignationEmp || [];

  const userData = useSelector((state) => state?.getUserById?.data);
   
  const editDesignationPopup = OutsideClick();
  const [searchTrigger, setSearchTrigger] = useState(0);

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getDesignationDetails(queryParams));
    }
  }, [id]);

  useEffect(() => {
    if (designationDetail?.id) {
      const queryParams = {
        designation_id: designationDetail?.id,
      };
      dispatch(getEmpDesignationDetails(queryParams));

      const sendData = {
        'enteredbyid': designationDetail?.enteredbyid
      };
      dispatch(getUserById(sendData));
    }
  }, [designationDetail?.id, dispatch]);

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
      dispatch(deleteDesignation(sendData, navigate)).then((res) => {
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
    navigate("/designation");
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
      {designationDetailLoading ? (
        <Loader03 />
      ) : (
        <>
          {editDesignationPopup?.isOpen && (
            <AddNewDesignation
              ClosePop={editDesignationPopup.handleToggle}
              refBox={editDesignationPopup?.ref}
              updateList={setSearchTrigger}
              id={id}
            />
          )}
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
            onConfirm={handleDeleteDepartment}
            type="delete"
            module="Designation"
          />
          <div className="details">
            <div className="title_top">
              <h2>Designation Detail</h2>
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
                  <h3>{designationDetail?.designation_name || "-"}</h3>
                  <p>{designationDetail?.department?.department_name || "-"}</p>
                </div>
              </div>
              <div className="action_card">
                {/* <span className='div_box' onClick={handleRefresh}>
                            <div>
                                {otherIcons.refresh_svg}
                            </div>
                        </span> */}
                <div onClick={editDesignationPopup.handleToggle}>
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
              <div className="card">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>{otherIcons.details_information}</span>Designation
                    Information
                  </h3>
                </div>
                <div className="contentInformation">
                  <div>
                    <h4>Designation</h4>
                    <p>{designationDetail?.designation_name || "-"}</p>
                  </div>

               

                  <div>
                    <h4>Department</h4>
                    <p>{designationDetail?.department?.department_name || "-"} </p>
                  </div>
                  <div>
                    <h4>Created At</h4>
                    <p>{formatDate(designationDetail?.created_at) || "-"}</p>
                  </div>
                  <div>
                    <h4>Created By</h4>
                    <p>{userData?.created_by || "-"}</p>
                  </div>
                </div>
                <div id="DescriptionJOB">
                  <h4>Description</h4>
                  <p className="paragra">{designationDetail?.description ||"-"}</p>
                </div>
              </div>
              <div className="card4">
                <div className="top_head4">
                  {" "}
                  <h3>
                    {" "}
                    <span>{otherIcons.details_information}</span>Employees with
                    Designation
                  </h3>
                </div>

                <div className="Emp4">
                  <Slider {...settings}>
                    {employeeChunks.map((chunk, index) => {
                    return(
                      <div key={`slide-${index}`} className="slide-content">
                        {chunk.map((emp, i) => {
                          let imageUrl = dummyImageUrl;
                          const parsedImage = emp?.image ? JSON.parse(emp?.image) : [];
                          imageUrl = parsedImage ? parsedImage[0]?.url : imageUrl;
                          return (
                            <div key={`employee-${index}-${i}`} className="div_dob-item">
                              <div className="img_dob_name">
                                <div
                                  className="progress-circle"
                                  style={{ height: "74px", width: "77px" }}
                                >
                                  <img
                                    src={imageUrl}
                                    alt={`${
                                      emp?.first_name || "Employee"
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
                    )})}
                  </Slider>
                </div>
              </div>
            </div>
            {/* table */}
          </div>
        </>
      )}
    </div>
  );
};

export default DesignationDetails;
