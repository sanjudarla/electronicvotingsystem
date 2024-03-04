import React, { useState, useEffect } from "react";
import MainNavBar from "../NavBar/MainNavBar";
import "./Profile.css"; // Import CSS file for styling

const Profile = ({ user, onLogout }) => {
    const [voterDetails, setVoterDetails] = useState(null);

    useEffect(() => {
        if (user) {
            fetchVoterDetails(user.userId);
        }
    }, [user]);

    const fetchVoterDetails = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5191/api/VoterApi/${userId}`);
            const voterData = await response.json();
            console.log(voterData);
            const stateResponse = await fetch(`http://localhost:5191/api/StateApi/${voterData[0].stateId}`);
            const stateData = await stateResponse.json();
            const constituencyResponse = await fetch(`http://localhost:5191/api/ConstituencyApi/constitunecybyid/${voterData[0].constituencyId}`);
            const constituencyData = await constituencyResponse.json();

            setVoterDetails({
                ...voterData,
                stateName: stateData.stateName,
                constituencyName: constituencyData.constituencyName
            });
        } catch (error) {
            console.error("Error fetching voter details:", error);
        }
    };
    

    return (
        <>
            <MainNavBar user={user} onLogout={onLogout} />
            <div className="container profile-container">
                <h2 className="mt-3">Profile Details</h2>
                {voterDetails && voterDetails[0].voterId !== null ? (
                    <div className="profile-details mt-4">
                        <p><strong>First Name:</strong> {voterDetails[0].firstName}</p>
                        <p><strong>Last Name:</strong> {voterDetails[0].lastName}</p>
                        <p><strong>VoterId:</strong> {voterDetails[0].voterId}</p>
                        <p><strong>Date of Birth:</strong> {voterDetails[0].dateOfBirth}</p>
                        <p><strong>Aadhar Number:</strong> {voterDetails[0].aadharNumber}</p>
                        <p><strong>Phone Number:</strong> {voterDetails[0].phoneNumber}</p>
                        <p><strong>Email Address:</strong> {voterDetails[0].emailAddress}</p>
                        <p><strong>State:</strong> {voterDetails.stateName}</p>
                        <p><strong>Constituency:</strong> {voterDetails.constituencyName}</p>
                        <p><strong>Address:</strong> {voterDetails[0].address}</p>
                    </div>
                ) : (
                    <p>Please wait until the voter id is generated to see your profile..</p>
                )}
            </div>
        </>
    );
};

export default Profile;
