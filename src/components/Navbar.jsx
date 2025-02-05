import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../utils/BaseUrl';
import { removeUser } from '../utils/UserSlice';


function Navbar() {
const user = useSelector((store)=>store.user); // this is used to get the user from the store basically reading thte sate data from the store
const dispatch  =  useDispatch();
const navigate =  useNavigate();
const handleLogout = async()=>{
  try {
    await axios.post(baseUrl+ "/logout",{},{
      withCredentials: true,
    })
  dispatch(removeUser());
  navigate("/login");
  } catch (error) {
    console.log(error.message);
  }
}

  return (
    <div className="navbar bg-base-300 mb-5 ">
    <div className="flex-1">
      <Link to ="/" className="btn btn-ghost text-xl">SomeOne.DEV</Link>
    </div>
    {user && (
      <div className="flex-none gap-2"> welcome {user.firstName}
      <div className="dropdown dropdown-end mx-5 ">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
         
         <div className="w-10 rounded-full"> 
           <div className="form-control"></div>

            <img
              alt= "profile"
              src={user.profilePic
                } />
          </div> 
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link to ="/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li><Link to ="/request">Requests</Link></li>
          <li><Link to ="/connections">Connections</Link></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </div>)}
  </div>
  )
}

export default Navbar