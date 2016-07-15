
/**
 * Created by iyobo on 2016-07-15.
 */
/**
 * Payload actions can either create nodes or do specific tasks...all of which should be done within the perform object.
 */
export class PayloadAction{
	duration: Number = 1000;
	_group:String="notset";
	_type:String="notset";

	constructor(duration:Number) {
		this.duration = duration;
	}

	static deserialize(data){
		return require("./"+data._group+"/"+data._type).build(data);
	}

	/**
	 * How long to wait before processing other actions.
	 * Default is duration.
	 * @returns {Number}
	 */
	get durationBeforeNext() {
		return this.duration;
	}

	/**
	 * Use this, if applicable, to perform this action. Takes in the projector context
	 * i.e. animations, creation of nodes, jquery modifications, etc.
	 * @param args
	 */
	perform(projector){

	}


}