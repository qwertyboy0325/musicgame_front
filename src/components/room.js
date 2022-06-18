import React, { useState } from "react";
import "./room.css";
import aboutImg from "../img/about.png";
import room_BackgroundImg from "../img/room background.png";
import creat_RoomImg from "../img/creat room.png";
import join_RoomImg from "../img/join room.png";
import back_buttomImg from "../img/back button.png";
export function Room() {
    return (
        <div>
            <div style={{ textAlign: "right" }}>
                <img src={aboutImg} style={{ padding: 20, height: 50 }}></img>
            </div>
            <div id="container">
                <img className="login_background" src={room_BackgroundImg}></img>
                <img src={creat_RoomImg} className="roomButton" style={{ marginTop: 220 }}></img>
                <img src={join_RoomImg} className="roomButton" style={{ marginTop: 390 }}></img>
                <img src={back_buttomImg} className="roomButton" style={{ marginTop: 560, width: 250, marginLeft: -125 }}></img>
            </div>
        </div>
    )
}