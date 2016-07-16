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
		let canvas = $("#canvas");

		//Position
		let positionCss = ''
		this.props.position.forEach((p)=> {
			positionCss += p[0] + ":" + p[1] + p[2] + ";";
		});

		//Font
		let fontCSS='';
		if(this.props.font){
			var f=this.props.font;
			fontCSS+=f.color? "color:"+f.color+";":"";
			fontCSS+=f.size? "font-size:"+f.size[0]+f.size[1]+";":"";
			fontCSS+=f.family? "font-family:"+f.family+";":"";
			fontCSS+=f.style? "font-style:"+f.style+";":"";
		}

		//Duration
		let durationCSS='animation-duration:'+this.duration / 1000+"s;";

		//Layer
		let layerCSS= this.props.layer != undefined ? "z-index:" + this.props.layer + ";" : "1;"
		

		this.node = $(`<div 
			class="node textnode animated 
			${this.props.animations.enter} 
			" 
			style="
				  
				${durationCSS} 
				
				${positionCss}
				
				${fontCSS}

				${layerCSS}
				
				${this.props.cssOverride?this.props.cssOverride:""} 
				
			">${this.text}</div>`);
		this.nodeIndex = (ctx.currentNodes.push(this)) - 1;

		canvas.append(this.node);
	}

	leave(ctx) {
		let canvas = $("#canvas");
		let t = $(this.node);
		t.removeClass(this.props.animations.enter);
		t.addClass(this.props.animations.leave);

		//After all said and done, at some point (double the duration), clean up this action/node and prevent memleaks.
		setTimeout(()=> {
			console.log('cleaning up...');
			canvas.remove(t); //remove from scene
			ctx.currentNodes.splice(this.nodeIndex, 1); //remove from node list
		}, this.duration * 5);
	}
}

module.exports = ShowTextAction