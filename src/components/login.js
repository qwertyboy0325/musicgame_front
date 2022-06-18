import React, { useState } from "react";
import "./login.css";
import aboutImg from "../img/about.png";
import login_BackgroundImg from "../img/login background.png";
import fbImg from "../img/fb.png";
import googleImg from "../img/google.png";
import start_buttomImg from "../img/play button.png";
export function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    console.log("userName=" + userName);
    console.log("password=" + password);
    return (
        <div>
            <div style={{ textAlign: "right" }}>
                <img src={aboutImg} style={{ padding: 20, height: 50 }}></img>
            </div>
            <div id="container">
                <img className="login_background" src={login_BackgroundImg}></img>
                <input type={"text"} className="login" value={userName} onChange={(event) => setUserName(event.target.value)} style={{ marginTop: 210 }}></input >
                <input type={"password"} className="login" value={password} onChange={(event) => setPassword(event.target.value)} style={{ marginTop: 330 }}></input>
                <img src={fbImg} className="loginButton" style={{ marginLeft: -120 }}></img>
                <img src={googleImg} className="loginButton" style={{ marginLeft: 20 }}></img>
                <img src={start_buttomImg} className="loginButton" style={{ marginTop: 570, marginLeft: -120 }}></img>
            </div>
        </div>
    )
}