const electron = require('electron')
const app = electron.app
const dialog = electron.dialog
const BrowserWindow = electron.BrowserWindow
const ipc = require('electron').ipcMain

//Electron
var electronBin = app.getPath('exe') //"./node_modules/.bin/electron"

// Windows
var dashboard;
var projectors = [];


app.on("ready", function () {

    dashboard = new BrowserWindow({width: 600, height: 800});
    dashboard.loadURL("file://"+process.cwd() + "/app/dashboard/_dashboardBase.html");
    dashboard.on('closed', function () {
        app.quit();
    });

    setupFileChooser();
    createAsyncProjector(projectors.length+1);



});


function setupFileChooser(){

    ipc.on('chooseFile', function (event) {
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory']
        }, function (files) {
            if (files) event.sender.send('selected-directory', files)
        })
    })
}


/**
 * Create a presenter and return it's id
 * @returns {Number}
 */
function createAsyncProjector(id) {
    var projector = require('child_process').spawn(electronBin, ['mainprojector', id]);
    projectors.push(projector);

    //received data from presenter
    projector.stdout.on('data', (data) => {
        console.log(`Projector-${id}:`, JSON.stringify(data.toString()));
    });

    //received eeror from presenter
    projector.stderr.on('data', (data) => {
        console.log(`Projector-${id} error: ${data.toString()}`);
    });

    projector.on('close', (code) => {
        console.log(`Projector-${id}: Process exited with code ${code.toString()}.`);
    });

    return projector;

}

/**
 * We never use this. We don't want projectors getting blocked by anything e.g. file dialogs.
 * Projectors will act as spawned, seperate servers.
 * @param id
 * @returns {electron.BrowserWindow}
 */
function createProjector(id) {
    var projector = new BrowserWindow({x:0, width: 600, height: 800});
    projectors.push(projector);
    projector.loadURL("file://"+process.cwd() + "/app/projector/projector.html");
    projector.on('closed', function () {
        app.quit();
    });

    return projector;

}
