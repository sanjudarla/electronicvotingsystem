import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import './DataModification.css'


const StateDataModification = () => {
    const [newStateName, setNewStateName] = useState("");
    const [newStateId, setNewStateId] = useState("");
    const [stateData, setStateData] = useState([]);
    const [showAddStateForm, setShowAddStateForm] = useState(false);
    const [showListStateForm, setShowListStateForm] = useState(false);
    const [showUpdateStateForm, setShowUpdateStateForm] = useState(false);
    const [showDeleteStateForm, setShowDeleteStateForm] = useState(false);
    const [updateStateId, setUpdateStateId] = useState("");
    const [updateStateName, setUpdateStateName] = useState("");
    useEffect(() => {
        fetchStateData();

    }, []);

    const fetchStateData = async () => {
        try {
            const stateResponse = await fetch("http://localhost:5191/api/StateApi");
            const stateData = await stateResponse.json();
            setStateData(stateData);
        } catch (error) {
            console.error('Error fetching state data:', error);
        }
    };
    //State data Handles
    const handleAddState = () => {
        setShowAddStateForm(true);
        setShowListStateForm(false);
        setShowUpdateStateForm(false);
        setShowDeleteStateForm(false)
    }


    const handleSubmitState = async (e) => {
        e.preventDefault();
        if (newStateName.trim() !== "") {
            try {

                const response = await fetch('http://localhost:5191/api/StateApi', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ stateName: newStateName })
                });
                debugger;
                if (response.status === 201) {
                    toast.success("State Added Successfully");
                    setShowAddStateForm(true);
                    setNewStateName("");

                } else {
                    console.error('Failed to add state:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding state:', error);
            }
        } else {
            console.error('State name cannot be empty');
        }
    }


    const handleUpdateState = async () => {
        setShowUpdateStateForm(true);
        setShowAddStateForm(false);
        setShowListStateForm(false);
        setShowDeleteStateForm(false)

    }
    const handleSubmitUpdateState = async (e) => {
        e.preventDefault();


        if (updateStateId.trim() !== "" && updateStateName.trim() !== "") {
            try {
                const response = await fetch(`http://localhost:5191/api/StateApi/${updateStateId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ stateId: updateStateId, stateName: updateStateName })
                });
                console.log(response.status)

                if (response.status === 200) {
                    toast.success("State Updated Successfully");
                    setUpdateStateId('');
                    setUpdateStateName('');

                } else if (response.status === 404) {
                    toast.error("State Not Found");
                    setUpdateStateId('');
                    setUpdateStateName('');
                }
                else {
                    console.error('Failed to update state:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating state:', error);
            }
        } else {
            console.error('State ID and State Name cannot be empty');
        }
    };



    const handleDeleteState = async () => {
        setShowDeleteStateForm(true)
        setShowAddStateForm(false)
        setShowListStateForm(false);
        setShowUpdateStateForm(false);

    }

    const handlesubmitDeleteState = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5191/api/StateApi/${newStateId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                toast.success("State Deleted Successfully");
                fetchStateData();
                setNewStateId('')

            } else {
                console.error('Failed to delete state:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting state:', error);
        }
    };

    const handleListState = async () => {
        setShowAddStateForm(false)
        setShowDeleteStateForm(false)
        setShowListStateForm(true);
        setShowUpdateStateForm(false);
    }

    return (
        <>

            <div className="data-modification-container">
                <div className="data-modification-data-container">
                    <div className="modification-data-options">
                        <div className="modification-actions">
                            <button id="add" onClick={() => handleAddState()}>Add State</button>
                            <button id="update" onClick={() => handleUpdateState()}>Update State</button>
                            <button id="delete" onClick={() => handleDeleteState()}>Delete State</button>
                            <button onClick={() => handleListState()}>List State</button>
                        </div>
                    </div>
                </div>

                <div className="data-modification-form-container">
                    {showAddStateForm && (
                        <div className="state-form-container">
                            <form onSubmit={handleSubmitState}>
                                <input
                                    type="text"
                                    value={newStateName}
                                    onChange={(e) => setNewStateName(e.target.value)}
                                    placeholder="Enter state name"
                                />
                                <button type="submit">Add State</button>
                            </form>
                        </div>
                    )}
                </div>
                <div className="data-modification-form-container">
                    {showListStateForm && (
                        <div className="state-list-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>State Id</th>
                                        <th>State Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stateData.map((state) => (
                                        <tr key={state.stateId}>
                                            <td>{state.stateId}</td>
                                            <td>{state.stateName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    )}
                </div>
                <div className="data-modification-form-container">
                    {showDeleteStateForm &&  (
                        <div className="state-form-container">
                            <form onSubmit={handlesubmitDeleteState}>
                                <input
                                    type="text"
                                    value={newStateId}
                                    onChange={(e) => setNewStateId(e.target.value)}
                                    placeholder="Enter Id to Delete"
                                />
                                <button type="submit">Delete State</button>
                            </form>
                        </div>
                    )}
                </div>
                <div className="data-modification-form-container">
                    {showUpdateStateForm &&  (
                        <div className="state-form-container">
                            <form onSubmit={handleSubmitUpdateState}>
                                <input
                                    type="text"
                                    value={updateStateId}
                                    onChange={(e) => setUpdateStateId(e.target.value)}
                                    placeholder="Enter State ID"
                                />
                                <input
                                    type="text"
                                    value={updateStateName}
                                    onChange={(e) => setUpdateStateName(e.target.value)}
                                    placeholder="Enter State Name"
                                />
                                <button type="submit">Update State</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>


            <ToastContainer />
        </>
    );



}
export default StateDataModification;