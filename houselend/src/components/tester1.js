// const fetcher=()=>{
//     let body={
//         "name": "JSON_Login",
//         "client_id": "jeMM43Olrr",
//         "firm_code": "5ntJOPXqQb",
//         "type": "C",
//         "userID": "VT071560",
//         "password": "QDXo4689",
//         "fromIP": "70.169.110.226",
//         "browser": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.45 Safari/537.36"
//         }

//     fetch("https://api-cttrade.choicetrade.com/trade/login",{
//         method:"POST",
//         body:JSON.stringify(body),
//         headers:{'Content-Type':'application/json',
//       'x-api-key': 'test-ba47b2728186cb2f88a808d17a162c79f5de7889a84a88f28969c6e5a0829f2cX'}, 
//     }).then(res=>{
//         //console.log(res);
//         return(res.json());
//     }).then(resp=>{
//         console.log(resp)
//     }).catch(err=>console.log(err))
// }

const fetchMe = async () =>{
    let bod = {
      "name":"JSON_Login",
      "client_id":"jeMM43Olrr",
      "firm_code":"5ntJOPXqQb",
      "type":"C",
      "userID":"VT071560",
      "password":"QDXo4689",
      "fromIP":"70.169.110.226"
    }
    fetch("http://api-ctpractice.choicetrade.com/trade/login",
    {
      method:'POST',
      body: JSON.stringify(bod),
      mode: 'no-cors',
      header: {
        'accept': 'application/json',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.8',
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
        'x-Api-key': 'ba47b2728186cb2f88a808d17a1s62c79f5de7889a84a88f28969c6e5a0829f2cX',
        'cache-control': 'no-cache'
      }
      
    }).then(res=>{
      return(res)
    }).then(jsonResponse =>{
      console.log(jsonResponse);
    }).catch(err=>{
      console.log(err);
    })
    }

window.onload=()=>{
    fetchMe();
}