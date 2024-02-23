import React from "react";
import MainNavBar from "../NavBar/MainNavBar";


const VoterCard = ({ user, onLogout }) => {
    return (
        <>
            <MainNavBar user={user} onLogout={onLogout}/>
            <div>
                <h1>Welcome </h1>
            </div>
        </>
    )
}
export default VoterCard;