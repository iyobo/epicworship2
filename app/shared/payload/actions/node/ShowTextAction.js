/**
 * Created by iyobo on 2016-07-15.
 */
import {PayloadAction} from "../PayloadAction";
import {autoserialize, inheritSerialization} from 'cerialize';

@inheritSerialization(PayloadAction)
class ShowTextAction extends PayloadAction {
	@autoserialize text:String;
	@autoserialize _group:String = "node";
	@autoserialize _type:String = "ShowTextAction";

	constructor(text:String, duration:Number) {
		super(duration);
		this.text = text;
	}

	static build(data) {
		var action = new ShowTextAction(data.text || "", data._duration || data.duration || 500);
		action.nextDelay = data._nextDelay || data.nextDelay || data._duration || data.duration || 500;
		action.props = data;
		return action;
	}

	enter(ctx) {
		// console.log("Showing Text:", this.text);
		var canvas = $("#canvas");

		this.node = $(`<div 
			class="node animated ${this.props.animations.enter}" 
			style="
				${this.props.cssStyle} 
				color:${this.props.color || "white"};   
				animation-duration: ${this.duration / 1000}s; 
				
				${this.props.position}

				z-index: ${this.props.z}
				
			">${this.text}</div>`);
		this.nodeIndex = (ctx.currentNodes.push(this)) - 1;

		canvas.append(this.node);
	}

	leave(ctx) {
		var t = $(this.node);
		t.removeClass(this.props.animations.enter);
		t.addClass(this.props.animations.leave);

		//After all said and done, at some point (double the duration), clean up and prevent memleaks.
		setTimeout(()=> {
			var canvas = $("#canvas");
			canvas.remove(t); //remove from scene
			ctx.currentNodes.splice(this.nodeIndex, 1); //remove from node list
		}, this.duration * 2);
	}
}

module.exports = ShowTextAction