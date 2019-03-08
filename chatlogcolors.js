// modes line or name or fullText
var mode = 'line';
var opacity = 0.5;
var names = [];
var colors = [];

function r() {
    return "rgba(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + opacity + ")";
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
                    nameColor[i].style.color = colors[j];
                } else if (mode == 'fullText') {
                    var nameColor = document.getElementsByClassName('chat-line-name');
                    nameColor[i].style.color = colors[j];
                    chatLine[i].style.color = colors[j];
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