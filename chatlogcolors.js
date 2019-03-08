// ==UserScript==
// @name PonyTown ChatlogColors
// @namespace MasterMattJS.github.io
// @author MasterMattJS
// @author loxaxs
// @source https://github.com/MasterMattJS/ChatlogColors
// @match https://pony.town/*
// @grant none
// ==/UserScript==

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

fullChatlogRecolor = () => chatRecolor.recolor();

// https://dom.spec.whatwg.org/#interface-mutationobserver
class RecolorObserver extends MutationObserver {
    constructor() {
        super((_li, _o) => {
            fullChatlogRecolor();
        });
        this.chatContainer = null;
    }
    observe() {
        let chatContainer = document.querySelector('.chat-log-scroll-inner-inner');
        if (this.chatContainer === chatContainer) {
            return;
        }
        this.chatContainer = chatContainer;
        super.observe(chatContainer, {
            childList: true,
        });
    }
    disconnect() {
        this.chatContainer = null;
    }
}

class GameStartObserver extends MutationObserver {
    constructor(secondObserver) {
        super((_li, _o) => {
            if (document.querySelector('.chat-log-scroll-inner-inner')) {
                secondObserver.observe();
            } else {
                secondObserver.disconnect();
            }
        });
    }
    observe() {
        super.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
}

var recolorObserver = new RecolorObserver();
var gameStartObserver = new GameStartObserver(recolorObserver);

gameStartObserver.observe();
