import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
    return (
        <div className="navbar-container">
            <nav className="navbar">

                <div className="" >
                    <ul className="navbar-nav">
                        <NavLink className="navbar-brand" to="/dashboard">
                            <img style={{"width" : 25 + '%'}} src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"></img>
                        </NavLink>
                        <li className="nav-item">
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}