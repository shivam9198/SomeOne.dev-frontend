import React, { useEffect } from 'react'
import baseUrl from '../utils/BaseUrl';
import axios from 'axios';
import { addRequest , removeRequest} from '../utils/RequestSlice';
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
const reviewRequest = (state,_id)=>{
  try {
    const res = axios.post(baseUrl + "/request/review/"+ state + "/" + _id , {},{withCredentials:true});
     dispatch((removeRequest(_id)));
  } catch (error) {
    console.log(error);
  }
}

  useEffect(()=>{
    userRequest();
  },[])
  if(!requestRecived) return;
  if (requestRecived.length === 0)
    return <h1 className="font-bold text-3xl text-center my-10 pt-20"> No Requests Found</h1>;

  return (
    <div className='w-full h-screen flex-col justify-items-center overflow-hidden pt-20   overflow-y-auto '>
    <h1 className='font-bold text-3xl text-center underline mb-12 '> Friend Request</h1>
    
    {requestRecived.map((request)=>{
        const{firstName ,lastName, age, gender,bio, _id, profilePic }= request.fromuserId;
        return(
          <div key={_id} className='w-1/2 h-25 bg-base-300 m-5 rounded-2xl  flex items-center justify-between  mb-5 '>
              
              <div className="flex items-center gap-x-8">
             <img className="w-20 h-20 rounded-full object-cover overflow-hidden" src={profilePic} alt="Profile" />
             <div>
              <h1 className='text-1xl font-semibold text-white '>{firstName+ " " + lastName}</h1>
             {age && gender  && <p className='text-white'>{age +" "+ gender }</p>} 
             {bio && <p className='text-white'>{bio}</p>}
              </div>
              </div>
              <div>
              <button className="btn btn-secondary mx-3" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
             <button className="btn btn-primary mx-3 " onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
             </div>
              
  
          </div>
      )
    })}

    </div>
  )
}

export default Request