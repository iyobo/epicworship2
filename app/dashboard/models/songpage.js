/**
 * Created by iyobo on 6/30/16.
 */
const Page = require('./page')

class SongPage extends Page{
    constructor(titleText,bodyText, authorText, style){
        super()
        this.title = titleText
        this.body = bodyText
        this.author = authorText

        this.style=style
    }
}

module.exports=SongPage