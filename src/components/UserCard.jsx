import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl, _id } = user;
  const dispatch = useDispatch();
  const [error, setError] = React.useState(null);


const fetchSendConnection = async (status, _id) => {
  try {
    const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, {withCredentials:true})
    // console.log(res?.data);
    dispatch(removeUserFeed(_id))
  } catch (err) {
    setError(err?.response?.data)
  }
} 

  return (
    <div className="flex justify-center my-10 px-4">
      <div className="card bg-neutral w-full max-w-xs md:w-64 rounded-lg transition-transform transform hover:scale-105">
        <figure className="relative w-full h-64">
          {photoUrl && (
            <img 
              className="w-full h-full object-cover rounded-t-lg"
              src={photoUrl} 
              alt={`${firstName}'s profile`}
            />
          )}
        </figure>
        
        <div className="card-body p-4">
          <h2 className="card-title text-lg md:text-xl font-bold truncate">
            {firstName + ' ' + lastName}
          </h2>
          
          <p className="text-sm md:text-base">
            {age + " " + gender.charAt(0).toUpperCase() + gender.slice(1)}
          </p>
          
          {about && (
            <p className="text-sm md:text-base line-clamp-2">
              {about}
            </p>
          )}
          
          <div className="card-actions flex flex-col md:flex-row justify-center md:justify-end mt-4 gap-2">
            <button 
              className="btn btn-primary w-full md:w-auto"
              onClick={() => fetchSendConnection("interested", _id)}
            >
              Connect
            </button>
            
            <button 
              className="btn btn-outline w-full md:w-auto"
              onClick={() => fetchSendConnection("ignore", _id)}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
