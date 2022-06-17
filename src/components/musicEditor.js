import React, { useState } from "react";
import "./musicEditor.css"
import image from "../background.png"
import { PlayerInfo } from "./playerInfo";
import { PlayGround } from "./playground";

export function MusicEditor() {
    const [currentPlayer, setCurrectPlayer] = useState(0);
    return (
        <div id="container" style={{ backgroundImage: `url(${image})` }}>
            <PlayerInfo setCurrectPlayer={setCurrectPlayer} currentPlayer={currentPlayer} />
            <PlayGround currentPlayer={currentPlayer}/>
        </div>
    )
}