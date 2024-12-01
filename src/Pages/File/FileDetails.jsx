import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherIcons } from "../../components/Helper/icons";
import ConfirmPopup from "../../utils/common/ConfirmPopup";
import { formatDate, formatDate3 } from "../../utils/common/DateTimeFormat";
import Loader03 from "../../utils/common/Loader03";
import { useGetNameById } from "../../utils/common/useGetNameById";
import { getUserById } from "../../Redux/Actions/globalActions";
import { getFileDetails, deleteFile } from "../../Redux/Actions/fileActions";
import file_Image from "../../assets/file.png";

const FileDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //Data from redux
  const fileDetails = useSelector((state) => state?.fileDetails);
  const fileDetail = fileDetails?.data?.myfile;
  const fileDetailLoading = fileDetails?.loading || false;
  const userData = useSelector((state) => state?.getUserById?.data);

  // Safely parse notify_any_others
  const notify_any_others = fileDetail?.notify_any_others
    ? JSON.parse(fileDetail?.notify_any_others)
    : [];

  const user_id = fileDetail?.user_id ? JSON.parse(fileDetail?.user_id) : [];

  const user_id_data =
    user_id.length > 0 ? user_id.map((dept) => dept.name).join(", ") : " ";

  const departments = fileDetail?.department_id
    ? JSON.parse(fileDetail?.department_id)
    : [];

  // Generate department names or fallback message
  const departmentNames =
    departments.length > 0
      ? departments.map((dept) => dept.name).join(", ")
      : "-";

  useEffect(() => {
    if (id) {
      const queryParams = {
        id: id,
      };
      dispatch(getFileDetails(queryParams));
    }
  }, [id]);

  useEffect(() => {
    if (fileDetail) {
      const sendData = {
        enteredbyid: fileDetail?.enteredbyid,
      };
      dispatch(getUserById(sendData));
    }
  }, [fileDetail, dispatch]);

  // HandleDelete
  const [showModal, setShowModal] = useState(false);
  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteHoliday = () => {
    try {
      const sendData = {
        id: id,
      };
      dispatch(deleteFile(sendData, navigate)).then((res) => {
        if (res?.success) {
          setShowModal(false);
        }
      });
    } catch (err) {
      setShowModal(false);
      console.log("Error", err);
    }
  };

  const handleCancel = () => {
    navigate("/file/employee");
  };

  const name = useGetNameById(fileDetail?.enteredbyid);

  const handleEdit = () => {
    navigate(`/add-file/${id}`);
  };

  const Attachments =
    typeof fileDetail?.attachment === "string"
      ? JSON.parse(fileDetail?.attachment)
      : fileDetail?.attachment || [];

  return (
    <div className="profile-page">
      {fileDetailLoading ? (
        <Loader03 />
      ) : (
        <>
          <ConfirmPopup
            open={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDeleteHoliday}
            type="delete"
            module="File"
          />
          <div className="details">
            <div className="title_top">
              <h2>File Details</h2>
              <div className="close_btn" onClick={handleCancel}>
                {otherIcons.cross_svg}
              </div>
            </div>
            <div className="profile_card">
              <div className="img_card">
                <div className="progress-circle">
                  <img style={{ background: "#fff" }} src={file_Image} alt="" />
                </div>
                <div className="about_user">
                  <h3> {fileDetail?.file_type || "-"}</h3>
                  <p>{fileDetail?.file_name || "-"}</p>
                </div>
              </div>
              <div className="action_card">
                <div onClick={handleEdit}>
                  <span>{otherIcons.edit_svg}</span>
                  Edit
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
                <div className="top_head head2col">
                  <h3>
                    <span>{otherIcons.file_info}</span>File Information
                  </h3>
                  {/* <span className="button_Resolve">
                                        Resolve
                                    </span> */}
                </div>
                <div className="contentInformation">
                  <div>
                    <h4>File Type</h4>
                    <p>{fileDetail?.file_type || "-"}</p>
                  </div>
                  <div>
                    <h4>File Name</h4>
                    <p>{fileDetail?.file_name || "-"}</p>
                  </div>
                  <div>
                    <h4>Notify All</h4>
                    <p>{fileDetail?.notify_all || "-"}</p>
                  </div>
                  <div>
                    <h4>Deadline</h4>
                    <p>{formatDate3(fileDetail?.deadline_date) || "-"}</p>
                  </div>
                  <div>
                    <h4>Attachment</h4>
                    {Attachments.map((img, index) => {
                      return (
                        <div key={index} className="tooltip-container">
                          <a target="_blank" href={img.url}>
                            {otherIcons.attachemnet_preview_svg}
                          </a>
                          <span className="tooltip-text">{img.name}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <h4>Created By</h4>
                    <p>{userData?.created_by || "-"}</p>
                  </div>
                  <div>
                    <h4> Created At</h4>
                    <p>{formatDate(fileDetail?.created_at) || "-"}</p>
                  </div>

                  <div>
                    <h4>Notify any others</h4>
                    <p
                      title={notify_any_others || "-"}
                      style={{ cursor: "pointer" }}
                    >
                      {notify_any_others
                        ? notify_any_others
                            .split(",")
                            .map((email) => email.trim()) 
                            .join(", ").length > 20 
                          ? `${notify_any_others.substring(0, 20)}...`
                          : notify_any_others
                        : "-"}
                    </p>
                  </div>
                  {departments.length > 0 && (
                    <div>
                      <h4>Department</h4>
                      <p>{departmentNames || "-"}</p>
                    </div>
                  )}
                  {user_id.length > 0 && (
                    <div>
                      <h4>Employee</h4>
                      <p>{user_id_data || "-"}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="card">
                <div className="top_head">
                  {" "}
                  <h3>
                    {" "}
                    <span>{otherIcons.file_description}</span>File Description
                  </h3>
                </div>
                <div className="contentInformation"></div>
                <div id="DescriptionJOB" style={{ marginTop: "-25px" }}>
                  <p className="paragra">{fileDetail?.description || "-"}</p>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="error"
          />
        </>
      )}
    </div>
  );
};

export default FileDetails;
