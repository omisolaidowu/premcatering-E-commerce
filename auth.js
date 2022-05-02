const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  
  // req.body.token || req.query.token || 

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  else{
    jwt.verify(token, config.Refresh_token, (err, decoded)=>{
      if (err){
        console.log(err)
        res.json({auth:false, message: "Couldn't fetch data"} )
      }else{
        req.userId = decoded.Id;
        return next();
      }
    });
    
}
  
};



module.exports = verifyToken;


// req.user = decoded;
    
  // } catch (err) {
  //   console.log
  //   return res.status(401).send("Invalid Token");

  // }