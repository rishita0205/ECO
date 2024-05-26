import React from 'react'
import { Link } from 'react-router-dom';
import { logo } from "../assets";
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import TextInput from './TextInput';
import CustomButton from './CustomButton';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
const Navbar = () => {
    const handleSearch = async(data) => {
        console.log(data)
      }
      

      const handleLogin = () => {
        // Programmatic navigation to the login page
        window.location.href = '/login';
    }
      const {register, handleSubmit, formState:{errors}} = useForm();
      const { user } = useSelector(state => state.user || {});
      return (
        
        <div class="flex flex-col space-y-4 ">
  

        
        <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 ">
        <Link to='/' className='flex gap-2 items-center'>
            <div className='p-1 md:p-2  rounded '>
            <img src={logo} alt="Logo" className=" w-35 h-12 mr-20 ml-15" />
            </div>
        </Link>

        <form className='hidden md:flex items-center justify-center ' onSubmit={handleSubmit(handleSearch)}>
            <TextInput placeholder='Search...' styles='w-[18rem]  lg:w-[38rem] rounded-full py-3 ' register={register('search')}/>
            <CustomButton title='Search' type='submit' containerStyles='bg-base-blue text-white px-6 py-2.5 mt-2 ml-2 rounded-full'/>
        </form>

                {user ? (
                    <React.Fragment>
                        <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl ">
                       
                        <FaUser className="text-gray-700 cursor-pointer text-2xl  hover:text-blue-400  transition-colors duration-300 mr-0 " />
                        
                        <FaShoppingCart className="text-gray-700 cursor-pointer text-2xl hover:text-blue-400 ml-0 transition-colors duration-300 mr-3" />
                        </div>
                    </React.Fragment>
                ) : (
                    <button onClick={handleLogin} className="bg-blue-500 text-black px-4 py-1 rounded-md">Login</button>
                )}

        </div  >
        <div className="shadow-sm ">
        <div className="grid grid-flow-col  mb-2 justify-stretch ... pl-5 pr-5">
        <div className="text-center">HEADING </div>
        <div className="text-center">HEADING</div>
        <div className="text-center">HEADING</div>
        
        </div>
        </div>
        
       </div>
        
    );
}

export default Navbar