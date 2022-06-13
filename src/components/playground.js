import React, { useEffect, useRef } from "react";
import { MidiCanvas } from "../tools/midiCanvas";
import "./playground.css"
import PreviousImg from "../img/previous.png"
import PlayImg from "../img/play.png"
import pauseImg from "../img/pause.png"
import copyImg from "../img/copy.png"
import pasteImg from "../img/paste.png"
import eraseImg from "../img/erase.png"
import fillImg from "../img/fill.png"
import moveImg from "../img/move.png"
import selectImg from "../img/select.png"



export function PlayGround() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        const midicanvas = new MidiCanvas(canvas);
        midicanvas.draw();
    })

    return (
        <div id="playground">
            <div id="control-bar">
                <button className="control-bnt" id="previous-btn">
                    <img src={PreviousImg}></img>
                </button>
                <button className="control-bnt" id="pause-btn">
                    <img src={PlayImg}></img>
                </button>
                <button className="control-bnt" id="play-btn">
                    <img src={pauseImg}></img>
                </button>
            </div>
            <div id="tool-bar">
                <button className="tool-bnt" id="move-btn">
                    <img src={moveImg}></img>
                </button>
                <button className="tool-bnt" id="fill-btn">
                    <img src={fillImg}></img>
                </button>
                <button className="tool-bnt" id="select-bnt">
                    <img src={selectImg}></img>
                </button>
                <button className="tool-bnt" id="erase-bnt">
                    <img src={eraseImg}></img>
                </button>
                <button className="tool-bnt" id="copy-bnt">
                    <img src={copyImg}></img>
                </button>
                <button className="tool-bnt" id="paste-bnt">
                    <img src={pasteImg}></img>
                </button>
            </div>
            <div id="editor">
                <canvas id="editor-canvas" ref={canvasRef} width="100%" height="100%"></canvas>
            </div>
        </div >
    )
}