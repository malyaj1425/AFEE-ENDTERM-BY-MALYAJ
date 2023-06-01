const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://cody:cmdrex505@project0.zuduho3.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true});

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