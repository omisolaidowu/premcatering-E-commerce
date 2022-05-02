const mongoose = require('mongoose');
const User = require("./models/User")

isResetTokenValid = async (req, res, next)=>{
    // const {id, token} = req.query
  
    const id = req.query.id
    const token = req.query.token
    if(!id || !token) return res.status(400).json({status: 0, message:"Invalid request"})
  
    if(!mongoose.isValidObjectId(id)) return res.status(400).json({status: 0, message:"Invalid user or token"})
    const resToken = await User.findOne({
      _id: id,
      resetToken: token,
      tokenExpired: {$gt: Date.now()}
    })
  
    try{
  
    if (!resToken.resetToken===token || resToken===null) return res.status(400).json({status: 0, message:"Invalid user or token expired"})
      req.resToken = resToken
      next()
      return res.status(200).json({status: 1, message:"User verified!"})
    }catch(err){return res.status(400).json({status: 0, message:"This token has expired"})}
  }

  module.exports = isResetTokenValid;
  