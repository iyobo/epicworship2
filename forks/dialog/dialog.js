/**
 * Created by iyobo on 2016-04-07.
 */
var app = require("app");
var dialog = require("dialog");


app.on("ready", function () {


	// Unpause the stdin stream:
	process.stdin.resume();

	// Listen for incoming data:
	process.stdin.on('data', function (data) {
		//console.log('Dialog Spawn Received Command: ' + data);
		dialog.showOpenDialog(null, {}, function (paths) {
			console.log(paths);
		});
	});
});