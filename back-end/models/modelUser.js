const mongoose = require("mongoose") ;

const User = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    user_name:{
        type: String,
        required: true
    },
    phone_number:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true
    }

});

const UserSchema = mongoose.model('User', User);
module.exports = UserSchema;