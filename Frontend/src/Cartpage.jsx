import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
// import "./cart.css";
import "./newcart.css"
import Cartpageelement from "./Cartpageelement";

function Cartpage(props) {
   let z="";
    const[cart, setcart] = useState([])

    useEffect(()=>
    {
      console.log("hell aditya");
        axios.get("http://localhost:9002/cart")
        .then(res=>
            {  
                console.log("this is res");
                 setcart(res.data);
                 console.log(cart);
            })
            .catch(err=>
                {
                    console.log(err);
                })
    }
    
   ,[])


//    cart.map((data)=>
//    {
//       if(data.isbn==2)
//        {
//         z=data;
//        }
//    });
    

  
  



    // console.log("this is cart",cart[0]);
    // console.log("cart page here",props.data);
    return (
      <>
      <h1 class="shopcart">Shopping Cart</h1>
      <hr/>
          {
            cart.map((data)=>(
             <Cartpageelement bookname={data.bookname} price={data.price} bookimage={data.bookimage} quantity={data.quantity} isbn={data.isbn} bookauthor={data.bookauthor} />
          
         ))}
          
      </>
      
    )
}
export default Cartpage;