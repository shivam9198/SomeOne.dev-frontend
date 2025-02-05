import React, { useEffect } from 'react'
import baseUrl from '../utils/BaseUrl';
import axios from 'axios';
import { addRequest } from '../utils/RequestSlice';
import { useDispatch, useSelector } from 'react-redux';


function Request() {
  const requestRecived = useSelector((store)=>store.request)
  const dispatch = useDispatch();
  const userRequest = async()=>{
try {
  const res  = await axios.get(baseUrl +'/user/request/recived',{withCredentials : true});
  dispatch((addRequest(res.data)));
} catch (error) {
  console.log(error);
}
  }


  useEffect(()=>{
    userRequest();
  },[])
  if(!requestRecived) return;
  if (requestRecived.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className='w-full h-screen flex-col justify-items-center overflow-hidden '>
    <h1 className='font-bold text-3xl text-center underline mb-8'> Friend Request</h1>
    
    {requestRecived.map((request)=>{
        const{firstName ,lastName, age, gender,bio, _id, profilePic }= request.fromuserId;
        return(
            <div key={_id} className='w-1/2 h-25 bg-base-300 m-5 rounded-lg  flex items-center gap-3'>
                <img className='w-20 h-20  rounded-full object-cover block' src={profilePic}/>
                <div className='text-left mx-4 '>
                <h1 className='text-1xl font-semibold text-white '>{firstName+ " " + lastName}</h1>
               {age && gender  && <p className='text-white'>{age +" "+ gender }</p>} 
               {bio && <p className='text-white'>{bio}</p>}
                </div>
                
    
            </div>
        )
    })}
    </div>
  )
}

export default Request