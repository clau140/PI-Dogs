import React from "react";
import { Link } from "react-router-dom";
import './landingPage.css'

/*
<div className="landing_page">

            <h1></h1>
            <h3>Search for breeds or create one</h3>
            <Link className= 'linkbutton' to= '/home'>
                <button className="buttonStart"></button>
            </Link>
        </div>
*/

export default function LandingPage(){
    return (
        <div className="landing_page">
            
            <div className="button-container">
                <Link className="buttonStart" to='/home'></Link>
            </div>

            
            
        </div>
    )
}