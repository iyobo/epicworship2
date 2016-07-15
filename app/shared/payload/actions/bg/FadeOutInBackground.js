/**
 * Created by iyobo on 2016-07-15.
 */
import {PayloadAction} from "../PayloadAction";

module.exports= class FadeOutInBackground extends PayloadAction{
	path: String;
	_group: String= "bg";
	_type: String="FadeOutInBackground";

	constructor(path:String, duration:Number) {
		super(duration);
		this.path = path;
	}

	static build(data){
		return new FadeOutInBackground(data.path, data.duration);
	}

	/**
	 * We want other actions to continue processing halfway through this background-changing action
	 * @returns {number}
	 */
	get durationBeforeNext() {
		return super.durationBeforeNext/2;
	}

	perform(ctx) {
		console.log("changing Background...");
	}
}

// module.exports=FadeOutInBackground