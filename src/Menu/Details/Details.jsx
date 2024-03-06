import React, { useState, useEffect } from "react";
import MainNavBar from "../../NavBarFile/NavBar/MainNavBar";
import "./Details.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Details = ({ user, onLogout }) => {
    const [candidates, setCandidates] = useState([]);
    const [parties, setParties] = useState([]);
    const [states, setStates] = useState([]);
    const [constituencies, setConstituencies] = useState([]);
    const [voter, setVoter] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("candidates");
    const [selectedState, setSelectedState] = useState(null);

    const [stateConstituencies, setStateConstituencies] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const candidateResponse = await fetch("http://localhost:5191/api/CandidateApi");
            const partyResponse = await fetch("http://localhost:5191/api/PartyApi");
            const stateResponse = await fetch("http://localhost:5191/api/StateApi");
            const constituencyResponse = await fetch("http://localhost:5191/api/ConstituencyApi");
            const voterResponse = await fetch("http://localhost:5191/api/VoterApi");


            const candidateData = await candidateResponse.json();
            const partyData = await partyResponse.json();
            const stateData = await stateResponse.json();
            const constituencyData = await constituencyResponse.json();
            const voterData = await voterResponse.json();

            setCandidates(candidateData);
            setParties(partyData);
            setStates(stateData);
            setConstituencies(constituencyData);
            setVoter(voterData);
        };

        fetchData();
    }, []);
    useEffect(() => {
        if (selectedState) {
            fetchConstituenciesbasedonStateId(selectedState);
        } else {
            setStateConstituencies([]);
        }
    }, [selectedState]);
    const partiesLookup = parties.reduce((acc, party) => {
        acc[party.partyId] = party;
        return acc;
    }, {});

    const statesLookup = states.reduce((acc, state) => {
        acc[state.stateId] = state;
        return acc;
    }, {});

    const constituenciesLookup = constituencies.reduce((acc, constituency) => {
        acc[constituency.constituencyId] = constituency;
        return acc;
    }, {});

    const filteredCandidates = candidates.filter(candidate =>
        candidate.candidateName &&
        candidate.candidateName.replace(/\s/g, '').toLowerCase().includes(searchTerm.replace(/\s/g, '').toLowerCase())
    );


    const fetchConstituenciesbasedonStateId = async (stateId) => {
        try {
            const response = await fetch(`http://localhost:5191/api/ConstituencyApi/${stateId}`);
            if (response.ok) {
                const data = await response.json();
                setStateConstituencies(data);
                if (data.length === 0) {
                    toast.info("No data available");
                }
            } else {
                setStateConstituencies('');


            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleStateSelect = e => {
        const selectedStateId = e.target.value;
        setSelectedState(selectedStateId);
    }



    return (
        <>
            <MainNavBar user={user} onLogout={onLogout} />
            <div className="details">
                <div className="details__title">Election Details </div>
                <div className="details__search">
                    <input
                        type="text"
                        placeholder="Search for the candidates"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button>Search</button>
                </div>
                <div className="details__tabs">
                    <div
                        className={`details__tab ${activeTab === "candidates" ? "details__tab--active" : ""}`}
                        onClick={() => setActiveTab("candidates")}
                    >
                        Candidates
                    </div>
                    <div
                        className={`details__tab ${activeTab === "states" ? "details__tab--active" : ""}`}
                        onClick={() => setActiveTab("states")}
                    >
                        States
                    </div>
                    <div
                        className={`details__tab ${activeTab === "parties" ? "details__tab--active" : ""}`}
                        onClick={() => setActiveTab("parties")}
                    >
                        Parties
                    </div>
                    <div
                        className={`details__tab ${activeTab === "constituencies" ? "details__tab--active" : ""}`}
                        onClick={() => setActiveTab("constituencies")}
                    >
                        Constituencies
                    </div>
                    <div
                        className={`details__tab ${activeTab === "voter" ? "details__tab--active" : ""}`}
                        onClick={() => setActiveTab("voter")}
                    >
                        Voters list
                    </div>
                </div>
                {activeTab === "candidates" && (
                    <div className="details__candidates-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>State</th>
                                    <th>Party</th>
                                    <th>Constituency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCandidates.map(candidate => (
                                    <tr key={candidate.candidateId}>
                                        <td>{candidate.candidateName}</td>
                                        <td>{statesLookup[candidate.stateId].stateName}</td>
                                        <td>{partiesLookup[candidate.partyId].partyName}</td>
                                        <td>{constituenciesLookup[candidate.constituencyId].constituencyName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === "states" && (
                    <div className="details__candidates-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>StateName</th>
                                    <th>Number of constituencies</th>
                                    <th>Number of Candidates up to now</th>
                                </tr>
                            </thead>
                            <tbody>
                                {states.map(state => (
                                    <tr key={state.stateId}>
                                        <td>{state.stateName}</td>
                                        <td>{constituencies.filter(constituency => constituency.stateId === state.stateId).length}</td>
                                        <td>{candidates.filter(candidate => candidate.stateId === state.stateId).length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "parties" && (
                    <div className="details__candidates-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>PartyName</th>
                                    <th>Number of Candidates</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parties.map(party => (
                                    <tr key={party.partyId}>
                                        <td>{party.partyName}</td>
                                        <td>{candidates.filter(candidate => candidate.partyId === party.partyId).length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "constituencies" && (
                    <div className="details__section">
                        <h2 className="details__section-title">Constituencies</h2>
                        <select onChange={handleStateSelect} className="details-form-control">
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state.stateId} value={state.stateId}>{state.stateName}</option>
                            ))}
                        </select>
                        {selectedState && (
                            <div><h3>Constituencies in {statesLookup[selectedState].stateName}</h3>
                                <div className="constituencies-grid">

                                    {stateConstituencies.length === 0 ? (
                                        <p>No data available for {statesLookup[selectedState].stateName}</p>
                                    ) : (
                                        stateConstituencies.map((c, index) => (
                                            <div className="constituency-item" key={c.constituencyId}>
                                                {c.constituencyName}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "voter" && (
                    <div>
                        <div className="details__section">
                            <h2 className="details__section-title">Voter List</h2>
                            <select onChange={handleStateSelect} className="details-form-control">

                                <option value="">Select State</option>
                                {states.map(state => (
                                    <option key={state.stateId} value={state.stateId}>{state.stateName}</option>
                                ))}
                            </select>
                        </div>
                        {selectedState && (
                            <div>
                                <h3>Constituencies in {statesLookup[selectedState].stateName}</h3>
                                {stateConstituencies.length === 0 ? (
                                    <p>No data available for {statesLookup[selectedState].stateName} </p>
                                ) : (
                                    <div className="details__candidates-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Constituency Name</th>
                                                    <th>Voter Count</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {stateConstituencies
                                                    .filter(constituency => {
                                                        const voteCount = voter.filter(vote => vote.constituencyId === constituency.constituencyId).length;
                                                        return voteCount > 0;
                                                    })
                                                    .map((constituency, index) => {
                                                        const voteCount = voter.filter(vote => vote.constituencyId === constituency.constituencyId).length;
                                                        return (
                                                            <tr key={index}>
                                                                <td>{constituency.constituencyName}</td>
                                                                <td>{voteCount}</td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}



            </div>
            <ToastContainer />
        </>
    );
};

export default Details;