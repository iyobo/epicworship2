/**
 * Created by iyobo on 6/30/16.
 */
class Page{
    constructor(){
        this.styles={}
    }

    setStyle(name,value){
        this.styles[name] = value;
    }

    setStyles(styles){
        this.style = styles;
    }
}

module.exports=Page