/**
 * Created by iyobo on 2016-04-07.
 */
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

const commandLineArgs = require('command-line-args')
const optionDefinitions = [
	{name: 'x', alias: 'x', type: Number},
	{name: 'y', alias: 'y', type: Number},
	{name: 'width', alias: 'w', type: Number},
	{name: 'height', alias: 'h', type: Number},
	{name: 'title', alias: 't', type: String}
]
const cliArgs = commandLineArgs(optionDefinitions)

// console.log(process.argv);
// console.log(cliArgs);

app.on("ready", function () {

	let windowOptions={
		width: cliArgs.width || 800,
		height: cliArgs.height || 600,
		title: cliArgs.title
	};

	if(cliArgs.x!==undefined)
		windowOptions['x']=cliArgs.x;

	if(cliArgs.y!==undefined)
		windowOptions['y']=cliArgs.y;

	var projector = new BrowserWindow(windowOptions);
	projector.loadURL("file://" + process.cwd() + "/app/projector/_projectorBase.html");

	// Unpause the stdin stream:
	process.stdin.resume();

	// Listen for incoming data:
	process.stdin.on('data', function (data) {
		console.log('Projector Received Command: ' + data);

		projector.webContents.send("payload", JSON.parse(data));

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
