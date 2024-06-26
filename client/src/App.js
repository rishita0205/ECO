import './App.css'
import { Outlet,Navigate,Route,Routes,useLocation,useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Home,Product,Login,ResetPassword,Profile,Register,WaterCalculator,Cart} from './pages';
function Layout(){
    const user = useSelector((state) => state.user.user); 
    console.log(user)
    const location=useLocation()
    return user?.token ?(
        <Outlet/>
    ):(
        <Navigate to='/login' state={{from:location}} replace/>
    )
}

function App() {
    return (
      
       <div className='w-full min-h-[100vh]'>
       <Routes>
       <Route element={<Layout/>}>
         <Route path='/profile' element={<Profile />}/>
         <Route path='/cart' element={<Cart  />}/>
       </Route>
       
       <Route path='/'element={<Home />}/>
       <Route path='/product/:id' element={<ProductWrapper />}/>
       <Route path='/login'element={<Login />}/>
       <Route path='/register'element={<Register />}/>
       <Route path='/reset-password' element={<ResetPassword />}/>
       <Route path='/water-calculator' element={<WaterCalculator/>}/>
       </Routes>
       </div>
    
      
    );
  }
  const ProductWrapper = () => {
    // Your logic for extracting the `id` parameter from the URL
    const { id } = useParams();
    return <Product id={id} />;
  }
  
  export default App;