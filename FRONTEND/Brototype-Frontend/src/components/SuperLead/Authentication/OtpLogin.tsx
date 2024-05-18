import React, { useState, useEffect, FunctionComponent, useRef } from 'react';
import { signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../../firebase/config';
import { RecaptchaVerifier } from 'firebase/auth';
import otpLoginPng from "../../../../public/otpLogin.png"
import { setSuperleadData } from "../../../redux-toolkit/superleadReducer"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface OtpData {
    otpData: any;
    superleadId: string;
    phone: number;
    customToken: string;
    accessToken: string;
    // ... other properties
}
declare global {
    interface Window {
        recaptchaVerifier: any;
        confirmationResult: any;
    }
}
// Redux state structure
interface RootState {
    superlead: OtpData;
    // ... other slices of state
}

const ReviewerOtpPage: FunctionComponent = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);//otp state
    const [showResend, setShowResend] = useState(false); //resend otp
    const [error, setError] = useState("")
    const [timer, setTimer] = useState(60);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const otpData: OtpData = useSelector((state: RootState) => state.superlead);
    let phone: React.SetStateAction<string>;
    const superleadIdRef = useRef<string | null>(null);
    const accessTokenRef = useRef<string | null>(null);
    const customTokenRef = useRef<string | null>(null);
    const uniqueIdRef = useRef<string | null>(null);

    useEffect(() => {
  console.log(otpData?.superleadData?.superleadId,"bfjvhdfgjgdfjghdfjgdfhjhgdhgdfjhgdfj123456789000000000");
  
        localStorage.removeItem('otpSent')
        superleadIdRef.current = otpData?.superleadData?.superleadId;
        phone = otpData.superleadData.phone;
        customTokenRef.current = otpData.superleadData.customToken;
        accessTokenRef.current = otpData.superleadData.accessToken;
         uniqueIdRef.current =  otpData.superleadData.uniqueId;
        const hasOtpBeenSent = localStorage.getItem('otpSent');
        if (!hasOtpBeenSent) {
            setUpRecaptcha();
            startCountdown();
            onSignup();
        }

    }, [otpData.superleadData.phone]);

    const setUpRecaptcha = () => {
        console.log('Setting up reCAPTCHA');
        if (!window.recaptchaVerifier) {
            try {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    auth,
                    'recaptcha-container',
                    {
                        size: 'invisible',
                        callback: (response: any) => {
                            console.log('reCAPTCHA resolved:', response);
                            // Call the onSignup function
                            onSignup();
                        },
                        'expired-callback': () => {
                            // Handle expiration if needed
                        },
                    }
                );
            } catch (error) {
                console.error('Error initializing RecaptchaVerifier:', error);
            }
        }
    };

    const onSignup = async () => {
        //send the otp to user phone number
        const appVerifier = window.recaptchaVerifier;
        const formatPh = '+91' + phone;
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, formatPh, appVerifier);
            window.confirmationResult = confirmationResult;
            superleadIdRef.current = otpData?.superleadData?.superleadId;
            customTokenRef.current = otpData?.superleadData?.customToken;
            accessTokenRef.current = otpData?.superleadData?.accessToken;
            uniqueIdRef.current =  otpData?.superleadData?.uniqueId;
            localStorage.setItem('otpSent', 'true');
            toast.success("OTP SEND SUCCESSFULLY")
        } catch (error) {
            clearErrorAfterTimeout();
        }
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    //hansdle chnage otp input function
        e.preventDefault();
        const inputEvent = e.nativeEvent as InputEvent;
        const isBackspace = inputEvent.inputType === 'deleteContentBackward';

        const newOtp = [...otp];
        newOtp[index] = e.target.value;
        setOtp(newOtp);

        const nextInputID = `otp${index + 2}`;
        const prevInputID = `otp${index}`;

        // If the entered digit is not empty and there is a next input field, focus on it
        if (e.target.value !== '' && index < 5 && !isBackspace) {
            const nextInput = document.getElementById(nextInputID) as HTMLInputElement | null;
            if (nextInput) {
                nextInput.focus();
            }
        } else if (isBackspace && index > 0) {
            // If backspace is pressed and there is a previous input field, focus on it
            const prevInput = document.getElementById(prevInputID) as HTMLInputElement | null;
            if (prevInput) {
                prevInput.focus();
            }
        }
    };


    const handleVerifyOtp = (e: React.FormEvent<HTMLFormElement>) => {
        //verify otp function
        e.preventDefault();
        const code = otp.join('');
        try {
            if (code.length === 6) {
                window.confirmationResult.confirm(code).then((result: any) => {
                    console.log("Success: OTP verified", result?.user);
                    const superleadData: any = {
                        superleadId: superleadIdRef.current,
                        accessToken: accessTokenRef.current,
                        customToken: customTokenRef.current,
                        uniqueId : uniqueIdRef.current
                    }
                    console.log(superleadData,"reviewerData comingggg");
                    
                    let superlead = "superlead"
                    localStorage.setItem(`superleadAccessToken`, superleadData?.accessToken)
                    localStorage.setItem("superleadCustomToken", superleadData?.customToken)
                    localStorage.setItem('role', superlead)
                    localStorage.setItem('superleadUniqueId', superleadData?.uniqueId)
                    dispatch(setSuperleadData(superleadData))
                    toast.success("OTP LOGIN SUCCESS")
                    navigate("/superlead")

                }).catch((error: any) => {
                    if (error.code === 'auth/invalid-verification-code') {
                        setError("Incorrect OTP. Please try again.");
                    } else if (error.code === 'auth/code-expired') {
                        setError("Otp expired.Resend it.")
                    } else {
                        setError("please Enter 6 degit otp code");
                    }
                    clearErrorAfterTimeout();
                    console.error("Error in verifying OTP:", error);
                });
            }
        } catch (error) {
            setError("Incorrect OTP. Please try again.");
            clearErrorAfterTimeout();
        }
    }
    const startCountdown = () => {
        let seconds = 60;
        setShowResend(false); // Hide the resend button initially
        setTimer(seconds);

        const countdownInterval = setInterval(() => {
            seconds -= 1;
            setTimer(seconds);

            if (seconds === 0) {
                setShowResend(true); // Show the resend button when the timer reaches 0
                clearInterval(countdownInterval);
            }
        }, 1000);
    };
