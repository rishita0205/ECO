import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { UserLogout } from '../redux/userSlice'; // Assuming you have a userLogout action

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user?.token) {
      const fetchProfile = async () => {
        try {
          const { data } = await axios.get('https://server-eco.onrender.com/user/me', {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          });
          setProfileData(data.user);
        } catch (error) {
          console.error('Error fetching profile:', error.response.data.message);
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.get('https://server-eco.onrender.com/user/logout', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      // Clear user data in Redux state upon successful logout
      dispatch(UserLogout());
      // Redirect to the login page or any other page after logout
    } catch (error) {
      console.error('Logout failed:', error.response.data.message);
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profileData.name}</p>
      <p>Email: {profileData.email}</p>
      {/* Add more fields as necessary */}
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
};

export default Profile;
