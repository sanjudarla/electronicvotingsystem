import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPVerificationForm from "./OTPVerificationForm";
import MainPage from "../../NavBarFile/NavBar/NavBar";

const VerifyPhoneNumber = ({ location }) => {
    const [isOTPVerified, setIsOTPVerified] = useState(false);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (location) {
            const queryParams = new URLSearchParams(location.search);
            const extractedFormData = {
                firstname: queryParams.get("firstname"),
                lastname: queryParams.get("lastname"),
                age: queryParams.get("age"),
                dateofbirth: queryParams.get("dateofbirth"),
                emailAddress: queryParams.get("emailAddress"),
                phonenumber: queryParams.get("phonenumber"),
                password: queryParams.get("password"),
                confirmPassword: queryParams.get("confirmPassword")
            };
            setFormData(extractedFormData);
            console.log("Form Data:", extractedFormData); // Log formData to console
        }
    }, [location]);

    const handleOTPVerificationSuccess = () => {
        setIsOTPVerified(true);
        toast.success("OTP Verified Successfully!");
    };

    return (
        <>
            <MainPage />
            <div>
                {!isOTPVerified ? (
                    <OTPVerificationForm
                        phoneNumber={formData ? formData.phonenumber : ""}
                        onSuccess={handleOTPVerificationSuccess}
                    />
                ) : (
                    <div>
                        <h2>OTP Verified Successfully!</h2>
                    </div>
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default VerifyPhoneNumber;
