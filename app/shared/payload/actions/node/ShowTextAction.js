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

	perform(ctx) {
		console.log("Showing Text:", this.text);
		var canvas = $("#canvas");

		var node = $(`<div class="node animated ${this.props.animations.entry}" style="${this.props.cssStyle} color:${this.props.color||"white"};   animation-duration: ${this.duration/1000}s; ">${this.text}</div>`);

		canvas.append(node);
	}
}

module.exports = ShowTextAction