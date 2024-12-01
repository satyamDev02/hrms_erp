// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SetNewPassword.css';
import './ForgotPassword.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // If needed
import Confetti from 'react-confetti';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import imageaccount2 from '../../assets/logo.png';

const SetNewPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [sms, setSms] = useState('')
  const [loading, setLoading] = useState(false);

  // Get the token from localStorage
  useEffect(() => {
    const token = localStorage.getItem('access_tokenOTP');
    if (!token) {
      // alert('Token not found. Please verify your OTP again.');
      setSms('Token not found. Please verify your OTP again.')
      navigate('/otp-verification'); // Redirect if no token
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    setSms('')
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        try {
          const token = localStorage.getItem('access_tokenOTP'); // Get token from localStorage
          if (!token) {
            // alert('Token not found. Please verify your OTP again.');
            toast.error(sms || 'Token not found. Please verify your OTP again.', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            // setLoading(false)

            setSms('Token not found. Please verify your OTP again.')
            return;
          }

          // API request payload
          const payload = {
            password: newPassword,
            confirm_password: confirmPassword
          };

          // Sending POST request to reset password API
          const response = await axios.post('https://hrms.dragnilifecare.in/public/api/reset-password', payload, {
            headers: {
              Authorization: `Bearer ${token}` // Sending token in Authorization header
            }
          });

          if (response.status === 200) {
            // alert('Password updated successfully.');
            localStorage.setItem('access_tokenOTP', '');
            setSms('updated your new password Successfully.')
            setTimeout(() => {
              navigate('/login'); // Redirect to login page after password update
            }, 2000);
            toast.success('updated your new password Successfully.', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setLoading(false)

          } else {
            // alert('Error updating password. Please try again.');
            toast.error(sms || 'Error updating password. Please try again.', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setLoading(false)
            setSms('Error updating password. Please try again.')
          }

        } catch (error) {
          console.error('Error resetting password:', error);
          // alert('An error occurred. Please try again.');
          setSms('An error occurred. Please try again.')
          toast.error(sms || 'An error occurred. Please try again.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false)

        }
      } else {
        // alert('Passwords do not match.');
        setSms('Passwords do not match.')
        toast.error(sms || 'Passwords do not match.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false)

      }
    } else {
      // alert('Please fill in both password fields.');
      setSms('Please fill in both password fields.')
      toast.error(sms || 'Please fill in both password fields.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false)

    }
  };

  const navigateClose = () => {
    navigate('/otp-verification');
  }

  return (
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
      <div className="forgot-password-container" id="Contents">
        <div className="topHeads">
          <div className='accountimage2'>
            <img src={imageaccount2} alt="Sign Up" />
          </div>
          <div className="crossBtn" onClick={navigateClose}>
            <span>
              {/* Close button */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </span>
          </div>
        </div>
        <h3>Set New Password</h3>
        <div className='recovery-message'>
          <p>Must be at least 8 characters</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='Elabel newLable'>New Password*</label>
            <input
              type={showPassword1 ? 'text' : 'password'}
              className='entermail NewIN'
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span id='eyeL' onClick={togglePasswordVisibility1}>
              {showPassword1 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div>
            <label className='Elabel newLable'>Re-enter Password*</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className='entermail NewIN'
            />
            <span id='eyeL' onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button className='Otp' id="bt22" type="submit">{loading ? 'Updating... ' : 'Reset Password'}</button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
