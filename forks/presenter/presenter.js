/**
 * Created by iyobo on 2016-04-07.
 */
var app = require("app");
var projector;
var BrowserWindow = require("browser-window");


app.on("ready", function () {

	projector = new BrowserWindow({width: 600, height: 800});
	projector.loadURL("file://" + __dirname + "/../../screens/projector.html");

	// Unpause the stdin stream:
	process.stdin.resume();

	// Listen for incoming data:
	process.stdin.on('data', function (data) {
		console.log('Dialog Spawn Received Command: ' + data);
		// dialog.showOpenDialog(null, {}, function (paths) {
		// 	console.log(paths);
		// });
	});
});