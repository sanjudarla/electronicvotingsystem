import React, { useEffect, useState } from 'react';
import MainNavBar from '../../NavBarFile/NavBar/MainNavBar';
import { useNavigate } from 'react-router-dom';
import './PostElection.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostElection = ({ user, onLogout }) => {
    const [electionName, setElectionName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [stateId, setStateId] = useState('');
    const [endDate, setEndDate] = useState('');
    const [stateData, setStateData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchState();
    }, []);

    const fetchState = async () => {
        try {
            const stateResponse = await fetch("http://localhost:5191/api/StateApi");
            const stateData = await stateResponse.json();
            setStateData(stateData);
        } catch (error) {
            console.error('Error fetching state data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const electionData = {
            electionName,
            description,
            startDate,
            endDate,
            stateId,
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(electionData),
        };

        try {
            const response = await fetch("http://localhost:5191/api/ElectionApi", options);
            
            if (response.status === 200) {
                toast.success('Election Posted Successfully');
                navigate('/main-page');
                clearForm();
            } else {
                toast.error('Error posting election');
            }

        } catch (error) {
            console.error('Error posting election:', error);
            toast.error('Error posting election please try after sometime');
        }
    }

    const clearForm = () => {
        setElectionName('');
        setDescription('');
        setStartDate('');
        setStateId('');
        setEndDate('');
    };

    return (
        <>
            <MainNavBar user={user} onLogout={onLogout} />
            <div className='election-container'>
                <div className="post-election-container">
                    <h1 className="post-election-heading">Post Election</h1>
                    <form onSubmit={handleSubmit} className="post-election-form">
                        <input
                            type="text"
                            placeholder="Election name"
                            value={electionName}
                            onChange={(e) => setElectionName(e.target.value)}
                            className="election-name-input"
                        />
                        <select
                            value={stateId}
                            onChange={(e) => setStateId(e.target.value)}
                            className="state-select"
                        >
                            <option value="">Select state</option>
                            {stateData.map(s => (
                                <option key={s.stateId} value={s.stateId}>
                                    {s.stateName}
                                </option>
                            ))}
                        </select>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="description-textarea"
                        />
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="start-date-input"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="end-date-input"
                        />
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default PostElection;
