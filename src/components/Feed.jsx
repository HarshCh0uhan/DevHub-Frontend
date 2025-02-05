import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import UserCard from './Usercard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed)
  
  const getFeed = async () => {
    if(feed) return
    try {
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});

      dispatch(addFeed(res?.data))
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getFeed();
  }, [])

  
  if(!feed || feed.length <= 0) return <h1 className='font-bold text-2xl flex justify-center mt-10'>No User Found</h1>

  return (
   feed && ( <div>
      {feed.map((card) => <UserCard key={card._id} user={card} />
      )}
      {/* <UserCard user={feed[0]}/> */}
    </div>)
  )
}

export default Feed