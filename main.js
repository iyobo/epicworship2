var app = require("app");
var dialog = require("dialog");
var BrowserWindow = require("browser-window");
var projector;
var dashboard;

app.on("ready", function () {
	projector = new BrowserWindow({width: 400, height: 400});
	projector.loadUrl("file://" + __dirname + "/screens/projector.html");
	dashboard = new BrowserWindow({width: 400, height: 400});
	dashboard.loadUrl("file://" + __dirname + "/screens/projector.html");
	setTimeout(function () {
		//var parent = null;
		var parent = projector;
		console.log("showOpenDialog called");
		if (true) dialog.showOpenDialog(parent, {}, function (paths) {
			console.log("callback");
		});
		if (false) dialog.showSaveDialog(parent, {}, function (paths) {
			console.log("callback");
		});
		if (false) {
			dialog.showMessageBox(null, {
				type: "info",
				buttons: ["OK", "Cancel"],
				title: "Title",
				message: "Message",
			}, function (arg) {
				console.log("callback");
			});
		}
		console.log("showOpenDialog returned");
	}, 3000);
});