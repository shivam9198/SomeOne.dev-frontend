import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../utils/BaseUrl';
import backgroundImage from '../assest/background.jpg';

function Login() {
const dispatch =   useDispatch(); // now we are dispatching the login action
const navigate = useNavigate();
const [email, setemail] = useState("");
const [password, setpassword] = useState("");
const [errormessage, seterrormessage] = useState("")
const [isLoginForm, setisLoginForm] = useState(true);
const [firstName, setfirstName] = useState("");
const [lastName, setlastName] = useState("");


const handleSubmit = async()=>{
    try {
    const res = await axios.post(baseUrl+'/login',{
      email,password},
  {withCredentials:true},
);
 dispatch(addUser(res.data)); // now we are dispatching the login action
   // now we are navigating to the home page after successful login
 return navigate("/");
}
   catch (error) {
  seterrormessage(error.response.data ||"Something went wrong!");
  
  }
}

const handlesignup = async()=>{
  try {
 const res = await axios.post(baseUrl +'/signup',{firstName,lastName,email,password},{withCredentials:true})
 console.log(res.data);
 dispatch(addUser(res.data));
 navigate("/");
  } catch (error) {
    console.log(error.response.data||"Something went wrong!");
  }
}


  return (
    
    <div className='flex justify-center items-center min-h-screen bg-cover bg-center'
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="card bg-gray-900 text-white rounded-xl mt-6 w-96 shadow-lg">
    <div className="card-body">
      <h2 className="card-title text-2xl flex justify-center">{ isLoginForm ? "Login" : "Sign Up"}</h2>
   {(!isLoginForm &&  
    <>
    <label className="form-control w-full max-w-xs">
  <div className="label ">
    <span className="label-text">firstName</span>
  </div>
  <input type="text" 
  value={firstName} onChange={(e)=>setfirstName(e.target.value)}
  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <div className="label mt-2">
    <span className="label-text">LastName </span>
  </div>
  <input type="text" 
  value={lastName} onChange={(e)=>setlastName(e.target.value)}
  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
</label>
</>
)}

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
<p className='text-red-500 text-sm'>{errormessage} </p>
      <div className="card-actions justify-end flex justify-center mt-5">
        <button className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg" onClick={isLoginForm? handleSubmit : handlesignup}>{!isLoginForm? "Signup":"Login"}</button>
      </div>
      <p
            className="m-auto cursor-pointer py-2 hover:text-white"
            onClick={() => setisLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
    </div>
  </div>
  </div>
  )
}

export default Login