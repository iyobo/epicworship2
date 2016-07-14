/**
 * Created by iyobo on 6/30/16.
 */
import {Component} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';

@Component({
	selector: 'dashboard',
	template: '<h1>My First Angular 2 App. {{foo}}</h1>'
})
export class DashboardApp {
	constructor() {
		this.foo = "bar";
	}
}

bootstrap(DashboardApp);