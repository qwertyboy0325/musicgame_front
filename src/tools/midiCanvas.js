class MidiCanvasManager {
    canvas;
    ctx;
    cEvent;
    constructor(){
        this.canvas = document.getElementById('editor-canvas');
        this.ctx = document.canvas.getElementById('2d');
        this.cEvent = {
            mouseRightPress:false,
            mouseLeftPress:false,
            middleMausePress: false,
            middleMauseUpScrolling:false,
            middleMauseDownScrolling:false,
            ctrlPress: false,
            spacePress: false,
            altPress:false,
            keyAPress:false,
            keySPress:false,
            keyDPress:false,
            keyCPress:false,
            keyFPress:false,
        };
        this.initCanvas()
        this.init();
    }
    initCanvas(){

    }

    init = () => {
        const { canvas, ctx} = this;
    }
    
}

export const MidiManagerInstance = new MidiCanvasManager();