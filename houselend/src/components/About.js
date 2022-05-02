import { Component } from "react";
import {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';


const About =()=>{
    const [Abt, setAbt] = useState("")

    useEffect(()=>{
        fetch("http://localhost:8080").then(res =>{
            if (res.ok){
                return res.json()
            }
        }).then(jsonResponse=>{
            setAbt(jsonResponse)
        })
    }, [])

     return(
        <div>
        <nav className = 'main-nav'>
            <ul>
                <li><NavLink className='nav' to = '/'>Home</NavLink></li>
                <li><NavLink className='nav' to = '/About'>About</NavLink></li>
                <li><NavLink className='nav' to = '/Account'>Account</NavLink></li>
                <li><NavLink className='nav' to = '/Apartments'>Apartments</NavLink></li>
            </ul>
        </nav>
        <h2>{Abt.name}</h2>

    </div>
        )
}


export default About;
