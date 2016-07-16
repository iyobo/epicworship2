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

			/**
			 * First, in EpicWorship tradition,
			 * we have always started blending in the background first before changing text.
			*/
			var currentTicks = 0;
			if(payload.background){
				var action = PayloadAction.deserialize(payload.background);

				if(action.canEnter(this)===true){
					action.enter(this);
					currentTicks += action.nextDelay
				}
			}

			//Cleanup current scene by running through all current nodes and executing their "leave" methods
			this.currentNodes.forEach((node)=> {
				setTimeout(()=> {
					node.leave(this)
				}, currentTicks);
			});


			payload.scene.forEach((item) => {
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