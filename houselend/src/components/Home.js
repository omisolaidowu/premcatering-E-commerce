import { NavLink } from 'react-router-dom'
import {useState, useEffect} from 'react'
import useToken from './useToken';
import { useHistory } from 'react-router-dom';
import { Redirect } from "react-router-dom"
import Logout from './Logout';
        
const Home = () => {
    const { token, setToken } = useToken();
    // const [usename, setusername] = Login(token)
    const [Home, setHome] = useState([])
    const [User, setUser] = useState([])
    // const [usernameCheck, setusernameCheck] = useState([])
    // const [isRequired, setisRequired] = useState([token])
    const [Load, setLoad] = useState([])
    
    const [isLoading, setisLoading] = useState(true)
    const nextRoute = useHistory();
    useEffect(() =>{
        let isMounted = true
        const controller = new AbortController();
        try{
            fetch('http://localhost:8080', {
            method: 'GET',
            signal: controller.signal,
            
            headers: {
                'Authorization': 'Bearer'+' '+token,
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            
            if (!res.ok){
                // setisLoading(false)
                
                sessionStorage.clear()
                if(!token){
                setTimeout(()=>{
                    // <Login/>
                    nextRoute.push('/Login')
                    // nextRoute.replace('/Login', '/')
                }, 2000)}
                
                // console.log(res.ok)
                
                // console.log(status)
                // console.log(res.ok)
                return res.json()
                // nextRoute.push('/')
            }else{
                // setisLoading(true)
                return res.json()
                // const toke = JSON.parse(sessionStorage.getItem('token'))
                // console.log(toke?.refToken)
                // console.log(res)
            } 
        } ).then(jsonResponse => {
            // if(jsonResponse.message==="Unauthorized" || jsonResponse.message==="Forbidden"){
                isMounted && setHome(jsonResponse)
                console.log(jsonResponse)
            // }else{
            //     setHome(jsonResponse)
            //     console.log(jsonResponse)
            // }
                // console.log(Load)
            // console.log(isLoading)
        })        
        // const toke = localStorage.setItem('token', tokens);
        // const toker = localStorage.getItem('token');
        // const tokes = JSON.parse(toker);
            // if (!tokens || !toke){
            //     nextRoute.push('/')
            // }
            // console.log(userToken.username)
        // const emp = [];
        // emp.push(userToken)
        // console.log(emp)

        // const gt = emp.map(x=>
        //     x)

        // console.log(gt)

        }catch(err){
            console.error(err)
        }

        return () => {
            isMounted = false
            controller.abort()
        }


          
    }, [])
    

    // looping out the arrays from the database:
        
        // console.log(empt)

        // const namemap = Home.map(Main=>
        //     <div key={Home._id}>
        //         {Main.name}
        //     </div>
        //     )
    //     const empt = []
    // for(var i= 0; i<Home.length; i++){
    //     empt.push(Home[i])
    // }
        // const usermap = Home.map(Main=> 
        //     <div key={Main._id}>
        //        {Main.name}
        //     </div>)
            // console.log(testmap)
    
    return (
        
        <div>
            <nav className = 'main-nav'>
                <ul>
                    <li><NavLink className='nav' to = '/'>Home</NavLink></li>
                    <li><NavLink className='nav' to = '/About'>About</NavLink></li>
                    <li><NavLink className='nav' to = '/Account'>Account</NavLink></li>
                    <li><NavLink className='nav' to = '/User'>Profile</NavLink></li>
                </ul>
            </nav>
            <p>{Home.status===0? <Redirect to="Login" />: Home.map(Main=> 
            <div key={Main._id}>
               Hello, {Main.name}
            </div>)}</p>
            <div>
                {token? <NavLink to = '/Logout'>Logout</NavLink> : ""}
            </div>
        </div>
    )
}

export default Home;