import React from "react";
import { Link } from "react-router-dom";
import './landingPage.css'

export default function LandingPage(){
    return (
        <div className="landing_page">

            <h1></h1>
            <h3>Search for breeds or create one</h3>
            <Link to= '/home'>
                <button className="button"></button>
            </Link>
        </div>
    )
}