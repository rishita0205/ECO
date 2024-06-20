import React from 'react'
import { Link } from 'react-router-dom';
import { logo } from "../assets";
import { useForm } from 'react-hook-form';
import {  useSelector } from 'react-redux';
import TextInput from './TextInput';
import CustomButton from './CustomButton';
import {  FaShoppingCart } from 'react-icons/fa';
import { IoLogOut } from "react-icons/io5";
import Cookies from 'js-cookie';
import { UserLogout } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { CiLogin } from "react-icons/ci";
const Navbar = () => {
    const { user } = useSelector(state => state.user || {});
    const dispatch = useDispatch();

    const handleSearch = async (data) => {
        console.log(data);
    };

    const handleLogin = () => {
        // Programmatic navigation to the login page
        window.location.href = '/login';
    };
    
    const handleLogout = async () => {
        try {
            const response = await fetch('https://server-eco.onrender.com/user/logout', {
                method: 'GET',
            });
            console.log(response);
            if (response.ok) {
                Cookies.remove('token'); // Remove the token from cookies
                dispatch(UserLogout());
                window.location.href = '/login'; // Redirect to home or login page
            } else {
                console.error('Logout failed.');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div className="flex flex-col space-y-4">
            <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4">
                <Link to='/' className='flex gap-2 items-center'>
                    <div className='p-1 md:p-2 rounded'>
                        <img src={logo} alt="Logo" className="w-35 h-12 mr-20 ml-15" />
                    </div>
                </Link>

      
                {user ? (
                    <React.Fragment>
                        <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
                            <button onClick={handleLogout} className=" text-black px-4 py-1 rounded-md">
                            <IoLogOut className="text-gray-700 cursor-pointer text-2xl hover:text-blue-400 transition-colors duration-300 mr-0" />
                            </button>
                            <a href={`/cart`}>
                            <FaShoppingCart className="text-gray-700 cursor-pointer text-2xl hover:text-blue-400 ml-0 transition-colors duration-300 mr-3" />
                            </a>
                        </div>
                    </React.Fragment>
                ) : (
                 <button onClick={handleLogin} className="inline-flex items-center bg-base-blue text-white px-6 py-2.5 mt-2 ml-2 rounded-full">Login <CiLogin/></button>
                )}
            </div>

            <div className="shadow-sm">
                <div className="mb-2">
                    <div className='bg-gradient-to-r flex items-center justify-center from-sky-300 to-indigo-600 w-full h-[40px]'>
                        <a href="/water-calculator" className='text-white'>Try our Water Calculator here!!!</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
