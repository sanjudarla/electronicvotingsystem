import React from "react";
import MainNavBar from "../../NavBarFile/NavBar/MainNavBar";

const Blog1 = ( {user,onLogout}) => {
    return(
    <>
    <MainNavBar user={user} onLogout={onLogout}/>  
        <div className="blog-container">
           
        </div>
       
    </>
    )
}
export default Blog1;