class CanvasHelper {
    notePos2CanPos = (context, notePos) => {
        let { x, y } = notePos;
        const { scale, compoments } = context;
        const { timestampScale, pitchScale } = scale;
        let wireWidth = 20 * (pitchScale + 1);
        let wireHeight = 20 * (timestampScale + 1);
        // console.log((compoments.pitchBar.width + 1) + wireWidth * x)
        return { x: (compoments.pitchBar.width + 1) + wireWidth * x, y: (compoments.timestampBar.width + 1) + wireHeight * y, width: wireWidth, height: wireHeight }
    }
    canPos2notePos = (context, canPos) => {
        let { x, y } = canPos;
        const { scale, compoments } = context;
        const { timestampScale, pitchScale } = scale;
        let _X = x - compoments.pitchBar.width + 1;
        let _Y = y - compoments.timestampBar.width + 1;
        let wireWidth = 20 * (pitchScale + 1);
        let wireHeight = 20 * (timestampScale + 1);
        // console.log(Math.ceil(_X / wireWidth) - 1);
        return { x: Math.ceil(_X / wireWidth) - 1, y: Math.ceil(_Y / wireHeight) - 1 };
    }
}
class CanvasEvent {
    isLeftMouseDown = false;
    isMidMouseDown = false;
    isRightMouseDown = false;
    mouseDownPos;
}
const canvasEvent = new CanvasEvent();
const canvasHelper = new CanvasHelper();

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
        this.compoments = { sheet, note, timestampBar, pitchBar };

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        //set Scale
        this.timestampScale = 0;
        this.pitchScale = 0;

        //setEvent
        canvasEvent.isLeftMouseDown = false;

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
            this.draw();
            // console.log(x,y);
            Object.values(this.compoments).forEach(compoment => {
                compoment.onMouseMove(this.context, x, y);
            })
        });
        canvas.addEventListener('mousedown', e => {
            let x = e.offsetX;
            let y = e.offsetY;

            this.draw();
            //Left Btn Down
            switch (e.button) {
                case 0:
                    canvasEvent.isLeftMouseDown = true;
                    Object.values(this.compoments).forEach(compoment => {
                        compoment.onLeftMouseDown(this.context, x, y);
                    })
                    break;
                case 1:
                    canvasEvent.isMidMouseDown = true;
                    Object.values(this.compoments).forEach(compoment => {
                        compoment.onMidMouseDown(this.context, x, y);
                    })
            }

        })
        canvas.addEventListener('mouseup', e => {
            let x = e.offsetX;
            let y = e.offsetY;
            canvasEvent.mouseDownPos = null;
            this.draw();
            //Left Btn Up
            if (e.button == 0) {
                canvasEvent.isLeftMouseDown = false;
                Object.values(this.compoments).forEach(compoment => {
                    compoment.onLeftMouseUp(this.context, x, y);
                })
            }
        })
    }
    draw = () => {
        Object.values(this.compoments).forEach(values => {
            values.draw(this.context);
        })
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
        if (!this.inArea(context, x, y)) return;
    }
    onLeftMouseDown = (context, x, y) => {
        // if (this.inArea(context, x, y)) console.log("Pitch Bar In.");
    }
    onLeftMouseUp = (context, x, y) => {
        // if (this.inArea(context, x, y)) console.log("Pitch Bar Out.");
    }
    onMidMouseDown = (context, x, y) => {

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
        return (x >= 22 && x < canvas.offsetWidth) && (y >= 0 && y <= this.width);
    }
    onMouseMove = (context, x, y) => {
        if (!this.inArea(context, x, y)) return;

    }
    onLeftMouseDown = (context, x, y) => {
        if (this.inArea(context, x, y)) console.log("Timestamp Bar In.");
    }
    onLeftMouseUp = (context, x, y) => {
        if (this.inArea(context, x, y)) console.log("Timestamp Bar Out.");
    }
    onMidMouseDown = (context, x, y) => {

    }
}

