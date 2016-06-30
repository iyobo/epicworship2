const electron = require('electron')
const app = electron.app
const dialog = electron.dialog
const BrowserWindow = electron.BrowserWindow

//Electron
var electronBin = app.getPath('exe') //"./node_modules/.bin/electron"

// Windows
var dashboard;
var projectors = [];


app.on("ready", function () {

    dashboard = new BrowserWindow({width: 600, height: 800});
    dashboard.loadURL("file://"+process.cwd() + "/app/dashboard/dashboard.html");
    dashboard.on('closed', function () {
        app.quit();
    });

    createProjector();
});


/**
 * Create a presenter and return it's id
 * @returns {Number}
 */
function createProjector() {
    var asyncProjector = require('child_process').spawn(electronBin, ['app/projector/projector']);
    projectors.push(asyncProjector);
    var index = projectors.length;

    //received data from presenter
    asyncProjector.stdout.on('data', (data) => {
        console.log(`Projector-${index}:`, JSON.stringify(data.toString()));
    });

    //received eeror from presenter
    asyncProjector.stderr.on('data', (data) => {
        console.log(`Projector-${index} error: ${data.toString()}`);
    });

    asyncProjector.on('close', (code) => {
        console.log(`Projector-${index}: Process exited with code ${code.toString()}.`);
    });

    return index;

}