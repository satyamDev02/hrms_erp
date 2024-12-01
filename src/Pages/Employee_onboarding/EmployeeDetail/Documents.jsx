import React, { useState, useRef } from "react";
import { GoEye } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import NoDataFound from "../../../utils/common/NoDataFound";

const Documents = ({ employeeData }) => {
  // Parse documents and their attachments
  const employeeDocuments = employeeData?.map((item) => {
    return {
      document_name: item?.document_name,
      document_id: item?.document_id,
      frontAttachments: item?.attachment_1 ? JSON.parse(item.attachment_1) : [],
      backAttachments: item?.attachment_2 ? JSON.parse(item.attachment_2) : [],
    };
  });

  // State for popup
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [viewMode, setViewMode] = useState("front");
  const popupRef = useRef();

  // Function to handle the viewing of document images
  const handleViewDocument = (frontAttachments, backAttachments) => {
    setSelectedImages(
      frontAttachments.length > 0 ? frontAttachments : backAttachments
    );
    setShowPopup(true);
  };

  // Function to toggle between front and back images
  const toggleView = (mode) => {
    setViewMode(mode);
    if (mode === "front") {
      setSelectedImages(
        selectedImages[0]
          ? employeeDocuments.map((doc) => doc.frontAttachments).flat()
          : []
      );
    } else {
      setSelectedImages(
        selectedImages[0]
          ? employeeDocuments.map((doc) => doc.backAttachments).flat()
          : []
      );
    }
  };

  return (
    <div>
      <div className="education">
        <table>
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Document ID</th>
              <th>View Document</th>
            </tr>
          </thead>
          <tbody>
            {employeeDocuments?.length > 0 ? (
              employeeDocuments.map((item, index) => (
                <tr key={index}>
                  <td>{item?.document_name || "-"}</td>
                  <td>{item?.document_id || "-"}</td>
                  <td
                    onClick={() =>
                      handleViewDocument(
                        item?.frontAttachments,
                        item?.backAttachments // corrected here
                      )
                    }
                  >
                    {/* <GoEye color="#9b9b9b" size={28} /> */}
                    <span style={{cursor:'pointer'}}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#4a4a4a" fill="none">
                        <path d="M19 13.0052V10.6606C19 9.84276 19 9.43383 18.8478 9.06613C18.6955 8.69843 18.4065 8.40927 17.8284 7.83096L13.0919 3.09236C12.593 2.59325 12.3436 2.3437 12.0345 2.19583C11.9702 2.16508 11.9044 2.13778 11.8372 2.11406C11.5141 2 11.1614 2 10.4558 2C7.21082 2 5.58831 2 4.48933 2.88646C4.26731 3.06554 4.06508 3.26787 3.88607 3.48998C3 4.58943 3 6.21265 3 9.45908V14.0052C3 17.7781 3 19.6645 4.17157 20.8366C5.11466 21.7801 6.52043 21.9641 9 22M12 2.50022V3.00043C12 5.83009 12 7.24492 12.8787 8.12398C13.7574 9.00304 15.1716 9.00304 18 9.00304H18.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16 22C18.7614 22 21 19 21 19C21 19 18.7614 16 16 16C13.2386 16 11 19 11 19C11 19 13.2386 22 16 22Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        <path d="M15.9902 19H15.9992" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
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
          </tbody>
        </table>
      </div>

      {/* Popup for image view */}
      {showPopup && (
        <div className="imageviewlive">
          <div className="popup-content" ref={popupRef}>
            <span className="close-button" onClick={() => setShowPopup(false)}>
              <RxCross2 />
            </span>
            {selectedImages.length > 0 && (
              <div className="toggle-buttons">
                <button
                  onClick={() => toggleView("front")}
                  style={{ marginRight: "10px" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                    <path d="M13.5 16C13.5 16 10.5 13.054 10.5 12C10.5 10.9459 13.5 8 13.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
                <button onClick={() => toggleView("back")}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                    <path d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
            )}
            {selectedImages.length > 0 ? (
              selectedImages.map((img, index) => (
                <img
                  key={index}
                  src={img.url || "https://via.placeholder.com/150"}
                  alt={img.name}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              ))
            ) : (
              <p>No images available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
