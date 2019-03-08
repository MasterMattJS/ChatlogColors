// modes line or name or fullText
var opacity = 0.5;

function randrgba() {
    let d = () => Math.floor(Math.random() * 256);;
    return `rgba(${d()}, ${d()}, ${d()}, ${opacity})`;
}

function getName(chatLine) {
    let text = chatLine.textContent;
    return text.replace("[party]", "").slice(1, text.indexOf("]: "));
}

class RandomDefaultColorMap extends Map {
    obtain(name) {
        let color = super.get(name);
        if (!color) {
            color = randrgba();
            super.set(name, color);
        }
        return color;
    }
}

function setColor(chatLine, color) {
    chatLine.style.background = color;
}

class ChatRecolor {
    constructor() {
        this.autoColor = new RandomDefaultColorMap();
    }
    recolor() {
        for (let chatLine of document.getElementsByClassName('chat-line')) {
            let name = getName(chatLine);
            let color = this.autoColor.obtain(name);
            setColor(chatLine, color);
        }
    }
}

let chatRecolor = new ChatRecolor();

setInterval(() => chatRecolor.recolor(), 40);
