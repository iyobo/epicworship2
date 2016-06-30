/**
 * Created by iyobo on 2016-04-07.
 */
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow


app.on("ready", function () {

	projector = new BrowserWindow({width: 600, height: 800});
	projector.loadURL("file://"+process.cwd()+"/app/projector/projector.html");

	// Unpause the stdin stream:
	process.stdin.resume();

	// Listen for incoming data:
	process.stdin.on('data', function (data) {
		console.log('Projector Received Command: ' + data);

	});
});