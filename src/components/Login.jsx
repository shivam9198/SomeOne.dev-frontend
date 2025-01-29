import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../utils/BaseUrl';

function Login() {
const dispatch =   useDispatch();
const navigate = useNavigate();
const [email, setemail] = useState("shivamkashyap9198@gmail.com");
const [password, setpassword] = useState("Alex@9198");


const handleSubmit = async()=>{
    try {
    const res = await axios.post(baseUrl+'/login',{
      email,password},
  {withCredentials:true},
);
 dispatch(addUser(res.data));
 console.log(res.data);
 return navigate("/");

  
  }
  
   catch (error) {
    console.log(error);
  }
}





  return (
    <div className='flex justify-center my-12'>
      <div className="card bg-base-300 w-96 shadow-xl">
    <div className="card-body">
      <h2 className="card-title text-2xl flex justify-center">Login</h2>
      <label className="form-control w-full max-w-xs">
  <div className="label ">
    <span className="label-text">Email</span>
  </div>
  <input type="text" 
  value={email} onChange={(e)=>setemail(e.target.value)}
  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <div className="label mt-2">
    <span className="label-text">Password </span>
  </div>
  <input type="password" 
  value={password} onChange={(e)=>setpassword(e.target.value)}
  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
</label>
      <div className="card-actions justify-end flex justify-center mt-5">
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Login