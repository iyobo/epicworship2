/**
 * Created by iyobo on 6/30/16.
 */
import {Component} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';
const ipc = electron.ipcRenderer;

@Component({
	templateUrl: './pages/dashboardHome.html'
})
export class DashboardHome{
	constructor() {
		this.foo = "bar";
	}

	ngOnInit(){
		console.log('loaded')
		ipc.on('selected-directory', function (event, path) {
			console.log(`Selected: ${path}`);
		})
	}

	openFile() {
		ipc.send('chooseFile');
	}
}
