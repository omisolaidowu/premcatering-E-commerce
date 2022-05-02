import React from 'react';
import {useState, useEffect,} from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
// import axios from 'axios';

const Product =()=>{
    const [ProductName, setProductName] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState('');
    const [ProductImage, setProductImage] = useState('');
    const [messageME, setmessageMe] = useState('');
    // const [Passlen, setPasslen] = useState('');
    const [isPending, setisPending] = useState(false);
    const lastRoute = useHistory();



    const submitHandler = e => {
        e.preventDefault()
        
        setisPending(true)

        fetch("http://localhost:8080/products",
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify( {
                product_name: ProductName,
                description: Description,
                price: Price,
                productImage: ProductImage,
            })
        }).then(res=>{
          if (res.ok) {
            setisPending(false)
            setProductName('')
            setDescription('')
            setPrice('')
            setProductImage('')
              setTimeout(()=>{
                setmessageMe('')
                setisPending(false)
                  lastRoute.push('/PostProduct')
              }, 2000)
              
              
              return res.json()
          }else{
            //   console.log(res.json())
            //   let errorMessage = res.json()
            //   console.log(errorMessage);
            // setmessageMe(errorMessage);
            
            setisPending(false)
            return res.json()
          }
        }).then(responseJson=>{
           console.log(responseJson)
           setmessageMe(responseJson)
        }).catch(err=>{
            console.log('Error:', err)
        })
       
    }
    return(
        <div>
            <div>
            <h2>Post Product</h2>

            <form onSubmit={submitHandler}>
               <div> <input type="text" name="name" 
                value={ProductName}
               onChange={(e)=>setProductName(e.target.value)}
                required/> <label>Product name</label></div>
                <div><input type="text" name="user"
                 value={Description}
                  onChange={(e)=>setDescription(e.target.value)}
                 required/><label>Describe your product</label></div>
                <div><input type="number" name="description"
                 value={Price}
                  onChange={(e)=>setPrice(e.target.value)}
                 required/> <label>Set a price</label></div>
                <div><input enctype="multipart/form-data" type="file" name="file"
                 value={ProductImage}
                 onChange={(e)=>setProductImage(e.target.value)}
                  required/></div>
        

            <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
                {!isPending && <button class="btn-link" type="submit">Submit</button>}
                {isPending && <button class="btn-link" disabled type="submit">Posting product...</button>}
            </a>
                
                
                {isPending&& <h2>Redirecting...</h2>}
                {messageME.status===0 ? <p className="email-error">
                    {messageME.message}</p> :""}
            </form>
            {messageME.status===1 ? <p className="email-success">
               {messageME.message}!</p> :''}

                    {/* <h2>{messageME.status}</h2> */}
            {/* <h2>{Passlen}</h2> */}

            </div>
        
           
        </div>
    )
        
    }

    

    export default Product;