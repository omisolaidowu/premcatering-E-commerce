import React from 'react';
import {useState, useEffect,} from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
// import { PropTypes } from 'prop-types';
import { useLocation } from 'react-router-dom';

import queryString from 'query-string'


export default function Resetpassword (){
    // const [Token, setToken] = useState([]);
    const [Password, setPassword] = useState([]);
    const [Password2, setPassword2] = useState([]);



    const Location = useLocation() 
    // console.log(Location)
    
    const [messageME, setmessageMe] = useState('');
    const history = useHistory();

    


    const verifypassToken =()=>{
        const id = queryString.parse(Location.search)
        
        // const token = queryString.parse(Location.search)
        console.log(id.token)
        fetch(`http://localhost:8080/verify-token?id=${id.id}&token=${id.token}`).then(
            res=>{
                if (res.ok){
                    return res.json()
                }else{
                    return res.json()
                }
            }
        ).then(jsonResponse=>{
            setPassword('')
            setPassword2('')
            setmessageMe(jsonResponse)
            // console.log(jsonResponse)
        })
    }
    
    const submitHandler = e => {

        const id = queryString.parse(Location.search)
        e.preventDefault();
        if (Password2!==Password){
            console.log("Passwords don't match")
        }else if (Password.length < 8){
           
            // setPasslen("Password too short")
            console.log("Password too short")
        
        }else{

        verifypassToken()


        fetch(
            "http://localhost:8080/reset-password/"+id.id+"/"+id.token,
            {
                method: 'POST',
                headers: 
                {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',

                },
                body: JSON.stringify({
                    password: Password
                })
            }).then(res=>{
                if (res.ok){
                    setPassword('')
                    setPassword2('')
                    setTimeout(()=>{
                        history.push('/Login')
                    }, 2000)
                
                    return res.json()
                }else{
                    return res.json()
                }
            }).then(jsonResponse=>{
                setmessageMe(jsonResponse)
                console.log(jsonResponse)
                // setToken(jsonResponse)

            })

           
            
            // console.log(Token)
            
    }}
    return(
        <div class="login-body">
        <div class="login-box">
            <h2>Reset password</h2>
            <form onSubmit={submitHandler}>
            <div class="user-box"><input type="password" name="email"
                  value={Password}
                  onChange={(e)=>setPassword(e.target.value)}
                 required/>
                 <label>New password</label>
            </div>
            <div class="user-box"><input type="password" name="email"
                  value={Password2}
                  onChange={(e)=>setPassword2(e.target.value)}
                 required/>
                 <label>Confirm New password</label>
            </div>
            <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
                <button class="btn-link" type="submit">Change password</button>
            </a>
            {messageME.status===0? <p className="email-error">
                    {messageME.message}</p>:''}
            {messageME.status===1? <p className="email-success">
                    {messageME.message}</p>:''}
                    {Password.length < 1 ? '': Password!==Password2 ? <p className="email-error">
                    Passwords don't match</p> :
                    Password==Password2 ? '': ''}

            </form>
            <div class="reg-link">
            {messageME.status===0? <p>"Not account?" <NavLink className='reg-link' to = '/Register'>Register here</NavLink></p>:''}
            </div>
            {Password.length < 1 ? '': Password.length < 8 ? 
            <p className="email-error">Password must be at least 8 characters long</p>:
            ''}
        </div>
        </div>
    )}
    // Login.propTypes = {
    //     setToken: PropTypes.func.isRequired
    //   }