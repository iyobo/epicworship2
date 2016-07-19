/**
 * Created by iyobo on 6/30/16.
 */
import {Component, ChangeDetectorRef} from '@angular/core';
const FadeOutInBackground = require("../../shared/payload/actions/bg/FadeOutInBackground")
const ShowTextAction = require("../../shared/payload/actions/node/ShowTextAction")


const ipc = electron.ipcRenderer;

@Component({
	templateUrl: 'pages/dashboardHome.html'
})
export class DashboardHome {

	videoPath:String;
	title:String = "Harking Stuff";
	text:String = "Hark the Herald Angels sing,\nGlory to the new born King!";
	activeProjector:String = "";

	constructor(ref:ChangeDetectorRef) {
		this.ref = ref;
	}

	ngOnInit() {
		console.log('loaded');

		//ipc callbacks
		ipc.on('dashhome:chooseBackground', (event, path)=> {
			console.log(`Selected: ${path}`);
			//TODO: Verify media file and let user know if we can't use this
			this.videoPath = path[0];
			this.ref.detectChanges();
		});

	}

	chooseBackground() {

		ipc.send('chooseFile', {
			returnChannel: "dashhome:chooseBackground",
			title: "Choose a background...",
			properties: ['openFile']
		});
	}

	launchProjector() {
		ipc.send('launchProjector', {
			returnChannel: "dashhome:launchProjector"
		});
	}

	projectPage() {
		//Let's send it to the projector
		ipc.send("toProjector", this.activeProjector, {
			background: new FadeOutInBackground(this.videoPath, 2000),
			scene: [
				ShowTextAction.build({
					text: this.text,
					_duration: 600,
					_nextDelay: 1,
					position: [
						["left", 2, "vw"],
						["top", 30, "%"]
					],
					font: {
						size: [5, 'vw'],
						color: "white",
						family: null,
						style: null
					},
					shadow: {},
					layer: 1,
					animations: {
						enter: "fadeInLeft",
						leave: "fadeOut"
					},
					cssOverride: `
						// position: fixed;
					  	// top: 50%;
					  	// left: 50%;
					  	/* bring your own prefixes */
					  	// transform: translate(-50%, -50%);
					`
				}),
				ShowTextAction.build({
					text: this.title,
					_duration: 600,
					_nextDelay: 1,
					position: [
						["left", 0, "px"],
						["bottom", 5, "px"]
					],
					font: {
						size: [3, 'vh'],
						color: null,
						family: null,
						style: null
					},
					layer: 2,
					animations: {
						enter: "fadeIn",
						leave: "fadeOut"
					},
					cssOverride: `
						`
				})
			]
		})
	}
}
