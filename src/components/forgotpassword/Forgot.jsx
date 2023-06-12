import React, { useState } from 'react';
import './Forgot.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [verified, setVerified] = useState(false)
    const navigation = useNavigate()

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handleSendOtp = async () => {
        try {
            const response = await axios.post('https://myfullstackapu.onrender.com/forgot', { email });
            if (response) {
                setIsOtpSent(true);
                alert('OTP has been sent to your email address');
            }
        } catch (error) {
            console.log(error)
            alert('Error sending OTP. Please try again.');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('https://myfullstackapu.onrender.com/verify-otp', { email, otp });
            if (response) {
                alert('OTP verification successful!');
                setVerified(true)
                navigation('/login')
            }
            
        } catch (error) {
            alert('Invalid OTP. Please try again.');
        }
    };

    if (!isOtpSent) {
        return (
            <div className='otp-holder'>
                <div className='otp-container'>
                    <h1>Enter OTP</h1>
                    <input type='email' value={email} onChange={handleEmailChange} placeholder='enter your email address' />
                    <button onClick={handleSendOtp}>Send OTP</button>
                </div>
            </div>
        );
    }
    // if (isOtpSent && verified) {
    //     return (
    //         <div className='otp-holder'>
    //             <div className='otp-container'>
    //                 <h1>Enter OTP</h1>
    //                 <div>
    //                     <input value={otp} onChange={handleOtpChange} placeholder='enter the OTP' />
    //                 </div>
    //                 <div>
    //                     <button onClick={handleVerifyOtp}>Verify OTP</button>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
    return (
        <div className='otp-holder'>
            <div className='otp-container'>
                <h1>Enter OTP</h1>
                <div>
                    <input value={otp} onChange={handleOtpChange} placeholder='enter the OTP' />
                </div>
                <div>
                    <button onClick={handleVerifyOtp}>Verify OTP</button>
                </div>
            </div>
        </div>
    );
};

export default Forgot;
