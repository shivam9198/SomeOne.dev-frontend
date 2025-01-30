import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import baseUrl from '../utils/BaseUrl'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/UserSlice'

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData  = useSelector((store)=>store.user); //yha pe ye cheak krega ki userdata useslice me h ya nhi kyuki refersh hone me redux reset hota h

    const fetchUser =  async()=>{
      if(userData) return; // if user data  is already present in the store userSlice then no need to fetch the user again

      try {
        const res = await axios.get(baseUrl+ "/profile",{
          withCredentials: true,
        })
        dispatch(addUser(res.data));
       
    
      }
       catch (error) {
        if(error.status==401){
          navigate("/login");
        }
         console.log(error.message);
      }}
      
     
  
  useEffect(()=>{
      fetchUser();  // this function will be called when the component is first rendered or when userProfile is updated.
   },[]);


  return (
   <>
   <Navbar/>
   <Outlet/>

   </>
  )
}

export default Body

// outlet is used to render the child components of the parent component