import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addRequest, removeRequest } from '../utils/requestSlice';
import { useSelector, useDispatch } from 'react-redux';
import { removeConnection } from '../utils/connectionSlice';

const Request = () => {
    const  dispatch = useDispatch();
    const requests = useSelector((store) => store.request)
    
    console.log(requests);

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {withCredentials: true})
    
            console.log(res?.data);

            // if(status == "accept") 
                dispatch(removeRequest(_id))
        } catch (err) {
            setError(err?.response?.data)
        }
    }

    const getRequest = async () => {
        const res = await axios.get(BASE_URL + "/user/request/received", {withCredentials: true})

        console.log(res?.data);

        dispatch(addRequest(res?.data))
    }

    useEffect(() => {
        getRequest()
    }, [])

    if(!requests || requests.length == 0) return <h1 className='font-bold text-2xl flex justify-center mt-10'>No Request Found</h1>

  return (
    <div className='text-center items-start mt-5'>
        <h1 className='font-bold text-2xl'>Request</h1>
        {requests.map((request) => {
            const { firstName, lastName, age, gender, about, photoUrl, _id } = request.fromUserId;
            return (
                <div key={_id} className="card bg-base-100 shadow-xl max-w-md mx-auto mt-10 flex flex-col md:flex-row transition-transform transform hover:scale-105">
                    <figure className="h-48 w-full md:w-48">
                        <img
                        src={photoUrl}
                        alt="Image"
                        className="h-full w-full object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                        />
                    </figure>
                    <div className="card-body p-4">
                        <h2 className="card-title text-base md:text-lg">{firstName + " " + lastName}</h2>
                        <p className="text-sm md:text-base text-start">{about}</p>
                        <div className="card-actions flex flex-col md:flex-row justify-center md:justify-end mt-4 gap-2">
                            <button className="btn btn-primary w-full md:w-auto" onClick={() => reviewRequest("accept", request._id)}>
                            Accept
                            </button>
                            <button className="btn btn-outline w-full md:w-auto" onClick={() => reviewRequest("reject", request._id)}>
                            Refuse
                            </button>
                        </div>
                    </div>
                    
                </div>
            )
        })}
    </div>
  )
}

export default Request