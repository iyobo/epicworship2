/**
 * Created by iyobo on 6/30/16.
 */
import {Component} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {PayloadAction} from "../shared/payload/actions/PayloadAction";
const ipc = electron.ipcRenderer;


@Component({
	selector: 'projector',
	templateUrl: './projectorApp.html',
})
export class ProjectorApp {

	ngOnInit() {
		this.currentNodes = []

		//main process says we should do something
		ipc.on('payload', (event, payload)=> {
			//TODO: Cleanup current scene by running through all current nodes and executing their exit methods
			this.currentNodes.forEach((node)=> {
				node.leave(this)
			});

			var currentTicks = 0;
			payload.forEach((item) => {
				//TODO: deserialize action
				console.log("raw:", item);
				var action = PayloadAction.deserialize(item);
				console.log("Action:", action);

				setTimeout(()=> {
					action.perform(this)
				}, currentTicks);
				currentTicks += action.nextDelay
			})

		})
	}

}

bootstrap(ProjectorApp, []).catch(err => console.error(err));