import {CanvasNode} from "./CanvasNode";
/**
 * Created by iyobo on 2016-07-15.
 */
export class TextNode extends CanvasNode {

	text:String=""
	
	constructor(text:String) {
		this.text = text;
	}
}