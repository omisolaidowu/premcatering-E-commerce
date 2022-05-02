import {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import useToken from './useToken';

import axios from 'axios';


const Apartments = (err) => {
    
    const [Aparts, setAparts] = useState([]);
    const { token, setToken } = useToken();

    // useEffect(()=>{
    //     axios.get("http://localhost:8080/").then((response)=>{
    //         console.log(response.data)
    //     })
    // }, [])
    
    useEffect(()=>{
        fetch("http://localhost:8080/apartments", 
        {
            
            headers: {
                'x-access-token': token,
                'Content-type': 'application/json',
                'Accept': 'application/json'
                
                

            }}).then(res=>{
            if (res.ok){
                return res.json()
            }else{
                console.log(token)
                
                
            }
        }).then(jsonResponse=>{
           setAparts(jsonResponse)
           console.log(jsonResponse)
           
        })
    },[])

    // const empt = []
    // for(var i= 0; i<Aparts.length; i++){
    //     empt.push(Aparts[i])
    // }
    // console.log(empt)
    

    const testmap = Aparts.map(x=>
    <div>
        <p>{x.featured}</p>
        <p>{x.size}</p>
        {x.type}
        
    </div>

    )
    // console.log(testmap)

    
   
    return(
        <div>
            <nav className = 'main-nav'>
                <ul>
                    <li><NavLink className='nav' to = '/'>Home</NavLink></li>
                    <li><NavLink className='nav' to = '/About'>About</NavLink></li>
                    <li><NavLink className='nav' to = '/Account'>Account</NavLink></li>
                    <li><NavLink className='nav' to = '/Apartments'>Apartments</NavLink></li>
                    <li><NavLink className='nav' to = '/Logout'>Logout</NavLink></li>
                </ul>
                
            </nav>
            
            <h2>{testmap}</h2>
            
        </div>
    )
}

export default Apartments; 