const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const jwt = require('jsonwebtoken')
const multer = require('multer');
const User = require("./models/User")
const Product = require("./models/Products")
const nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')
const mongoConnector = require('./middleware/mongoconnect')
const variables = require('./variables/enVariables.js');


// import connectMongo from './middleware/mongoconnect';





// const sendgridTransport = require('node-mailer-sendgrid-transport')


const isResetTokenValid = require("./verifypasstoken")

// var JsonWebTokenError = require('JsonWebTokenError')
require('dotenv').config()
const auth = require("./auth")
// import verifyToken from './auth'

// const passport = require('passport')
// , LocalStrategy = require('passport-local').Strategy;
const app = express();
const Port = variables.port;

const bodyParser = require('body-parser');
const cors = require('cors');

// app.use('./uploads/', express.static('uploads'));
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/')

  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString().replace(/:/g, '-') +'-'+ file.originalname)
    
  },
})
const fileFilter = (req, file, cb) =>{
  if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
    cb(null, true)
  }else{
    cb(new Error("Please upload a jpeg or png file"), false)
  }
}
const upload = multer({
  storage: storage, 
  fileFilter: fileFilter,
})


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header({"Access-Control-Allow-Credentials": true});
 
  next();
});

const oneDay = 60
// 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.Access_Token,
    saveUninitialized:false,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use('/uploads', express.static('uploads'));

app.use(cookieParser());

const Joi = require('joi');


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());



const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const verifyToken = require('./auth');
const { del } = require('express/lib/application');
const { cp } = require('fs');

// Connection URL
const url = variables.mongoDBUri;

// Create a new MongoClient
// const client = new MongoClient(url);

const authMechanism = "SCRAM-SHA-1";

// Use connect method to connect to the Server
  
let refreshtoken = []


app.get('/', authenticateToken, async (req, res)=>{
  if(!authenticateToken) {return res.status(400).json({status: 0, message:"Nope"})}

    MongoClient.connect(url, (err, client)=>{
      if (err) throw err;
      let db = client.db('IdowuDB');
    
      db.collection("users").find({}).toArray((err, result)=>{
        if (err) {res.status(400).json({status: 0, message:"Nope"})}
        res.json(result.filter(result=>result.username===req.user.username, {status: 1, message: "success"}))
        
        client.close()
        

      });
      
    });
  

})

app.get('/token', (req, res)=>{
  // const refreshToken = req.body.token
  const authHeader = req.headers['authorization']
  const refreshToken = authHeader && authHeader.split(' ')[1]
  if (refreshToken==null) return res.status(401).json({status: 0, message: "You are not authorized"})
  if (!refreshtoken.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, variables.refreshToken, (err, user)=>{
      if (err) return res.status(403).json({status:0, message: "You need authorization to access this"})
      const accessToken = generateAccessToken({username:user.username})
      res.json({accessToken:accessToken})
  })
})



app.post('/register', async (req, res)=>{
  
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    username: Joi.string().min(5).max(100).required(),
    email: Joi.string().min(5).max(300).required().email(),
    password: Joi.string().min(8).max(1000).required(),
   
  });
  const {error} = schema.validate(req.body);
  if (error){
    return res.status(400).send(error.details[0].message);
  }
  // let myname = req.body.name;
  let user = await User.findOne({email: req.body.email});
  let usename = await User.findOne({username: req.body.username});
  
  if (user){
    res.status(409).json({
      status: 0, message: "Hmm... we found that email in our database. You may login instead"
    })
    // console.log(res);
    // let res = {status: 0, message: "That user already exists!"};
    // return res;
  }else if(usename){
    res.status(403).json({
      status: 0, message: "That username already exists! Please pick a new username"
    })
  }else{
    
    user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    if (user.name.length < 2){
      res.status(400).json({
        status: 0, message: "The name must be longer than 5 characters"
      })
  
    }else{
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // user.token = await token;

    await user.save();
    // res.send(user);npm 
    // console.log(process.env.Refresh_token);
    // console.log(token);
   res.status(200).json({ status: 1, message: "User successfully registered" });
  }}

})



app.post("/login", async (req, res) => {
  const body = req.body;
  const user = await User.findOne({username: body.username});
  if (user) {
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      const token = generateAccessToken({username:user.username})
      const refToken = jwt.sign({username:user.username}, variables.refreshToken)
      refreshtoken.push(refToken)
      if(res.statusCode===401){console.log("Hi")}

      
       
      // const token = jwt.sign({username:user.username}, process.env.Access_Token, {expiresIn: '5s'})
  
      user.token = await token;
      user.refToken = await refToken;
      // session = req.session;
      // session.userid = body.username;
      if (user.token){
      res.status(200).json({status:1, 
        message: "Password confirmed!", 
        token: user.token, 
        refToken: user.refToken,
        user_id:user._id,
        name: user.name,
        username:user.username,
       });
      }else{
        console.log("No token")
        res.status(403).json({status: 0, message: "Your token has expired. Please login again"})
      }
      
      
      
    } else {
      res.status(400).json({status:0, message: "Invalid Password" });
      console.log(user.password)
      console.log(req.body.password)
      console.log(validPassword)

    }
  } else {
    res.status(401).json({status:0, message: "User does not exist" });
  }
});


  app.get('/apartments', (req, res)=>{
  res.send(
    [{
    featured:"Image here",
    location:"USA",
    size:"3 bedroom",
    type:"Service apartment",
    available:true,
    price:56
  },
  {
    featured:"Image",
    location:"Nigeria",
    size:"3 bedroom",
    type:"Service apartment",
    available:true,
    price:56
  }])
})


