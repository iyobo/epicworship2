/**
 * Created by iyobo on 2016-04-07.
 */
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow


app.on("ready", function () {

	projector = new BrowserWindow({width: 600, height: 800});
	projector.loadURL("file://"+process.cwd()+"/app/projector/_projectorBase.html");

	// Unpause the stdin stream:
	process.stdin.resume();

	// Listen for incoming data:
	process.stdin.on('data', function (data) {
		console.log('Projector Received Command: ' + data);

	});
});

// window.onload = function () {
// 	var vid = $("#bgvid");
// 	var txt = $("#text_layer");
//
// 	$("#bgbtn").on("click", function (e) {
//
// 		$('#bgvid source').attr('src', "../bg/video/bright.mp4");
//
// 		vid.addClass('animated fadeOut');
// 		vid.one('animationend', function () {
//
// 			vid[0].load();
// 			txt.text('We Worship you Hallelujah Hallejujah');
// 			vid.removeClass('fadeOut');
// 			vid.addClass('fadeIn');
//
// 		});
// 	});
//
// };
