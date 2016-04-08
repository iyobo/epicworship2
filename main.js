var app = require("app");
var dialog = require("dialog");
var BrowserWindow = require("browser-window");
var projector;
var dashboard;

var electronBin = "./node_modules/.bin/electron"


var dialog = require('child_process').spawn(electronBin,['forks/dialog']);
dialog.stdout.on('data', (data) => {
	console.log("from Dialog",data);
	//TODO: send filepath to render process to do stuff, e.g. transition with new video file
});

dialog.stderr.on('data', (data) => {
	console.log(`dialog error: ${data}`);
});

dialog.on('close', (code) => {
	console.log(`child process exited with code ${code}`);
})



app.on("ready", function () {
	projector = new BrowserWindow({width: 600, height: 800});
	projector.loadURL("file://" + __dirname + "/screens/projector.html");
	dashboard = new BrowserWindow({width: 600, height: 800});
	dashboard.loadURL("file://" + __dirname + "/screens/dashboard.html");
	setTimeout(function () {

		openFileChooser();

	}, 3000);
});

function openFileChooser(){
	dialog.stdin.write('openFileChooser')
}