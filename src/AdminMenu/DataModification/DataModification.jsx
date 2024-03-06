import React, { useEffect, useState } from "react";
import MainNavBar from "../../NavBarFile/NavBar/MainNavBar";
import './DataModification.css'
import { ToastContainer, toast } from "react-toastify";
import CandidatesDataModification from "./CandidatesDataModification";

import StateDataModification from "./StateDataModification";
import VoterDataModification from "./VoterDataModification";
import ConstituenciesDataModification from "./ConstituenciesDataModification";

const DataModification = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState("states");

    return (
        <>
            <MainNavBar user={user} onLogout={onLogout} />
            <div className="data-modification-container">
                <div className="data-modification-menu">
                    <div className="data-modification-details-tabs">
                        <div
                            className={`data-modification-details-tab ${activeTab === "states" ? "data-modification-details-tab--active" : ""}`}
                            onClick={() => setActiveTab("states")}
                        >
                            State Data

                        </div>
                        <div
                            className={`data-modification-details-tab ${activeTab === "constituencies" ? "data-modification-details-tab--active" : ""
                                }`}
                            onClick={() => setActiveTab("constituencies")}
                        >
                            Constituency Data

                        </div>
                        <div
                            className={`data-modification-details-tab ${activeTab === "candidates" ? "data-modification-details-tab--active" : ""
                                }`}
                            onClick={() => setActiveTab("candidates")}
                        >
                            Candidate Data

                        </div>
                        <div
                            className={`data-modification-details-tab ${activeTab === "voters" ? "data-modification-details-tab--active" : ""
                                }`}
                            onClick={() => setActiveTab("voters")}
                        >
                            Voters Data

                        </div>
                    </div>

                    <div className="data-modification-data-container">
                        {activeTab === "states" && (
                            <div className="modification-data-options">
                                <div className="modification-data-options-title">
                                    <h1>State Data Modification</h1>
                                </div>
                                <StateDataModification />
                            </div>

                        )}
                        {activeTab === "constituencies" && (
                            <div className="modification-data-options">
                                <div className="modification-data-options-title">
                                    <h1>Constituencies Data Modification</h1>
                                </div>

                                <ConstituenciesDataModification />
                            </div>
                        )}
                        {activeTab === "candidates" && (
                            <div className="modification-data-options">
                                <div className="modification-data-options-title">
                                    <h1>Candidates Data Modification</h1>
                                </div>
                                <CandidatesDataModification />
                            </div>
                        )}

                        {activeTab === "voters" && (
                            <div className="modification-data-options">
                                <div className="modification-data-options-title">
                                    <h1>Voters Data Modification</h1>
                                </div>
                                <VoterDataModification />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default DataModification;