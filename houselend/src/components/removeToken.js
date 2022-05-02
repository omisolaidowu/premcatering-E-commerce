const removeToken =()=>{

    return sessionStorage.removeItem('token')

    // const tokenString = sessionStorage.getItem('token');
    //     const userToken = JSON.parse(tokenString);
    //     return  sessionStorage.removeItem(userToken?.token)

}

export default removeToken;