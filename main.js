const electron = require('electron')
const app = electron.app
const dialog = electron.dialog
const BrowserWindow = electron.BrowserWindow
const ipc = require('electron').ipcMain
const cerial = require("cerialize");

//Electron
var electronBin = app.getPath('exe') //"./node_modules/.bin/electron"

// Windows
var dashboard;
var projectors = {};

app.on("ready", function () {

	dashboard = new BrowserWindow({width: 800, height: 1000, x: 0, y: 0});
	dashboard.loadURL("file://" + process.cwd() + "/app/dashboard/_dashboardBase.html");
	dashboard.on('closed', function () {
		//on dashboard closing, close all projectors
		for (var name in projectors) {
			projectors[name].kill();
			delete projectors[name];
		}
		app.quit();
	});

	setupIPCActions();
	createAsyncProjector("Auditorium",{x:300, y:100});
	createAsyncProjector("Hallway",{x:500,y:300});

});


function setupIPCActions() {

	/**
	 * Opens file picker
	 * @args:   returnChannel: channel to return files to after selection
	 *          multi: whether or not to allow multiple selection (default:false)
	 */
	ipc.on('chooseFile', function (event, args) {
		dialog.showOpenDialog(args, function (files) {
			if (files) {
				event.sender.send(args.returnChannel, files)

				//or if sync
				event.returnValue = files;
			}
		})
	})

	/**
	 * Sends payload to projector of given name
	 */
	ipc.on('toProjector', function (event, projectorName, payload) {

		if (projectorName === null || projectorName === "") {
			//If no projector name defined, push to all projectors
			for (var name in projectors) {
				projectors[name].stdin.write(cerial.Serialize(JSON.stringify(payload)));
			}
		}
		else {
			//push to one projector
			projectors[projectorName].stdin.write(cerial.Serialize(JSON.stringify(payload)));
		}


	})
}


/**
 * Create an Asynchronous presenter and returns the created process.
 * @returns {ChildProcess}
 */
function createAsyncProjector(name,options) {

	var cliArray = ['mainprojector','--title', name];
	for(let k in options){
		cliArray.push('--'+k);
		cliArray.push(options[k]);
	}
	// console.log(cliArray)

	var projector = require('child_process').spawn(electronBin, cliArray);
	projectors[name] = projector;

	//received data from presenter
	projector.stdout.on('data', (data) => {
		console.log(`Projector-${name} says:`, JSON.stringify(data.toString()));
	});

	//received error from presenter
	projector.stderr.on('data', (data) => {
		console.log(`Projector-${name} got an error: ${data.toString()}`);
	});

	projector.on('close', (code) => {
		console.log(`Projector-${name} exited with code ${code.toString()}.`);

		delete projectors[name];
		if (Object.keys(projectors).length === 0)
			app.quit();
	});

	console.log("Launched Projector-" + name);

	return projector;

}
