/**
 * Created by iyobo on 6/30/16.
 */
import {Component} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {appRouterProviders} from "./projector.routes";
import { LocationStrategy,
	HashLocationStrategy } from '@angular/common';

@Component({
	selector: 'projector',
	template: '<router-outlet></router-outlet>',
	directives: [ROUTER_DIRECTIVES],
})
export class ProjectorApp {
	constructor() {
		this.foo = "bar";
	}
}

bootstrap(ProjectorApp, [
	appRouterProviders,
	{ provide: LocationStrategy, useClass: HashLocationStrategy }
]).catch(err => console.error(err));