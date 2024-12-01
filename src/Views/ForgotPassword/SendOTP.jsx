import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import imageaccount2 from '../../assets/logo.png';
import Confetti from 'react-confetti';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [email, setEmail] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sms, setSms] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('OTPsent_email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  // OTP input handling
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus to next input field
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] === "") {
        if (index > 0) {
          document.getElementById(`otp-input-${index - 1}`).focus();
        }
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Send OTP request (this function will only be called when the user clicks a button)
  const sendOTPRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://hrms.dragnilifecare.in/public/api/email-get-otp', { email });
      console.log('response', response.data)
      if (response.data.message === 'OTP sent successfully on your registered Email id.') {
        setSms('OTP sent successfully');
        toast.success('OTP sent successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setSms('Failed to send OTP. Please try again.');
        toast.error('Failed to send OTP. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      toast.error(sms || 'An error occurred while sending OTP. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSms('An error occurred while sending OTP. Please try again.');
      setError('An error occurred while sending OTP. Please try again.');
    }
    setLoading(false);
  };

  // Handle OTP validation and form submission
  const handleSubmit = async (e) => {
    e && e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const otpCode = otp.join("");
      const response = await axios.post('https://hrms.dragnilifecare.in/public/api/validate-otp', { email, otp: otpCode });

      if (!response.data.error) {
        const token = response.data.access_token;
        setSms('OTP matched successfully');
        toast.success('OTP matched successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          navigate('/set-new-password');
          setShowAlert(false);
        }, 1000);

        localStorage.setItem('access_tokenOTP', token);
      } else {
        setError(response.data.message || "Invalid OTP");
        setSms(response.data.message || 'Invalid OTP');
        toast.error('Invalid OTP', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      toast.error('Please try again', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setError('An error occurred while verifying OTP. Please try again.');
      setSms('An error occurred while verifying OTP. Please try again.');


    }
    setLoading(false);
  };

  // Handle Resend OTP
  const handleResendOTP = () => {
    sendOTPRequest(); // Only sending OTP on button click
  };

  const navigateClose = () => {
    navigate('/forgot-password');
  };

  return (
    <div className='PasswordNew'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="error"
      />
      <div className="forgot-password-container" id="verify">
        <div className="topHeads">
          <div className='accountimage2'>
            <img src={imageaccount2} alt="Sign Up" />
          </div>
          <div className="crossBtn" onClick={navigateClose}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </span>
          </div>
        </div>
        <h3>Enter Your Code</h3>
        <p className="recovery-message">
          Please enter the OTP sent to <span>{email}</span>
        </p>

        {/* {error && <p className="error-message">{error}</p>} */}

        <form onSubmit={handleSubmit} id="Indexx">
          <div className="otp-inputs" id="INputsss">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                maxLength="1"
                className="otp-box"
                disabled={loading}
              />
            ))}
          </div>
        </form>

        <p className="resend-container">
          Didn't receive the email? <a href="#" onClick={handleResendOTP}>Click to Resend</a>
        </p>
        <button className="codeOTP Otp" id="btn11" type="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Verifying...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default SendOTP;
