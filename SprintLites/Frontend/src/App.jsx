import { UseUser } from '../Context/userContext';
import Issues from '../Page/Issues';
import Login from '../Page/Login'
import MemberLayout from '../Page/memberLayout';
import Projects from '../Page/Project';
import Register from '../Page/Register'
import Setting from '../Page/Setting';
import Sprints from '../Page/Sprints';
import './App.css';
import {  Routes, Route, Navigate } from 'react-router-dom';
function App() {
  let{user}=UseUser();
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/> 
        <Route path='/' element={user?<MemberLayout/>:<Navigate to={"/login"}/>}>
            <Route index element={<Projects/>}/>
           <Route path='sprints' element={<Sprints/>}/>
           <Route path='issues' element={<Issues/>}/>
           <Route path='setting' element={<Setting/>}/>
        </Route>
      </Routes>    
    </div>
  )
}

export default App
