const mongoose = require('mongoose');

const variables = require('../variables/enVariables')

const url = variables.mongoDBUri



// const connectMongo=()=>{ 
//   console.log(url)
//     mongoose.connect(url).then(()=>
//   console.log("Successfully connected")).catch(err=>
//   console.error("Something went wrong", err))
//   }


 async function connectMongo(){
    try{
    await mongoose.connect(url)
    console.log("Successfully connected to mongoDB")
}catch{err=>console.log(err, "something is wrong")}
}

  module.exports = connectMongo