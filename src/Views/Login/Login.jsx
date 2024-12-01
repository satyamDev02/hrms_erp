import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import Alert from '@mui/material/Alert';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { otherIcons } from '../../components/Helper/icons';
import imageaccount1 from '../../assets/logo.png';
import Slider from "react-slick";
import loginImage from '../../assets/loginImage1.png';
import loginImage2 from '../../assets/loginImage2.png';
import loginImage3 from '../../assets/loginImage3.png';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Actions/loginActions';

const Login = ({ setIsLoggedIn }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state?.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginData = {
        email,
        password
      }
      dispatch(login(loginData))
        .then((res) => {
          if (res.success) {
            setIsLoggedIn(true);
            navigate('/');
            // setTimeout(() => {
            //   navigate('/');
            // }, 1000);
          }
        })
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  const validatePassword = (password) => {
    // const minLength = 8;
    // const hasNumber = /\d/;
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    // return password.length >= minLength && hasNumber.test(password) && hasSpecialChar.test(password);
    return password;
  };

  const navigateSignUP = () => {
    navigate('/sign-up');
  }

  const navigatePass = () => {
    navigate('/forgot-password');
  }

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: loginImage,
      text1: "Access Personal Information",
      text2: "View and update your personal and employment details easily"
    },
    {
      image: loginImage2,
      text1: "View Attendance Records",
      text2: "Check employee daily, monthly, and annual attendance records and download reports"
    },
    {
      image: loginImage3,
      text1: "Track Performance",
      text2: "Access employee performance reviews, set goals, and monitor employee progress."
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    customPaging: (i) => (
      <div
        style={{
          width: i === currentSlide ? "1vw" : "1vw",
          // marginRight: i == currentSlide ? '20px' : '10px',
          // paddingLeft:"10px",
          height: "0.3vw",
          background: i === currentSlide ? "#400F6F" : "white",
          borderRadius: "0.5vw",
          transition: "all 2s ease",
          marginTop: i === currentSlide ? "0.9vw" : "1vw",
          gap: '20px',

        }}
      />
    ),
    dotsClass: "slick-dots slick-thumb custom-dots",
  };

  return (
    <div className="login-container">
      {/* {loginUser?.loading ? <Alert className='Alert' severity="success">{sms}</Alert> : ''} */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      // theme="error"
      />
      <div className="login-image">
        <div>
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="Img_main">
                <div className='roundBg'>
                  <img src={slide.image} alt={`Slide ${index + 1}`} />
                  {/* <div className='chair_shadow'></div> */}
                  <div className="overlay-text">
                    <p className="access-infoo">{slide.text1}</p>
                    <p className="details-info">{slide.text2}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="login-form">
        <div>
          <div className='accountimage'>
            <img src={imageaccount1} alt="Sign Up" />
          </div>

          <h3 className='welcome'>Welcome Back!  <span className='wave'>👋</span></h3>
          <label className="name">Log In to Manage Your HR Task</label>
          <br /> <br />
          <form onSubmit={handleLogin} className='loginAlignmentform' id="Formmm">
            <div id='emailform' className='input1'>
              <label className="address labelL">Email*</label>
              <input
                className='valueform'
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ color: '#b0acac' }}
                required
              />
            </div>
            <div className='input1'>
              <label className='passwordform labelL'>Password*</label>
              <input
                className='valueform'
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eyeicon" onClick={togglePasswordVisibility}>
                {showPassword ?
                  otherIcons.show_password_svg
                  :
                  otherIcons.hide_password_svg
                }
              </span>
            </div>
            <div className="remember-forgot-container">
              <div className="remember-me">
                <input type="checkbox" id="rememberMe" className='checkbox' />
                <label className="rememberMe1">Remember Me</label>
              </div>
              <div className="forgot-password">
                <a style={{ fontSize: '13px', cursor: 'pointer' }} onClick={navigatePass}>
                  Forget Password?
                </a>
              </div>
            </div>
            <div className="button-container">
              {!loginUser?.loading ?
                <button type="submit" className='btnnn' >
                  Login
                </button>
                :
                <button type="submit" className='btnnn' disabled>
                  <div id='svg_login_loading'>
                    <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                      <circle fill="#fff" stroke="none" cx="10" cy="50" r="7" >
                        <animateTransform
                          attributeName="transform"
                          dur="1s"
                          type="translate"
                          values="0 15 ; 0 -15; 0 15"
                          from="0 50 48"
                          to="360 50 52"
                          repeatCount="indefinite"
                          begin="0.1" />
                        <animate
                          attributeName="opacity"
                          dur="1s"
                          values="0;1;0"
                          repeatCount="indefinite"
                          begin="0.2" />
                      </circle>
                      <circle fill="#fff" stroke="none" cx="35" cy="50" r="7">
                        <animateTransform
                          attributeName="transform"
                          dur="1s"
                          type="translate"
                          values="0 10 ; 0 -10; 0 10"
                          repeatCount="indefinite"
                          begin="0.2" />
                        <animate
                          attributeName="opacity"
                          dur="1s"
                          values="0;1;0"
                          repeatCount="indefinite"
                          begin="0.2" />
                      </circle>
                      <circle fill="#fff" stroke="none" cx="60" cy="50" r="7">
                        <animateTransform
                          attributeName="transform"
                          dur="1s"
                          type="translate"
                          values="0 5 ; 0 -5; 0 5"
                          repeatCount="indefinite"
                          begin="0.3" />
                        <animate
                          attributeName="opacity"
                          dur="1s"
                          values="0;1;0"
                          repeatCount="indefinite"
                          begin="0.2" />
                      </circle>
                      <circle fill="#fff" stroke="none" cx="85" cy="50" r="7">
                        <animateTransform
                          attributeName="transform"
                          dur="1s"
                          type="translate"
                          values="0 5 ; 0 -5; 0 5"
                          repeatCount="indefinite"
                          begin="0.4" />
                        <animate
                          attributeName="opacity"
                          dur="1s"
                          values="0;1;0"
                          repeatCount="indefinite"
                          begin="0.2" />
                      </circle>
                    </svg>
                  </div>
                </button>
              }
              {/* <div className="Underline2">
                <hr className="line1" />
                <span>Or</span>
                <hr className="line1" />
              </div> */}
            </div>
            <div className='distancelogin'>
              {/* <h6 className="login1">Login With</h6> */}
            </div>
            {/* <div className="social-media-container">
              <a href="/" className="social-icon">
                <img src={ImgG} alt="" />

              </a>
              <a href="/" className="social-icon">
                <img src="" alt="" />
              </a>
              <a href="/" className="social-icon">
                <img src={ImgF} alt="" />
              </a>
              <a href="/" className="social-icon">
                <img src={ImgT} alt="" />
              </a>
              <a href="/" className="social-icon">
                <img src={ImgM} alt="" />
              </a>
              <a href="/" className="social-icon">
                <img src={ImgL} alt="" />
              </a>
            </div> */}
            <div className='wholeaccount'>
              {/* <h6 className='accountant'>Do you have an account yet? <a style={{ cursor: 'pointer' }} onClick={navigateSignUP}>Sign Up</a></h6> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
