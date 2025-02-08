import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection, removeConnection } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connections = () => {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection)

    // console.log(connections);

    const dropUser = async (status, _id) => {
        try {

            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {withCredentials:true})
            // console.log(res?.data);
            dispatch(removeConnection(_id))
            
        } catch (err) {
            setError(err?.response?.data)
        }
    }
    

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {withCredentials: true})

            // console.log(res?.data);

            dispatch(addConnection(res?.data));
            
        } catch (err) {
            setError(err?.response?.data)
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if(!connections || connections.length == 0) return <h1 className='font-bold text-2xl flex justify-center mt-10'>No Connections Found</h1>

  return (
    <div className='container mx-auto px-4 pb-20'>
      <div className='text-center mt-8 mb-6'>
        <h1 className='font-bold text-2xl'>Connections</h1>
      </div>
      
      <div className="flex flex-col gap-6">
        {connections.map((connection) => {
          const { firstName, lastName, about, photoUrl, _id } = connection;
          return (
            <div 
              key={_id} 
              className="card bg-base-100 shadow-xl mx-auto w-full max-w-2xl flex flex-col md:flex-row transition-transform transform hover:scale-105"
            >
              <div className="w-full md:w-56 h-56 md:h-full flex-shrink-0">
                <img
                  src={photoUrl}
                  alt={`${firstName}'s profile`}
                  className="w-full h-full object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                />
              </div>
              
              <div className="card-body p-6 flex flex-col justify-between">
                <div>
                  <h2 className="card-title text-lg md:text-xl mb-2">
                    {firstName + " " + lastName}
                  </h2>
                  <p className="text-sm md:text-base line-clamp-3">
                    {about}
                  </p>
                </div>
                
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary" onClick={() => dropUser("reject", _id)}>
                    Drop
                  </button>
                  <Link to={"/chat/" + _id}>
                    <button className="btn btn-primary">
                        Chat
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Connections;