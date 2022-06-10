import React from "react";
import "./playground.css"

export function PlayGround() {
    return (
        <div id="playground">
            <div id="control-bar">
                <button className="control-bnt" id="pause-btn"></button>
                <button className="control-bnt" id="play-btn"></button>
                <button className="control-bnt" id="stop-btn"></button>
            </div>
            <div id="tool-bar">
                <button className="tool-bnt" id="scroll-btn"></button>
                <button className="tool-bnt" id="fill-btn"></button>
                <button className="tool-bnt" id="select-bnt"></button>
                <button className="tool-bnt" id="erase-bnt"></button>
                <button className="tool-bnt" id="copy-bnt"></button>
                <button className="tool-bnt" id="paste-bnt"></button>
            </div>
            <div id="editor">
                <canvas id="editor-canvas"></canvas>
            </div>
        </div>
    )
}