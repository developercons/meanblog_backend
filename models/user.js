var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    admin: {
        type: Boolean,
        default: false
    }
    /*,
    password:{
        type:String,
        required:true
    } ,
    
    OauthId: String,
    OauthToken: String,
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }*/
});

/*User.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};*/

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);