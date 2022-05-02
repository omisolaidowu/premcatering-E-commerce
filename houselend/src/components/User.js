import { useState, useEffect } from "react";
import axios from '../api/axios'

const Userprofile = () => {
    const [users, setUsers] = useState()
    
    useEffect(()=>{
        let isMounted = true
        const controller = new AbortController()
        const getData = async () =>{
            try{
                const response = await axios.get('/apartments', {
                    signal: controller.signal
                })
                console.log(response.data)
                isMounted && setUsers(response.data)
            }catch(err){
                console.error(err)
            }
        }
        getData()
        return () => {
            isMounted = false;
            controller.abort()
        }
    }, [])
    return(
        <article>
            
            
        </article>
    )
}

export default Userprofile;