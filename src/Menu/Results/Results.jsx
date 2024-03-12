import React, { useEffect, useState } from "react";
import MainNavBar from "../../NavBarFile/NavBar/MainNavBar";
import './Results.css'

const Results = ({ user, onLogout }) => {
    const [stateNames, setStateNames] = useState([]);
    const [electionTitles, setElectionTitles] = useState([]);
    const [selectedStateId, setSelectedStateId] = useState('');
    const [selectedElectionId, setSelectedElectionId] = useState('');
    const [partyId, setPartyId] = useState('');
    const [parties, setParties] = useState([]);
    const [states, setStates] = useState([]);
    const [electionData, setElectionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dataFetched, setDataFetched] = useState(false);
    const [showNoDetails, setShowNoDetails] = useState(false);
    const [constituenciesCount, setConstituenciesCount] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [votingData, setVotingData] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [constituencies, setConstituencies] = useState([]);

    useEffect(() => {
        fetchStateData();
    }, []);

    const fetchStateData = async () => {
        try {
            const response = await fetch('http://localhost:5191/api/StateApi/');
            const data = await response.json();
            setStateNames(data);
            setLoading(false);
        } catch (error) {
            setError("Error fetching state names: " + error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const partyResponse = await fetch("http://localhost:5191/api/PartyApi");
                const stateResponse = await fetch("http://localhost:5191/api/StateApi");
                const electionResponse = await fetch("http://localhost:5191/api/ElectionApi");
                const candidateResponse = await fetch("http://localhost:5191/api/CandidateApi");
                const constituencyResponse = await fetch("http://localhost:5191/api/ConstituencyApi");

                const partyData = await partyResponse.json();
                const stateData = await stateResponse.json();
                const electionData = await electionResponse.json();
                const candidateData = await candidateResponse.json();
                const constituencyData = await constituencyResponse.json();

                setCandidates(candidateData);
                setConstituencies(constituencyData);
                setParties(partyData);
                setStates(stateData);
                setElectionData(electionData);
                setLoading(false);
                setDataFetched(true); // Data fetching successful
            } catch (error) {
                setError("Error fetching data: " + error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const fetchElectionTitles = async (stateId) => {
        try {
            const response = await fetch(`http://localhost:5191/api/ElectionApi/ElectionDetailsByStateId/${stateId}`);
            const data = await response.json();
            setElectionTitles(data);
        } catch (error) {
            setError("Error fetching election titles: " + error.message);
        }
    };

    useEffect(() => {
        if (selectedStateId) {
            fetchElectionTitles(selectedStateId);
        }
    }, [selectedStateId]);
    const constituenciesLookup = constituencies.reduce((acc, constituency) => {
        acc[constituency.constituencyId] = constituency;
        return acc;
    }, {});
    const partiesLookup = parties.reduce((acc, party) => {
        acc[party.partyId] = party;
        return acc;
    }, {});
    const candidatesLookup = candidates.reduce((acc, candidate) => {
        acc[candidate.candidateId] = candidate;
        return acc;
    }, {});

    const statesLookup = states.reduce((acc, state) => {
        acc[state.stateId] = state;
        return acc;
    }, {});
    const electionLookup = electionData.reduce((acc, election) => {
        acc[election.electionId] = election;
        return acc;
    }, {});
    const handleViewDetails = () => {
        setShowDetails(true);
        fetchVotingData(); // Show details when button is clicked
    };
    const handleStateChange = (e) => {
        setSelectedStateId(e.target.value);
        setDataFetched(false); // Reset data fetched state when state changes
        setShowNoDetails(false); // Reset showNoDetails state when state changes
    };

    const handleElectionChange = (e) => {
        setSelectedElectionId(e.target.value);
        setDataFetched(false); // Reset data fetched state when election changes
        setShowNoDetails(false); // Reset showNoDetails state when election changes
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:5191/api/VotingApi/TopPartyIdAndCountByStateAndElectionId/${selectedStateId}/${selectedElectionId}`);
            const data = await response.json();

            setPartyId(data.partyId);
            setConstituenciesCount(data.count)
            if (response.status === 200) {
                setDataFetched(true);
            }
            else {
                setShowNoDetails(true); // Show "No Details Available" message
                setDataFetched(false);
            }

        } catch (error) {
            setError("Error fetching party ID: " + error.message);
        }
    };

    const fetchVotingData = async () => {
        try {
            const response = await fetch(`http://localhost:5191/api/VotingApi/ElectionId/${selectedElectionId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch voting data');
            }
            const data = await response.json();
            console.log(data);
            setVotingData(data);
        } catch (error) {
            setError("Error fetching voting data: " + error.message);
        }
    };


    // Call fetchVotingData function


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <MainNavBar user={user} onLogout={onLogout} />
            <div className="results-main-container">
                <div className="results-container-box">
                    <div className="results-container-title">
                        <h1>Election Results</h1>
                    </div>
                    <div className="dropdowns-container">
                        <select onChange={handleStateChange}>
                            <option value="">Select State</option>
                            {stateNames.map(state => (
                                <option key={state.stateId} value={state.stateId}>{state.stateName}</option>
                            ))}
                        </select>
                        <select onChange={handleElectionChange}>
                            <option value="">Select Election Title</option>
                            {electionTitles.length > 0 ? (
                                electionTitles.map(title => (
                                    <option key={title.electionId} value={title.electionId}>{title.electionName}</option>
                                ))
                            ) : (
                                <option disabled>No Election Results Available</option>
                            )}
                        </select>



                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                    <div className="results-table-container">

                        {dataFetched ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>StateName</th>
                                        <th>Election Title</th>
                                        <th>Party Won</th>
                                        <th>Constituencies</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{selectedStateId && statesLookup[selectedStateId] ? statesLookup[selectedStateId].stateName : 'N/A'}</td>
                                        <td>{selectedElectionId && electionLookup[selectedElectionId] ? electionLookup[selectedElectionId].electionName : 'N/A'}</td>
                                        <td>{partyId && partiesLookup[partyId] ? partiesLookup[partyId].partyName : 'N/A'}</td>
                                        <td>{constituenciesCount}</td>
                                        <td>
                                            <button onClick={handleViewDetails}>View Details</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            showNoDetails && <div> No Details Available</div>
                        )}
                    </div>
                    {showDetails && votingData.length > 0 && (
                        <div className="details-container">
                            <h2>Election Details</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>State</th>
                                        <th>Election Name</th>
                                        <th>Party Name</th>
                                        <th>Constituency Name</th>
                                        <th>Candidate Name</th>
                                        <th>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(votingData.reduce((acc, data) => {
                                        const candidateId = data.candidateId;
                                        if (!acc[candidateId]) {
                                            acc[candidateId] = {
                                                stateId: data.stateId,
                                                electionId: data.electionId,
                                                partyId: data.partyId,
                                                constituencyId: data.constituencyId,
                                                candidateId: candidateId,
                                                count: 0
                                            };
                                        }
                                        acc[candidateId].count++;
                                        return acc;
                                    }, {})).map(([candidateId, candidateData]) => (
                                        <tr key={candidateId}>
                                            <td>{candidateData.stateId && statesLookup[candidateData.stateId] ? statesLookup[candidateData.stateId].stateName : 'N/A'}</td>
                                            <td>{candidateData.electionId && electionLookup[candidateData.electionId] ? electionLookup[candidateData.electionId].electionName : 'N/A'}</td>
                                            <td>{candidateData.partyId && partiesLookup[candidateData.partyId] ? partiesLookup[candidateData.partyId].partyName : 'N/A'}</td>
                                            <td>{candidateData.constituencyId && constituenciesLookup[candidateData.constituencyId] ? constituenciesLookup[candidateData.constituencyId].constituencyName : 'N/A'}</td>
                                            <td>{candidateData.candidateId && candidatesLookup[candidateData.candidateId] ? candidatesLookup[candidateData.candidateId].candidateName : 'N/A'}</td>
                                            <td>{candidateData.count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default Results;
