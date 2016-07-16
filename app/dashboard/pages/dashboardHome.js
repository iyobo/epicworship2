/**
 * Created by iyobo on 6/30/16.
 */
import {Component} from '@angular/core';
const FadeOutInBackground = require("../../shared/payload/actions/bg/FadeOutInBackground")
const ShowTextAction = require("../../shared/payload/actions/node/ShowTextAction")


const ipc = electron.ipcRenderer;

@Component({
	templateUrl: 'pages/dashboardHome.html'
})
export class DashboardHome {
	constructor() {
		this.foo = "bar";
	}

	ngOnInit() {
		console.log('loaded');

		//ipc callbacks
		ipc.on('dashhome:chooseBackground', (event, path)=> {
			console.log(`Selected: ${path}`);
			//TODO: Usually we want to just add the path to something

			//Let's send it to the projector
			ipc.send("toProjector", "main", [
					new FadeOutInBackground(path, 2000),
					ShowTextAction.build({
						text: "Why do you run?\n Who are you?\nFollow the brick",
						_duration: 600,
						_nextDelay: 1,
						cssStyle: `
						`,
						position:`
							left: 20px;
							top: 200px;
						`,
						z: 1,
						animations: {
							enter: "fadeInLeft",
							leave: "fadeOut"
						}
					}),
					ShowTextAction.build({
						text: new Date(),
						_duration: 600,
						_nextDelay: 1,
						cssStyle: `
						`,
						color: "white",
						position:`
							left: 20px;
							bottom: 20px;
						`,
						z: 1,
						animations: {
							enter: "fadeIn",
							leave: "fadeOut"
						}
					})
				],


				{
					background: path,
					textnodes: [
						{
							type: "text",
							position: [0, 0, 1],
							cssStyle: "font-size: 30px;",
							text: "Body Text Hallo \n Hallo " + new Date(),
							animations: {
								entry: "fadein",
								exit: "fadeout"
							}
						},
						{
							type: "text",
							position: [0, 10, 1],
							cssStyle: "font-size: 14px;",
							text: "title! " + new Date(),
							animations: {
								entry: "fadein",
								exit: "fadeout"
							}
						}
					]
				})
		})
	}

	chooseBackground() {

		ipc.send('chooseFile', {
			returnChannel: "dashhome:chooseBackground",
			title: "Choose a background...",
			properties: ['openFile']
		});
	}
}
