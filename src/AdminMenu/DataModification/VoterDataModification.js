import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DataModification.css";

const VoterDataModification = () => {
    const [showUpdateVotersTab, setShowUpdateVotersTab] = useState(false);
    const [showDeleteVotersTab, setShowDeleteVotersTab] = useState(false);
    const [showListVotersTab, setShowListVotersTab] = useState(false);
    const [voterData, setVoterData] = useState([]);
    const [updateVoterId, setUpdateVoterId] = useState("");
    const [updateVoterFirstName, setUpdateVoterFirstName] = useState("");
    const [updateVoterLastName, setUpdateVoterLastName] = useState("");
    const [updateVoterGender, setUpdateVoterGender] = useState("");
    const [updateVoterDateOfBirth, setUpdateVoterDateOfBirth] = useState("");
    const [updateVoterGuardiansFirstName, setUpdateVoterGuardiansFirstName] = useState("");
    const [updateVoterGuardiansLastName, setUpdateVoterGuardiansLastName] = useState("");
    const [updateVoterConstituencyId, setUpdateVoterConstituencyId] = useState("");
    const [updateVoterStateId, setUpdateVoterStateId] = useState("");
    const [updateVoterAadharNumber, setUpdateVoterAadharNumber] = useState("");
    const [updateVoterAddress, setUpdateVoterAddress] = useState("");
    const [updateVoterPhoneNumber, setUpdateVoterPhoneNumber] = useState("");
    const [updateVoterEmailAddress, setUpdateVoterEmailAddress] = useState("");
    const [updateCitizenId, setupdateCitizenId] = useState("");
    const [UpdateVoterUserId, setUpdateVoterUserId] = useState("");
    const [showFetchVoterDetailsTab, setshowFetchVoterDetailsTab] = useState(false);

    useEffect(() => {
        fetchVoterData();
    }, []);

    const fetchVoterData = async () => {
        try {
            const response = await fetch("http://localhost:5191/api/VoterApi");
            const data = await response.json();
            setVoterData(data);
        } catch (error) {
            console.error("Error fetching voter data:", error);
        }
    };

    const handleCitizenIdChange = async (e) => {
        const id = e.target.value;
        setupdateCitizenId(id);
    };

    const handleFetchVoterDetails = async (e) => {
        e.preventDefault()
        if (updateCitizenId) {

            try {
                const response = await fetch(`http://localhost:5191/api/VoterApi/getvoterbyid/${updateCitizenId}`);
                const data = await response.json();
                debugger;
                console.log(data);
                console.log(response.status)
                if (response.status === 200) {
                    setUpdateVoterFirstName(data[0].firstName);
                    setUpdateVoterLastName(data[0].lastName);
                    setUpdateVoterGender(data[0].gender);
                    setUpdateVoterDateOfBirth(data[0].dateOfBirth);
                    setUpdateVoterGuardiansFirstName(data[0].guardiansFirstName);
                    setUpdateVoterGuardiansLastName(data[0].guardiansLastName);
                    setUpdateVoterConstituencyId(data[0].constituencyId);
                    setUpdateVoterUserId(data[0].userId)
                    setUpdateVoterStateId(data[0].stateId);
                    setUpdateVoterAadharNumber(data[0].aadharNumber);
                    setUpdateVoterAddress(data[0].address);
                    setUpdateVoterPhoneNumber(data[0].phoneNumber);
                    setUpdateVoterEmailAddress(data[0].emailAddress);
                    setUpdateVoterId(data[0].voterId);
                } else {
                    toast.error("Voter Details Not Found");
                    clearVoterForm();
                }
            } catch (error) {
                console.error("Error fetching voter details:", error);
            }
        } else {
            toast.error("Please enter a Voter ID");
        }
    };

    const handleSubmitUpdateVoter = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5191/api/VoterApi/${updateCitizenId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
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
                    userId: UpdateVoterUserId,
                    stateId: updateVoterStateId,
                    aadharNumber: updateVoterAadharNumber,
                    address: updateVoterAddress,
                    phoneNumber: updateVoterPhoneNumber,
                    emailAddress: updateVoterEmailAddress,
                    voterId: updateVoterId
                }),
            });

            if (response.status === 200) {
                toast.success("Voter Details Updated Successfully");
                fetchVoterData();
                clearVoterForm();
            } else if (response.status === 404) {
                toast.error("Voter Not Found");
            } else {
                console.error("Failed to update voter:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating voter:", error);
        }
    };

    const clearVoterForm = () => {
        setupdateCitizenId("");
        setUpdateVoterFirstName("");
        setUpdateVoterLastName("");
        setUpdateVoterGender("");
        setUpdateVoterDateOfBirth("");
        setUpdateVoterGuardiansFirstName("");
        setUpdateVoterGuardiansLastName("");
        setUpdateVoterConstituencyId("");
        setUpdateVoterStateId("");
        setUpdateVoterAadharNumber("");
        setUpdateVoterAddress("");
        setUpdateVoterPhoneNumber("");
        setUpdateVoterEmailAddress("");
        setUpdateVoterId("");
    };

    const handleSubmitDeleteVoter = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5191/api/VoterApi/DeleteVoter/${updateVoterId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                toast.success("Voter Deleted Successfully");
                fetchVoterData();
                setUpdateVoterId("");
            } else if (response.status === 404) {
                toast.error("Voter Not Found");
                setUpdateVoterId("");
            } else {
                console.error("Failed to delete voter:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting voter:", error);
        }
    };

    const HandleUpdateVoters = () => {
        setShowUpdateVotersTab(true);
        setshowFetchVoterDetailsTab(true)
        setShowDeleteVotersTab(false);
        setShowListVotersTab(false);
    };

    const HandleDeleteVoters = () => {
        setShowDeleteVotersTab(true);
        setShowListVotersTab(false);
        setShowUpdateVotersTab(false);
        setshowFetchVoterDetailsTab(false)
    };

    const HandleListVoters = () => {
        setShowListVotersTab(true);
        setShowDeleteVotersTab(false);
        setShowUpdateVotersTab(false);
        setshowFetchVoterDetailsTab(false)
    };

    return (
        <>
            <div className="data-modification-container">
                <div className="data-modification-data-container">
                    <div className="modification-data-options">
                        <div className="modification-actions">
                            <button id="update" onClick={() => HandleUpdateVoters()}>Update Voters</button>
                            <button id="delete" onClick={() => HandleDeleteVoters()}>Delete Voters</button>
                            <button onClick={() => HandleListVoters()}>List Voters</button>
                        </div>
                    </div>
                </div>

                <div className="data-modification-fetch-container">
                    {showFetchVoterDetailsTab && (
                        <div className="data-fetch-container">
                            <input
                                type="text"
                                value={updateCitizenId}
                                onChange={(e) => handleCitizenIdChange(e)}
                                placeholder="Enter Voter ID"
                            />
                            <button onClick={(e) => handleFetchVoterDetails(e)}>Fetch Details</button>
                        </div>
                    )}
                </div>
                <div className="data-modification-form-container">
                    {showUpdateVotersTab && (
                        <div className="f-and-u-form-container">
                            <form onSubmit={handleSubmitUpdateVoter}>
                                <div className="f-and-u-form-main-container">
                                    <div className="f-and-u-form-column-container">
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>UserId</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateCitizenId}
                                                    readOnly
                                                    onChange={(e) => handleCitizenIdChange(e)}
                                                    placeholder="Enter Voter ID"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>First Name</label></div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateVoterFirstName}
                                                    onChange={(e) => setUpdateVoterFirstName(e.target.value)}
                                                    placeholder="Enter First Name"
                                                    required
                                                /></div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Last Name</label></div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateVoterLastName}
                                                    onChange={(e) => setUpdateVoterLastName(e.target.value)}
                                                    placeholder="Enter Last Name"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Gender</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateVoterGender}
                                                    onChange={(e) => setUpdateVoterGender(e.target.value)}
                                                    placeholder="Enter Gender"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Date of Birth</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateVoterDateOfBirth}
                                                    onChange={(e) => setUpdateVoterDateOfBirth(e.target.value)}
                                                    placeholder="Enter Date of Birth"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>GuardiansFirstName</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateVoterGuardiansFirstName}
                                                    onChange={(e) => setUpdateVoterGuardiansFirstName(e.target.value)}
                                                    placeholder="Enter Guardian's First Name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>GuardiansLastName</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateVoterGuardiansLastName}
                                                    onChange={(e) => setUpdateVoterGuardiansLastName(e.target.value)}
                                                    placeholder="Enter Guardian's Last Name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>ConstituencyId</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateVoterConstituencyId}
                                                    onChange={(e) => setUpdateVoterConstituencyId(e.target.value)}
                                                    placeholder="Enter Voter Constituency ID"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="f-and-u-form-column-container">
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>User Id</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={UpdateVoterUserId}
                                                    onChange={(e) => setUpdateVoterUserId(e.target.value)}
                                                    placeholder="Enter Voter Constituency ID"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>State Id</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateVoterStateId}
                                                    onChange={(e) => setUpdateVoterStateId(e.target.value)}
                                                    placeholder="Enter Voter State ID"
                                                    required
                                                /></div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">

                                                <label>Aadhar Card</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateVoterAadharNumber}
                                                    onChange={(e) => setUpdateVoterAadharNumber(e.target.value)}
                                                    placeholder="Enter Aadhar Number"
                                                    required
                                                />
                                                </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Address</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateVoterAddress}
                                                    onChange={(e) => setUpdateVoterAddress(e.target.value)}
                                                    placeholder="Enter Address"
                                                    required
                                                />
                                                </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Phone Number</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateVoterPhoneNumber}
                                                    onChange={(e) => setUpdateVoterPhoneNumber(e.target.value)}
                                                    placeholder="Enter Phone Number"
                                                    required
                                                />
                                                </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Email Address</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateVoterEmailAddress}
                                                    onChange={(e) => setUpdateVoterEmailAddress(e.target.value)}
                                                    placeholder="Enter Email Address"
                                                    required
                                                />
                                                </div>
                                        </div>
                                        <div className="f-and-u-form-input-container">
                                            <div className="f-and-u-lable-field">
                                                <label>Voter Id</label>
                                            </div>
                                            <div className="f-and-u-form-input-field">
                                                <input
                                                    type="text"
                                                    value={updateVoterId}
                                                    readOnly
                                                    onChange={(e) => setUpdateVoterId(e.target.value)}
                                                    placeholder="Enter Voter Id"
                                                    required
                                                />
                                            </div>
                                        </div>


                                        
                                    </div>
                                </div>
                                <div className="f-and-u-form-submit-button">
                                    <button type="submit">Update Voter</button>
                                </div>
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
                                    {voterData.map((voter) => (
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
};
export default VoterDataModification;
