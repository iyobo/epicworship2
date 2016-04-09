var app = require("app");
var dialog = require("dialog");
var BrowserWindow = require("browser-window");
var projector;
var dashboard;

var electronBin = "./node_modules/.bin/electron"


var asyncdialog = require('child_process').fork('forks/dialog.js',[],{
	cwd : __dirname,
	env: {ATOM_SHELL_INTERNAL_RUN_AS_NODE: 1}
});
asyncdialog.on('message', (response) => {
	console.log("from Dialog",JSON.stringify(data.toString()));
	//TODO: send filepath to render process to do stuff, e.g. transition with new video file
});

asyncdialog.on('close', (code) => {
	//TODO: refork if this close wasn't caused by main process shutting down
	console.log(`asyncdialog process exited with code ${code.toString()}.`);
});


app.on("ready", function () {
	dashboard = new BrowserWindow({width: 600, height: 800});
	dashboard.loadURL("file://" + __dirname + "/screens/dashboard.html");

	projector = new BrowserWindow({width: 600, height: 800});
	projector.loadURL("file://" + __dirname + "/screens/projector.html");

	setTimeout(function () {
		openFileChooser();
	}, 3000);
});

function openFileChooser(){
	asyncdialog.send('openFileChooser')
}