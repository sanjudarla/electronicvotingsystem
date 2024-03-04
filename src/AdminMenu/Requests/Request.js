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
           


            const requestsWithData = await Promise.all(requestData.map(async (request) => {
                const stateResponse = await fetch(`http://localhost:5191/api/StateApi/${request.stateId}`);
                const stateData = await stateResponse.json();
                
                const constituencyResponse = await fetch(`http://localhost:5191/api/ConstituencyApi/constituency/${request.constituencyId}`);
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
            console.log(citizenId);

            // Show confirmation pop-up
            const isConfirmed = window.confirm("Do you really want to approve this request?");

            if (isConfirmed) {
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
            } else {
                // User chose not to approve, do nothing or handle as needed
                console.log("Request approval cancelled by user.");
            }
        } catch (error) {
            console.error("Error approving request:", error);
        }
    };



    const handleReject = async (requestData) => {
        try {
            const { citizenId } = requestData;
            console.log(citizenId);

            const isConfirmed = window.confirm("Do you really want to reject this request?");
           

            if (isConfirmed) {
                // Perform the API call to remove voter data from the database
                const response = await fetch(`http://localhost:5191/api/VoterApi/DeleteVoter/${citizenId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                    
                });

                if (response.ok) {
                    fetchRequests();
                    window.location.reload();
                } else {
                    console.error("Failed to reject request:", response.statusText);
                }
            } else {
                // User chose not to reject, do nothing or handle as needed
                console.log("Request rejection cancelled by user.");
            }
        } catch (error) {
            console.error("Error rejecting request:", error);
        }
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
                                <th>Gender</th>
                                <th>Guardians Name</th>
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
                                    <td>{request.gender}</td>
                                    <td>{request.guardiansFirstName} {request.guardiansLastName}</td>
                                    <td>{request.stateName}</td>
                                    <td>{request.constituencyName}</td>
                                    <td>{request.aadharNumber}</td>
                                    <td>{request.phoneNumber}</td>
                                    <td>{request.emailAddress}</td>
                                    <td>
                                        <button className="approve-button" onClick={() => handleApprove(request)}>Approve</button>
                                        <button className="reject-button" onClick={() => handleReject(request)}>Reject</button>
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
