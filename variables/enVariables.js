require('dotenv').config()


const variables = {
    accessToken: process.env.Access_Token,
    port: process.env.port,
    refreshToken: process.env.Refresh_token,
    mongoDBUri: process.env.mongoDB_URI,
    resetToken: process.env.reset_Token,
    emailPass: process.env.Email_pass,
}


module.exports = variables;