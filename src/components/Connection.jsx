import React, { useEffect } from 'react'
import baseUrl from '../utils/BaseUrl'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/ConnectionSlice';

function Connection() {
    const dispatch = useDispatch();
   const userConnections = useSelector((store)=>store.connections);
    const getConnections =async()=>{
        if(userConnections!==null) return;
     try {
           const res =  await axios.get(baseUrl+"/user/connections",{withCredentials:true});
           console.log(res.data.data)
           dispatch((addConnection(res.data.data)))
        } catch (error) {
            console.log(error);
        }
        
    }


useEffect(()=>{
    getConnections();
},[])
if(!userConnections) return;
  return (
  <div className='w-full h-screen flex-col justify-items-center overflow-hidden '>
<h1 className='font-bold text-3xl text-center underline mb-8'> My Connections</h1>

{userConnections.map((connection)=>{
    const{firstName ,lastName, age, gender,bio, _id, profilePic }= connection
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

export default Connection