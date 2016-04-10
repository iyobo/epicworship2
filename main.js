//Electron
var app = require("app");
var dialog = require("dialog");
var BrowserWindow = require("browser-window");
const main = require('electron').ipcMain;
var electronBin = app.getPath('exe') //"./node_modules/.bin/electron"

// Windows
var dashboard;
var presenters=[];


app.on("ready", function () {

	dashboard = new BrowserWindow({width: 600, height: 800});
	dashboard.loadURL("file://" + __dirname + "/app/screens/dashboard.html");
	dashboard.on('closed', function () {
		app.quit();
	});
	// setTimeout(function () {
		forkOutPresenter();
	// }, 3000);
});








function forkOutPresenter() {
	var asyncPresenter = require('child_process').spawn(electronBin, ['forks/presenter']);

	//received data from presenter
	asyncPresenter.stdout.on('data', (data) => {
		console.log("from Dialog", JSON.stringify(data.toString()));
	});

	//received eeror from presenter
	asyncPresenter.stderr.on('data', (data) => {
		console.log(`dialog error: ${data.toString()}`);
	});

	asyncPresenter.on('close', (code) => {
		console.log(`asyncdialog process exited with code ${code.toString()}.`);
	});

	presenters.push(asyncPresenter)

}