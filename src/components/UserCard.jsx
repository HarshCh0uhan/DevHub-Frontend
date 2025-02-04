import React from 'react';

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, skills, about, photoUrl } = user;

  return (
    <div className="flex justify-center my-10 px-4 hover:scale-100">
      <div className="card bg-neutral w-11/12 md:w-80 md:h-min shadow-2xl rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <figure className="w-full">
          {photoUrl && <img
            className="w-full h-auto object-cover"
            src={photoUrl}
            alt={`${firstName}'s profile`}
          />}
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lg md:text-xl font-bold">
            {firstName + ' ' + lastName}
          </h2>
          <p className="text-sm md:text-base">{age + " " + gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
          {about && <p className="text-sm md:text-base">{about}</p>}
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary w-full md:w-auto">
              Connect
            </button>
            <button className="btn btn-neutral w-full md:w-auto">
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
