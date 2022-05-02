import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
      };
  const [token, setToken] = useState((getToken()))
  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  
  };

  const remToken = () =>{
    sessionStorage.removeItem('token', token)
  }
  return {
    setToken: saveToken,
    token
  }
  }

  const getRefToken = () =>{
    const toke = JSON.parse(sessionStorage.getItem('token'))
    return toke?.refToken
  }
