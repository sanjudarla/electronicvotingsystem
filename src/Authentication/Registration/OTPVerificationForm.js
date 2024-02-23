import React, { useState } from "react";
import { toast } from "react-toastify";

const OTPVerificationForm = ({ phoneNumber, onSuccess }) => {
    const [otp, setOTP] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        try {
            const response = await fetch("http://localhost:5191/api/OtpApi/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phoneNumber: phoneNumber,
                    OTP: otp
                })
            });

            if (response.ok) {
                toast.success("OTP verified successfully");
                onSuccess(); 
            } else {
                toast.error("Invalid OTP");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            toast.error("Error verifying OTP. Please try again later.");
        }
    };

    return (
        <div>
            <h2>Phone Number Verification</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="otp">Enter OTP sent to {phoneNumber}:</label>
                <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    required
                />
                <button type="submit">Verify OTP</button>
            </form>
        </div>
    );
};

export default OTPVerificationForm;
