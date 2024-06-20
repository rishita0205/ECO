import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserLogin } from '../redux/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (password.length < 6) {
      setNotificationMessage('Password must be at least 6 characters long.');
      setShowNotification(true);
      return;
    }
    if (!email) {
      setNotificationMessage('Email is required.');
      setShowNotification(true);
      return;
    }

    try {
      const { data } = await axios.post('https://server-eco.onrender.com/user/login', { email, password });
      const userWithToken = {
        ...data.user,
        token: data.token,
      };
      Cookies.set('token', data.token, { expires: 7 });
      dispatch(UserLogin(userWithToken));
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message);
      setNotificationMessage('Login failed. Please check your credentials.');
      setShowNotification(true);
    }
  };

  // Function to close the notification
  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {showNotification && (
        <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg z-50">
          {notificationMessage}
          <button onClick={closeNotification} className="ml-2 text-white">
            <span className="text-white">&times;</span>
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        <div className="mt-4 text-center w-full max-w-sm">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
