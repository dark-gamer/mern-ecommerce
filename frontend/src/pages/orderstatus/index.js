import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';


export default function OrderStatus (){
    const navigate = useNavigate();
    // Automatically redirect to AnotherPage after 3 seconds
    useEffect(() => {
      const timeout = setTimeout(() => {
        navigate('/');
      }, 3000);
  
      return () => clearTimeout(timeout); // Clean up the timeout when the component unmounts
    }, [navigate]);


    return (
        <h1>Your Order Has Been Placed Succesfully</h1>
    )
}