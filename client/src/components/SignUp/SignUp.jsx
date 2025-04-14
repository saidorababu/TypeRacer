/* eslint-disable no-unused-vars */
import React from "react";
import { useState, setUserData } from "react";
import {useNavigate} from 'react-router-dom'
import './SignUp.css'
const initialState = {
    username:'',
    email:'',
    password:'',
    dateofbirth:'',
    gender:'',
    place:''
}

function SignUp(){
    const [userData, setUserData] = useState(initialState);
    const [formErrors,setFormErrors] =useState({errorUserName:'',errorEmail:'',errorPassword:'',errorDob:'',errorGender:'',errorPlace:''});
    const navigate = useNavigate();

    const handleUserNameChange = (event)=>{
        setUserData({...userData,username:event.target.value})
        if(userData.username !== ''){
          setFormErrors({...formErrors,errorUserName:''});
        }
    }

    const handleEmailChange = (event)=>{
      setUserData({...userData,email:event.target.value})
      if(userData.email !== ''){
        setFormErrors({...formErrors,errorEmail:''});
      }
    }

    const handlePasswordChange = (event)=>{
        setUserData({...userData,password:event.target.value})
      if(userData.password === ''){
        setFormErrors({...formErrors,errorPassword:''});
      }
    }

    const handleDobChange = (event)=>{
        setUserData({...userData,dateofbirth:event.target.value})
      if(userData.dateofbirth === ''){
        setFormErrors({...formErrors,errorDob:''});
      }
    }

    const handlePlaceChange = (event)=>{
        setUserData({...userData,place:event.target.value})
      if(userData.place === ''){
        setFormErrors({...formErrors,errorPlace:''});
      }
    }
    
    const redirectToLoginPage = () => {
      navigate("/");
    }

    const handleFormSubmission = (event)=>{
      event.preventDefault();
      console.log("3")
      const errors = validateInput(userData);
      const {e1,e2,e3,e4,e5,e6} = errors
        console.log(errors)
      console.log("4")
      setFormErrors({...formErrors,errorUserName:e1,errorEmail:e2,errorPassword:e3,errorDob:e4,errorGender:e5,errorPlace:e6});
      console.log("5")
      if(!e1 && !e2 && !e3 && !e4 && !e6){
        console.log("6")
        fetchTheSignUpApi(userData);
        console.log("1");
      }
    }

    const fetchTheSignUpApi = async (userData)=>{
      const url = "http://localhost:4000/signup";
      const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "accept":"application/json",
        },
        body:JSON.stringify({
            userData:userData
        })
      }
      const response = await fetch(url,options);
      const data = await response.json();
      redirectToLoginPage();
    }

    const validateInput = (userData) => {
        const {username,email, password, dateofbirth, gender, place} = userData;
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const errors = {e1:'',e2:'',e3:'',e4:'',e5:'',e6:''};
      if(username === ''){
        errors.e1 = '*required';
      }
      if(email === ''){
        errors.e2 = '*required';
      }
      if(!regex.test(email)){
        errors.e2 = '*invalid email';
      }
      if(password === ''){
        errors.e3 = '*required';
      }
      if(dateofbirth === ''){
        errors.e4 = '*required';
      }
      if(gender === ''){
        errors.e5 = '*required';
      }
      if(place === ''){
        errors.e6 = '*required';
      }
      return errors;
    }
    
    return (
        <div className="signUpPage">
          <div className="signUpContainer">
            <div className="signUpHeading">
              Create a Type Racer Account
            </div>
            <form className="signUpForm" onSubmit={handleFormSubmission}>
              <div className="inputContainer">
                <label className="Inputlabel" htmlFor="UsernameInput">username</label>
                <input  type = "text" className="Input" id ="UsernameInput" placeholder="Enter username..." onChange={handleUserNameChange} />
                <p className="required">{formErrors.errorUserName}</p>
              </div>
              <div className="inputContainer">
                <label className="Inputlabel" htmlFor="EmailInput">Email</label>
                <input  type = "text" className="Input" id ="EmailInput" placeholder="Enter email..." onChange={handleEmailChange} />
                <p className="required">{formErrors.errorEmail}</p>
              </div>
              <div className="inputContainer">
                <label className="Inputlabel" htmlFor="PasswordInput">Password</label>
                <input  type = "text" className="Input" id ="PasswordInput" placeholder="Enter password..." onChange={handlePasswordChange} />
                <p className="required">{formErrors.errorPassword}</p>
              </div>
              <div className="inputContainer">
                <label className="Inputlabel" htmlFor="DobInput">DateOfBirth</label>
                <input  type = "date" className="Input" id ="DobInput"  onChange={handleDobChange} />
                <p className="required">{formErrors.errorDob}</p>
              </div>
              <div className="inputContainer">
                <label className="Inputlabel" htmlFor="PlaceInput">Place</label>
                <input  type = "text" className="Input" id ="PlaceInput" placeholder="Enter Place..." onChange={handlePlaceChange} />
                <p className="required">{formErrors.errorPlace}</p>
              </div>
              <div className="bottomContainer">
                <button className="signUpButton" type="submit">SignUp</button>
                <p className="or">Or</p>
                <button className="loginButton" onClick={redirectToLoginPage}>Login</button>
              </div>
              </form>
          </div>
        </div>
    );
}
export default SignUp