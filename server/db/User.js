const mongoose=require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true});

const User = mongoose.model('User', {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password:{
      type:String,
      required:true
    },
    token: { type: String },
    
  },'Medium');

module.exports={User};