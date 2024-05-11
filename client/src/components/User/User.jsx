import './User.css';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import{ ADD_USER } from '../../GraphQL/Mutations';
import { LOAD_USERS } from "../../GraphQL/Queries";
import { useMutation } from '@apollo/client';
import { useQuery } from "@apollo/client";
import { LOAD_USER } from "../../GraphQL/Queries";
import PropTypes from 'prop-types';
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;


export default function User({ onLoginChange, isLoggedInValue, setuserinfo, setuser }) {

  const [addUser] = useMutation(ADD_USER, {

    refetchQueries: [

      { query: LOAD_USERS },
    ],
  });

  const handleLogin2 = () => {
    navigate('/');
    window.location.reload();
  };

  const navigate = useNavigate();

  const handleClickAdmin = () => {
    navigate('/AdminPanel');
  }

  const handleLogin = () => {
    onLoginChange(!isLoggedInValue);
  };

  const [areaVisible, setAreaVisible] = useState(false);
  const [area2Visible, setArea2Visible] = useState(false);

  const [inputValuesregister, setInputValuesregister] = useState({
    username: '',
    Password: '',
    Email: '',
   
  });
  const [inputValueslogin, setInputValueslogin] = useState({
    Email: '',
    Password: '',
  });

  const { data:datauser } = useQuery(LOAD_USER, {
    variables: { 
      Email: inputValueslogin.Email,
      Password: inputValueslogin.Password,
    },
   });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValuesregister({
      ...inputValuesregister,
      [name]: value,
    });
  };

  const handleChange2 = (event) => {
    const { name, value } = event.target;
    setInputValueslogin({
      ...inputValueslogin,
      [name]: value,
    });
  };

  const handleUserClick = (event) => {
    const buttontype = event.target.id;
    if(buttontype === 'user-login'){
      setAreaVisible(!areaVisible);
      setArea2Visible(false);
      setInputValuesregister({
        username:"",
        Email:"",
        Password:"",
      })
    }else{
      setArea2Visible(!area2Visible);
      setAreaVisible(false);
      setInputValueslogin({
        Email:"",
        Password:"",
      })
    }
  };

  const handlesubmitlogin = (event) => {

    event.preventDefault();
    if(inputValueslogin.Email === adminEmail &&
    inputValueslogin.Password === adminPassword){
      handleClickAdmin();
    }
    setTimeout(() => {
      setInputValueslogin({ Email: '', Password: '' });
    }, 100);
    if(datauser){
      setAreaVisible(false);
      setuserinfo({
        Email: inputValueslogin.Email,
        Password: inputValueslogin.Password
        })
        setuser(datauser.getUser.id)
      handleLogin()
    }else{
      alert("Invalid Email or Password");
    }
  }

  const handlesubmitregister = async (event) => {
    event.preventDefault();
    try {
      const response = await addUser({
        variables: {
          UserName: inputValuesregister.username.toLocaleUpperCase(),
          Password: inputValuesregister.Password,
          Email: inputValuesregister.Email,
        },
      });
      setInputValuesregister({
        username:"",
        Email:"",
        Password:"",
      });
      if(response.data) {
        setArea2Visible(false);
        handleLogin();
      }
    }
    catch(err){
      console.log(err)
    }
    
  }


  return (
    
    <div className='user-login-register'>

       { !isLoggedInValue ? (<button className="user-login" id="user-login" onClick={handleUserClick}>
        Login
      </button>) : (<button className="user-login" id="user-login" onClick={() => handleLogin2()}>
        Logout
      </button>) }
        { !isLoggedInValue && (<button className="user-register" id="user-register" onClick={handleUserClick}>Register</button>) }
        <div className='login' style={{ display: areaVisible ? 'block' : 'none' }}>
        <div className='mainlogincontainer'>
          <form onSubmit={handlesubmitlogin}>
          <div className='inputscontainer'>
            <label htmlFor="email">Email</label>
            <input
            type="email"
            id="email"
            name="Email"
            value = {inputValueslogin.Email}
            onChange={handleChange2}
             />
            <label htmlFor="password">Password</label>
            <input
            type="password"
            id="password"
            name="Password"
            value = {inputValueslogin.Password}
            onChange={handleChange2}
             />
            <button type="submit" className='login-btn'>Login</button>
            </div>
          </form>
          </div>
        </div>

        <div className='register' style={{ display: area2Visible ? 'block' : 'none' }}>
        <div className='mainlogincontainer'>
          <form onSubmit={handlesubmitregister}>
          <div className='inputscontainer'>
            <label htmlFor="username">Username</label>
            <input
            type="text"
            id="username"
            name="username"
            value = {inputValuesregister.username}
            onChange={handleChange} />
            <label htmlFor="email-register">Email</label>
            <input 
            type="email"
            id="email-register"
            name="Email"
            value = {inputValuesregister.Email}
            onChange={handleChange} />
            <label htmlFor="password-register">Password</label>
            <input
            type="password" 
            id="password-register"
            name="Password"
            value = {inputValuesregister.Password}
            onChange={handleChange} />
            <button type="submit" className='register-btn'>Register</button>
            </div>
          </form>
          </div>
        </div>

    </div>
  )
}
User.propTypes = {
  onLoginChange: PropTypes.any.isRequired,
  isLoggedInValue: PropTypes.any.isRequired,
  setuserinfo: PropTypes.any.isRequired,
  setuser: PropTypes.any.isRequired,
};