/**
 * Created by iyobo on 6/30/16.
 */
const Page = require('./page')

class ImagePage extends Page{
    constructor(titleText, imagePath){
        super()
        this.title=titleText
        this.imagePath = imagePath
    }
}

module.exports=ImagePage