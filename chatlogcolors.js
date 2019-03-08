// modes line or name or fullText
var mode = 'line';
var opacity = 0.6;
var names = [];
var colors = [];

function r() {
    var max = 256;
    var min = 50;
    return "rgba(" + Math.floor(Math.random() * (max - min) + min) + "," + Math.floor(Math.random() * (max - min) + min) + "," + Math.floor(Math.random() * (max - min) + min) + "," + opacity + ")";
}

function saveNames(chatLine) {
    for (var i = 0; i < chatLine.length; i++) {
        var name = chatLine[i].textContent.replace("[party]", "").slice(1, chatLine[i].textContent.indexOf("]: "));

        for (var j = 0; j < names.length + 1; j++) {
            if (names[j] == name) {
                break;
            }
            if (names[j] == null) {
                names[j] = name;
                colors[j] = r();
                break;
            }
        }
    }
}

function randomColors(chatLine) {

    for (var i = chatLine.length - 1; i > 0; i--) {
        var name = chatLine[i].textContent.replace("[party]", "").slice(1, chatLine[i].textContent.indexOf("]: "));
        for (var j = 0; j < names.length; j++) {

            if (names[j] == name) {
                if (mode == 'line') {
                    chatLine[i].style.background = colors[j];
                } else if (mode == 'name') {
                    var nameColor = document.getElementsByClassName('chat-line-name');
                    nameColor[i].style.color = colors[j].replace("rgba", "rgb").slice(0, colors[j].lastIndexOf(",") - 1) + ")";;
                } else if (mode == 'fullText') {
                    var nameColor = document.getElementsByClassName('chat-line-name');
                    nameColor[i].style.color = colors[j].replace("rgba", "rgb").slice(0, colors[j].lastIndexOf(",") - 1) + ")";;
                    chatLine[i].style.color = colors[j].replace("rgba", "rgb").slice(0, colors[j].lastIndexOf(",") - 1) + ")";;
                }
                break;
            }
        }
    }
}

function chatlogRecolor() {
    var chatLine = document.getElementsByClassName('chat-line');
    saveNames(chatLine);
    randomColors(chatLine);
}
setInterval(chatlogRecolor, 10);