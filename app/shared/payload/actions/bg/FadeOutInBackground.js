/**
 * Created by iyobo on 2016-07-15.
 */
import {PayloadAction} from "../PayloadAction";
var number=Number;//Annoying syntax highlighter fix

module.exports= class FadeOutInBackground extends PayloadAction{

	path: String;
	_group: String= "bg";
	_type: String="FadeOutInBackground";

	constructor(path:String, duration:Number) {
		super(duration);
		this.nextDelay = duration/2;
		this.path = path;
	}

	static build(data){
		return new FadeOutInBackground(data.path||"", data._duration|| 1000);
	}

	/**
	 * We want other actions to continue processing halfway through this background-changing action
	 * @returns {number}
	 */

	get nextDelay() {
		return this.duration/2;
	}


	set nextDelay(value: number) {
		return super.nextDelay = value;
	}

	perform(ctx) {
		console.log("changing Background...");
	}
}

// module.exports=FadeOutInBackground