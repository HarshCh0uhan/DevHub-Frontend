import React from 'react';

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;

  return (
    <div className="flex justify-center my-10 px-4">
      <div className="card bg-neutral w-full max-w-xs md:w-64 md:h-min rounded-lg transition-transform transform hover:scale-105">
        <figure className="w-full">
          {photoUrl && <img
            className="w-full object-cover"
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
          <div className="card-actions flex flex-col md:flex-row justify-center md:justify-end mt-4 gap-2">
            <button className="btn btn-primary w-full md:w-auto">
              Connect
            </button>
            <button className="btn btn-outline w-full md:w-auto">
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
