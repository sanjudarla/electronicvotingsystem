import React, { useState, useEffect } from "react";
import MainNavBar from "../../NavBarFile/NavBar/MainNavBar";
import './Vote.css'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Vote = ({ user, onLogout }) => {
    const [voterData, setVoterData] = useState(null);
    const [constituency, setConstituency] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [electionData, setElectionData] = useState([]);
    const [parties, setParties] = useState([]);
    const [voted, setVoted] = useState(false);
    const [states, setStates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const partyResponse = await fetch("http://localhost:5191/api/PartyApi");
            const stateResponse = await fetch("http://localhost:5191/api/StateApi");
            const partyData = await partyResponse.json();
            const stateData = await stateResponse.json();
            setParties(partyData);
            setStates(stateData);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (user) {
            fetchVoterData(user.userId);
        }
    }, [user]);

    const partiesLookup = parties.reduce((acc, party) => {
        acc[party.partyId] = party;
        return acc;
    }, {});

    const statesLookup = states.reduce((acc, state) => {
        acc[state.stateId] = state;
        return acc;
    }, {});

    const fetchVoterData = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5191/api/VoterApi/${userId}`);
            const data = await response.json();

            if (response.status === 404) {
                toast.error("Voter data not found");
                return;
            }
            setVoterData(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to fetch voter data");
        }
    };

    useEffect(() => {
        if (voterData) {
            fetchConstituency(voterData[0].constituencyId);
        }
    }, [voterData]);

    const fetchConstituency = async (constituencyId) => {
        try {
            const response = await fetch(`http://localhost:5191/api/ConstituencyApi/constituency/${constituencyId}`);
            const data = await response.json();
            setConstituency(data);
        } catch (error) {
            console.error("Error fetching constituency data:", error);
        }
    };

    useEffect(() => {
        if (constituency) {
            fetchCandidates(constituency.constituencyId);
        }
    }, [constituency]);

    const fetchCandidates = async (constituencyId) => {
        try {
            const response = await fetch(`http://localhost:5191/api/CandidateApi/constituency${constituencyId}`);
            const data = await response.json();
            setCandidates(data);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    useEffect(() => {
        if (voterData) {
            fetchElections(voterData[0].stateId);
        }
    }, [voterData]);

    const fetchElections = async (stateId) => {
        try {
            const response = await fetch(`http://localhost:5191/api/ElectionApi/state/${stateId}`);
            const data = await response.json();
            setElectionData(data);
        } catch (error) {
            console.error("Error fetching elections:", error);
        }
    };

    useEffect(() => {
        const checkVotingStatus = async () => {
            if (voterData) {
                try {
                    const response = await fetch(`http://localhost:5191/api/VotingApi/citizen/${voterData[0].citizenId}`);
                    if (response.ok) {
                        const data = await response.json();

                        setVoted(data.status === 'voted' && data.electionId === electionData[0].electionId);
                    } else {
                        // Handle error if the user's voting status couldn't be fetched
                        console.error('Failed to fetch user voting status:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching user voting status:', error);
                }
            }
        };

        checkVotingStatus();
    }, [voterData, electionData]);


    const handleVote = async (candidate) => {
        if (voted) {
            return;
        }
        const confirmVote = window.confirm("Are you sure to submit your vote?");
        if (!confirmVote) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5191/api/VotingApi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    electionId: electionData[0].electionId,
                    candidateId: candidate.candidateId,
                    stateId: voterData[0].stateId,
                    constituencyId: constituency.constituencyId,
                    citizenId: voterData[0].citizenId,
                    partyId: candidate.partyId,
                    status: 'voted'
                })
            });

            if (response.ok) {
                setVoted(true);
                alert('Vote submitted successfully!');
            } else {
                alert('Failed to submit vote. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
            alert('An error occurred while submitting your vote. Please try again later.');
        }
    };

    return (
        <>
            <MainNavBar user={user} onLogout={onLogout} />
            <div className="cast-vote-container">
                <h1 className="cast-vote-title">Cast Your Vote!</h1>

                {electionData.length === 0 ? (
                    <h2>Currently, there are no elections in your state</h2>
                ) : (
                    <>
                        <div className="election-details-fetch-container">
                            <h1>{electionData[0].electionName}</h1>
                            <h3>{electionData[0].description} {electionData[0].startDate}</h3>
                        </div>
                        {candidates[0] && (
                            <>
                                <h1>{candidates[0].constituencyName}</h1>
                                {voted ? (
                                    <p>Thank you......Your Vote Has Been Submtted..</p>
                                ) : (
                                    <table className="candidates-table">
                                        <thead>
                                            <tr>
                                                <th className="state-header">StateName</th>
                                                <th className="constituency-header">ConstituencyName</th>
                                                <th className="candidate-header">CandidateName</th>
                                                <th className="party-header">Party</th>
                                                <th className="vote-header">Vote</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {candidates.map(c => (
                                                <tr key={c.candidateId}>
                                                    <td className="state">{statesLookup[c.stateId].stateName}</td>
                                                    <td className="constituency">{constituency.constituencyName}</td>
                                                    <td className="candidate">{c.candidateName}</td>
                                                    <td className="party">{partiesLookup[c.partyId].partyName}</td>
                                                    <td className="vote-cell">
                                                        <button onClick={() => handleVote(c)} disabled={voted}>
                                                            {voted ? "Voted" : "Vote"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                </>
                        )}
                    </>
                )}
            </div>
            <ToastContainer />
        </>
    );
}

export default Vote;
