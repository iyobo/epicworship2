/**
 * Created by iyobo on 6/30/16.
 */
import 'zone.js';
import 'reflect-metadata';
import { Component } from '@angular/core';
import { bootstrap }    from '@angular/platform-browser-dynamic';

@Component({
	selector: 'projector',
	template: '<h1>My Projector {{foo}} My Projector </h1>'
})
export class ProjectorApp{
	constructor(){
		this.foo="bar";
	}
}

bootstrap(ProjectorApp);