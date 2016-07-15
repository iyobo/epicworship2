/**
 * Created by iyobo on 6/30/16.
 */
import {Component} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';
const ipc = electron.ipcRenderer;

@Component({
	selector: 'projector',
	templateUrl: './projectorApp.html',
})
export class ProjectorApp {

	ngOnInit() {
		var vid = $("#bgvid");

		//ipc callbacks
		ipc.on('projhome:payload', function (event, payload) {
			$('#bgvid source').attr('src', payload.background);

			vid.addClass('animated fadeOut');
			vid.one('animationend', function () {

				vid[0].load();
				// txt.text('We Worship you Hallelujah Hallejujah');
				vid.removeClass('fadeOut');
				vid.addClass('fadeIn');

			});
		})
	}
}

bootstrap(ProjectorApp, [
]).catch(err => console.error(err));