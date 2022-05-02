import {useEffect} from 'react';
import { Redirect } from "react-router-dom"

const Logout =()=>{
    useEffect(()=>{
    sessionStorage.clear()
    })
    return(
        <Redirect to="Login"/>
    )
}

export default Logout;