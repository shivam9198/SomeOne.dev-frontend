import React from 'react'
import { useDispatch } from 'react-redux';
import baseUrl from '../utils/BaseUrl';
import axios from 'axios';
import { removefeed } from '../utils/FeedSlice';

function Card({user}) {
    const {_id ,firstName , lastName , profilePic ,skills, bio, age, gender} = user;
    const dispatch = useDispatch();

    
const handleRequestsent = async(status,_id)=>{
try {
 const res= await  axios.post(baseUrl + "/request/"+ status +"/" +_id,{},{withCredentials:true})
  console.log(res.data);
  dispatch(removefeed(_id))
} catch (error) {
  console.log(error.message); 
}
}

  return (
    <div className="card bg-base-300 w-[25%]  shadow-2xl h-[600px]  ">
    <figure className='w-full min-h-[40vh] '>
      <img  className='w-full h-full object-cover'
        src={user.profilePic}
        alt="user Profile" />
    </figure>
    <div className="card-body  mb-2  ">
      <h2 className="card-title mt-2 mb-2">{firstName + " "+ lastName}</h2>
      {age && gender && <p>{age + " , " + gender}</p>}
   <div className='flex gap-1 mb-1 flex-wrap  ' >
          <strong>Skills:    </strong>
          {skills.length > 0 ? (
            <div className='flex gap-1'>
              {skills.map((skill, index) => (
                <p  key={index}>{skill }</p>
              ))}
            </div>
          ) : (
            <p>No skills added yet.</p>
          )}
        </div>
      <p className='h-[140px] overflow-hidden break-words mt-1'>{bio}</p>

      <div className="card-actions h-full justify-center gap-10 mt-5 mb-2">
        <button className="btn btn-primary " onClick={()=>handleRequestsent("ignored",_id)}>Ignore</button>
        <button className="btn btn-secondary" onClick={()=>handleRequestsent("interested",_id)}>Interested</button>
      </div>
    </div>
  </div>
  )
}

export default Card