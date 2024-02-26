import React, { useState } from "react";
import MainNavBar from "../../NavBarFile/NavBar/MainNavBar";
import './AddCandidate.css';

const AddCandidate = ({ user, onLogout }) => {
    const [step, setStep] = useState(1); // Track the current step/page
    const [candidateData, setCandidateData] = useState({
        CandidateName: "",
        PartyId: "",
        Age: "",
        Gender: "",
        MobileNumber: "",
        StateId: "",
        ConstituencyId: "",
        EmailAddress: "",
        Address: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidateData({ ...candidateData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1) {

            setStep(2);
        } else {
            // Handle submission of the entire form
            // You can submit the data to your API endpoint here
            console.log("Candidate data:", candidateData);
            // Reset the form and navigate to the first step
            setCandidateData({
                CandidateName: "",
                PartyId: "",
                Age: "",
                Gender: "",
                MobileNumber: "",
                StateId: "",
                ConstituencyId: "",
                EmailAddress: "",
                Address: ""
            });
            setStep(1);
        }
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    return (
        <>
            <MainNavBar user={user} onLogout={onLogout} />
            <div className="add-candidate-container">
                <div className="candidate-container-box">
                    <div className="blank-container">
                        <h1>hi</h1>
                    </div>
                    <div className="candidate-form-container">
                    
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCandidate;
