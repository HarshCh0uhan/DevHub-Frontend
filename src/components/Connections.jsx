import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection)

    console.log(connections);
    

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {withCredentials: true})

            console.log(res?.data);

            dispatch(addConnection(res?.data));
            
        } catch (err) {
            setError(err?.response?.data)
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if(!connections || connections.length == 0) return <h1 className='font-bold text-2xl'>No Connections Found</h1>

  return (
    <div className='text-center items-start mt-5'>
        <h1 className='font-bold text-2xl'>Connections</h1>
        {connections.map((connection) => {
            const { firstName, lastName, age, gender, about, photoUrl, _id } = connection;
            return (
                <div key={_id} className="card bg-base-100 shadow-xl max-w-md mx-auto mt-10 flex flex-col md:flex-row transition-transform transform hover:scale-105">
                    <figure className="h-48 w-full md:w-48">
                        <img
                        src={photoUrl}
                        alt="Image"
                        className="h-full w-full object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                        />
                    </figure>
                    <div className="card-body p-4 text-start">
                        <h2 className="card-title text-base md:text-lg">{firstName + " " + lastName}</h2>
                        <p className="text-sm md:text-base">{about}</p>
                        {/* <p className="text-sm md:text-base text-start">{gender.charAt(0).toUpperCase() + gender.slice(1)}</p> */}
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary btn-sm md:btn-md">Drop</button>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Connections;