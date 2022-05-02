import React from 'react';
import {useState, useEffect,} from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
// import axios from 'axios';

const Register =()=>{
    const [Name, setName] = useState('');
    const [userName, setuserName] = useState('');
    const [Email, setEmail] = useState('');
    const [Pass, setPass] = useState('');
    const [Pass2, setPass2] = useState('');
    const [messageME, setmessageMe] = useState('');
    // const [Passlen, setPasslen] = useState('');
    const [isPending, setisPending] = useState(false);
    const lastRoute = useHistory();



    const submitHandler = e => {
        e.preventDefault()

        if (Pass2!==Pass){
            setisPending(false)
            console.log("Passwords don't match")
        }else if (Pass.length < 8){
            setisPending(false)
            // setPasslen("Password too short")
            console.log("Password too short")
        
        }else{

        
        setisPending(true)

        fetch("http://localhost:8080/register",
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify( {
                name: Name,
                username: userName,
                email: Email,
                password: Pass,
            })
        }).then(res=>{
          if (res.ok) {
            setisPending(false)
            setName('')
            setuserName('')
            setEmail('')
            setPass('')
            setPass2('')
              setTimeout(()=>{
                setmessageMe('')
                  lastRoute.push('/')
              }, 2000)
              
              
              return res.json()
          }else{
            //   console.log(res.json())
            //   let errorMessage = res.json()
            //   console.log(errorMessage);
            // setmessageMe(errorMessage);
            
            setisPending(false)
            return res.json()
          }
        }).then(responseJson=>{
           console.log(responseJson)
           setmessageMe(responseJson)
        }).catch(err=>{
            console.log('Error:', err)
        })
       
    }}
    return(
        <div class="login-body">
            <div class="login-box">
            <h2>Create an account</h2>

            <form onSubmit={submitHandler}>
               <div class="user-box"> <input type="text" name="name" 
                value={Name}
               onChange={(e)=>setName(e.target.value)}
                required/> <label>Name</label></div>
                <div class="user-box"><input type="text" name="user"
                 value={userName}
                  onChange={(e)=>setuserName(e.target.value)}
                 required/><label>Username</label></div>
                <div class="user-box"><input type="email" name="email"
                 value={Email}
                  onChange={(e)=>setEmail(e.target.value)}
                 required/> <label>Example@Xmail.com</label></div>
                <div class="user-box"><input type="password" name="password"
                 value={Pass}
                 onChange={(e)=>setPass(e.target.value)}
                  required/> <label>Password</label></div>
                <div class="user-box"><input name="password2" type="password"
                 value={Pass2}
                 onChange={(x)=>setPass2(x.target.value)}
                 required/><label>Confirm Password</label></div>

            <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
                {!isPending && <button class="btn-link" type="submit">Submit</button>}
                {isPending && <button class="btn-link" disabled type="submit">Registering...</button>}
            </a>
                
                
                {isPending&& <h2>Redirecting...</h2>}
                {messageME.status===0 ? <p className="email-error">
                    {messageME.message}</p> :
                Pass!==Pass2 ? <p className="email-error">
                    Passwords don't match</p> :
                Pass==Pass2 ? '': ''}
            </form>
            <div class="reg-link">
           Already have an account? <NavLink className='reg-link' to = '/Login'>Sign in instead</NavLink>
            </div>
            {messageME.status===1 ? <p className="email-success">
               {messageME.message}!</p> :''}

                    {/* <h2>{messageME.status}</h2> */}
            {/* <h2>{Passlen}</h2> */}
            {Pass.length < 1 ? '': Pass.length < 8 ? 
            <p className="email-error">Password must be at least 8 characters long</p>:
            ''}
            </div>
        
           
        </div>
    )
        
    }

    

    export default Register;