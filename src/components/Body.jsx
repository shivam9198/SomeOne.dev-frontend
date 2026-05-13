import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import baseUrl from '../utils/BaseUrl'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/UserSlice'

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === "/login";
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
 {!isAuthPage && <Navbar/>}
   <Outlet/>

   </>
  )
}

export default Body

// outlet is used to render the child components of the parent component




//   <div className=" bg-blue-300  w-[25%] md:width-[90%]   shadow-2xl h-[600px]  ">
  //   <figure className='w-full min-h-[40vh] '>
  //     <img  className='w-full h-full object-cover'
  //       src={user.profilePic}
  //       alt="user Profile" />
  //   </figure>
  //   <div className="card-body  mb-2  ">
  //     <h2 className="card-title mt-2 mb-2">{firstName + " "+ lastName}</h2>
  //     {age && gender && <p>{age + " , " + gender}</p>}
  //  <div className='flex gap-1 mb-1 flex-wrap  ' >
  //         <strong>Skills:    </strong>
  //         {skills.length > 0 ? (
  //           <div className='flex gap-1'>
  //             {skills.map((skill, index) => (
  //               <p  key={index}>{skill }</p>
  //             ))}
  //           </div>
  //         ) : (
  //           <p>No skills added yet.</p>
  //         )}
  //       </div>
  //     <p className='h-[140px] overflow-hidden break-words mt-1'>{bio}</p>

  //     <div className="card-actions h-full justify-center gap-10 mt-5 mb-2">
  //       <button className="btn btn-primary " onClick={()=>handleRequestsent("ignored",_id)}>Ignore</button>
  //       <button className="btn btn-secondary" onClick={()=>handleRequestsent("interested",_id)}>Interested</button>
  //     </div>
  //   </div>
  // </div>
