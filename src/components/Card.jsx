import React from 'react'
import { useDispatch } from 'react-redux';

function Card({user}) {
    const {firstName , lastName , profilePic ,skills, bio, age, gender} = user;
    const dispatch = useDispatch();
  return (
    <div className="card bg-base-300 w-[25%] h-full shadow-2xl  ">
    <figure className='w-full h-[50%] '>
      <img  className='w-full h-full object-cover'
        src={user.profilePic}
        alt="user Profile" />
    </figure>
    <div className="card-body mb-5 ">
      <h2 className="card-title mt-2 mb-5">{firstName + " "+ lastName}</h2>
      {age && gender && <p>{age + " , " + gender}</p>}
   <div className='flex gap-1 mb-2 flex-wrap' >
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

      
      <p>{bio}</p>
      <div className="card-actions justify-center gap-10 mt-3 ">
        <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>
      </div>
    </div>
  </div>
  )
}

export default Card