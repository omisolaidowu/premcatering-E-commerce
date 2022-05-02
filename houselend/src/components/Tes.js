import { useState, useEffect } from "react";
import axios from "../api/axios";


const Tokentest = () =>{
    const token = JSON.parse(sessionStorage.getItem('token'))
    useEffect(()=>{
        const getRefresh = async () =>{
           const re = await axios.get('/token', {
            
            headers: 
            {
                'Authorization': 'Bearer'+' '+token.refToken,
                'Content-type': 'application/json',
                'Accept': 'application/json',

            },
           })
             console.log(re.data.accessToken)
        }
        getRefresh()
    }, [])

    return(
        <div>Hello</div>
    )
}

export default Tokentest