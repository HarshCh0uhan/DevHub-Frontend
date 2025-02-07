import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import UserCard from './UserCard.jsx';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed)
  
  const getFeed = async () => {
    if (feed && feed.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});

      dispatch(addFeed(res?.data))
    } catch (err) {
      console.error("Error fetching feed:", err?.response?.data || err);
    }    
  }

  useEffect(() => {
    getFeed();
  }, [])

  
  if(!feed || feed.length <= 0) return <h1 className='font-bold text-2xl flex justify-center mt-10'>No User Found</h1>

  return (
    <div className='stack w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl'>
      {feed && ( <div className='flex justify-center items-center px-14 mt-8'>
          {feed.map((card) => <UserCard key={card._id} user={card} />
          )}
        </div>)}
    </div>
  )
}

export default Feed