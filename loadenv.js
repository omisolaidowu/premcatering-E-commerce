const dotenv = require('dotenv')

dotenv.config()

password = process.env.App_password
nodeVersion = process.env.Node_version

console.log(password)
console.log(nodeVersion)

