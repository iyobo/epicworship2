/**
 * Created by iyobo on 6/30/16.
 */
import {Component} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';
const ipc = electron.ipcRenderer;

@Component({
	selector: 'dashboard',
	templateUrl: './dashboardApp.html'
})
export class DashboardApp {
	constructor() {
		this.foo = "bar";

		ipc.on('selected-directory', function (event, path) {
			console.log(`Selected: ${path}`);
		})
	}

	openFile() {
		ipc.send('open-file-dialog');
	}
}

bootstrap(DashboardApp);