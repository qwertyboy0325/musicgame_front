export class MidiCanvas {
    context;
    compoments;

    timestampScale;
    pitchScale;

    constructor(c) {
        // init Canvas
        let canvas = c;
        let ctx;
        if (canvas.getContext) {
            ctx = canvas.getContext('2d');
        }

        // create Compoments
        let pitchBar = new PitchBarCanvas();
        let timestampBar = new TimestampBarCanvas();
        let sheet = new SheetCanvas();
        let note = new NoteCanvas();

        // pack Compoments
        this.compoments = { pitchBar, timestampBar, sheet, note };

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        //set Scale
        this.timestampScale = 0;
        this.pitchScale = 0;

        // set Context
        let compoments = this.compoments;
        this.context = {
            canvas, ctx,
            scale: { timestampScale: this.timestampScale, pitchScale: this.pitchScale },
            compoments,
        };
        this.init();
    }


    init = () => {
        let { canvas } = this.context;

        window.addEventListener('resize', () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            this.draw();
        })

        canvas.addEventListener('mousemove', e => {
            let x = e.offsetX;
            let y = e.offsetY;
            // console.log(x,y);
            Object.values(this.compoments).forEach(compoment => {
                if (compoment.inArea(this.context, x, y)) {
                    compoment.onMouseMove(this.context, x, y);
                }
            })
        })
    }
    draw = () => {
        Object.values(this.compoments).forEach(values => {
            values.draw(this.context);
        })
        this.context.ctx.save();
    }


    initPitchBar() {

    }
}

class PitchBarCanvas {
    width;
    color;
    constructor() {
        this.width = 22;
    }
    draw = (context) => {
        const { ctx, canvas } = context;

        ctx.fillStyle = "#636060";
        ctx.beginPath();
        ctx.moveTo(this.width, 0);
        ctx.lineTo(this.width, canvas.offsetHeight);
        ctx.lineTo(0, canvas.offsetHeight);
        ctx.lineTo(0, 10);
        ctx.quadraticCurveTo(0, 0, 10, 0);
        ctx.fill()
    }
    inArea = (context, x, y) => {
        const { canvas } = context;
        // console.log("pitch")
        return (x >= 0 && x < this.width) && (y >= 0 && canvas.offsetHeight);
    }
    onMouseMove = (context, x, y) => {

    }
}
class TimestampBarCanvas {
    width;
    color;
    constructor() {
        this.width = 24;
        this.color = "#636060";
    }
    draw = (context) => {
        const { ctx, canvas } = context;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(22, 0);
        ctx.lineTo(canvas.offsetWidth, 0);
        ctx.lineTo(canvas.offsetWidth, this.width);
        ctx.lineTo(0, this.width);
        ctx.fill();
    }
    inArea = (context, x, y) => {
        const { canvas } = context;
        // console.log("timestamp")
        return (x >= 22 && x < canvas.offsetWidth) && (y >= 0 && this.width);
    }
    onMouseMove = (context, x, y) => {

    }
}

class SheetCanvas {
    wireWidth;
    wireHeight;
    scale;
    backgroundColor;
    wiresColor1;
    measureColor;
    constructor() {
        this.backgroundColor = "#D9D9D9";
        this.wiresColor1 = "#A3A3A3";
        this.wiresColor2 = "#CCCCCC";
        this.measureColor = "#000000";
    }
    draw = (context) => {
        this.drawBackground(context);
        this.drawWire(context);
    }
    drawBackground = (context) => {
        const { ctx, canvas, compoments } = context;
        const timestampWidth = compoments.timestampBar.width;
        const pitchWidht = compoments.pitchBar.width;
        ctx.fillStyle = this.backgroundColor;
        ctx.beginPath();
        ctx.moveTo(pitchWidht, timestampWidth);
        ctx.lineTo(canvas.offsetWidth, timestampWidth);
        ctx.lineTo(canvas.offsetWidth, canvas.offsetHeight);
        ctx.lineTo(pitchWidht, canvas.offsetHeight);
        ctx.fill();
    }
    drawWire = (context) => {
        const { ctx, canvas, compoments, scale } = context;
        const { timestampScale, pitchScale } = scale;

        const timestampWidth = compoments.timestampBar.width;
        const pitchWidht = compoments.pitchBar.width;
        ctx.strokeStyle = this.wiresColor1;
        ctx.lineWidth = 1;
        this.wireWidth = 20 * (timestampScale + 1);
        this.wireHeight = 20 * (pitchScale + 1);

        for (let i = 0; i < 60; i++) {
            if (i % 2 === 0) {
                ctx.beginPath();
                ctx.fillStyle = this.wiresColor2;
                ctx.moveTo(pitchWidht, timestampWidth + this.wireHeight * i);
                ctx.lineTo(canvas.offsetWidth, timestampWidth + this.wireHeight * i);
                ctx.lineTo(canvas.offsetWidth, timestampWidth + this.wireHeight * (i + 1));
                ctx.lineTo(pitchWidht, timestampWidth + this.wireHeight * (i + 1));
                ctx.fill();
            }
        }

        for (let i = 0; i < 128; i++) {
            if (i % 16 === 0 && i !== 0) {
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.strokeStyle = this.measureColor;
                ctx.moveTo(pitchWidht + this.wireWidth * i, timestampWidth);
                ctx.lineTo(pitchWidht + this.wireWidth * i, canvas.offsetHeight);
                ctx.stroke();
                ctx.lineWidth = 1;
            } else {
                ctx.beginPath();
                ctx.strokeStyle = this.wiresColor1;
                ctx.moveTo(pitchWidht + this.wireWidth * i, timestampWidth);
                ctx.lineTo(pitchWidht + this.wireWidth * i, canvas.offsetHeight);
                ctx.stroke();
            }
        }
    }

