import React, { useEffect } from 'react';
import {
  CheckoutContainer,
  Payment,
  SubTotal,
  Total,
  RazorPayButton
} from '../../styles/components/CheckoutStyle';
import { useSelector } from 'react-redux';
import PaypalButtons from '../../components/paypal/PaypalButtons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
  const handleClick = () => {
    // Navigate to AnotherPage when the button is clicked
    navigate('/orderstatus');
  };

  const cart = useSelector(state => state.cart);
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();

  const PAYPAL_CLIENT_ID =
    'AaZdJWvvg4CUSKguxWmowOfjgW1VOHgiSSBd2FeixhX8YbFw1VRZwV8RYTFG9HAT8ULe4isdPY0b9aEQ';
  const RAZOR_PAY_ID = 'rzp_test_gcrgN1huv4qUZ3';
  const cartId = cart?.cart?._id;

  const userId = auth?.userInfo?.id;
  const amountValue = cart?.cart?.bill;

  const handleCreateOrder = async () => {
    const data = { cartId, userId };
    const response = await axios.post('/api/orders', data);
    const orderID = await response.data.id;
    return orderID;
  };

  const handleOnApprove = async data => {
    const response = await axios.post(`/api/orders/${data.orderID}/capture`);

    return response;
  };



  const loadScript = src => {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // useEffect(() => {
  //   loadScript('https://checkout.razorpay.com/v1/checkout.js');
  // }, []);

  return (
    <CheckoutContainer>
      <h1>Order Summary</h1>
      <SubTotal>
        <div>
          <h4>Items</h4>
          <p>${cart?.cart?.bill}</p>
        </div>
      </SubTotal>
      <Total>
        <h2>Order Total</h2>
        <p>${cart?.cart?.bill}</p>
      </Total>

      <Payment>
        <p>Choose below payment methods</p>
        <button onClick={handleClick}>Cash On Delivery</button>
      </Payment>
    </CheckoutContainer>
  );
}
