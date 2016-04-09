/**
 * Created by iyobo on 2016-04-07.
 */
var app = require("app");
var dialog = require("dialog");


app.on("ready", function () {

	// Listen for incoming data:
	self.onmessage=(request)=>{
		console.log("[AsyncDialog] Incoming request",request)

		//if request command == openXXXXDialog
		dialog.showOpenDialog(null, {},function (paths) {
			self.postMessage(paths);
		});
	}
});