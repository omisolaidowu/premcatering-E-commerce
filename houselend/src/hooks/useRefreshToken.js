import useAuth from './useAuth'
import { useState } from 'react'
import axios from "../api/axios";


                
const useRefreshToken = () => {
    const token = JSON.parse(sessionStorage.getItem('token'))
    // const { setAuth } = useAuth();
    const [Auth, setAuth] = useState(useAuth());
    
    
    // console.log(token.refToken)
    // const [accessToken, setaccessToken] = useState([])

    const refresh = async () => {
        const re = await axios.get('/token', {
            headers: {
                'Authorization': 'Bearer'+' '+token.refToken,
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            
        })

        // console.log(re.accessToken)
            // setaccessToken(jsonResponse)
            setAuth(prev => {
                console.log(JSON.stringify(prev))
                // console.log(prev.accessToken)

                console.log(re.data.accessToken)

                return { ...prev, accessToken: re.data.accessToken }
            })
            return re.data.accessToken
    }
    return refresh
}

export default useRefreshToken