class SheetCanvas {
    offset;
    notes;
    noteHover;
    selectedNote;
    lstHoverNotePos;
    currentNoteID;
    wireWidth;
    wireHeight;
    backgroundColor;
    wiresColor1;
    measureColor;
    mouseDown;
    sheetMod;
    constructor() {
        this.backgroundColor = "#D9D9D9";
        this.wiresColor1 = "#A3A3A3";
        this.wiresColor2 = "#CCCCCC";
        this.measureColor = "#000000";
        this.mouseDown = false;
        this.notes = [];
        this.selectedNote = null;
        this.offset = {
            x: 87,
            y: 87,
        }
        this.sheetMod = 0; //{0:Default,1:Move}
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
        const { ctx, compoments, scale } = context;
        const { timestampScale, pitchScale } = scale;

        const timestampWidth = compoments.timestampBar.width;
        const pitchWidht = compoments.pitchBar.width;
        const offsetX = this.offset.x;
        const offsetY = this.offset.y;
        ctx.strokeStyle = this.wiresColor1;
        ctx.lineWidth = 1;
        this.wireWidth = 20 * (timestampScale + 1);
        this.wireHeight = 20 * (pitchScale + 1);

        for (let i = 0; i < 60; i++) {
            if (i % 2 === 0) {
                ctx.beginPath();
                ctx.fillStyle = this.wiresColor2;
                ctx.moveTo(pitchWidht - offsetX, timestampWidth + this.wireHeight * i - offsetY);
                ctx.lineTo(128 * this.wireWidth - offsetX, timestampWidth + this.wireHeight * i - offsetY);
                ctx.lineTo(128 * this.wireWidth - offsetX, timestampWidth + this.wireHeight * (i + 1) - offsetY);
                ctx.lineTo(pitchWidht - offsetX, timestampWidth + this.wireHeight * (i + 1) - offsetY);
                ctx.fill();
            }
        }

        for (let i = 0; i < 128; i++) {
            if (i % 16 === 0 && i !== 0) {
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.strokeStyle = this.measureColor;
                ctx.moveTo(pitchWidht + this.wireWidth * i - offsetX, timestampWidth - offsetY);
                ctx.lineTo(pitchWidht + this.wireWidth * i - offsetX, this.wireHeight * 60 - offsetY);
                ctx.stroke();
                ctx.lineWidth = 1;
            } else {
                ctx.beginPath();
                ctx.strokeStyle = this.wiresColor1;
                ctx.moveTo(pitchWidht + this.wireWidth * i - offsetX, timestampWidth - offsetY);
                ctx.lineTo(pitchWidht + this.wireWidth * i - offsetX, this.wireHeight * 60 - offsetY);
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
        if (!this.inArea(context, x, y)) return;
        const offsetX = this.offset.x;
        const offsetY = this.offset.y;

        let notePos = canvasHelper.canPos2notePos(context, { x: x + offsetX, y: y + offsetY })


        if (canvasEvent.isLeftMouseDown && this.selectedNote && this.sheetMod == 0) {
            this.selectedNote.endAt.x = notePos.x;
        } else {
            this.selectedNote = null;
            this.noteHover = new Note(notePos.x, notePos.y);
        }

        if (canvasEvent.isMidMouseDown || this.sheetMod == 1) {
            if (canvasEvent.mouseDownPos) {
                const startPos = canvasEvent.mouseDownPos;
                console.log(startPos);
                this.offset.x += startPos.x - x;
                this.offset.y += startPos.y - y;
            }
        }
        // if (!isMouseDown) note.drawHover(context, x, y);
    }
    onLeftMouseDown = (context, x, y) => {
        const { compoments } = context;
        const { note } = compoments;
        const { sheet } = compoments;
        const offsetX = sheet.offset.x;
        const offsetY = sheet.offset.y;

        if (this.inArea(context, x, y + offsetY)) {
            note.createNote(context, x + offsetX, y + offsetY);
            console.log("Sheet In.");
        }
    }
    onLeftMouseUp = (context, x, y) => {

        if (this.inArea(context, x, y)) console.log("Sheet Out.");
        const { compoments } = context;
        const { note } = compoments;
    }
    onMidMouseDown = (context, x, y) => {
        canvasEvent.mouseDownPos = {
            x: x,
            y: y,
        }
    }
}

class NoteCanvas {


    color = "#FFA9BE";
    hoverColor = "#FFD3DE";
    constructor() {
        this.hoverColor = "#FFD3DE";
    }
    // previewColor = "FFA9BE"

    draw = (context) => {

        const { compoments } = context;
        const { sheet } = compoments;
        const { notes } = sheet;
        // console.log(selectedNote);
        if (sheet.noteHover) {
            this.drawHover(context, sheet.noteHover);
        }
        if (sheet.selectedNote) {
            console.log(notes);
        }
        if (notes.length)
            for (let i = 0, length = notes.length; i < length; i++) {
                // console.log(notes);
                this.drawNote(context, notes[i]);
            }


    }
    drawNote = (context, note) => {
        note.normalize();
        let { startAt, length } = note;
        const { ctx, compoments } = context;
        const { sheet } = compoments;
        const { offset } = sheet;
        const offsetX = offset.x;
        const offsetY = offset.y;
        let canPos = canvasHelper.notePos2CanPos(context, startAt);
        ctx.fillStyle = this.color;
        ctx.fillRect(canPos.x - offsetX, canPos.y - offsetY, canPos.width * length - 2, canPos.height - 2);
    }

    inArea = () => { }
    onMouseMove = () => {
        if (!this.inArea()) return;
    }
    onLeftMouseDown = (context, x, y) => {

    }
    onLeftMouseUp = (context, x, y) => {

    }
    onMidMouseDown = (context, x, y) => {

    }
    drawHover = (context, note) => {
        const { ctx } = context;
        let { compoments } = context;
        const { sheet } = compoments;
        const { offset } = sheet;
        const offsetX = offset.x;
        const offsetY = offset.y;
        let { startAt } = note;
        let { lstHoverNotePos } = compoments.sheet;
        let canPos = canvasHelper.notePos2CanPos(context, startAt);

        if (!lstHoverNotePos || !(lstHoverNotePos.x === note.startAt.x && lstHoverNotePos.y === note.startAt.y)) {
            ctx.fillStyle = this.hoverColor;
            ctx.fillRect(canPos.x - offsetX, canPos.y - offsetY, canPos.width - 2, canPos.height - 2);
        }
        lstHoverNotePos = {
            x: note.startAt.x,
            y: note.startAt.y,
        }
    }
    createNote = (context, x, y) => {
        const { scale, compoments } = context;
        const { timestampScale, pitchScale } = scale;
        let _X = x - compoments.pitchBar.width + 1;
        let _Y = y - compoments.timestampBar.width + 1;
        let wireWidth = 20 * (pitchScale + 1);
        let wireHeight = 20 * (timestampScale + 1);
        let noteX = Math.ceil(_X / wireWidth) - 1;
        let noteY = Math.ceil(_Y / wireHeight) - 1;
        let { sheet } = compoments;


        if (Note.isExisted(context, { x: noteX, y: noteY })) {
            console.log("isExisted");
            return;
        }
        let note = new Note(noteX, noteY);
        sheet.selectedNote = note;
        sheet.notes.push(note);
    }

}

class Note {
    startAt;
    endAt;
    constructor(noteX, noteY) {
        this.create(noteX, noteY);
    }
    create = (noteX, noteY) => {
        this.startAt = {
            x: noteX,
            y: noteY,
        }
        this.endAt = {
            x: noteX,
            y: noteY,
        }
    }
    set = (noteX) => {
        this.endAt = {
            y: noteX,
        }
    }
    get length() {

        return Math.abs(this.endAt.x - this.startAt.x) + 1;
    }
    // check note is existed?
    static isExisted = (context, pos) => {
        let { notes } = context.compoments.sheet;
        let isXIn, isYIn = false;
        // console.log(notes);
        for (let i = 0, length = notes.length; i < length; i++) {
            let note = notes[i];
            isXIn = ((pos.x >= note.startAt.x) && (pos.x <= note.endAt.x));
            isYIn = ((pos.y >= note.startAt.y) && (pos.y <= note.endAt.y));
            if (isXIn && isYIn) return true;
        }
        return false;
    }

    normalize = () => {
        if (this.startAt.x > this.endAt.x) {
            let t = this.startAt.x;
            this.startAt.x = this.endAt.x;
            this.endAt.x = t;
        }
    }
}