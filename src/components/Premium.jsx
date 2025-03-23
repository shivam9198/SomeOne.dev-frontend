import React from 'react'
import baseUrl from '../utils/BaseUrl';
import axios from 'axios';

function Premium() {
 const handlePayment = async (type)=>{
    try {
      const order =   await axios.post(baseUrl+"/payment/create",{membershipType : type},{withCredentials:true});
      console.log(order);

      const{keyId, amount , currency , orderId ,notes,} = order.data;
          // Open Razorpay Checkout
          const options = {
            key: keyId, 
            amount, 
            currency,
            name: 'SomeOne.Dev',
            description: 'Connect with other Developers',
            order_id: orderId, 
            prefill: {
              name: notes.firstName,
              email: notes.email,
            
            },
            theme: {
              color: '#F37254'
            },
          };
    
          const rzp = new window.Razorpay(options);
          rzp.open();
        }
    

        
    catch (error) {
        console.log(error);
        
    }
}


  return (
<div className='m-32'>
<div className="flex w-full flex-col lg:flex-row ">
  <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
    <h1 className='font-bold text-3xl text-zinc-300'>Silver membership</h1>
    <ul>
        <li className='font-semibold text-indigo-300 text-md'>- 100 Connection request per day</li>
        <li className='font-semibold text-indigo-300 text-md'>- Blue tick</li>
        <li className='font-semibold text-indigo-300 text-md'>- unlimited chats</li>
        <li className='font-semibold text-indigo-300 text-md'>- 3 months</li>
        <li className='font-semibold text-indigo-300 text-md'>- Price: ₹ 300</li>
        </ul>
        <button className="btn btn-primary" onClick={()=>handlePayment("Silver")}>Buy Silver</button>
  </div>
  <div className="divider lg:divider-horizontal">OR</div>
  <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
  <h1 className='font-bold text-3xl text-zinc-300'>Gold membership</h1>
    <ul>
        <li className='font-semibold text-indigo-300 text-md'>- Unlimited Connection request per day</li>
        <li className='font-semibold text-indigo-300 text-md'>- Blue tick</li>
        <li className='font-semibold text-indigo-300 text-md'>- unlimited chats</li>
        <li className='font-semibold text-indigo-300 text-md'>- 6 months</li>
        <li className='font-semibold text-indigo-300 text-md'>- Price: ₹ 700</li>
        </ul>
        <button className="btn btn-secondary" onClick={()=>handlePayment("Gold")}>Buy Gold</button>
  </div>
</div>
</div>

  )
}

export default Premium