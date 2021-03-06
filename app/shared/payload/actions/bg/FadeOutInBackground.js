/**
 * Created by iyobo on 2016-07-15.
 */
import {PayloadAction} from "../PayloadAction";
var number = Number;//Annoying syntax highlighter fix
import {autoserialize,inheritSerialization} from 'cerialize';

@inheritSerialization(PayloadAction)
class FadeOutInBackground extends PayloadAction {

	@autoserialize path:String;
	@autoserialize _group:String = "bg";
	@autoserialize _type:String = "FadeOutInBackground";

	constructor(path:String, duration:Number) {
		super(duration);
		this.nextDelay = duration / 2;
		this.path = path;
		//TODO: check if image or video and transition accordingly
		// this.isImage=(/\.(gif|jpg|jpeg|tiff|png)$/i).test(path)
		// this.isVideo=(/\.(mp4|flv|mov)$/i).test(path)
	}

	static build(data) {
		var obj= new FadeOutInBackground(data.path || "", data._duration || data.duration || 1000);
		obj.props=data;
		return obj;
	}

	/**
	 * We want other actions to continue processing halfway through this background-changing action
	 * @returns {number}
	 */
	get nextDelay() {
		return super.duration / 2;
	}

	set nextDelay(value:number) {
		return super.nextDelay = value;
	}

	canEnter(ctx) {
		if(ctx.currentBg === this.path)
			return false; //No need changing bg if it is already active.
		else
			return true;
	}

	enter(ctx) {
		//get active background object


		// if(this.isImage){
		// 	console.log('Image backgrounds not yet supported')
		// }
		// else if(this.isVideo){
			var vid = $("#bgvid");
			$('#bgvid source').attr('src', this.path);
			ctx.currentBg = this.path;
			vid.addClass('animated fadeOut');
			vid.one('animationend', function () {
				vid[0].load();
				vid.removeClass('fadeOut');
				vid.addClass('fadeIn');
			});
		// }



	}
}

module.exports=FadeOutInBackground