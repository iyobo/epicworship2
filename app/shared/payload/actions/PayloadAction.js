
/**
 * Created by iyobo on 2016-07-15.
 */
/**
 * Payload actions can either create nodes or do specific tasks...all of which should be done within the perform object.
 */
export class PayloadAction{
	_duration: Number = 1000;
	_nextDelay: Number = 1000;
	_group:String="notset";
	_type:String="notset";
	

	constructor(duration:Number) {
		this._duration = duration;
		this._nextDelay = duration;
	}

	static deserialize(data){
		return require("./"+data._group+"/"+data._type).build(data);
	}


	get duration() {
		return this._duration;
	}

	set duration(value) {
		this._duration = value;
	}

	get nextDelay() {
		return this._nextDelay;
	}

	set nextDelay(value) {
		this._nextDelay = value;
	}

	/**
	 * Use this, if applicable, to perform this action. Takes in the projector context
	 * i.e. animations, creation of nodes, jquery modifications, etc.
	 * @param args
	 */
	perform(projector){

	}


}