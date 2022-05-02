// let myVar = [{
//     featured:"Image here",
//     location:"userlocation",
//     description:[{
//       size:"3 bedroom",
//       type:"service apartment",
//       available:true,
//       price:56
//     },]
// }]

// console.log(myVar[0].description[0].available)


const fetchMe =()=>{
fetch("http://api-ctpractice.choicetrade.com/trade/",
{
  method:'POST',
  headers: {
    'Content-Type': 'application/json',
    'accept-encoding': 'gzip, deflate',
    'accept-language': 'en-US,en;q=0.8',
    'content-type': 'application/json',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
    'x-Api-key': 'ba47b2728186cb2f88a808d17a162c79f5de7889a84a88f28969c6e5a0829f2cX',
    'cache-control': 'no-cache'
  },
  body: {
    "name":"JSON_Login",
    "client_id":"jeMM43Olrr",
    "firm_code":"5ntJOPXqQb",
    "type":"C",
    "userID":"VT071560",
    "password":"QDXo4689",
    "fromIP":"70.169.110.226"
  }
}).then(res=>{
  if(res.ok){
    return res.json()
  }
}).then(jsonResponse =>{
  console.log(jsonResponse)
})
}

require("crypto").randomBytes(64).toString('hex')
fetchMe();




