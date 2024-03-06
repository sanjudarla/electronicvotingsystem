import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import './DataModification.css'


const CandidatesDataModification = () => {

    // Candidates
    const [showUpdateCandidatesTab, setShowUpdateCandidatesTab] = useState(false);
    const [showDeleteCandidatesTab, setShowDeleteCandidatesTab] = useState(false);
    const [showListCandidatesTab, setShowListCandidatesTab] = useState(false);
    const [candidateData, setCandidateData] = useState([]);
    const [updateCandidateId, setUpdateCandidateId] = useState('');
    const [updateCandidateName, setUpdateCandidateName] = useState('');
    const [updateCandidateConstituencyId, setUpdateCandidateConstituencyId] = useState('');
    const [updateCandidatePartyId, setUpdateCandidatePartyId] = useState('');
    const [updateCandidateDateOfBirth, setUpdateCandidateDateOfBirth] = useState('');
    const [updateCandidateGender, setUpdateCandidateGender] = useState('');
    const [updateCandidateMobileNumber, setUpdateCandidateMobileNumber] = useState('');
    const [updateCandidateStateId, setUpdateCandidateStateId] = useState('');
    const [updateCandidateEmailAddress, setUpdateCandidateEmailAddress] = useState('');
    const [updateCandidateAddress, setUpdateCandidateAddress] = useState('');

    useEffect(() => {

        fetchCandidateData();

    }, []);
    //Candidate Data Fetching
    const fetchCandidateData = async () => {
        try {
            const response = await fetch('http://localhost:5191/api/CandidateApi');
            const data = await response.json();
            setCandidateData(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching candidate data:', error);
        }
    };



    const HandleUpdateCandidates = () => {
        setShowUpdateCandidatesTab(true)
        setShowListCandidatesTab(false)
        setShowDeleteCandidatesTab(false)

    }
    //Candidate Data handles

    const handleSubmitUpdateCandidate = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`http://localhost:5191/api/CandidateApi/${updateCandidateId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    candidateId: updateCandidateId,
                    candidateName: updateCandidateName,
                    constituencyId: updateCandidateConstituencyId,
                    partyId: updateCandidatePartyId,
                    dateOfBirth: updateCandidateDateOfBirth,
                    gender: updateCandidateGender,
                    mobileNumber: updateCandidateMobileNumber,
                    stateId: updateCandidateStateId,
                    emailAddress: updateCandidateEmailAddress,
                    address: updateCandidateAddress
                    // Add more fields as needed
                })
            });
    
            if (response.status === 200) {
                toast.success("Candidate Updated Successfully");
                fetchCandidateData();
                // Clear input fields after successful update
                setUpdateCandidateId('');
                setUpdateCandidateName('');
                setUpdateCandidateConstituencyId('');
                setUpdateCandidatePartyId('');
                setUpdateCandidateDateOfBirth('');
                setUpdateCandidateGender('');
                setUpdateCandidateMobileNumber('');
                setUpdateCandidateStateId('');
                setUpdateCandidateEmailAddress('');
                setUpdateCandidateAddress('');
            } else if (response.status === 404) {
                toast.error("Candidate Not Found");
                // Clear input fields after unsuccessful update
                setUpdateCandidateId('');
                setUpdateCandidateName('');
                setUpdateCandidateConstituencyId('');
                setUpdateCandidatePartyId('');
                setUpdateCandidateDateOfBirth('');
                setUpdateCandidateGender('');
                setUpdateCandidateMobileNumber('');
                setUpdateCandidateStateId('');
                setUpdateCandidateEmailAddress('');
                setUpdateCandidateAddress('');
            } else {
                console.error('Failed to update candidate:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating candidate:', error);
        }
    };
    
    const HandleDeleteCandidates = () => {
        setShowDeleteCandidatesTab(true)
        setShowListCandidatesTab(false)
        setShowUpdateCandidatesTab(false)
    }

    // Handle submit for deleting a candidate
    const handleSubmitDeleteCandidate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5191/api/CandidateApi/${updateCandidateId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                toast.success("Candidate Deleted Successfully");
                fetchCandidateData();
                setUpdateCandidateId('');
            } else if (response.status === 404) {
                toast.error("Candidate Not Found");
                setUpdateCandidateId('');
            } else {
                console.error('Failed to delete candidate:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting candidate:', error);
        }
    };
    const HandleListCandidates = () => {
        setShowListCandidatesTab(true)
        setShowUpdateCandidatesTab(false)
        setShowDeleteCandidatesTab(false)
    }
    return (
        <>

            <div className="data-modification-container">
                <div className="data-modification-data-container">
                    <div className="modification-data-options">
                        <div className="modification-actions">
                            <button onClick={() => HandleUpdateCandidates()}>Update Candidates</button>
                            <button onClick={() => HandleDeleteCandidates()}>Delete Candidates</button>
                            <button onClick={() => HandleListCandidates()}>List Candidates</button>
                        </div>
                    </div>
                </div>

                <div className="data-modification-form-container">
                    {showUpdateCandidatesTab && (
                        <div className="state-form-container">
                            <form onSubmit={handleSubmitUpdateCandidate}>
                                <input
                                    type="text"
                                    value={updateCandidateId}
                                    onChange={(e) => setUpdateCandidateId(e.target.value)}
                                    placeholder="Enter Candidate ID"
                                    required // This makes the input required
                                />
                                <input
                                    type="text"
                                    value={updateCandidateName}
                                    onChange={(e) => setUpdateCandidateName(e.target.value)}
                                    placeholder="Enter Candidate Name"
                                    required // This makes the input required
                                />
                                <input
                                    type="text"
                                    value={updateCandidateConstituencyId}
                                    onChange={(e) => setUpdateCandidateConstituencyId(e.target.value)}
                                    placeholder="Enter Candidate Constituency ID"
                                    required // This makes the input required
                                />
                                <input
                                    type="text"
                                    value={updateCandidatePartyId}
                                    onChange={(e) => setUpdateCandidatePartyId(e.target.value)}
                                    placeholder="Enter Candidate Party ID"
                                    required // This makes the input required
                                />
                                <input
                                    type="date"
                                    value={updateCandidateDateOfBirth}
                                    onChange={(e) => setUpdateCandidateDateOfBirth(e.target.value)}
                                    placeholder="Enter Candidate Date of Birth"
                                    required // This makes the input required
                                />
                                <input
                                    type="text"
                                    value={updateCandidateGender}
                                    onChange={(e) => setUpdateCandidateGender(e.target.value)}
                                    placeholder="Enter Candidate Gender"
                                    required // This makes the input required
                                />
                                <input
                                    type="text"
                                    value={updateCandidateMobileNumber}
                                    onChange={(e) => setUpdateCandidateMobileNumber(e.target.value)}
                                    placeholder="Enter Candidate Mobile Number"
                                    required // This makes the input required
                                />
                                <input
                                    type="text"
                                    value={updateCandidateStateId}
                                    onChange={(e) => setUpdateCandidateStateId(e.target.value)}
                                    placeholder="Enter Candidate State ID"
                                    required // This makes the input required
                                />
                                <input
                                    type="text"
                                    value={updateCandidateEmailAddress}
                                    onChange={(e) => setUpdateCandidateEmailAddress(e.target.value)}
                                    placeholder="Enter Candidate Email Address"
                                    required // This makes the input required
                                />
                                <input
                                    type="text"
                                    value={updateCandidateAddress}
                                    onChange={(e) => setUpdateCandidateAddress(e.target.value)}
                                    placeholder="Enter Candidate Address"
                                    required // This makes the input required
                                />
                                {/* Add more required fields as needed */}
                                <button type="submit">Update Candidate</button>
                            </form>

                        </div>
                    )}
                </div>

                <div className="data-modification-form-container">
                    {showDeleteCandidatesTab && (
                        <div className="state-form-container">
                            <form onSubmit={handleSubmitDeleteCandidate}>
                                <input
                                    type="text"
                                    value={updateCandidateId}
                                    onChange={(e) => setUpdateCandidateId(e.target.value)}
                                    placeholder="Enter Candidate ID to Delete"
                                />
                                <button type="submit">Delete Candidate</button>
                            </form>
                        </div>
                    )}
                </div>
                {showListCandidatesTab && (
                    <div className="modification-form-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Candidate ID</th>
                                    <th>Candidate Name</th>
                                    <th>Party ID</th>
                                    <th>Date of Birth</th>
                                    <th>Gender</th>
                                    <th>Mobile Number</th>
                                    <th>State ID</th>
                                    <th>Constituency ID</th>
                                    <th>Email Address</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>

                                {Object.values(candidateData).map(candidate => (
                                    <tr key={candidate.candidateId}>
                                        <td>{candidate.candidateId}</td>
                                        <td>{candidate.candidateName}</td>
                                        <td>{candidate.partyId}</td>
                                        <td>{candidate.dateofBirth}</td>
                                        <td>{candidate.gender}</td>
                                        <td>{candidate.mobileNumber}</td>
                                        <td>{candidate.stateId}</td>
                                        <td>{candidate.constituencyId}</td>
                                        <td>{candidate.emailAddress}</td>
                                        <td>{candidate.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>



            <ToastContainer />
        </>
    );
}
export default CandidatesDataModification;