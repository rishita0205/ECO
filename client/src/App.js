import './App.css'
import { Outlet,Navigate,Route,Routes,useLocation} from 'react-router-dom';

import {Home,Cart,Login,ResetPassword,Profile,Register} from './pages';
function Layout(){
    const user=null;
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
       <Route elements={<Layout/>}>
         <Route path='/profile/:id?' element={<Profile/>}/>
         <Route path='/cart/:id?' element={<Cart/>} />
       </Route>
       
       <Route path='/'element={<Home />}/>
       <Route path='/login'element={<Login />}/>
       <Route path='/register'element={<Register />}/>
       <Route path='/reset-password' element={<ResetPassword />}/>
       </Routes>
       </div>
    
      
    );
  }
  
  export default App;