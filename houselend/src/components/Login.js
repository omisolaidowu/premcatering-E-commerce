import React from 'react';
import {useState, useEffect,} from 'react';
import { useHistory } from 'react-router-dom';
import useToken from './useToken';
import { NavLink } from 'react-router-dom'
// import { PropTypes } from 'prop-types';


export default function Login (){
    // const [Token, setToken] = useState([]);
    const [userName, setuserName] = useState([]);
    const [Pass, setPass] = useState([]);
    const [messageME, setmessageMe] = useState('');
    const { token, setToken } = useToken();
    const history = useHistory();
    
    
    const submitHandler = e => {
        e.preventDefault();

        fetch(
            "http://localhost:8080/login",
            {
                method: 'POST',
                headers: 
                {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',

                },
                body: JSON.stringify({
                    username: userName,
                    password: Pass,
                })
            }).then(res=>{
                if (res.ok){
                    setTimeout(()=>{
                        history.push('/')
                    }, 1000)
                
                    return res.json()
                }else{
                    return res.json()
                }
            }).then(jsonResponse=>{
                setmessageMe(jsonResponse)
                console.log(jsonResponse)
                // setToken(jsonResponse)
                
                if (jsonResponse.token){
                    // setmessageMe(jsonResponse)
                    setToken(jsonResponse)
                    console.log(jsonResponse)
                    
                    // console.log(jsonResponse.token)
                }
                // else{
                //     setmessageMe(jsonResponse)
                // }
                
                // setToken(messageME.token)

               

            })

           
            
            // console.log(Token)
            
    }
    return(
        <div class="login-body">
        <div class="login-box">
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
            <div class="user-box"><input type="text" name="user"
                  value={userName}
                  onChange={(e)=>setuserName(e.target.value)}
                 required/>
                 <label>Username</label>
            </div>
            <div class="user-box"><input type="password" name="password"
                value={Pass}
                 onChange={(e)=>setPass(e.target.value)}
                  required/>
                  <label>Password</label>
            </div>
            <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
                <button class="btn-link" type="submit">Sign In</button>
            </a>
            {messageME.status===0? <p className="email-error">
                    {messageME.message}</p>:''}
            {messageME.status===1? <p className="email-success">
                    {messageME.message}</p>:''}
            </form>
            <div class="reg-link">
            Not account? <NavLink className='reg-link' to = '/Register'>Register here</NavLink>
            <p><NavLink className='reg-link' to = '/Forgotpassword'>Forgot password?</NavLink></p>
            </div>
        </div>
        </div>
    )}
    // Login.propTypes = {
    //     setToken: PropTypes.func.isRequired
    //   }