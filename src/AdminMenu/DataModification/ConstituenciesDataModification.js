import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import './DataModification.css'

const ConstituenciesDataModification = () => {
    //Constituencies Data Modification

    const [showUpdateConstituencyTab, setshowUpdateConstituencyTab] = useState(false);
    const [showAddConstituencyTab, setshowAddConstituencyTab] = useState(false);
    const [showDeleteConstituencyTab, setshowDeleteConstituencyTab] = useState(false);
    const [showListConstituencyTab, setshowListConstituencyTab] = useState(false);
    const [constituencyData, setConstituencyData] = useState([]);
    const [updateConstituencyStateId, setUpdateConstituencyStateId] = useState("");
    const [updateConstituencyId, setUpdateConstituencyId] = useState("");
    const [updateConstituencyName, setUpdateUpdateConstituencyName] = useState('');

    useEffect(() => {


        fetchConstituencyData();

    }, []);
    //Candidate Data Fetching
    const fetchConstituencyData = async () => {
        try {
            const constituencyResponse = await fetch("http://localhost:5191/api/ConstituencyApi");
            const data = await constituencyResponse.json();

            const formattedData = data.reduce((acc, constituency) => {
                acc[constituency.constituencyId] = constituency;
                return acc;
            }, {});

            setConstituencyData(formattedData);


        }
        catch (error) {
            console.error('Error fetching constituency data', error);
        }
    };


    //Constituency Data Handles
    const HandleAddConstituency = () => {
        setshowAddConstituencyTab(true);
        setshowUpdateConstituencyTab(false);
        setshowDeleteConstituencyTab(false);
        setshowListConstituencyTab(false);
    }
    const handleSubmitAddConstituency = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5191/api/ConstituencyApi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ constituencyName: updateConstituencyName, stateId: updateConstituencyStateId })
            });
            if (response.status === 201) {
                toast.success("Constituency Added Successfully");
                setUpdateConstituencyStateId('');
                setUpdateUpdateConstituencyName('');
                fetchConstituencyData();

            } else {
                console.error('Failed to add state:', response.statusText);
            }


        }
        catch (error) {
            alert(`Something went wrong: ${error.message}`);
        }
    }


    const HandleUpdateConstituency = () => {
        setshowUpdateConstituencyTab(true)
        setshowListConstituencyTab(false)
        setshowAddConstituencyTab(false)
        setshowDeleteConstituencyTab(false)
    }

    const handleSubmitUpdateConstituency = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5191/api/ConstituencyApi/constituency${updateConstituencyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ constituencyId: updateConstituencyId, constituencyName: updateConstituencyName, stateId: updateConstituencyStateId })
            });
            if (response.status === 200) {
                toast.success("Constituency Updated Successfully");
                setUpdateConstituencyId('');
                setUpdateUpdateConstituencyName('');
                fetchConstituencyData();
            } else {
                console.error('Failed to update constituency:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating constituency:', error);
        }
    }

    const HandleDeleteConstituency = () => {
        setshowDeleteConstituencyTab(true)
        setshowListConstituencyTab(false)
        setshowAddConstituencyTab(false)
        setshowUpdateConstituencyTab(false)

    }
    const handlesubmitDeleteConstituency = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5191/api/ConstituencyApi/${updateConstituencyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                toast.success("Constituency Deleted Successfully");
                setUpdateConstituencyId('');
                fetchConstituencyData();
            }
            else {
                console.error('Failed to delete constituency:', response.statusText);
            }
        } catch (err) {
            console.error('Error deleting constituency:', err);
        }

    }
    const HandleListConstituency = () => {
        setshowListConstituencyTab(true)
        setshowUpdateConstituencyTab(false)
        setshowDeleteConstituencyTab(false)
        setshowAddConstituencyTab(false)
    }
    return (
        <>
           <div className="data-modification-container">
                <div className="data-modification-data-container">
                    <div className="modification-data-options">
                        <div className="modification-actions">
                            <button onClick={() => HandleAddConstituency()}>Add Constituency</button>
                            <button onClick={() => HandleUpdateConstituency()}>Update Constituency</button>
                            <button onClick={() => HandleDeleteConstituency()}>Delete Constituency</button>
                            <button onClick={() => HandleListConstituency()}>List Constituency</button>
                        </div>
                    </div>
                </div>
                <div className="data-modification-form-container">
                    {showAddConstituencyTab && (
                        <div className="state-form-container">
                            <form onSubmit={handleSubmitAddConstituency}>

                                <input
                                    type="text"
                                    value={updateConstituencyStateId}
                                    onChange={(e) => setUpdateConstituencyStateId(e.target.value)}
                                    placeholder="Enter Constituency State ID"
                                />
                                <input
                                    type="text"
                                    value={updateConstituencyName}
                                    onChange={(e) => setUpdateUpdateConstituencyName(e.target.value)}
                                    placeholder="Enter Constituency Name"
                                />
                                <button type="submit">Add Constituency</button>
                            </form>
                        </div>
                    )}
                </div>
                <div className="data-modification-form-container">
                    {showUpdateConstituencyTab && (
                        <div className="state-form-container">
                            <form onSubmit={handleSubmitUpdateConstituency}>
                                <input
                                    type="text"
                                    value={updateConstituencyId}
                                    onChange={(e) => setUpdateConstituencyId(e.target.value)}
                                    placeholder="Enter Constituency ID"
                                />
                                <input
                                    type="text"
                                    value={updateConstituencyStateId}
                                    onChange={(e) => setUpdateConstituencyStateId(e.target.value)}
                                    placeholder="Enter Constituency State ID"
                                />
                                <input
                                    type="text"
                                    value={updateConstituencyName}
                                    onChange={(e) => setUpdateUpdateConstituencyName(e.target.value)}
                                    placeholder="Enter Constituency Name"
                                />
                                <button type="submit">Update Constituency</button>
                            </form>
                        </div>
                    )}
                </div>
                <div className="data-modification-form-container">
                    {showListConstituencyTab && (
                        <div className="state-list-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Constituency Id</th>
                                        <th>Constituency Name</th>
                                        <th>State Id</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(constituencyData).map(constituency => (
                                        <tr key={constituency.constituencyId}>
                                            <td>{constituency.constituencyId}</td>
                                            <td>{constituency.constituencyName}</td>
                                            <td>{constituency.stateId}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="data-modification-form-container">
                    {showDeleteConstituencyTab && (
                        <div className="state-form-container">
                            <form onSubmit={handlesubmitDeleteConstituency}>
                                <input
                                    type="text"
                                    value={updateConstituencyId}
                                    onChange={(e) => setUpdateConstituencyId(e.target.value)}
                                    placeholder="Enter Constituency Id to Delete"
                                />
                                <button type="submit">Delete Constituency</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            <ToastContainer />
        </>

    )

}
export default ConstituenciesDataModification;