import React, { useState, useEffect, useRef } from "react";
import MainNavBar from "../NavBar/MainNavBar";
import "./VoterCard.css";
import NationalSymbol from "../../Images/NationalSymbol.png";
import Voter from "../../Images/Voter.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const VoterCard = ({ user, onLogout }) => {
    const [userData, setUserData] = useState(null);
    const cardRef = useRef(null);

    const handleDownload = () => {
        if (!cardRef.current) {
            console.error("Error: Could not find voter-card-container element");
            return;
        }
    
        const voterCardElement = cardRef.current.querySelector('.voter-card');
    
        const mainNavBar = document.querySelector('.main-nav-bar');
        if (mainNavBar) {
            mainNavBar.style.display = 'none';
        }
    
        html2canvas(voterCardElement, { dpi: window.devicePixelRatio * 96, scale: 2 }).then((canvas) => {
            try {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF();
    
                // Set A4 dimensions
                const pdfWidth = 210; // Width of A4 size paper in mm
                const pdfHeight = 297; // Height of A4 size paper in mm
    
                const imgWidth = pdfWidth; // Width of image to be placed in PDF
                const imgHeight = (canvas.height * imgWidth) / canvas.width; // Height of image to be placed in PDF
    
                // Calculate position to center the image
                const xPos = (pdfWidth - imgWidth) / 2;
                const yPos = (pdfHeight - imgHeight) / 2;
    
                pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);
                pdf.save("voter-card.pdf");
            } catch (error) {
                console.error("Error generating PDF:", error);
            } finally {
                // Show back the hidden elements
                if (mainNavBar) {
                    mainNavBar.style.display = 'block';
                }
            }
        }).catch((error) => {
            console.error("Error capturing HTML to canvas:", error);
    
            if (mainNavBar) {
                mainNavBar.style.display = 'block';
            }
        });
    };
    
    

    useEffect(() => {
        if (user) {
            fetchUserData(user.userId);
        }
    }, [user]);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5191/api/VoterApi/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (
        <>
            <MainNavBar user={user} onLogout={onLogout} />
            <div className="voter-card-container" ref={cardRef}>
                <h1>Voter Card</h1>
                <div className="voter-card">
                    {userData && userData.length > 0 && userData[0].voterId !== null? (
                        <>
                            <div className="header-container">
                                <div className="icon-picture">
                                    <a>
                                        <img src={NationalSymbol} alt="NationalSymbol" />
                                    </a>
                                </div>
                                <div className="info-container">
                                    <h2>भारत निर्वाचन आयोग</h2>
                                    <h3>Election Commission of India</h3>
                                    <h4>Voter Identity Card</h4>
                                </div>
                            </div>
                            <div className="voter-image-details-container">
                                <div className="voter-image">
                                    <a>
                                        <img src={Voter} alt="Voter" />
                                    </a>
                                </div>
                                <div className="voter-details-container">
                                    <div className="voter-id-container">
                                        <div className="voter-detail">
                                            <label className="label-bold">Electorial VoterId:</label>
                                            <span>{userData[0].voterId}</span>
                                        </div>
                                    </div>
                                    <div className="voter-details">
                                        <div className="voter-detail">
                                            <label className="label-bold">Name:</label>
                                            <span>{userData[0].firstName} {userData[0].lastName}</span>
                                        </div>
                                        <div className="voter-detail">
                                            <label className="label-bold">Fathers Name:</label>
                                            <span>{userData[0].guardiansLastName} {userData[0].guardiansFirstName}</span>
                                        </div>
                                        <div className="voter-detail">
                                            <label className="label-bold">Gender:</label>
                                            <span>{userData[0].gender}</span>
                                        </div>
                                        <div className="voter-detail">
                                            <label className="label-bold">Date of Birth:</label>
                                            <span>{userData[0].dateOfBirth}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="no-data-message">No voter data available</div>
                    )}
                </div>
                {userData && userData.length > 0 && userData[0].voterId !== null && (
                    <button className="download-button" onClick={handleDownload}>Download PDF</button>
                )}
            </div>
        </>
    );
    
};

export default VoterCard;
