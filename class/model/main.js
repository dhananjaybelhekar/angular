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
    qr(object) {
    if (object && object.constructor === Array) {
        for (var i = 0; i < object.length; i++) {
            object[i] = this.qr(object[i]);
        }
    } else if (object && typeof object == 'object' && Object.keys(object).length > 0) {
        if (Object.keys(object).indexOf('_eval') < 0) {
            for (var key in object) {
                object[key] = this.qr(object[key]);
            }
        } else switch (object['_eval']) {
            case '_id':
                {
                    object = mongoose.Types.ObjectId(object['value']);
                    break;
                }
            case 'regex':
                {
                    object = new RegExp(object['value'], 'i');
                    break;
                }

        }
    }
    return object;
}
}

module.exports  = new Main();
