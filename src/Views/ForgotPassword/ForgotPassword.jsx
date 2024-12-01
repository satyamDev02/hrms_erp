import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add axios for API calls
import './ForgotPassword.scss';
import Confetti from 'react-confetti';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import imageaccount2 from '../../assets/logo.png';
import { FaTimes } from 'react-icons/fa';

const ForgotPassword = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [sms, setSms] = useState('')

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigateClose = () => {
    navigate('/login');
  };

  const handleSubmit = async (event) => {
    setSms('')
    event.preventDefault();
    if (email) {
      try {
        setLoading(true); // Show loading when the request starts
        const response = await axios.post('https://hrms.dragnilifecare.in/public/api/email-get-otp', {
          email: email
        });

        if (response.data.message === "OTP sent successfully on your registered Email id.") {
          toast.success(sms || 'OTP sent Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          navigate('/otp-verification'); // Redirect to OTP verification page

          setShowAlert(true)
          setTimeout(() => {
            setShowAlert(false)
          }, 4300);
          setSms('OTP has been sent to your email.')
          // alert('OTP has been sent to your email.');
          localStorage.setItem('OTPsent_email', email);
        } else {
          // alert('Failed to send OTP. Please try again.');
          setSms('Failed to send OTP. Please try again.')
          toast.error(sms || 'OTP sent Failed', {
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
      } catch (error) {
        toast.error(sms || 'OTP sent Failed', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSms(`Error sending OTP:${error}`)
        console.error("Error sending OTP:", error);
        // alert('An error occurred while sending the OTP. Please try again later.');
      } finally {
        setLoading(false); // Hide loading after the request is finished

      }
    } else {
      alert('Please enter your email.');
    }
  };

  const navigateSignUP = () => {
    navigate('/sign-up');
  };


  return (
    <section>

      <div className="PasswordNew">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="error"
        />
        <div className="forgot-password-container" id="forgotten">
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
          <h3>Forget Password ?</h3>
          <p className="recovery-message">
            Don’t worry! Enter your registration email, We will send <span>OTP</span> for password recovery
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='Elabel'>Email*</label>
              <input
                className='entermail'
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className='Otp' disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
            <div className='acct'>
              {/* <h6 className='account'>Do you have an account yet? <a style={{ cursor: 'pointer' }} onClick={navigateSignUP}>Sign Up</a></h6> */}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
