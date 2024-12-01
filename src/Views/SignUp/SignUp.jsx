
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Make sure this path is correct
// import signupimage from '../assets/signupimage.png';
// import { BsGoogle, BsMicrosoft, BsLinkedin } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // You'll need to install react-icons if you haven't already
import imageaccount from '../../assets/onlylogo.png';
import ImgG from '../../assets/google.png'
import ImgM from '../../assets/microsoft.png'
import ImgL from '../../assets/LinkedIn.png'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const SignUp = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setcompanyName] = useState('');
  const [numberofEmployee, setnumberofEmployee] = useState('');
  const [name, setname] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+1'); // Default to US code

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const passwordIsValid = validatePassword(password);
    const fullPhoneNumber = `${countryCode} ${phonenumber}`;
    if (email && password && phonenumber && passwordIsValid) {
      // Handle sign up logic here
      navigate('/login'); // Redirect to login page after sign up
    } else {
      alert('Please make sure all fields are filled correctly and passwords match.');
    }
    if (!passwordIsValid) {
      alert('Password must be at least 8 characters long, contain at least one number, and one special character.');
    } else {
      alert('Please enter both email and password.');
    }
  };

  const navigateSign = () => {
    navigate('/');
  }


  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return password.length >= minLength && hasNumber.test(password) && hasSpecialChar.test(password);
  };

  const [value, setValue] = useState()

  return (
    <div className="signup-container">
      <div className="signup-image">
        <div id='img'></div>
        {/* <img src={signupimage} alt="Sign Up" />
        <div className="text-overlay">
          <p className="line1">Let's get</p>
          <p className="line2">started!</p>
        </div> */}
      </div>
      <div className="signupform">
        <div className='accountimage1'>
          <img src={imageaccount} alt="Sign Up" />
        </div>

        <h3>Create An Account!</h3>
        <p className="signup-trial">Let's get started with your <span className="highlight">30 Days Free Trial</span> </p>


        <form className="wholeF" onSubmit={handleSubmit} id="signupwholedesign">

          <div>
            <label>Name<span className="mandatory">*</span></label>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
              className='signUP_input'
            />
            
          </div>
          <div>
            <label>Email<span className="mandatory">*</span></label>
            <input
              type="email"
              placeholder="Enter Personal Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='signUP_input'
            />
          </div>
          {/* <div>
            <label>Password<span className="mandatory">*</span></label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div> */}

          <div className="password-container">
            <label>
              Password<span className="mandatory">*</span>
            </label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='signUP_input'
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="phone-number-container">
            <label>Phone Number<span className="mandatory">*</span></label>
            <div className="phone-number-wrapper">
              <div className="country-code-select" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} required>
                <PhoneInput
                  international
                  value={value}
                  onChange={setValue} />
              </div>
              

            </div>
          </div>

          {/* <div>
            <label>Phone Number<span className="mandatory">*</span></label>
            <input
              type="number"
              placeholder="Enter PhoneNumber"
              value={phonenumber}
              onChange={(e) => setphonenumber(e.target.value)}
              required
            />
          </div> */}
          {/* <div className='CompanyName'>
            <label>Company Name</label>
            <input
              className='signUP_input'
              type="text"
              placeholder="Enter Company Name"
              value={companyName}
              onChange={(e) => setcompanyName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Number Of Employees</label>
            <select className='consider'
              value={numberofEmployee}
              onChange={(e) => setnumberofEmployee(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose or Enter Number Of Employees
              </option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-100">51-100</option>
              <option value="101-500">101-500</option>
              <option value="500+">500+</option>
            </select>
          </div> */}

          <div className="terms-container">
            <input type="checkbox" id="agree" name="agree" className="terms-checkbox signUP_input"></input>
            <label htmlFor="agree" className="terms-label">
              I agree to the <span className="highlight">Terms of Service</span> and <span className="highlight">Privacy Policy</span>
            </label>
          </div>

          {/* <div>
            <label>Confirm Password*</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div> */}
          <button type="submit" className='signUP_input'>Start Free Trial</button>
          <div className="Underline signUP_input">
            <hr className="line1" />
            <span>Or</span>
            <hr className="line1" />
          </div>
          <div className='Options' id='options22'>
            <h6 className="with1 ">Login with</h6>
          </div>

          <div className="social-media-container1 signUP_input" id="social22">
            <a href="https://www.google.com" className="social-icon1">
              {/* <BsGoogle /> */}
              <img src={ImgG} alt="" />
            </a>

            <a href="https://www.microsoft.com" className="social-icon1">
              <img src={ImgM} alt="" />
            </a>
            <a href="https://www.linkedin.com" className="social-icon1">
              <img src={ImgL} alt="" />
            </a>
          </div>
          <div className='already11'>
            <h6 className='account11'>Already have an account? <a style={{ cursor: 'pointer' }} onClick={navigateSign}>Sign In</a></h6>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
