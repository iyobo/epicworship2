var app = require("app");
var dialog = require("dialog");
var BrowserWindow = require("browser-window");

var dashboard;

var electronBin = app.getPath('exe') //"./node_modules/.bin/electron"


var asyncPresenter = require('child_process').spawn(electronBin,['forks/presenter']);
asyncPresenter.stdout.on('data', (data) => {
	console.log("from Dialog",JSON.stringify(data.toString()));
	//TODO: send filepath to render process to do stuff, e.g. transition with new video file
});

asyncPresenter.stderr.on('data', (data) => {
	console.log(`dialog error: ${data.toString()}`);
});

asyncPresenter.on('close', (code) => {
	console.log(`asyncdialog process exited with code ${code.toString()}.`);
});

app.on("ready", function () {
	
	dashboard = new BrowserWindow({width: 600, height: 800});
	dashboard.loadURL("file://" + __dirname + "/screens/dashboard.html");
	setTimeout(function () {

		openFileChooser();

	}, 3000);
});

function openFileChooser(){
	asyncPresenter.stdin.write('openFileChooser')
}