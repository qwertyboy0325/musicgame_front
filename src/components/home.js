import React from "react";
import "./home.css";
import big_playImg from "../img/big_play.png";
import aboutImg from "../img/about.png";
import play_buttonImg from "../img/play button.png";

export function Home() {
    return (
        <div>
            <div style={{ textAlign: 'right' }}>
                <img src={aboutImg} style={{ padding: 20, height: 50 }}></img>
            </div>
            <div id="container">
                <img id="play" src={big_playImg}></img>
                <img id="play" style={{ paddingTop: 250, width: 250, marginLeft: -125 }} src={play_buttonImg}></img>
            </div>
        </div>
    )
}