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

  return (
   feed && ( <div>
      {/* {feed.map((card) => {
        <UserCard key={card._id} user={card} />
      })} */}
      <UserCard user={feed[1]}/>
    </div>)
  )
}

export default Feed