var mongoose = require('mongoose');
class Main
{
    constructor(){
        
        this.cat = mongoose.model('Cat', { name: String,hash:String });
        this.bat = mongoose.model('Bat', { last: String,hash:String });
    }
    catSchema(){
        return this.cat;    
    }
    batSchema(){
        return this.bat;    
    }
}
module.exports  = new Main();
