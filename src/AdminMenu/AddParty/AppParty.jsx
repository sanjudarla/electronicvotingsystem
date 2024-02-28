import React, { useEffect, useState } from "react";
import MainNavBar from "../../NavBarFile/NavBar/MainNavBar";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import PartyFlag from "../../Images/PartyFlag.png"

import 'react-toastify/dist/ReactToastify.css';
import './AddParty.css'; // Import your CSS file

const getInitialPartyData = () => ({
    partyName: "",
    symbol: ""
});

const AddParty = ({ user, onLogout }) => {
    const [partyData, setPartyData] = useState(getInitialPartyData);
    const [isNameValid, setIsNameValid] = useState(true);
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPartyData({
            ...partyData,
            [name]: value
        });
        if (name === 'partyName') {
            setIsNameValid(value.charAt(0) === value.charAt(0).toUpperCase());
        }
       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(partyData);

            const response = await axios.post('http://localhost:5191/api/PartyApi', partyData);
            console.log(response);

            if (response.status === 201) {
                toast.success("Party Added Successfully");
                setPartyData(getInitialPartyData);
            } else {
                toast.error("Error Adding Party");
            }
        } catch (error) {
            console.error("Error saving data:", error);
            toast.error("Error Adding Party");
        }
    };

    return (
        <>
            <MainNavBar user={user} onLogout={onLogout} />
            <div className="add-party-container">
                <div className="party-container-box">
                <div className="party-blank-container">
                        <img src={PartyFlag} alt="Candidate"></img>
                    </div>
                    <form className="party-form-box" onSubmit={handleSubmit}>
                        <div className="party-form-container">
                            <div className="party-title-container">
                                <h3>Adding Party Details</h3>
                            </div>
                            <div className="party-data-container">
                                <div className="party-paragraph-box">
                                    <p>Please Enter Party Name <span className="required-symbol-for-party">*</span></p>
                                </div>
                                <div className="add-container-party-input-field">
                                    <label className="party-label-container" htmlFor="partyName">Party Name :</label>
                                    <input className={`party-input-container ${!isNameValid ? 'invalid' : ''}`}type="text" name="partyName" id="partyName" value={partyData.partyName} onChange={handleChange} placeholder="Party Name" required />
                                </div>
                                <div className="add-party-validations">
                                {!isNameValid && <p>Party name must start with a capital letter</p>}
                                </div>
                            </div>
                            <div className="party-data-container">
                                <div className="party-paragraph-box">
                                    <p>Please provide the url of the  Party Symbol <span className="required-symbol-for-party">*</span></p>
                                </div>
                                <div className="add-container-party-input-field">
                                    <label className="party-label-container" htmlFor="symbol">Party Symbol Url:</label>
                                    <input className="party-input-container" type="text" name="symbol" id="symbol" value={partyData.symbol} onChange={handleChange} placeholder="Party Symbol" required />
                                </div>
                               
                            </div>
                            <div className="party-buttons">
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default AddParty;
