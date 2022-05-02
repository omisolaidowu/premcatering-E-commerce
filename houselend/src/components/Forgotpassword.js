import React from 'react';
import {useState, useEffect,} from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink, useParams } from 'react-router-dom'
// import { PropTypes } from 'prop-types';


export default function Forgotpassword (){
    // const [Token, setToken] = useState([]);
    const [Email, setEmail] = useState([]);
    const {token} = useParams()
    
    const [messageME, setmessageMe] = useState('');
    const history = useHistory();

    console.log(token)
    
    const submitHandler = e => {
        e.preventDefault();

        fetch(
            "http://localhost:8080/forgot-password",
            {
                method: 'POST',
                headers: 
                {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',

                },
                body: JSON.stringify({
                    email: Email
                })
            }).then(res=>{
                if (res.ok){
                    setEmail('')
                    setTimeout(()=>{
                        history.push('/Forgotpassword')
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
            
    }
    return(
        <div class="login-body">
        <div class="login-box">
            <h2>Forgot password</h2>
            <form onSubmit={submitHandler}>
            <div class="user-box"><input type="email" name="email"
                  value={Email}
                  onChange={(e)=>setEmail(e.target.value)}
                 required/>
                 <label>Enter the email you registered with</label>
            </div>
            <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
                <button class="btn-link" type="submit">Send reset link</button>
            </a>
            {messageME.status===0? <p className="email-error">
                    {messageME.message}</p>:''}
            {messageME.status===1? <p className="email-success">
                    {messageME.message}</p>:''}
            </form>
            <div class="reg-link">
            {messageME.status===0? <p>"Not account?" <NavLink className='reg-link' to = '/Register'>Register here</NavLink></p>:''}
            </div>
        </div>
        </div>
    )}
    // Login.propTypes = {
    //     setToken: PropTypes.func.isRequired
    //   }