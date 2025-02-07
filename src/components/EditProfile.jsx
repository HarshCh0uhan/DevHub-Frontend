import React, { useState } from 'react'
import UserCard from './UserCard';
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
        <div className="flex flex-col md:flex-row items-center justify-center px-2 md:px-0 my-6 gap-4">
      <UserCard user={user} />
      <div className="card bg-neutral text-neutral-content w-full max-w-sm p-4 shadow-xl">
        <div className="card-body text-center gap-4 items-center">
          <h2 className="card-title text-lg md:text-xl">Update Profile</h2>

          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <div className="relative w-full">
            <button
              type="button"
              className="btn w-full"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {gender || "Select Gender"}
            </button>
            {dropdownOpen && (
              <ul className="absolute z-10 bg-base-100 rounded-box w-full p-2 shadow-md mt-2">
                <li><a onClick={() => handleGenderSelect("Male")}>Male</a></li>
                <li><a onClick={() => handleGenderSelect("Female")}>Female</a></li>
                <li><a onClick={() => handleGenderSelect("Other")}>Other</a></li>
              </ul>
            )}
          </div>

          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          {update && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-success bg-primary">
                <span>Updated Successfully !!!</span>
              </div>
            </div>
          )}

          {error && <p className='text-error'>{error}</p>}

          <button className="btn btn-primary w-full" onClick={saveProfile}>
            Update
          </button>
        </div>
      </div>
    </div>
    );
}

export default EditProfile;