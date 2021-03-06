import React from "react";
import "./playerInfo.css"

export function PlayerInfo(){
    return (
        <div id="player-info">
            <img className="player-avatar" id="player-avatar1"/>
            <img className="player-avatar" id="player-avatar2"/>
            <img className="player-avatar" id="player-avatar3"/>
            <img className="player-avatar" id="player-avatar4"/>
            <svg id="arrow" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8.69775 1.74591C9.4245 0.235391 11.5755 0.235395 12.3023 1.74592L19.9459 17.6329C20.5847 18.9607 19.6171 20.5 18.1436 20.5H2.85638C1.38288 20.5 0.41528 18.9607 1.05412 17.6329L8.69775 1.74591Z" fill="#9C9C9C"/> </svg>
        </div>
    )
}