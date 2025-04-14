import {BrowserRouter,Routes,Navigate,Route} from "react-router-dom"
import { useState } from 'react';
import SignUp from "./components/SignUp/SignUp.jsx"
import Login from "./components/Login/Login.jsx"
import Home from "./components/Home/Home.jsx"
import Profile from "./components/Profile/Profile.jsx"

function App() {
  const [userData,setUserData] = useState({isAuthenticated:false});
  const handleLogin = (data)=>{
    setUserData({username:data.username,email:data.email,token:data.token,isAuthenticated:true});
  };
  const handleLogout = ()=>{
    setUserData({username: null,
      email: null,
      token: null,
      isAuthenticated:false});
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={userData.isAuthenticated?<Navigate to="/" />:<Login onLogin={handleLogin} />}/>
        <Route path="/signup" exact element={<SignUp  />}/>
        <Route path="/" element={userData.isAuthenticated?<Home username={userData.username} email = {userData.email} handleLogout={handleLogout} />:<Navigate to="/login" />} />
        <Route path="/profile" element ={userData.isAuthenticated?<Profile username={userData.username} email = {userData.email} />:<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
