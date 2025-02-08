import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addRequest, removeRequest } from '../utils/requestSlice';
import { useSelector, useDispatch } from 'react-redux';

const Request = () => {
    const  dispatch = useDispatch();
    const requests = useSelector((store) => store.request)
    
    // console.log(requests);

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {withCredentials: true})
    
            // console.log(res?.data);

                dispatch(removeRequest(_id))
        } catch (err) {
            setError(err?.response?.data)
        }
    }
    
    const getRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/request/received", {withCredentials: true})
    
            // console.log(res?.data);
    
            dispatch(addRequest(res?.data))
        } catch (err) {
            setError(err?.response?.data)
        }
    }

    useEffect(() => {
        getRequest()
    }, [])

    if(!requests || requests.length == 0) return <h1 className='font-bold text-2xl flex justify-center mt-10'>No Request Found</h1>

  return (
    <div className='container mx-auto px-4 pb-20'>
      <div className='text-center mt-8 mb-6'>
        <h1 className='font-bold text-2xl'>Request</h1>
      </div>
      
      <div className="flex flex-col items-center gap-8">
        {requests.map((request) => {
          const { firstName, lastName, age, gender, photoUrl, _id } = request?.fromUserId;
          return (
            <div 
              key={_id} 
              className="flex flex-col items-center max-w-xs w-full"
            >
              <div className="w-64 h-80 mb-4"> 
                <img
                  src={photoUrl}
                  alt={`${firstName}'s profile`}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
              
              <div className="text-center w-full">
                <h2 className="text-xl font-semibold mb-1">
                  {firstName + " " + lastName}
                </h2>
                <p className="text-base text-gray-400 mb-4">
                  {age + " " + gender.charAt(0).toUpperCase() + gender.slice(1)}
                </p>
                
                <div className="flex justify-center gap-3">
                  <button 
                    className="btn btn-primary"
                    onClick={() => reviewRequest("accept", _id)}
                  >
                    Accept
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={() => reviewRequest("reject", _id)}
                  >
                    Refuse
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Request