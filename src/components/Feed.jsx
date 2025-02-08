import React, { useEffect } from 'react'
import baseUrl from '../utils/BaseUrl'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addfeed } from '../utils/FeedSlice';
import Card from './Card';


function Feed() {
  const dispatch = useDispatch(); 
   const userFeed = useSelector((store)=>store.feed);
  // this will print the user feed data from the store if it exists, else it will be undefined.
  
    const fetchFeed = async()=>{
      if(userFeed) return;
      try {
        const res = await axios.get(baseUrl + "/feed", {withCredentials : true});
         // if data exists in store then it will not fetch again.  else fetch the data from the server and store it in the store.  // if the user is not authenticated then it will throw an error and we will catch it in the catch block.  // If there is an error then it will log the error message.
        dispatch(addfeed(res.data));
     }
     catch (error) {
        console.log(error.message);
      }
    }





useEffect(()=>{
  fetchFeed();
},[]);


if (!userFeed) return;

  if (userFeed.length <= 0)
    return <h1 className="font-bold text-3xl text-center my-10">No new users found!</h1>;

  return (
     userFeed  &&  (<div className='flex justify-center'><Card user ={userFeed[0]}/>
    </div>
    )
   
  )
}

export default Feed