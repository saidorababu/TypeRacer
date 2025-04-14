/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors,setFormErrors] =useState({errorEmail:'',errorPassword:''});
    const navigate = useNavigate()

    const handleEmailChange = (event)=>{
      setEmail(event.target.value)
      if(email !== ''){
        setFormErrors({...formErrors,errorEmail:''});
      }
    }

    const handlePasswordChange = (event)=>{
      setPassword(event.target.value)
      if(password === ''){
        setFormErrors({...formErrors,errorPassword:''});
      }
    }

    const redirectToSignUpPage = (event) => {
      navigate('/signup');
    }

    window.onload = function(){
      if(localStorage.getItem('token')){
        // navigate('/home');
      }
    }
    
    const handleFormSubmission = async (event)=>{
      event.preventDefault();
      const errors = validateInput(email,password);
      const {e1,e2} = errors

      setFormErrors({...formErrors,errorEmail:e1,errorPassword:e2});
      if(!e1 && !e2){
        const response = await fetchTheLoginApi(email,password);
        console.log(formErrors)
        if(response === 0){
          return;
        }
        const token = response.token
        const username = response.user.username;
        localStorage.setItem('token',token);
        props.onLogin({email,username,token});
      }
    }

    const validateInput = (email,password) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const errors = {e1:'',e2:''};
      if(email === ''){
        errors.e1 = '*required';
      }
      if(!regex.test(email)){
        errors.e1 = '*invalid email';
      }
      if(password === ''){
        errors.e2 = '*required';
      }
      return errors;
    }

    
    const fetchTheLoginApi = async (email,password)=>{
      const url = "http://localhost:4000/login";
      const options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "accept":"application/json"
        },
        body:JSON.stringify({email:email,password:password})
      }
      const response = await fetch(url,options);
      const jsonData = await response.json();
      if(jsonData.error){
        if(jsonData.error === 'user not found'){
          setFormErrors({...formErrors,errorEmail:jsonData.error});
        }
        else if(jsonData.error === 'invalid password'){
          setFormErrors({...formErrors,errorPassword:jsonData.error});
        }
        return 0;
      }
      return jsonData;
    }
    
    return (
        <div className="loginPage">
          <div className="loginContainer">
            <div className="loginHeading">
              TypeRacer
            </div>
            <form className="loginForm" onSubmit={handleFormSubmission}>
              <div className="inputContainer">
                <label className="emailInputlabel" htmlFor="EmailInput">Email</label>
                <input  type = "text" className="emailInput" id ="EmailInput" placeholder="Enter email..." onChange={handleEmailChange} />
                <p className="required">{formErrors.errorEmail}</p>
              </div>
              <div className="inputContainer">
                <label className="passwordInputlabel" htmlFor="PasswordInput">Password</label>
                <input  type = "password" className="passwordInput" id ="PasswordInput" placeholder="Enter password..." onChange={handlePasswordChange} />
                <p className="required">{formErrors.errorPassword}</p>
              </div>

              <button className="loginButton" type="submit">Login</button>
              <p className="or">Or</p>
              <button className="signUpButton" type="button" onClick={redirectToSignUpPage} >Create Your Type Racer Account</button>
            </form>
          </div>
        </div>
    );

}
export default Login