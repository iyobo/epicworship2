/**
 * Created by iyobo on 6/30/16.
 */
import { Component } from '@angular/core';
@Component({
	selector: 'dashboard',
	template: '<h1>My First Angular 2 App</h1>'
})
export class DashboardApp{
    constructor(){
		this.foo="bar";
	}
}

module.exports= DashboardApp