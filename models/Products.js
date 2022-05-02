const mongoose = require('mongoose');

  const Product = mongoose.model('Product', new mongoose.Schema({
    product_name:{
      type: String,
      required: false,
      minLength: 2,
      maxLength: 100
    },
    description:{
      type: String,
      required: false,
      minLength: 1,
      maxLength:1000*100000
    },
    price:{
      type: Number,
      required: false,
      minLength: 1,
      maxLength:1000*100000
    },
    productImage:{
        type: String,
        required: false
      }
    
  }));

  module.exports = Product