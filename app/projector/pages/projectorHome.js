/**
 * Created by iyobo on 6/30/16.
 */
import {Component} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';

@Component({
	templateUrl: './projectorHome.html'
})
export class ProjectorHome {
	constructor() {
		this.foo = "bar";
	}
}

bootstrap(ProjectorHome);