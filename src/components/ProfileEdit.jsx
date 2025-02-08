import React, { useState } from 'react'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'
import baseUrl from '../utils/BaseUrl';
import axios from 'axios';
import { addUser } from '../utils/UserSlice';

function Profile({user}) {
  const dispatch = useDispatch();
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [profilePic, setprofilePic] = useState(user.profilePic);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [skills, setskills] = useState(user.skills || []);
  const [bio, setbio] = useState(user.bio);
  const [error, seterror] = useState("")
 

  



 
 const saveProfile = async()=>{
  seterror("");
  try {
   const res = axios.patch(baseUrl+ "/profileedit",{
    firstName,
    lastName,
    profilePic,
    age,
    gender,
    skills,
    bio },{withCredentials:true} )
    dispatch(addUser(res.data));
  } catch (err) {
    seterror(err.response.data)
  }
 }
 const handleSkillsChange = (e) => {
  if (e.key === "Enter" && e.target.value.trim() !== "") {
    e.preventDefault();
    const newSkill = e.target.value.trim();
    setskills((prevSkills) => {
      const updatedSkills = [...prevSkills, newSkill];
      console.log("Updated Skills:", updatedSkills);
      return updatedSkills;
    });
    e.target.value = ""; // Clear input field
  }
};
const removeSkill = (skillToRemove) => {
  setskills((prevSkills) => prevSkills.filter((skill) => skill !== skillToRemove));
};

  return (
    <div className=' w-full  max-h-[100vh] flex justify-center justify-around '>
    <div className="card bg-base-300 w-38  overflow-y-auto shadow-xl o"> 
    <div className="card-body mx-h-40  overflow-y-auto">
      <h2 className="card-title flex justify-center font-semibold my-">Profile Edit</h2>
      <div className='flex gap-5'>
      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">First Name</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
  value={firstName} 
  onChange={(e) => setfirstName(e.target.value)}
  />

</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> Last Name</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
  value={lastName}
  onChange={(e) => setLastName(e.target.value)} />
  
</label>
</div>
<label className="form-control w-[100%] ">
  <div className="label">
    <span className="label-text">Photo url</span>
  </div>
  <input type="url" placeholder="Type here" className="input input-bordered w-100 " 
  value={profilePic} 
  onChange={(e) => setprofilePic(e.target.value)}/>
</label>
<div className='flex gap-5'>
      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Age</span>
  </div>
  <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs " 
  value={age}
  onChange={(e) => {
    const newValue = Math.max(0, Number(e.target.value)); // Prevent negatives
    setAge(newValue);
  }}/>
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> Gender</span>
  </div>
  <select className="select select-bordered w-full max-w-xs"
  value={gender}
  onChange={(e) => setGender(e.target.value)}
 >
    <option value="" disabled>Choose gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="other">Other</option>
  </select>
</label>
</div>
<label className="form-control w-[100%] ">
  <div className="label">
    <span className="label-text">Skills</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-100 "
   onKeyDown={handleSkillsChange} />
</label>
<div className="flex flex-wrap gap-2 mb-4">
  {skills.map((skill, index) => (
    <div key={index} className="badge badge-primary gap-2">
      {skill}
      <button
        onClick={() => removeSkill(skill)}
        className="btn btn-xs btn-circle btn-ghost"
      >
        ✕
      </button>
    </div>
  ))}
</div>
<label className="form-control">
  <div className="label">
    <span className="label-text">Your bio</span>
  </div>
  <textarea className="textarea textarea-bordered h-24" placeholder="Bio"
  value={bio}
  onChange={(e) => {
    if (e.target.value.length <= 100) {
      setbio(e.target.value);
    }
  }}
></textarea>
<p className="text-gray-500">{bio.length}/100 characters</p>
{bio.length >= 100 && <p className="text-red-500 font-bold">You cannot add more than 100 characters!</p>}
</label>
<p className="text-red-500">{error}</p>

<div className='flex justify-center mt-2'>
<button className="btn btn-secondary " onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
</div>

<Card className="max-h[50vh]" user ={{ firstName , lastName , profilePic ,skills, bio, age, gender }}/>
</div>




  )
}

export default Profile