var app = require("app");
var dialog = require("dialog");
var BrowserWindow = require("browser-window");
var projector;
var dashboard;

var electronBin = "./node_modules/.bin/electron"


var asyncdialog = require('child_process').spawn(electronBin,['forks/dialog']);
asyncdialog.stdout.on('data', (data) => {
	console.log("from Dialog",JSON.stringify(data.toString()));
	//TODO: send filepath to render process to do stuff, e.g. transition with new video file
});

asyncdialog.stderr.on('data', (data) => {
	console.log(`dialog error: ${data.toString()}`);
});

asyncdialog.on('close', (code) => {
	console.log(`asyncdialog process exited with code ${code.toString()}.`);
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
	asyncdialog.stdin.write('openFileChooser')
}