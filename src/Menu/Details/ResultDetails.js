import React, { useEffect, useState } from "react";
import '../Results/Results.css'
import { toast } from "react-toastify";

const ResultDetails = () => {
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
    const [resultsData, setResultsData] = useState(false);
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
        debugger;
        fetchResultsData();
    };
    const handleStateChange = (e) => {
        setSelectedStateId(e.target.value);
        setDataFetched(false);
        setShowNoDetails(false);
    };

    const handleElectionChange = (e) => {
        setSelectedElectionId(e.target.value);
        setDataFetched(false);
        setShowNoDetails(false);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:5191/api/VotingApi/TopPartyIdAndCountByStateAndElectionId/${selectedStateId}/${selectedElectionId}`);
            const data = await response.json();

            setPartyId(data.partyId);
            setConstituenciesCount(data.count);

            if (response.status === 200) {
                setDataFetched(true);
                setShowNoDetails(false); // Reset showNoDetails state
            } else {
                setDataFetched(false);
                setShowNoDetails(true); // Show "No Election Results Available" message
                setResultsData([]); // Clear previous results data
            }
        } catch (error) {
            setError("Error fetching party ID: " + error.message);
        }
    };


    const fetchResultsData = async () => {
        try {
            const response = await fetch(`http://localhost:5191/api/ResultsApi/ElectionId/${selectedElectionId}`);
            if (!response.ok) {
               toast.error("There is No Data Available.Please try Again After Some Time")
            }
            const data = await response.json();

            setResultsData(data);
        } catch (error) {
            setError("Error fetching Results: " + error.message);
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
                        {dataFetched && electionTitles.length > 0 ? (
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
                            showNoDetails && <div>No Election Results Available</div>
                        )}
                    </div>


                    {showDetails && resultsData.length > 0 && (

                        <div className="results-table-container">
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

                                    {resultsData.map(result => (
                                        <tr key={result.resultsId}>
                                            <td>{statesLookup[result.stateId]?.stateName || 'N/A'}</td>
                                            <td>{electionLookup[result.electionid]?.electionName || 'N/A'}</td>
                                            <td>{partiesLookup[result.partyId]?.partyName || 'N/A'}</td>
                                            <td>{constituenciesLookup[result.constituencyId]?.constituencyName || 'N/A'}</td>
                                            <td>{candidatesLookup[result.candidateId]?.candidateName || 'N/A'}</td>
                                            <td>{result.votingCount || 'N/A'}</td>
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

export default ResultDetails;
