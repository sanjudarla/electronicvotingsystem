import React from "react";
import NavBar from "../NavBarFile/NavBar/NavBar";
import "./MainContent.css";

const MainContent = () => {
    return (
        <>
            <NavBar />
            <div className="main-content-container">
                <div className="main-content">
                    <div className="blog-block">
                        <h2>Electronic Voting System: A Comprehensive Guide</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec elit sed libero commodo lacinia et eget magna.</p>
                        <a href="/blog1" className="read-more">Read more</a>
                    </div>
                    <div className="blog-block">
                        <h2>Advantages of Electronic Voting Systems</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec elit sed libero commodo lacinia et eget magna.</p>
                        <a href="/blog2" className="read-more">Read more</a>
                    </div>
                </div>
                <div className="main-content">
                    <div className="blog-block">
                        <h2>Security Measures in Electronic Voting Systems</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec elit sed libero commodo lacinia et eget magna.</p>
                        <a href="/blog3" className="read-more">Read more</a>
                    </div>
                    <div className="blog-block">
                        <h2>The Future of Electronic Voting: Trends and Challenges</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec elit sed libero commodo lacinia et eget magna.</p>
                        <a href="/blog4" className="read-more">Read more</a>
                    </div>
                </div>
            </div>

        </>
    );
}

export default MainContent;
