import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { RxCross2 } from "react-icons/rx";
import { uploadBytes, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { GrCloudUpload } from "react-icons/gr";
import "../styles/MultiImageUpload.scss";
import { imageDB } from "../configs/firebase";
import { OutsideClick } from "../Pages/Employee_onboarding/AddEmployee/OutsideClick";

export const MultiImageUpload = ({ formData, setFormData, fieldName, isUploading, setIsUploading }) => {

  const { isOpen: isOpenPop, ref: isOpenPopRef, buttonRef: isOpenPopButtonRef, handleToggle: toggleOpenPop, setIsOpen: setisOpenPopOpen } = OutsideClick();
  const [selectedImage, setSelectedImage] = useState("");
  const popupRef = useRef(null);
  const [progress, setProgress] = useState(0); // State to track upload progress
  const [showTooltip, setShowTooltip] = useState(false);
 const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageChange = (e) => {
    setIsUploading(true);
    const updatedUploadDocuments = [];

    Promise.all(
      Array.from(e.target.files).map((file) => {
        const imageRef = ref(imageDB, `Documents/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(imageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Update progress bar percentage
              const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setProgress(progressPercent);
            },
            (error) => {
              console.error("Error uploading image:", error);
              setIsUploading(false);
              setProgress(0);
              reject(error);
            },
            () => {
              // Get the download URL and store it after upload is complete
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                updatedUploadDocuments.push({
                  name: file.name,
                  url: url,
                });
                resolve(); // Resolve promise after URL retrieval
              });
            }
          );
        });
      })
    )
      .then(() => {
        // Set form data after all uploads are complete
        setFormData({
          ...formData,
          [fieldName]: updatedUploadDocuments,
        });
        setIsUploading(false);
        setProgress(0); // Reset progress bar
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        setIsUploading(false);
        setProgress(0); // Reset progress in case of error
      });
  };

  // const showimagepopup = (imageUrl) => {
  //   setSelectedImage(imageUrl);
  // };

  // Show image popup
  const showImagePopup = (imageUrl) => {
    try {
      if (imageUrl) {
        setSelectedImage(imageUrl);
        setisOpenPopOpen(true);
      } else {
        console.error("Image URL is invalid!");
      }
    } catch (error) {
      console.error("Error in showImagePopup:", error);
    }
  };
  // Image List Example (replace this with your actual data)
  const imageList = formData?.[fieldName]?.map(image => image.url) || [];

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const renderFileNames = () => {
    const fileNames = formData?.[fieldName]?.length > 0
      ? formData[fieldName]?.map(image => image.name).join(', ')
      : 'Attachment';

    const fileNamesArray = fileNames.split(', '); // Split the file names by comma and space

    if (fileNamesArray.length > 0) {
      return (
        <span
          className="file-names-truncated"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Display each file name on a new line */}
          {fileNames.slice(0, 48) + '...'}
          {showTooltip && (
            <div className="tooltip">
              {fileNames.replace(/(.{60})/g, '$1\n')}
            </div>
          )}

          {showTooltip && (
            <div className="tooltip" style={{ textAlign: 'start' }}>
              {/* Display all file names with new lines in the tooltip */}
              {fileNamesArray.map((fileName, index) => (
                <div key={index}>
                  {index + 1}. {fileName}
                </div>
              ))}
            </div>
          )}
        </span>
      );
    } else {
      return fileNames;
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length); // Move to the next image
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + imageList.length) % imageList.length // Move to the previous image
    );
  };

  return (
    <>
      <div className="form-group">
        <div className="file-upload">
          <input
            type="file"
            name={fieldName}
            id={`file-${fieldName}`}
            onChange={handleImageChange}
            className="inputmultiple"
            accept="image/*"
            multiple
          />
          <label className="file-label fileUplodBox file-label-M">
            <label htmlFor={`file-${fieldName}`} className="custom-file-upload">
              {!formData?.[fieldName]?.length && !isUploading && <GrCloudUpload size={20} />}
              {/* {isUploading && <span>Uploading...</span>} */}

              {isUploading && (
                <div className="progress-bar">
                  {/* {isUploading && <span>{progress}%</span>} */}
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                  >
                    {isUploading && <span>{progress}%</span>}
                  </div>
                </div>
              )}
              {/* {!isUploading && <span>{formData?.[fieldName]?.length > 0 ? formData[fieldName].map(image => image.name).join(', ') : 'Attachment'}</span>} */}
              {/* {!isUploading && renderFileNames()} */}
              {!isUploading && (
                <span>
                  {formData?.[fieldName]?.length === 0
                    ? "Attachment"
                    : `${formData[fieldName]?.length} attachment${formData[fieldName]?.length > 1 ? "s" : ""} uploaded`}
                </span>
              )}
            </label>
            <>
              <span className="Show_delete_img_new_vendor" >
                {formData?.[fieldName]?.length >= 1 ?
                  <span className="showImg" >
                    <svg onClick={toggleOpenPop} ref={isOpenPopButtonRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#9b9b9b" fill="none">
                      <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                      <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                    </svg>
                  </span>
                  : ''
                }
              </span>
            </>
          </label>
        </div>
      </div>

      {/* {isOpenPop && (
        <div className="imageviewlive">
          <div className="popup-content" ref={isOpenPopRef}>
            <span className="close-button" onClick={() => setisOpenPopOpen(false)}>
              <RxCross2 />
            </span>
            <img src={selectedImage} alt="Selected Image" />
          </div>
        </div>
      )} */}

      {isOpenPop && (
        <div className="imageviewlive">
          <div className="popup-content" ref={isOpenPopRef}>
            <span className="close-button" onClick={() => setisOpenPopOpen(false)}>
              <RxCross2 />
            </span>
            <div className="image-navigator">
              <div className="navition_left_right">
                <div onClick={handlePrevious} className="nav-button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" color="#ffffff" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                    <path d="M13.5 16C13.5 16 10.5 13.054 10.5 12C10.5 10.9459 13.5 8 13.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div onClick={handleNext} className="nav-button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" color="#ffffff" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                    <path d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="image-container">
                <img
                  src={imageList[currentIndex]}
                  alt={`Image ${currentIndex}`}
                  className="popup-image"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export const ImageUpload = ({ formData, setFormData, fieldName, isUploading, setIsUploading, setError}) => {

  const { isOpen: isOpenPop, ref: isOpenPopRef, buttonRef: isOpenPopButtonRef, handleToggle: toggleOpenPop, setIsOpen: setisOpenPopOpen } = OutsideClick();
  const [selectedImage, setSelectedImage] = useState("");
  const popupRef = useRef(null);
  const [progress, setProgress] = useState(0); // State to track upload progress
  const [showTooltip, setShowTooltip] = useState(false);

  const handleImageChange = (e) => {
    setIsUploading(true);
    const updatedUploadDocuments = [];

    Promise.all(
      Array.from(e.target.files).map((file) => {
        const imageRef = ref(imageDB, `Documents/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(imageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Update progress bar percentage
              const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setProgress(progressPercent);
            },
            (error) => {
              console.error("Error uploading image:", error);
              setIsUploading(false);
              setProgress(0);
              reject(error);
            },
            () => {
              // Get the download URL and store it after upload is complete
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                updatedUploadDocuments.push({
                  name: file.name,
                  url: url,
                });
                resolve(); // Resolve promise after URL retrieval
              });
            }
          );
        });
      })
    )
      .then(() => {
        // Set form data after all uploads are complete
        setFormData({
          ...formData,
          [fieldName]: updatedUploadDocuments,
        });
        setIsUploading(false);
        setProgress(0); // Reset progress after complete upload
        setError((prevErrors) => ({
          ...prevErrors,
          [fieldName]: false,
        }));
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        setIsUploading(false);
        setProgress(0); // Reset progress in case of error
      });
  };

  const showimagepopup = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleDeleteImage = (imageUrl) => {
    const updatedImages = formData?.[fieldName]?.filter(
      (image) => image.url !== imageUrl
    );
    setFormData({
      ...formData,
      [fieldName]: updatedImages,
    });
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const renderFileNames = () => {
    const fileNames = formData?.[fieldName]?.length > 0
      ? formData[fieldName]?.map(image => image.name).join(', ')
      : 'Attachment';

    if (fileNames.length > 40) {
      return (
        <span
          className="file-names-truncated"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {fileNames.slice(0, 48) + '...'}
          {showTooltip && (
            <div className="tooltip">
              {fileNames.replace(/(.{60})/g, '$1\n')}
            </div>
          )}
        </span>
      );
    } else {
      return fileNames;
    }
  };
  return (
    <>
      <div className="file-upload">
        <input
          type="file"
          name={fieldName}
          id={`file-${fieldName}`}
          onChange={handleImageChange}
          className="inputmultiple"
        />
        <label className="file-label fileUplodBox file-label-M">
          <label htmlFor={`file-${fieldName}`} className="custom-file-upload">
            {!formData?.[fieldName]?.length && !isUploading && <GrCloudUpload size={20} />}
            {/* {isUploading && <span>Uploading...</span>} */}

            {isUploading && (
              <div className="progress-bar">
                {/* {isUploading && <span>{progress}%</span>} */}
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                >
                  {isUploading && <span>{progress}%</span>}
                </div>
              </div>
            )}
            {/* {!isUploading && <span>{formData?.[fieldName]?.length > 0 ? formData[fieldName].map(image => image.name).join(', ') : 'Attachment'}</span>} */}
            {!isUploading && renderFileNames()}
          </label>
          <>
            {formData?.[fieldName]?.map((image, index) => (
              <span className="Show_delete_img_new_vendor" key={index} >
                <span className="showImg" onClick={() => showimagepopup(image.url)}>
                  <svg onClick={toggleOpenPop} ref={isOpenPopButtonRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#9b9b9b" fill="none">
                    <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                    <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                  </svg>
                </span>
              </span>
            ))}
          </>
        </label>
      </div>
      {isOpenPop && (
        <div className="imageviewlive">
          <div className="popup-content" ref={isOpenPopRef}>
            <span className="close-button" onClick={() => setisOpenPopOpen(false)}>
              <RxCross2 />
            </span>
            <img src={selectedImage} alt="Selected Image" />
          </div>
        </div>
      )}
    </>
  );
};

export const DocumentUploader = ({
  formData,
  setFormData,
  loading,
  setLoading,
  section, // e.g., 'experiences' or 'educations'
  index,   // Index within the section
  fieldName // Specific field to update, e.g., 'experience_letter' or 'attachment'
}) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const popupRef = useRef(null);
  const { isOpen: isOpenPop, ref: isOpenPopRef, buttonRef: isOpenPopButtonRef, handleToggle: toggleOpenPop, setIsOpen: setisOpenPopOpen } = OutsideClick();
  const [progress, setProgress] = useState(0); // State to track upload progress

  const handleImageChange = (e) => {
    setIsUploading(true);
    const updatedUploadDocuments = [];

    Promise.all(
      Array.from(e.target.files).map((file) => {
        const imageRef = ref(imageDB, `Documents/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(imageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Progress percentage calculation
              const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setProgress(progressPercent);
            },
            (error) => {
              console.error("Error uploading image:", error);
              setIsUploading(false);
              setProgress(0); // Reset progress on error
              reject(error);
            },
            () => {
              // Retrieve download URL after successful upload
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                updatedUploadDocuments.push({
                  name: file.name,
                  url: url,
                });
                resolve(); // Resolve promise after getting URL
              });
            }
          );
        });
      })
    )
      .then(() => {
        // Update formData field after all uploads complete
        const updatedItems = formData?.[section]?.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              [fieldName]: [
                ...(item[fieldName] || []),
                ...updatedUploadDocuments,
              ],
            };
          }
          return item;
        });

        setFormData({
          ...formData,
          [section]: updatedItems,
        });

        setIsUploading(false);
        setProgress(0); // Reset progress after completion
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        setIsUploading(false);
        setProgress(0); // Reset progress on error
      });
  };

  const showimagepopup = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const item = formData?.[section]?.[index] || {};


  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const renderFileNames = () => {
    const fileNames = item?.[fieldName]?.length > 0
      ? item[fieldName].map(image => image.name).join(', ')
      : 'Attachment';

    if (fileNames.length > 40) {
      return (
        <span
          className="file-names-truncated"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {fileNames.slice(0, 48) + '...'}
          {showTooltip && (
            <div className="tooltip">
              {fileNames.replace(/(.{60})/g, '$1\n')}
            </div>
          )}
        </span>
      );
    } else {
      return fileNames;
    }
  };
  return (
    <>
      <div className="file-upload">
        <input
          type="file"
          name={fieldName}
          id={`file-${fieldName}`}
          onChange={handleImageChange}
          // accept="image/*"
          // accept=".pdf,.doc,.docx" // specify document types if needed
          className="inputmultiple"
        />
        <label className="file-label fileUplodBox file-label-M">
          <label htmlFor={`file-${fieldName}`} className="custom-file-upload">
            {!item?.[fieldName]?.length && !isUploading && <GrCloudUpload size={20} />}
            {/* {isUploading ? (<span>Uploading...</span>) : (
                <span>
                  {item?.[fieldName]?.length > 0 ?
                    item?.[fieldName]?.map(image => image.name).join(', ') :
                    'Attachment'}
                </span>
              )} */}
            {isUploading && (
              <div className="progress-bar">
                {/* {isUploading && <span>{progress}%</span>} */}
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                >
                  {isUploading && <span>{progress}%</span>}
                </div>
              </div>
            )}
            {!isUploading && renderFileNames()}

          </label>
          {/* <label htmlFor={`file-${fieldName}-${index}`} className="custom-file-upload">
                            {!item?.[fieldName]?.length && !loading && <GrCloudUpload size={20} />}
                            {loading && <span>Uploading...</span>}
                            {!loading && <span>{item?.[fieldName]?.length > 0 ? item?.[fieldName]?.map(image => image.name).join(', ') : 'Attachment'}</span>}
                        </label> */}
          <>
            {item?.[fieldName]?.map((image, index) => (
              <span className="Show_delete_img_new_vendor" key={index}>
                {!isUploading ?
                  <span className="showImg" onClick={() => showimagepopup(image.url)}>
                    <svg onClick={toggleOpenPop} ref={isOpenPopButtonRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#9b9b9b" fill="none">
                      <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                      <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                    </svg>
                  </span>
                  : ''}
              </span>
            ))}
          </>
        </label>
      </div>

      {isOpenPop && (
        <div className="imageviewlive" >
          <div className="popup-content" ref={isOpenPopRef}>
            <span className="close-button" onClick={() => setisOpenPopOpen(false)}>
              <RxCross2 />
            </span>
            <img src={selectedImage} alt="Selected Image" />
          </div>
        </div>
      )}
    </>
  );
};


export const ResumeUpload = ({
  formData,
  setFormData,
  fieldName,
  isUploading,
  setIsUploading,
  setErrors,
}) => {

  const [progress, setProgress] = useState(0);
  const popupRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleFileChange = (e) => {
    setIsUploading(true);
    const updatedUploadDocuments = [];
    const files = Array.from(e.target.files);
    const totalFiles = files.length;
    let uploadedBytes = 0;

    Promise.all(
      files.map((file) => {
        const fileRef = ref(imageDB, `Documents/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Calculate combined progress across all files
              const fileProgress = snapshot.bytesTransferred;
              uploadedBytes += fileProgress;
              const totalBytes = files.reduce((acc, curr) => acc + curr.size, 0);
              const combinedProgress = Math.round((uploadedBytes / totalBytes) * 100);
              if (combinedProgress <= 100) {
                setProgress(combinedProgress); // Update progress for all files

              }
            },
            (error) => {
              console.error("Error uploading file:", error);
              setIsUploading(false);
              setProgress(0);
              reject(error);
            },
            () => {
              // Once upload is complete, get download URL
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                updatedUploadDocuments.push({
                  name: file.name,
                  url: url,
                  type: file.type,
                });
                resolve(); // Resolve after URL is obtained
              });
            }
          );
        });
      })
    )
      .then(() => {
        // Update form data after all files are uploaded
        setFormData({
          ...formData,
          [fieldName]: updatedUploadDocuments,
        });
        setIsUploading(false);
        setProgress(0); // Reset progress after complete upload
        setErrors((prevErrors) => ({
          ...prevErrors,
          resume: false,
        }));
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
        setIsUploading(false);
        setProgress(0); // Reset progress on error
      });
  };

  const handlePreviewFile = (file) => {
    if (file.type === "application/pdf") {
      window.open(file.url, "_blank");
    }
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const renderFileNames = () => {
    const fileNames = formData?.[fieldName]?.length > 0
      ? formData[fieldName]?.map(image => image.name).join(', ')
      : 'Attachment';

    if (fileNames.length > 40) {
      return (
        <span
          className="file-names-truncated"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {fileNames.slice(0, 48) + '...'}
          {showTooltip && (
            <div className="tooltip">
              {fileNames.replace(/(.{60})/g, '$1\n')}
            </div>
          )}
        </span>
      );
    } else {
      return fileNames;
    }
  };

  return (
    <>
      <div className="file-upload">
        <input
          type="file"
          name={fieldName}
          id={`file-${fieldName}`}
          onChange={handleFileChange}
          className="inputmultiple"
          accept="application/pdf"
        />
        <label className="file-label fileUplodBox file-label-M">
          <label htmlFor={`file-${fieldName}`} className="custom-file-upload">
            {!formData?.[fieldName]?.length && !isUploading && (
              <GrCloudUpload size={20} />
            )}
            {/* {isUploading && (
              <span>Uploading... {Math.round(progress)}%</span>
            )} */}
            {isUploading && (
              <div className="progress-bar">
                {/* {isUploading && <span>{progress}%</span>} */}
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                >
                  {isUploading && <span>{progress}%</span>}
                </div>
              </div>
            )}
            {/* {!isUploading && (
              <span>
                {(formData?.[fieldName] && formData?.[fieldName]?.length > 0
                  ? renderFileName(formData?.[fieldName][0]?.name)
                  : "Attachment")}
              </span>
            )} */}
            {!isUploading && renderFileNames()}

          </label>

          {/* Display uploaded file and preview option */}
          {Array.isArray(formData?.[fieldName]) &&
            formData?.[fieldName]?.map((file, index) => (
              <span className="Show_delete_img_new_vendor" key={index}>
                <span className="showFile" onClick={() => handlePreviewFile(file)}>
                  {!isUploading ?
                    <span className="showImg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="28"
                        height="28"
                        color="#9b9b9b"
                        fill="none"
                      >
                        <path
                          d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </span>
                    : ''}
                </span>
              </span>
            ))}
        </label>
      </div>
    </>
  );
};