const electron = require('electron')
const app = electron.app
const dialog = electron.dialog
const BrowserWindow = electron.BrowserWindow
const ipc = require('electron').ipcMain

//Electron
var electronBin = app.getPath('exe') //"./node_modules/.bin/electron"

// Windows
var dashboard;
var projectors = {};


app.on("ready", function () {

    dashboard = new BrowserWindow({width: 600, height: 800});
    dashboard.loadURL("file://"+process.cwd() + "/app/dashboard/_dashboardBase.html");
    dashboard.on('closed', function () {
        app.quit();
    });

    setupIPCActions();
    createAsyncProjector("auditorium");
    createAsyncProjector("overflow");



});


function setupIPCActions(){

	/**
     * Opens file picker
     * @args:   returnChannel: channel to return files to after selection
     *          multi: whether or not to allow multiple selection (default:false)
     */
    ipc.on('chooseFile', function (event,args) {
        dialog.showOpenDialog(args, function (files) {
            if (files) {
                event.sender.send(args.returnChannel, files)

                //or if sync
                event.returnValue = files;
            }
        })
    })

	/**
	 * Sends payload to projector of given id
     */
    ipc.on('toProjector', function (event,name, payload) {
        projectors[name].send(payload);
    })
}


/**
 * Create an Asynchronous presenter and returns the created process.
 * @returns {ChildProcess}
 */
function createAsyncProjector(name) {
    var projector = require('child_process').spawn(electronBin, ['mainprojector', name]);
    projectors[name]=projector;

    //received data from presenter
    projector.stdout.on('data', (data) => {
        console.log(`Projector-${name} received:`, JSON.stringify(data.toString()));
    });

    //received error from presenter
    projector.stderr.on('data', (data) => {
        console.log(`Projector-${name} got an error: ${data.toString()}`);
    });

    projector.on('close', (code) => {
        console.log(`Projector-${name} exited with code ${code.toString()}.`);

        delete projectors[name];
        if(Object.keys(projectors).length === 0)
            app.quit();
    });

    console.log("Launched Projector-"+name);

    return projector;

}
