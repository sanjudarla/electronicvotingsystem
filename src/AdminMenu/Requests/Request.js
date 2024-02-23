import React, { useState, useEffect } from "react";
import MainNavBar from "../../NavBarFile/NavBar/MainNavBar";
import "./Request.css"; // Import CSS file for styling

const Request = ({ user, onLogout }) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch("http://localhost:5191/api/VoterApi/NullVoterId");
            const requestData = await response.json();

            // Fetch state and constituency data for each request
            const requestsWithData = await Promise.all(requestData.map(async (request) => {
                const stateResponse = await fetch(`http://localhost:5191/api/StateApi/${request.stateId}`);
                const stateData = await stateResponse.json();

                const constituencyResponse = await fetch(`http://localhost:5191/api/ConstituencyApi/constitunecybyid/${request.constituencyId}`);
                const constituencyData = await constituencyResponse.json();

                return {
                    ...request,
                    stateName: stateData.stateName,
                    constituencyName: constituencyData.constituencyName
                };
            }));

            setRequests(requestsWithData);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleApprove = async (requestData) => {
        try {
            const { dateOfBirth, citizenId, ...dataToSend } = requestData;
            console.log(citizenId)

            const response = await fetch(`http://localhost:5191/api/VoterApi/generatevoterid/${citizenId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...dataToSend, dateOfBirth })
            });

            if (response.ok) {
                fetchRequests();
                window.location.reload();
                // Request successfully approved, you may want to update the UI accordingly
            } else {
                console.error("Failed to approve request:", response.statusText);
            }
        } catch (error) {
            console.error("Error approving request:", error);
        }
    };


    const handleReject = () => {
        // Handle reject action here
    };

    return (
        <>
            <MainNavBar user={user} onLogout={onLogout} />
            <div className="request-container">
                <div className="request-box">
                    <table>
                        <thead>
                            <tr>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Age</th>
                                <th>StateName</th>
                                <th>ConstituencyName</th>
                                <th>AadharNumber</th>
                                <th>PhoneNumber</th>
                                <th>EmailAddress</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request, index) => (
                                <tr key={index}>
                                    <td>{request.firstName}</td>
                                    <td>{request.lastName}</td>
                                    <td>{calculateAge(request.dateOfBirth)}</td>
                                    <td>{request.stateName}</td>
                                    <td>{request.constituencyName}</td>
                                    <td>{request.aadharNumber}</td>
                                    <td>{request.phoneNumber}</td>
                                    <td>{request.emailAddress}</td>
                                    <td>
                                        <button className="approve-button" onClick={() => handleApprove(request)}>Approve</button>
                                        <button className="reject-button" onClick={handleReject}>Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Request;
