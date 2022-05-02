import { NavLink } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';



const Account = () =>{
const [Acct, setAcct] = useState("");
useEffect(()=>{
    axios.get("http://localhost:8080").then((response)=>{
        
        setAcct(response.data)
        
    })
}, [])

// looping out the arrays from the database:
const empt = []
    for(var i= 0; i<Acct.length; i++){
        empt.push(Acct[i])
    }
    // console.log(empt)

    const namemap = empt.map(Account=>
        <div key={Account._id}>
            {Account.name}
        </div>
        )
    const usermap = empt.map(Account=>
        <div key={Account._id}>
            {Account.username}
        </div>)
        // console.log(testmap)
    
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
            <div>
                <h2>The Names Are:</h2>
                    
                    <h3>{namemap}</h3>
                
                <h2>The Users Are:</h2>
                    
                    <h3>{usermap}</h3>
                    
            </div>
        </div>

)
}

export default Account;