import React, { useEffect, useState } from "react";
import MainNavBar from "../../NavBarFile/NavBar/MainNavBar";
import './AddCandidate.css';
import Candidate from '../../Images/Candidate.png';
import { ToastContainer, toast } from "react-toastify";

const getInitialFormData = () => ({
    candidateName: "",
    dateOfBirth: "",
    gender: "",
    partyId: "",
    stateId: "",
    constituencyId: "",
    emailAddress: "",
    mobileNumber: "",
    address: ""
});

const AddCandidate = ({ user, onLogout }) => {
    const [step, setStep] = useState(1); // Track the current step/page
    const [candidateData, setCandidateData] = useState(getInitialFormData);
    const [parties, setParties] = useState([]);
    const [states, setStates] = useState([]);
    const [constituencies, setConstituencies] = useState([]);
    const [canSubmit, setCanSubmit] = useState(false);


    //

    const [isValid, setIsValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isMobileNumberValid, setIsMobileNumberValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isDateofBirthValid, setIsDateofBirthValid] = useState(true);


    useEffect(() => {
        setCandidateData(getInitialFormData());
        fetchParties();
        fetchStates();
    }, [user]);

    const fetchParties = async () => {
        try {
            const response = await fetch("http://localhost:5191/api/PartyApi");
            const data = await response.json();
            setParties(data);
            console.log(data)
        } catch (error) {
            console.error("Error fetching parties:", error);
        }
    };

    const fetchStates = async () => {
        try {
            const response = await fetch("http://localhost:5191/api/StateApi");
            const data = await response.json();
            setStates(data);
            console.log(data)
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    const fetchConstituencies = async (stateId) => {
        try {
            const response = await fetch(`http://localhost:5191/api/ConstituencyApi/${stateId}`);
            const data = await response.json();
            setConstituencies(data);
            console.log(data)
        } catch (error) {
            toast.error("Error fetching constituencies:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidateData({
            ...candidateData,
            [name]: value
        });
        if (name === 'stateName') {
            console.log("Selected State ID:", value);
            setCandidateData(prevState => ({
                ...prevState,
                stateId: value
            }));
            fetchConstituencies(value);
        }
        if (name === 'partyName') {
            console.log("Selected Party ID:", value);
            setCandidateData(prevState => ({
                ...prevState,
                partyId: value
            }));
            fetchParties(value);
        }
        else if (name === 'constituencyName') {
            console.log("Selected Constituency ID:", value);
            setCandidateData(prevState => ({
                ...prevState,
                constituencyId: value
            }));
        }
        else if (name === 'address') {
            setCanSubmit(true);
        }

        else if (name === 'gender') {
            setIsValid(value !== "")
        }
        else if (name === 'candidateName') {
            setIsNameValid(value.charAt(0) === value.charAt(0).toUpperCase());
        }
        if (name === 'emailAddress') {
            // Implement your email validation logic here, for example:
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsEmailValid(emailRegex.test(value));
        }

        // Validate phone number
        if (name === 'mobileNumber') {
            // Implement your phone number validation logic here, for example:
            const phoneRegex = /^\d{10}$/;
            setIsMobileNumberValid(phoneRegex.test(value));
        }


        if (name === 'dateOfBirth') {

            const dob = new Date(value);
            const currentDate = new Date();
            const age = currentDate.getFullYear() - dob.getFullYear();
            const isAgeValid = age >= 21 && age <= 70;
            setIsDateofBirthValid(isAgeValid);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(candidateData)
            if (step === 3) {

                const response = await fetch("http://localhost:5191/api/CandidateApi/AddCandidate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(candidateData)
                });
                console.log(response);
                if (response.status === 201) {
                    toast.success("Candidate Added Successfully");
                    setCandidateData(getInitialFormData());
                    setStep(1);
                }
                else if (response.status === 226) {
                    const errorMessage = "There is already a candidate With Same Constituency Name And with Same PartyName in That State.";
                    toast.error(errorMessage);
                    getInitialFormData()
                }
                 else {
                    toast.error("Please  fill out all the fields correctly!");
                }
            } else {

                setStep(step + 1);
            }
        } catch (error) {
            console.error("Error saving data:", error);
            toast.error("Error saving data");
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
                        <img src={Candidate} alt="Candidate"></img>
                    </div>
                    <form className="form-box" onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="candidate-form-container">
                                <div className="candidate-title-container">
                                    <h3>Adding the Candidate Details - Page 1</h3>
                                </div>
                                <div className="candidate-data-container">
                                    <div className="paragraph-box">
                                        <p>Please Enter the Name of The Candidate <span className="required-symbol-for-candidate">*</span></p>
                                    </div>
                                    <div className="add-container-input-field">
                                        <label className="add-candidate-lable-container" htmlFor="CandidateName">Candidate Name :</label>
                                        <input className="add-candidate-input-container" type="text" name="candidateName" id="CandidateName" value={candidateData.candidateName} onChange={handleChange} placeholder="Candidate Name" required />
                                    </div>
                                    <div className="validations">
                                        {!isNameValid && <p>Candidate name must start with a capital letter</p>}
                                    </div>
                                </div>
                                <div className="candidate-data-container">
                                    <div className="paragraph-box">
                                        <p>Please Enter Date of birth of The Candidate<span className="required-symbol-for-candidate">*</span>
                                        </p>
                                    </div>
                                    <div className="add-container-input-field">
                                        <label className="add-candidate-lable-container" htmlFor="dateOfBirth">Date of Birth :</label>
                                        <input className="add-candidate-input-container" type="date" name="dateOfBirth" id="dateOfBirth" value={candidateData.dateOfBirth} onChange={handleChange} placeholder="Candidate Date of birth" required />
                                    </div>
                                    <div className="validations">
                                        {!isDateofBirthValid && <p>Candidate must be 21 to 70 years old to participate</p>}
                                    </div>
                                </div>
                                <div className="candidate-data-container">
                                    <div className="paragraph-box">
                                        <p>Please Enter the Gender of The Candidate<span className="required-symbol-for-candidate">*</span></p>
                                    </div>
                                    <div className="add-container-input-field">
                                        <label className="add-candidate-lable-container" htmlFor="gender">Gender :</label>
                                        <select
                                            className="form-control"
                                            name="gender"
                                            id="gender"
                                            value={candidateData.gender}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value=''>Select Gender</option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </select>
                                    </div>
                                    <div className="validations">
                                        {!isValid && <p>Candidate gender must not be empty</p>}
                                    </div>
                                </div>
                                <div className="candidate-buttons">
                                    <button type="submit">Next</button>
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="candidate-form-container">
                                <div className="candidate-title-container">
                                    <h3>Adding the Candidate Details - Page 2</h3>
                                </div>
                                <div className="candidate-data-container">
                                    <div className="paragraph-box">
                                        <p>Please Enter Name of the party<span className="required-symbol-for-candidate">*</span>
                                        </p>
                                    </div>
                                    <div className="add-container-input-field">
                                        <label className="add-candidate-lable-container" htmlFor="partyName">Party Name :</label>
                                        <select className="form-control" id="partyName" name="partyName" value={candidateData.partyName} onChange={handleChange} required>
                                            <option value="">Select Party</option>
                                            {parties.map(party => (
                                                <option key={party.partyId} value={party.partyId}>{party.partyName}</option>
                                            ))}
                                        </select>                                    </div>

                                </div>
                                <div className="candidate-data-container">
                                    <div className="paragraph-box">
                                        <p>Please Enter the State of The Candidate<span className="required-symbol-for-candidate">*</span></p>
                                    </div>
                                    <div className="add-container-input-field">
                                        <label className="add-candidate-lable-container" htmlFor="StateName">State Name :</label>
                                        <select className="form-control" id="stateName" name="stateName" value={candidateData.stateName} onChange={handleChange} required>
                                            <option value="">Select State</option>
                                            {states.map(state => (
                                                <option key={state.stateId} value={state.stateId}>{state.stateName}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                                <div className="candidate-data-container">
                                    <div className="paragraph-box">
                                        <p>Please Enter the Constituency of The Candidate<span className="required-symbol-for-candidate">*</span></p>
                                    </div>
                                    <div className="add-container-input-field">
                                        <label className="add-candidate-lable-container" htmlFor="ConstituencyName">Constituency Name :</label>
                                        {constituencies && constituencies.length > 0 && (
                                            <select className="form-control" id="constituencyName" name="constituencyName" value={candidateData.constituencyName} onChange={handleChange} required>
                                                <option value="">Select Constituency</option>
                                                {constituencies.map(constituency => (
                                                    <option key={constituency.constituencyId} value={constituency.constituencyId}>{constituency.constituencyName}</option>
                                                ))}
                                            </select>

                                        )}
                                    </div>

                                </div>
                                <div className="candidate-buttons">
                                    <button type="button" onClick={handlePrevStep}>Previous</button>
                                    <button type="submit">Next</button>
                                </div>
                            </div>

                        )}
                        {step === 3 && (
                            <div className="candidate-form-container">
                                <div className="candidate-title-container">
                                    <h3>Adding the Candidate Details - Page 3</h3>
                                </div>
                                <div className="candidate-data-container">
                                    <div className="paragraph-box">
                                        <p>Please Enter the Email Address of The Candidate<span className="required-symbol-for-candidate">*</span></p>
                                    </div>
                                    <div className="add-container-input-field">
                                        <label className="add-candidate-lable-container" htmlFor="EmailAddress">Email Address :</label>
                                        <input className="add-candidate-input-container" type="email" name="emailAddress" id="emailAddress" value={candidateData.emailAddress} onChange={handleChange} placeholder="Email Address" required />
                                    </div>
                                    <div className="validations">
                                        {!isEmailValid && <p>Candidate Email must Contain 8 Different characters</p>}
                                    </div>
                                </div>
                                <div className="candidate-data-container">
                                    <div className="paragraph-box">
                                        <p>Please Enter the Mobile Number of The Candidate<span className="required-symbol-for-candidate">*</span>
                                        </p>
                                    </div>
                                    <div className="add-container-input-field">
                                        <label className="add-candidate-lable-container" htmlFor="MobileNumber">Mobile Number :</label>
                                        <input className="add-candidate-input-container" type="text" name="mobileNumber" id="mobileNumber" value={candidateData.mobileNumber} onChange={handleChange} placeholder="Mobile Number" required />
                                    </div>
                                    <div className="validations">
                                        {!isMobileNumberValid && <p>Candidate moble Number Must Contain only 10 Numbers</p>}
                                    </div>
                                </div>
                                <div className="candidate-data-container">
                                    <div className="paragraph-box">
                                        <p>Please Enter the Address of The Candidate<span className="required-symbol-for-candidate">*</span></p>
                                    </div>
                                    <div className="add-container-input-field">
                                        <label className="add-candidate-lable-container" htmlFor="Address">Address :</label>
                                        <input className="add-candidate-input-container" type="text" name="address" id="address" value={candidateData.address} onChange={handleChange} placeholder="Address" required />
                                    </div>

                                </div>
                                <div className="candidate-buttons">
                                    <button type="button" onClick={handlePrevStep}>Previous</button>
                                    <button type="submit">Submit</button>
                                </div>
                            </div>

                        )}
                    </form>
                </div >
            </div >
            <ToastContainer />
        </>
    );
}

export default AddCandidate;
