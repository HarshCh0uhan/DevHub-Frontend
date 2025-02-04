import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removerUser } from '../utils/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const NavBar = () => {

  const user = useSelector(store => store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, {withCredentials: true})
      dispatch(removerUser())
      return navigate("/login")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <nav className="navbar bg-neutral px-4 md:px-8 lg:px-12 xl:px-16">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl md:text-2xl">DevHub</Link>
      </div>
      {user && <div className="flex-none gap-2">
        <div className='form-control font-semibold' >Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 md:w-12 rounded-full">
                <img
                  alt="User Avatar"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-base-100 rounded-box z-[1]">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/request">Request</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
      </div>}
    </nav>
  );
};

export default NavBar;
