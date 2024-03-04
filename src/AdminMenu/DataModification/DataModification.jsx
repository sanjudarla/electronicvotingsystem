import React, { useState } from "react";
import MainNavBar from "../../NavBarFile/NavBar/MainNavBar";
import './DataModification.css'

const DataModification = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState("states");
    const [showDropdown, setShowDropdown] = useState(false);

     const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const HandleAddState = () => {

    }
    const HandleUpdateState = () => {
        
    }
    const HandleDeleteState = () => {
        
    }
    const HandleUpdateConstituency = () => {
        
    }
    const HandleDeleteConstituency = () => {
        
    }
    const HandleUpdateCandidates = () => {
        
    }
    const HandleDeleteCandidates = () => {
        
    }
    const HandleUpdateVoters = () => {
        
    }
    const HandleDeleteVoters = () => {
        
    }






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
                            {activeTab === "states" && (
                                <div className="modification-data-options">
                                <button  onClick={toggleDropdown}></button>
                                    {showDropdown && (
                                        <div className="dropdown-content">
                                            <button onClick={HandleAddState}>Add State</button>
                                            <button onClick={HandleUpdateState}>Update State</button>
                                            <button onClick={HandleDeleteState}>Delete State</button>

                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div
                            className={`data-modification-details-tab ${activeTab === "constituencies" ? "data-modification-details-tab--active" : ""
                                }`}
                            onClick={() => setActiveTab("constituencies")}
                        >
                            Constituency Data
                            {activeTab === "constituencies" && (
                                <div className="modification-data-options">
                                <button  onClick={toggleDropdown}></button>
                                    {showDropdown && (
                                        <div className="dropdown-content">
                                            
                                            <button onClick={HandleUpdateConstituency}>Update Constituencies</button>
                                            <button onClick={HandleDeleteConstituency}>Delete Constituencies</button>

                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div
                            className={`data-modification-details-tab ${activeTab === "candidates" ? "data-modification-details-tab--active" : ""
                                }`}
                            onClick={() => setActiveTab("candidates")}
                        >
                            Candidate Data
                            {activeTab === "candidates" && (
                                <div className="modification-data-options">
                                <button  onClick={toggleDropdown}></button>
                                    {showDropdown && (
                                        <div className="dropdown-content">
                                            <button onClick={HandleUpdateCandidates}>Update Candidates</button>
                                            <button onClick={HandleDeleteCandidates}>Delete Candidates</button>

                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div
                            className={`data-modification-details-tab ${activeTab === "voters" ? "data-modification-details-tab--active" : ""
                                }`}
                            onClick={() => setActiveTab("voters")}
                        >
                            Voters Data
                            {activeTab === "voters" && (
                                <div className="modification-data-options">
                                <button  onClick={toggleDropdown}></button>
                                    {showDropdown && (
                                        <div className="dropdown-content">
                                          
                                            <button onClick={HandleUpdateVoters}>Update Voters</button>
                                            <button onClick={HandleDeleteVoters}>Delete Voters</button>

                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="data-modification-data-container">

                </div>
            </div>
        </>
    );
};

export default DataModification;