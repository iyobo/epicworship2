/**
 * Created by iyobo on 6/30/16.
 */
import {Component} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';

@Component({
	selector: 'projector',
	templateUrl: './projectorApp.html'
})
export class ProjectorApp {
	constructor() {
		this.foo = "bar";
	}
}

bootstrap(ProjectorApp);