import React from "react";
import Home from '../../Images/Home.png';
import Vote from '../../Images/Vote.png';
import AddParty from '../../Images/AddParty.png';
import AddCandidate from '../../Images/AddCandidate.png';
import ApproveReject from '../../Images/ApproveReject.png';
import VoterId from '../../Images/VoterId.png';
import Election from '../../Images/Election.png';
import UpdateData from '../../Images/UpdateData.png';
import Results from '../../Images/Results.png';
import { useNavigate } from "react-router-dom";
import './MainPage.css';
import MainNavBar from "../../NavBarFile/NavBar/MainNavBar";

const MainPage = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const ApplyVoterHandleClick = () => {
        navigate("/apply-voter-id");
    }

    const VoterHandleClick = () => {
        navigate("/cast-vote");
    }

    const DetailsHandleClick = () => {
        navigate("/details-page");
    }

    const AddCandidateHandleClick = () => {
        navigate("/add-candidate");
    }

    const AddPartyHandleClick = () => {
        navigate("/add-party");
    }

    const ApproveRejectHandleClick = () => {
        navigate('/requests');
    }

    const PostElectionHandleClick = () => {
        navigate('/post-election');
    }

    const DataModificationHandleClick = () => {
        navigate('/data-modification');
    }

    const AddResultsHandleClick = () => {
        navigate('/results');
    }

    const isAdminUser = user && user.emailAddress === "Admin@gmail.com" && user.password === "Admin@123";
    const isElectoralOfficer = user && user.emailAddress === "ElectoralOfficer@gmail.com" && user.password === "Officer@123";
    const isRegularUser = user && !isAdminUser && !isElectoralOfficer;

    return (
        <>
            <MainNavBar user={user} onLogout={onLogout} />
            <div className="menu-items-container">
                <div className="menu-row">
                    {isRegularUser &&
                        <>
                            
                            <div className="menu-item">
                                <a href="/main-page"><img src={Vote} alt="Voting" /></a>
                                <button onClick={VoterHandleClick}>Vote</button>
                            </div>
                            <div className="menu-item">
                                <a href="/main-page"><img src={VoterId} alt="Apply For Voter Id" /></a>
                                <button onClick={ApplyVoterHandleClick}>Apply for Voter Id</button>
                            </div>
                        </>
                    }
                    {isAdminUser &&
                        <>

                            <div className="menu-item">
                                <a href="/main-page"><img src={AddParty} alt="Add Party" /></a>
                                <button onClick={AddPartyHandleClick}>Add Party</button>
                            </div>
                            <div className="menu-item">
                                <a href="/main-page"><img src={AddCandidate} alt="Add Candidate" /></a>
                                <button onClick={AddCandidateHandleClick}>Add Candidate</button>
                            </div>
                            <div className="menu-item">
                                <a href="/main-page"><img src={UpdateData} alt="Data Modification" /></a>
                                <button onClick={DataModificationHandleClick}>Data Modification</button>
                            </div>
                        </>
                    }
                    {isElectoralOfficer &&
                        <>
                            <div className="menu-item">
                                <a href="/main-page"><img src={ApproveReject} alt="Approve/Reject Requests" /></a>
                                <button onClick={ApproveRejectHandleClick}>Approve/Reject Requests</button>
                            </div>
                            <div className="menu-item">
                                <a href="/main-page"><img src={UpdateData} alt="Data Modification" /></a>
                                <button onClick={DataModificationHandleClick}>Data Modification</button>
                            </div>
                        </>
                    }
                </div>

                <div className="menu-row">
                    {isAdminUser &&
                        <>
                            <div className="menu-item">
                                <a href="/main-page"><img src={Election} alt="Post Elections" /></a>
                                <button onClick={PostElectionHandleClick}>Post Elections</button>
                            </div>
                        </>
                    }
                    <div className="menu-item">
                        <a href="/main-page"><img src={Results} alt="results" /></a>
                        <button onClick={AddResultsHandleClick}>Results</button>
                    </div>
                    <div className="menu-item">
                        <a href="/main-page"><img src={Home} alt="Details" /></a>
                        <button onClick={DetailsHandleClick}>Details</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage;
