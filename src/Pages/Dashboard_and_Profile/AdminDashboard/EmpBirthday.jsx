import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { otherIcons } from "../../../components/Helper/icons";
import { getEmployeeList } from "../../../Redux/Actions/employeeActions";
import { formatDate3 } from "../../../utils/common/DateTimeFormat";
import { dummyImageUrl } from "../../../utils/Constant";

const EmpBirthday = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Data from redux
  const employeeData = useSelector((state) => state?.employeeList);
  const employeeLists = employeeData?.data?.result || [];
  const totalItems = employeeData?.data?.count || 0;
  const employeeListLoading = employeeData?.loading || false;

  const fetchEmpList = () => {
    const sendData = {};
    dispatch(getEmployeeList(sendData));
  };

  useEffect(() => {
    fetchEmpList();
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const handleShowAll = () => {
    navigate("/birthday");
  };
  return (
    <div className="left_Bottom_cart" onClick={handleShowAll}>
      <div className="header_Birthday">
        <h3>Employee Birthday</h3>
        <div>
          {/* <LiaBirthdayCakeSolid /> */}
          <span className="BirthdaySVG">{otherIcons.birthday_svg}</span>
        </div>
      </div>
      <div className="top_border"></div>
      <div className="Emp">
        <Slider {...settings}>
          {employeeLists?.filter(
            (emp) => formatDate3(emp?.date_of_birth) === formatDate3(new Date())
          ).length > 0 ? (
            employeeLists?.map((emp, i) => {
              let imageUrl = dummyImageUrl;
              let parsedImage = [];

              try {
                parsedImage = emp?.image ? JSON.parse(emp?.image) : [];
              } catch (error) {
                console.error("Failed to parse JSON:", emp?.image, error);
              }

              imageUrl =
                parsedImage?.length > 0 ? parsedImage[0]?.url : dummyImageUrl;

              if (formatDate3(emp?.date_of_birth) === formatDate3(new Date())) {
                return (
                  <div key={i} className="div_dob">
                    <div className="img_dob_name">
                      <img src={imageUrl} alt={emp.name} />
                      <div>
                        <h3>
                          {emp?.first_name || "-"} {emp?.last_name || "-"}
                        </h3>
                        <p>{formatDate3(emp.date_of_birth) || "-"}</p>
                      </div>
                    </div>
                    {/* <p>{emp.email}</p> */}
                    <img
                      src="https://i.pinimg.com/originals/85/82/1b/85821bd4bbd0fedade2553543bb79ac7.gif"
                      alt="Celebration GIF"
                    />
                  </div>
                );
              }
              return null;
            })
          ) : (
            <div className="no-birthday-today">
              <h3
                style={{
                  textAlign: "center",
                  //   marginTop: "120px",
                  fontWeight: 200,
                }}
              >
                No Employee Birthday 
              </h3>
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default EmpBirthday;
