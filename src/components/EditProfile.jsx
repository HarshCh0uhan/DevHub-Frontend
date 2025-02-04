import React, { useState } from 'react'
import UserCard from './Usercard';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender.charAt(0).toUpperCase() + user.gender.slice(1));
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [error, setError] = useState("");
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
        setDropdownOpen(false);
    };

    const saveProfile = async () => {
        setError("")
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {firstName, lastName, age, gender, about, photoUrl}, {withCredentials: true})
            
            dispatch(addUser(res?.data))

            if(res.status == 200) setUpdate(true)

            setTimeout(() => {
                setUpdate(false)
            }, (3000))
        } catch (err) {
            setUpdate("")
            setError(err?.response?.data)
        }
    }
    
    
    return (
        <div className="flex items-center justify-center px-4 md:px-0 my-10">
            <UserCard user={user}/>
            <div className="card bg-neutral text-neutral-content w-full max-w-md p-6 shadow-xl">
                <div className="card-body items-center text-center gap-6">
                    <h2 className="card-title text-lg md:text-2xl">Update Profile</h2>
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <input type="text" className="grow" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <input type="text" className="grow" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <input type="text" className="grow" placeholder="Photo URL" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <input type="text" className="grow" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </label>
                    <div className="dropdown flex items-center w-full">
                    <button type="button" className="btn m-1 w-full" onClick={() => setDropdownOpen(!dropdownOpen)}>{gender || "Select Gender"}</button>
                       {dropdownOpen && (<ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a onClick={() => handleGenderSelect("Male")}>Male</a></li>
                            <li><a onClick={() => handleGenderSelect("Female")}>Female</a></li>
                            <li><a onClick={() => handleGenderSelect("Other")}>Other</a></li>
                        </ul>)}
                    </div>
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <input type="text" className="grow" placeholder="About" value={about} onChange={(e) => setAbout(e.target.value)} />
                    </label>
                    {update && <div className="toast toast-top toast-center">
                        <div className="alert alert-success">
                            <span>Updated Successfully.</span>
                        </div>
                    </div>}
                    {error && <p className='text-error'>{error}</p>}
                        <button className="btn btn-primary w-full" onClick={saveProfile} >Update</button>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;