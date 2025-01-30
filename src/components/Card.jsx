import React from 'react'

function Card({user}) {
    const {firstName , lastName , profilePic ,skills, bio, age, gender} = user;
  return (
    <div className="card bg-base-300 w-96 shadow-2xl">
    <figure>
      <img
        src={user.profilePic}
        alt="user Profile" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName + " "+ lastName}</h2>
      {age && gender && <p>{age + " , " + gender}</p>}
      <p>{bio}</p>
      <div className="card-actions justify-center gap-10 mt-3">
        <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>
      </div>
    </div>
  </div>
  )
}

export default Card