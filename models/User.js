
const mongoose = require('mongoose');

  const User = mongoose.model('User', new mongoose.Schema({
    name:{
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100
    },
    username:{
      type: String,
      required: true,
      minLength: 5,
      maxLength: 300,
      unique: true
    },
    email:{
      type: String,
      required: true,
      minLength: 5,
      maxLength: 300,
      unique: true
    },
    password:{
      type: String,
      required: true,
      minLength: 8,
      maxLength: 1000
    },

    resetToken: String,
    tokenExpired: Date,

    
  }));


module.exports = User



