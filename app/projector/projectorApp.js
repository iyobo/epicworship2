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
	currentNodes:Array=[]
	currentBg:String="../../assets/bg/videos/video.mp4"

	ngOnInit() {

		//main process says we should do something
		ipc.on('payload', (event, payload)=> {
			//Cleanup current scene by running through all current nodes and executing their "leave" methods
			this.currentNodes.forEach((node)=> {
				node.leave(this)
			});

			var currentTicks = 0;
			payload.forEach((item) => {
				//deserialize streamed action
				var action = PayloadAction.deserialize(item);

				if(action.canEnter(this)===true){
					setTimeout(()=> {
						action.enter(this);
					}, currentTicks);
					currentTicks += action.nextDelay
				}
			})

		})
	}

}

bootstrap(ProjectorApp, []).catch(err => console.error(err));