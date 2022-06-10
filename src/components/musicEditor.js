import React from "react";
import "./musicEditor.css"
import image from "../background.png"
import { PlayerInfo } from "./playerInfo";
import { PlayGround } from "./playground";

export function MusicEditor(){
    return(
        <div id="container" style={{ backgroundImage:`url(${image})` }}>
            <PlayerInfo/>
            <PlayGround/>
        </div>
    )
}