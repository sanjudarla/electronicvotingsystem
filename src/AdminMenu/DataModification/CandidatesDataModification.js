import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import './DataModification.css'


const CandidatesDataModification = () => {

    // Candidates
    const [showUpdateCandidatesTab, setShowUpdateCandidatesTab] = useState(false);
    const [showDeleteCandidatesTab, setShowDeleteCandidatesTab] = useState(false);
    const [showListCandidatesTab, setShowListCandidatesTab] = useState(false);
    const [showFetchCandidateDetailsTab, setshowFetchCandidateDetailsTab] = useState(false);
    const [candidateData, setCandidateData] = useState([]);
    const [updateCandidateId, setupdateCandidateId] = useState('');
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

        } catch (error) {
            console.error('Error fetching candidate data:', error);
        }
    };



    const HandleUpdateCandidates = () => {
        setShowUpdateCandidatesTab(true)
        setShowListCandidatesTab(false)
        setshowFetchCandidateDetailsTab(true)
        setShowDeleteCandidatesTab(false)

    }
    const handleCandidateIdChange = async (e) => {
        const id = e.target.value;
        setupdateCandidateId(id);
    };

    const handleFetchCandidateDetails = async (e) => {
        e.preventDefault()
        if (updateCandidateId) {

            try {
                const response = await fetch(`http://localhost:5191/api/CandidateApi/${updateCandidateId}`);
                const data = await response.json();
                debugger;
                console.log(data);
                console.log(response.status)
                if (response.status === 200) {
                    setUpdateCandidateName(data[0].candidateName);
                    setUpdateCandidateGender(data[0].gender);
                    setUpdateCandidateDateOfBirth(data[0].dateofBirth);
                    setUpdateCandidatePartyId(data[0].partyId);
                    setUpdateCandidateConstituencyId(data[0].constituencyId);
                    setUpdateCandidateStateId(data[0].stateId);
                    setUpdateCandidateAddress(data[0].address);
                    setUpdateCandidateMobileNumber(data[0].mobileNumber);
                    setUpdateCandidateEmailAddress(data[0].emailAddress);

                } else if(response.status === 404) {
                    toast.error("Candidate Not Found");
                    clearCandidateStateForm();
                }
                else{
                    toast.error("Failed to fetch candidate details:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching voter details:", error);
            }
        } else {
            toast.error("Please enter a Voter ID");
        }
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
                clearCandidateStateForm();
            } else if (response.status === 404) {
                toast.error("Candidate Not Found");

            } else {
                console.error('Failed to update candidate:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating candidate:', error);
        }
    };
    const clearCandidateStateForm = () => {
        setupdateCandidateId('');
        setUpdateCandidateName('');
        setUpdateCandidateConstituencyId('');
        setUpdateCandidatePartyId('');
        setUpdateCandidateDateOfBirth('');
        setUpdateCandidateGender('');
        setUpdateCandidateMobileNumber('');
        setUpdateCandidateStateId('');
        setUpdateCandidateEmailAddress('');
        setUpdateCandidateAddress('');
    }

    const HandleDeleteCandidates = () => {
        setShowDeleteCandidatesTab(true)
        setShowListCandidatesTab(false)
        setshowFetchCandidateDetailsTab(false)
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
                setupdateCandidateId('');
            } else if (response.status === 404) {
                toast.error("Candidate Not Found");
                setupdateCandidateId('');
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
        setshowFetchCandidateDetailsTab(false)
        setShowDeleteCandidatesTab(false)
    }
    return (
        <>

            <div className="data-modification-container">
                <div className="data-modification-data-container">
                    <div className="modification-data-options">
                        <div className="modification-actions">
                            <button id="update" onClick={() => HandleUpdateCandidates()}>Update Candidates</button>
                            <button id="delete" onClick={() => HandleDeleteCandidates()}>Delete Candidates</button>
                            <button onClick={() => HandleListCandidates()}>List Candidates</button>
                        </div>
                    </div>
                </div>
                <div className="data-modification-fetch-container">
                    {showFetchCandidateDetailsTab && (
                        <div className="data-fetch-container">
                            <input
                                type="text"
                                value={updateCandidateId}
                                onChange={(e) => handleCandidateIdChange(e)}
                                placeholder="Enter Candidate ID"
                            />
                            <button onClick={(e) => handleFetchCandidateDetails(e)}>Fetch Details</button>
                        </div>
                    )}
                </div>

                <div className="data-modification-form-container">
                    {showUpdateCandidatesTab && (
                        <div className="f-and-u-form-container">
                            <form onSubmit={handleSubmitUpdateCandidate}>
                                <div className="f-and-u-form-main-container">
                                    <div className="f-and-u-form-column-container">
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Candidate ID</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateCandidateId}
                                                    onChange={(e) => handleCandidateIdChange(e)}
                                                    placeholder="Enter Candidate ID"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Candidate Name</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateCandidateName}
                                                    onChange={(e) => setUpdateCandidateName(e.target.value)}
                                                    placeholder="Enter Candidate Name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Candidate Constituency ID</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateCandidateConstituencyId}
                                                    onChange={(e) => setUpdateCandidateConstituencyId(e.target.value)}
                                                    placeholder="Enter Candidate Constituency ID"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Candidate Party ID</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateCandidatePartyId}
                                                    onChange={(e) => setUpdateCandidatePartyId(e.target.value)}
                                                    placeholder="Enter Candidate Party ID"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Candidate Date Of Birth</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="date"
                                                    value={updateCandidateDateOfBirth}
                                                    onChange={(e) => setUpdateCandidateDateOfBirth(e.target.value)}
                                                    placeholder="Enter Candidate Date of Birth"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="f-and-u-form-column-container">
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Candidate Gender</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateCandidateGender}
                                                    onChange={(e) => setUpdateCandidateGender(e.target.value)}
                                                    placeholder="Enter Candidate Gender"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Candidate Mobile Number</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateCandidateMobileNumber}
                                                    onChange={(e) => setUpdateCandidateMobileNumber(e.target.value)}
                                                    placeholder="Enter Candidate Mobile Number"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Candidate State ID</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateCandidateStateId}
                                                    onChange={(e) => setUpdateCandidateStateId(e.target.value)}
                                                    placeholder="Enter Candidate State ID"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Candidate Email Address</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateCandidateEmailAddress}
                                                    onChange={(e) => setUpdateCandidateEmailAddress(e.target.value)}
                                                    placeholder="Enter Candidate Email Address"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Candidate Address</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateCandidateAddress}
                                                    onChange={(e) => setUpdateCandidateAddress(e.target.value)}
                                                    placeholder="Enter Candidate Address"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="f-and-u-form-submit-button">
                                    <button type="submit">Update Candidate</button>
                                </div>


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
                                    onChange={(e) => setupdateCandidateId(e.target.value)}
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

            </div >



            <ToastContainer />
        </>
    );
}
export default CandidatesDataModification;