import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import './DataModification.css';


const VoterDataModification = () => {

    const [showUpdateVotersTab, setShowUpdateVotersTab] = useState(false);
    const [showDeleteVotersTab, setShowDeleteVotersTab] = useState(false);
    const [showListVotersTab, setShowListVotersTab] = useState(false);
    const [voterData, setVoterData] = useState([]);
    const [updateVoterId, setUpdateVoterId] = useState('');
    const [updateVoterFirstName, setUpdateVoterFirstName] = useState('');
    const [updateVoterLastName, setUpdateVoterLastName] = useState('');
    const [updateVoterGender, setUpdateVoterGender] = useState('');
    const [updateVoterDateOfBirth, setUpdateVoterDateOfBirth] = useState('');
    const [updateVoterGuardiansFirstName, setUpdateVoterGuardiansFirstName] = useState('');
    const [updateVoterGuardiansLastName, setUpdateVoterGuardiansLastName] = useState('');
    const [updateVoterConstituencyId, setUpdateVoterConstituencyId] = useState('');
    const [updateVoterStateId, setUpdateVoterStateId] = useState('');
    const [updateVoterAadharNumber, setUpdateVoterAadharNumber] = useState('');
    const [updateVoterAddress, setUpdateVoterAddress] = useState('');
    const [updateVoterPhoneNumber, setUpdateVoterPhoneNumber] = useState('');
    const [updateVoterEmailAddress, setUpdateVoterEmailAddress] = useState('');
    const [updateCitizenId, setupdateCitizenId] = useState('');

    useEffect(() => {
        fetchVoterData();
    }, []);

    const fetchVoterData = async () => {
        try {
            const response = await fetch('http://localhost:5191/api/VoterApi');
            const data = await response.json();
            setVoterData(data);
        } catch (error) {
            console.error('Error fetching voter data:', error);
        }
    };


    const handleSubmitUpdateVoter = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5191/api/VoterApi/${updateCitizenId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    citizenId: updateCitizenId,
                    firstName: updateVoterFirstName,
                    lastName: updateVoterLastName,
                    gender: updateVoterGender,
                    dateOfBirth: updateVoterDateOfBirth,
                    guardiansFirstName: updateVoterGuardiansFirstName,
                    guardiansLastName: updateVoterGuardiansLastName,
                    constituencyId: updateVoterConstituencyId,
                    stateId: updateVoterStateId,
                    aadharNumber: updateVoterAadharNumber,
                    address: updateVoterAddress,
                    phoneNumber: updateVoterPhoneNumber,
                    emailAddress: updateVoterEmailAddress,
                })
            });
            console.log(response)
            if (response.status === 200) {
                toast.success("Voter Updated Successfully");
                fetchVoterData();
                clearVoterForm();
            } else if (response.status === 304) {
                toast.error("Voter Not Found");
                // clearVoterForm();
            } else {
                console.error('Failed to update voter:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating voter:', error);
        }
    };

    // Function to clear voter form fields
    const clearVoterForm = () => {
        setupdateCitizenId('');
        setUpdateVoterFirstName('');
        setUpdateVoterLastName('');
        setUpdateVoterGender('');
        setUpdateVoterDateOfBirth('');
        setUpdateVoterGuardiansFirstName('');
        setUpdateVoterGuardiansLastName('');
        setUpdateVoterConstituencyId('');
        setUpdateVoterStateId('');
        setUpdateVoterAadharNumber('');
        setUpdateVoterAddress('');
        setUpdateVoterPhoneNumber('');
        setUpdateVoterEmailAddress('');

    };




    // Handle submit for deleting a voter
    const handleSubmitDeleteVoter = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5191/api/VoterApi/DeleteVoter/${updateVoterId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                toast.success("Voter Deleted Successfully");
                fetchVoterData();
                setUpdateVoterId('');
            } else if (response.status === 404) {
                toast.error("Voter Not Found");
                setUpdateVoterId('');
            } else {
                console.error('Failed to delete voter:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting voter:', error);
        }
    };
    const HandleUpdateVoters = () => {
        setShowUpdateVotersTab(true)
        setShowDeleteVotersTab(false)
        setShowListVotersTab(false)
    }

    const HandleDeleteVoters = () => {
        setShowDeleteVotersTab(true)
        setShowListVotersTab(false)
        setShowUpdateVotersTab(false)
    }
    const HandleListVoters = () => {
        setShowListVotersTab(true)
        setShowDeleteVotersTab(false)
        setShowUpdateVotersTab(false)
    }

    return (
        <>

            <div className="data-modification-container">
                <div className="data-modification-data-container">
                    <div className="modification-data-options">
                        <div className="modification-actions">

                            <button onClick={() => HandleUpdateVoters()}>Update Voters</button>
                            <button onClick={() => HandleDeleteVoters()}>Delete Voters</button>
                            <button onClick={() => HandleListVoters()}>List Voters</button>
                        </div>
                    </div>
                </div>

                <div className="data-modification-form-container">
                    {showUpdateVotersTab && (
                        <div className="state-form-container">
                            <form onSubmit={handleSubmitUpdateVoter}>
                                <input
                                    type="text"
                                    value={updateCitizenId}
                                    onChange={(e) => setupdateCitizenId(e.target.value)}
                                    placeholder="Enter Voter ID"
                                />
                                <input
                                    type="text"
                                    value={updateVoterFirstName}
                                    onChange={(e) => setUpdateVoterFirstName(e.target.value)}
                                    placeholder="Enter First Name"
                                />
                                <input
                                    type="text"
                                    value={updateVoterLastName}
                                    onChange={(e) => setUpdateVoterLastName(e.target.value)}
                                    placeholder="Enter Last Name"
                                />
                                <input
                                    type="text"
                                    value={updateVoterGender}
                                    onChange={(e) => setUpdateVoterGender(e.target.value)}
                                    placeholder="Enter Gender"
                                />
                                <input
                                    type="text"
                                    value={updateVoterDateOfBirth}
                                    onChange={(e) => setUpdateVoterDateOfBirth(e.target.value)}
                                    placeholder="Enter Date of Birth"
                                />
                                <input
                                    type="text"
                                    value={updateVoterGuardiansFirstName}
                                    onChange={(e) => setUpdateVoterGuardiansFirstName(e.target.value)}
                                    placeholder="Enter Guardian's First Name"
                                />
                                <input
                                    type="text"
                                    value={updateVoterGuardiansLastName}
                                    onChange={(e) => setUpdateVoterGuardiansLastName(e.target.value)}
                                    placeholder="Enter Guardian's Last Name"
                                />
                                <input
                                    type="text"
                                    value={updateVoterConstituencyId}
                                    onChange={(e) => setUpdateVoterConstituencyId(e.target.value)}
                                    placeholder="Enter Voter Constituency ID"
                                />
                                <input
                                    type="text"
                                    value={updateVoterStateId}
                                    onChange={(e) => setUpdateVoterStateId(e.target.value)}
                                    placeholder="Enter Voter State ID"
                                />
                                <input
                                    type="text"
                                    value={updateVoterAadharNumber}
                                    onChange={(e) => setUpdateVoterAadharNumber(e.target.value)}
                                    placeholder="Enter Aadhar Number"
                                />
                                <input
                                    type="text"
                                    value={updateVoterAddress}
                                    onChange={(e) => setUpdateVoterAddress(e.target.value)}
                                    placeholder="Enter Address"
                                />
                                <input
                                    type="text"
                                    value={updateVoterPhoneNumber}
                                    onChange={(e) => setUpdateVoterPhoneNumber(e.target.value)}
                                    placeholder="Enter Phone Number"
                                />
                                <input
                                    type="text"
                                    value={updateVoterEmailAddress}
                                    onChange={(e) => setUpdateVoterEmailAddress(e.target.value)}
                                    placeholder="Enter Email Address"
                                />

                                <button type="submit">Update Voter</button>
                            </form>

                        </div>
                    )}
                </div>

                <div className="data-modification-form-container">
                    {showDeleteVotersTab && (
                        <div className="state-form-container">
                            <form onSubmit={handleSubmitDeleteVoter}>
                                <input
                                    type="text"
                                    value={updateVoterId}
                                    onChange={(e) => setUpdateVoterId(e.target.value)}
                                    placeholder="Enter Voter ID to Delete"
                                />
                                <button type="submit">Delete Voter</button>
                            </form>
                        </div>
                    )}
                </div>
                <div className="data-modification-form-container">
                    {showListVotersTab && (
                        <div className="modification-form-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Citizen ID</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Date of Birth</th>
                                        <th>Guardian's Name</th>
                                        <th>Constituency ID</th>
                                        <th>State ID</th>
                                        <th>User ID</th>
                                        <th>Aadhar Number</th>
                                        <th>Address</th>
                                        <th>Phone Number</th>
                                        <th>Email Address</th>
                                        <th>Voter ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {voterData.map(voter => (
                                        <tr key={voter.citizenId}>
                                            <td>{voter.citizenId}</td>
                                            <td>{`${voter.firstName} ${voter.lastName}`}</td>
                                            <td>{voter.gender}</td>
                                            <td>{voter.dateOfBirth}</td>
                                            <td>{`${voter.guardiansFirstName} ${voter.guardiansLastName}`}</td>
                                            <td>{voter.constituencyId}</td>
                                            <td>{voter.stateId}</td>
                                            <td>{voter.userId}</td>
                                            <td>{voter.aadharNumber}</td>
                                            <td>{voter.address}</td>
                                            <td>{voter.phoneNumber}</td>
                                            <td>{voter.emailAddress}</td>
                                            <td>{voter.voterId}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>





            </div>



            <ToastContainer />
        </>
    );


}
export default VoterDataModification