// resend otp function
    const onResendClick = (e: any) => {
        e.preventDefault()
        setShowResend(false); // Hide the resend button again
        setTimer(60); // Reset the timer to 60 seconds
        setUpRecaptcha();
        onSignup();
        startCountdown(); // Start the countdown again after clicking resend
    };
    const clearErrorAfterTimeout = () => {
        setTimeout(() => {
            setError("");
        }, 5000); // 1000 milliseconds (1 second)
    };

    return (
        <div>
            <div className="bg-white flex flex-row justify-center w-full">
                <div id="recaptcha-container"></div>
                <div className="bg-white overflow-hidden w-[1280px] h-[847px] relative">
                    <div className="absolute w-[1541px] h-[687px] top-[10px] left-[-112px]">
                        <img className="absolute w-[24px] h-[8px] top-0 left-[311px]" alt="Vector" src="" />
                        <div className="absolute w-[1124px] h-[679px] top-0 left-[191px] bg-white" />
                        <div className="absolute w-[1124px] h-[679px] top-0 left-[227px] bg-white" />
                        <div className="absolute w-[1541px] h-[447px] top-0 left-0">
                            <div className="relative w-[1461px] h-[474px] left-[40px]">
                                <div className="absolute w-[1124px] h-[278px] top-0 left-[150px] bg-[#0000000f]" />
                                <div className="absolute w-[828px] h-[166px] top-[188px] left-[624px] bg-white rotate-[-11.85deg]" />
                                <div className="absolute w-[731px] h-[192px] top-[168px] left-[11px] bg-white rotate-[19.00deg]" />
                            </div>
                        </div>
                        <img
                            className="absolute w-[287px] h-[255px] top-[109px] left-[586px] object-cover"
                            alt="Rectangle"
                            src={otpLoginPng} />
                        <div className="absolute top-[391px] left-[615px] [font-family:'Poppins-Medium',Helvetica] font-semibold text-black text-[20px] tracking-[0] leading-[normal]">
                            Please Verify Accounts
                        </div>
                        <p className="absolute w-[465px] top-[433px] left-[521px] [font-family:'Poppins-Light',Helvetica] font-light text-black text-[13px] tracking-[0] leading-[normal]">
                            please Enter six digit code we sent to your&nbsp;&nbsp;phone Number&nbsp;&nbsp;to Verify
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you
                            new Nogard Account
                        </p>
                        <form onSubmit={(e) => handleVerifyOtp(e)}>
                            <input id="otp1" className="absolute w-[49px] h-[60px] top-[500px] left-[533px] bg-[#0000000f] rounded-[5px] border border-solid border-[#00000033] text-center" maxLength={1} onChange={(e) => handleOtpChange(e, 0)} required />
                            <input id="otp2" className="absolute w-[49px] h-[60px] top-[500px] left-[598px] bg-[#0000000f] rounded-[5px] border border-solid border-[#00000033] text-center" maxLength={1} onChange={(e) => handleOtpChange(e, 1)} required />
                            <input id="otp3" className="absolute w-[49px] h-[60px] top-[500px] left-[662px] bg-[#0000000f] rounded-[5px] border border-solid border-[#00000033] text-center" maxLength={1} onChange={(e) => handleOtpChange(e, 2)} required />
                            <input id="otp4" className="absolute w-[49px] h-[60px] top-[500px] left-[726px] bg-[#0000000f] rounded-[5px] border border-solid border-[#00000033] text-center" maxLength={1} onChange={(e) => handleOtpChange(e, 3)} required />
                            <input id="otp5" className="absolute w-[49px] h-[60px] top-[500px] left-[791px] bg-[#0000000f] rounded-[5px] border border-solid border-[#00000033] text-center" maxLength={1} onChange={(e) => handleOtpChange(e, 4)} required />
                            <input id="otp6" className="absolute w-[49px] h-[60px] top-[500px] left-[857px] bg-[#0000000f] rounded-[5px] border border-solid border-[#00000033] text-center" maxLength={1} onChange={(e) => handleOtpChange(e, 5)} required />


                            <div className="absolute w-[222px] h-[47px] top-[590px] left-[603px] bg-black rounded-[5px] hover hover:bg-gray-400" />

                            <button type='submit' className="absolute top-[605px] left-[661px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-white text-[13px] tracking-[0] leading-[normal] ">
                                Verify &amp; Continue
                            </button>

                        </form>
                        {/* <p className='relative text-sm text-red-700 mt-35.4rem ml-38rem'>jdhgjhdgjhdjghdgdjgdhjghdjgdhjdj</p> */}
                        {error !== "" && <p className='relative text-sm text-red-500 mt-35.4rem ml-38rem'>{error}</p>}
                        <button
                            style={{
                                color: showResend ? 'black' : 'red',
                                textDecoration: 'underline',
                                // Add any other styles you want
                            }}
                            className={`absolute top-[657px] left-[692px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-${showResend ? 'black' : 'red'} text-[13px] tracking-[0] leading-[normal] hover hover:text-gray-400`}
                            onClick={(e) => {
                                onResendClick(e); // Implement the function to handle resend button click
                            }}
                        >
                            {showResend ? 'Resend' : `${timer} seconds`}
                        </button>


                    </div>


                </div>

            </div>

        </div>

    );
};

export default ReviewerOtpPage; 