function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token==null) return res.status(401).json({status: 0, message:"Unauthorized"})

  jwt.verify(token, variables.accessToken, (err, user)=>{
      if (err) return res.status(403).json({status: 0, message:"Forbidden"})
      
      req.user = user
      next()
  })
}

  

function generateAccessToken(user){
  return jwt.sign(user, variables.accessToken, {expiresIn: '50s'})

}

app.get("/verify-token", isResetTokenValid, async (req, res)=>{

})

app.post("/products", upload.single('productImage'), async (req, res)=> {

  console.log(req.file)
  const schema = Joi.object({
    product_name: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(1).max(1000*100000).required(),
    price: Joi.number().min(1).max(1000*100000).required(),
    productImage: Joi.string()
  });
  const {error} = schema.validate(req.body, req.file);
  if (error){
    console.log(error)
    return res.status(400).json({status: 0, message: "An error occurred...try again"});
  }

  product = new Product({
    product_name: req.body.product_name,
    description: req.body.description,
    price: req.body.price,
  });

  product.productImage = await req.file.path

  await product.save()

  res.status(200).json({ status: 1, message: "Product saved successfully" });
  // let myname = req.body.name;

})


app.post('/forgot-password', async (req, res, next)=>{
  
  const email = req.body.email
  user = await User.findOne({email: email})

  if (!user){
    res.status(400).json({status: 0, message: "User does not exist"})
    return
  } 
  
  const payload = {
    user_id : user._id,
    username: user.username,
    email: user.email
  }

  date = new Date()
  const resetToken = jwt.sign(payload, variables.resetToken, {expiresIn: '15s'})
  user.resetToken = resetToken
  user.tokenExpired = Date.now()+60000  //Token expires after 1 minute (60000=60 secs)

  await user.save()

  // resetLink = `http://localhost:3000/Resetpassword?id=${user._id}&token=${resetToken}`
  // console.log(resetLink)  
  
  //Send password reset link to mail
  let mailTransporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'paulpremzy@gmail.com',
        pass: variables.emailPass
    }
}));
  
let mailDetails = {
    from: 'paulpremzy@gmail.com',
    to: user.email,
    subject: 'Your password reset link',
    html: `
    Hello <h2>How are you</h2>
    <h3><a href="http://localhost:3000/Resetpassword?id=${user._id}&token=${resetToken}">Click here</a>
     to reset your password on X</h3>`
};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log('Email sent successfully');
    }
});
  res.status(200).json({status: 1, message: "A password reset link has been sent to your email address"})
})


app.post("/reset-password/:_id/:resetToken", async (req, res)=>{
  
  let user = await User.findOne({_id: req.params._id})

  console.log(user)
  
  const schema = Joi.object({
    password: Joi.string().min(5).max(100).required(),
   
  });
  const {error} = schema.validate(req.body);

  if(error){
    console.log(error)
    return res.status(400).json({status: 0, message: "An error occurred...try again"});
  }

  if (!user){
    res.status(400).json({status: 0, message: "user not found"})
    return
  }

  const token = await User.findOne({
    _id: user._id,
    resetToken: req.params.resetToken,
    tokenExpired: {$gt: Date.now()}
  })
  // console.log(token.tokenExpired)

  if (!token){

    res.status(400).json({status: 0, message: "Token already used or expired"})
    return
  }

  user.password = req.body.password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.resetToken = '' //Remove the token once password has been reset
  await user.save()
  // 

  res.status(200).json({status: 1, message: user.name+","+" "+"your password has been reset"})
  
})


app.post('/users/:username', async (req, res) =>{
  let user = await User.findOne({username: req.params.username})
  console.log(user)

  res.status(200).json({status: 1, message: user.name})
    // if (user.username) {
    //   newPassword = req.body.password
    //   password = new User(
    //     {
    //       name: user.name,
    //       username: user.username,
    //       email: user.email,
    //       password: user.password

    //     }
    //   )
    //   password.password = newPassword
    //   password.save()
    //   res.status(200).json({
    //     status: 1, username: user.username, name:user.name, email:user.email
    //   })
    // }else{
    //   res.status(401).json({
    //     status: 0, message: "Invalid user!"
    //   })
    // }
});
// require('crypto').randomBytes(64).toString('hex')





app.listen( Port, ()=>{
  mongoConnector()
  console.log(`App listening on port ${Port}`)
}
  )