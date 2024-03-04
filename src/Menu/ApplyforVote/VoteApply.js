import React, { useState } from "react";
import './VoteApply.css'
import { useEffect } from "react";
import MainNavBar from "../../NavBarFile/NavBar/MainNavBar"
import { ToastContainer, toast } from "react-toastify";

const getInitialFormData = (user) => ({
    firstname: (user && user.firstName) || "",
    lastname: (user && user.lastName) || "",
    userId: (user && user.userId) || "",
    emailAddress: (user && user.emailAddress) || "",
    phoneNumber: (user && user.phoneNumber) || "",
    dateOfBirth: (user && user.dateOfBirth) || "",
    gender: "",
    guardiansFirstName: "",
    guardiansLastName: "",
    constituencyId: "",
    stateId: "",
    aadharNumber: "",
    address: "",
    voterId: null

});

const VoteApply = ({ user, onLogout }) => {
    const isAdmin = user && user.firstName === "Admin";
    const [formData, setFormData] = useState(getInitialFormData(user));

    const [states, setStates] = useState([]);
    const [constituencies, setConstituencies] = useState([]);

    useEffect(() => {
        setFormData(getInitialFormData(user));
        fetchStates();
    }, [user]);





    const fetchStates = async () => {
        try {
            const response = await fetch("http://localhost:5191/api/StateApi");
            const data = await response.json();
            console.log(data)
            setStates(data);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    const fetchConstituencies = async (stateId) => {
        try {
            const response = await fetch(`http://localhost:5191/api/ConstituencyApi/${stateId}`);
            const data = await response.json();
            console.log(data);
            setConstituencies(data);

        } catch (error) {
            toast.error("Error fetching constituencies:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === 'stateName') {
            console.log("Selected State ID:", value);
            setFormData(prevState => ({
                ...prevState,
                stateId: value
            }));
            fetchConstituencies(value);
        } else if (name === 'constituencyName') {
            console.log("Selected Constituency ID:", value);
            setFormData(prevState => ({
                ...prevState,
                constituencyId: value
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form Data', formData);
            const response = await fetch("http://localhost:5191/api/VoterApi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Data saved successfully:", data);
            if (response.status === 200) {
                toast.success("Your Data Has Been Sent for validation please wait for approval");
                setFormData(getInitialFormData(user));

                setFormData(prevState => ({
                    ...prevState,
                    stateName: "",
                    constituencyName: ""
                }));
            } else {
                toast.error("User Already Registered ");
            }
        } catch (error) {
            console.error("Error saving data:", error);
            toast.error("Error saving data");
        }
    };






    return (
        <>
            <MainNavBar user={(user)} onLogout={(onLogout)} />
            {isAdmin ? (
                <div>Admin cannot apply for voter ID.</div>
            ) : (

                <div className="container">
                    <h1>Apply For Voter Id</h1>
                    <form onSubmit={handleSubmit} className="apply-vote-form">
                        <div className="container-box">
                            <div className="vote-apply-container">
                                <div className="apply-vote-form-group">
                                    <label htmlFor="firstname">First Name</label>
                                    <input type="text" className="apply-vote-form-control" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required />
                                </div>
                                <div className="apply-vote-form-group">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" className="apply-vote-form-control" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required />
                                </div>
                                <div className="apply-vote-form-group">
                                    <label htmlFor="dateOfBirth">Date of Birth</label>
                                    <input type="date" className="apply-vote-form-control" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                                </div>
                                <div className="apply-vote-form-group">
                                    <label htmlFor="gender">Gender</label>
                                    <input type="text" className="apply-vote-form-control" id="gender" name="gender" value={formData.gender} onChange={handleChange} required />
                                </div>
                                <div className="apply-vote-form-group">
                                    <label htmlFor="guardiansFirstName">GuardiansFistName</label>
                                    <input type="text" className="apply-vote-form-control" id="guardiansFirstName" name="guardiansFirstName" value={formData.guardiansFirstName} onChange={handleChange} required />
                                </div>
                                <div className="apply-vote-form-group">
                                    <label htmlFor="guardiansLastName">GuardiansLastName</label>
                                    <input type="text" className="apply-vote-form-control" id="guardiansLastName" name="guardiansLastName" value={formData.guardiansLastName} onChange={handleChange} required />
                                </div>
                                <div className="apply-vote-form-group">
                                    <input type="hidden" className="apply-vote-form-control" id="userId" name="userId" value={formData.userId} onChange={handleChange}  required/>
                                </div>


                            </div>
                            <div className="vote-apply-container">
                                <div className="apply-vote-form-group">
                                    <label htmlFor="stateName">State</label>
                                    <select className="apply-vote-form-control" id="stateName" name="stateName" value={formData.stateName} onChange={handleChange} required>
                                        <option value="">Select State</option>
                                        {states.map(state => (
                                            <option key={state.stateId} value={state.stateId}>{state.stateName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="apply-vote-form-group">
                                    <label htmlFor="constituencyName">Constituency</label>
                                    {constituencies && constituencies.length > 0 && (
                                        <select className="apply-vote-form-control" id="constituencyName" name="constituencyName" value={formData.constituencyName} onChange={handleChange} required>
                                            <option value="">Select Constituency</option>
                                            {constituencies.map(constituency => (
                                                <option key={constituency.constituencyId} value={constituency.constituencyId}>{constituency.constituencyName}</option>
                                            ))}
                                        </select>

                                    )}

                                </div>

                                <div className="apply-vote-form-group">
                                    <label htmlFor="aadharNumber">Aadhar Number</label>
                                    <input type="text" className="apply-vote-form-control" id="aadharNumber" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} required />
                                </div>
                                <div className="apply-vote-form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="apply-vote-form-control" id="address" name="address" value={formData.address} onChange={handleChange} required/>
                                </div>
                                <div className="apply-vote-form-group">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input type="text" className="apply-vote-form-control" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required/>
                                </div>
                                <div className="apply-vote-form-group">
                                    <label htmlFor="emailAddress">Email</label>
                                    <input type="email" className="apply-vote-form-control" id="emailAddress" name="emailAddress" value={formData.emailAddress} onChange={handleChange} required/>
                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            <ToastContainer />

        </>
    );
};

export default VoteApply;
