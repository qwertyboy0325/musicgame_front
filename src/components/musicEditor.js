import React from "react";
import "./musicEditor.css"
import { PlayerInfo } from "./playerInfo";
import { PlayGround } from "./playground";

export function MusicEditor(){
    return(
        <div id="container">
            <PlayerInfo/>
            <PlayGround/>
        </div>
    )
}