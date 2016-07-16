/**
 * Created by iyobo on 2016-07-15.
 */
import {PayloadAction} from "../PayloadAction";

module.exports = class ShowTextAction extends PayloadAction {
	text:String;
	_group:String = "node";
	_type:String = "ShowTextAction";

	constructor(text:String, duration:Number) {
		super(duration);
		this.text = text;
	}

	static build(data) {
		var action = new ShowTextAction(data.text || "", data._duration || data.duration || 500);
		action.nextDelay = data._nextDelay || data.nextDelay || data._duration || data.duration || 500;
		
		return action;
	}

	perform(ctx) {
		console.log("Showing Text:", this.text);
		var canvas=$("#canvas");

		canvas.html(this.text);
	}
}

// module.exports=FadeOutInBackground