    inArea = (context, x, y) => {
        const { canvas, compoments } = context;
        return (x >= compoments.pitchBar.width && x < canvas.offsetWidth) &&
            (y >= compoments.timestampBar.width && y < canvas.offsetHeight);
    }

    onMouseMove = (context, x, y) => {
        const { compoments } = context;
        const { note } = compoments;
        note.drawHover(context, x, y);
    }
}

class NoteCanvas {
    notes;
    noteX;
    noteY;
    lstHoverNoteX;
    lstHoverNoteY;
    noteHover;
    previewColor = "#FFD3DE";
    constructor() {
        this.previewColor = "#FFD3DE";
    }
    // previewColor = "FFA9BE"
    
    draw = (context) => {

    }
    draw = (context, x, y, length) => {

    }
    inArea = () => { }
    onMouseMove = () => { }
    drawHover = (context, x, y) => {
        notes=[];
        const { scale, compoments, ctx } = context;
        const { timestampScale, pitchScale } = scale;
        let _X = x - compoments.pitchBar.width + 1;
        let _Y = y - compoments.timestampBar.width + 1;
        let wireWidth = 20 * (pitchScale + 1);
        let wireHeight = 20 * (timestampScale + 1);
        this.noteX = Math.ceil(_X / wireWidth) - 1;
        this.noteY = Math.ceil(_Y / wireHeight) - 1;
        if (!(this.lstHoverNoteX === this.noteX && this.lstHoverNoteY === this.noteY)) {
            this.clearHover(context, this.lstHoverNoteX, this.lstHoverNoteY);
            ctx.fillStyle = this.previewColor;
            ctx.fillRect(compoments.pitchBar.width + wireWidth * this.noteX + 1, compoments.timestampBar.width + wireHeight * this.noteY + 1, wireWidth - 2, wireHeight - 2);
            // ctx.fill(this.noteHover);
        }
        this.lstHoverNoteX = this.noteX;
        this.lstHoverNoteY = this.noteY;

    }
    clearHover = (context, noteX, noteY) => {
        console.log("clearHover");
        const { scale, compoments, ctx } = context;
        const { timestampScale, pitchScale } = scale;
        let wireWidth = 20 * (pitchScale + 1);
        let wireHeight = 20 * (timestampScale + 1);
        const wiresColor1 = "#D9D9D9";
        const wiresColor2 = "#CCCCCC";
        ctx.globalCompositeOperation = "source-over";
        if(false){

            return;
        }
        else if (noteY % 2 !== 0) {
            ctx.fillStyle = wiresColor1;

            // console.log(wiresColor1);
        }
        else {
            ctx.fillStyle = wiresColor2;
            // console.log(wiresColor2);
        }
        console.log(compoments.pitchBar.width + wireWidth * noteX + 1, compoments.timestampBar.width + wireHeight * noteY + 1, wireWidth - 2, wireHeight - 2);
        ctx.fillRect(compoments.pitchBar.width + wireWidth * noteX + 1, compoments.timestampBar.width + wireHeight * noteY + 1, wireWidth - 2, wireHeight - 2);
        // ctx.fillRect(23,23,18,18);
    }
}