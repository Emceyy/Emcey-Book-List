import './User.css';
import { useState} from 'react';

export default function User() {

  const [areaVisible, setAreaVisible] = useState(false);
  const [area2Visible, setArea2Visible] = useState(false);

  const handleUserClick = (event) => {
    const buttontype = event.target.id;
    if(buttontype === 'user-login'){
      setAreaVisible(!areaVisible);
      setArea2Visible(false);
    }else{
      setArea2Visible(!area2Visible);
      setAreaVisible(false);
    }
    
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    event.target.email.value = "";
    event.target.password.value = "";
  }

  const handlesubmit2 = (event) => {
    event.preventDefault();
    event.target.email.value = "";
    event.target.password.value = "";
    event.target.nickname.value = "";
  }


  return (
    
    <div className='user-login-register'>
        <button className="user-login" id="user-login" onClick={handleUserClick}>
        Login
      </button>
        <button className="user-register" id="user-register" onClick={handleUserClick}>Register</button>
        <div className='login' style={{ display: areaVisible ? 'block' : 'none' }}>
        <div className='mainlogincontainer'>
          <form onSubmit={handlesubmit}>
          <div className='inputscontainer'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
            <button type="submit" className='login-btn'>Login</button>
            </div>
          </form>
          </div>
        </div>
        <div className='register' style={{ display: area2Visible ? 'block' : 'none' }}>
        <div className='mainlogincontainer'>
          <form onSubmit={handlesubmit2}>
          <div className='inputscontainer'>
            <label htmlFor="nickname">Nickname</label>
            <input type="text" id="nickname" name="nickname" />
            <label htmlFor="email-register">Email</label>
            <input type="email" id="email-register" name="email" />
            <label htmlFor="password-register">Password</label>
            <input type="password" id="password-register" name="password" />
            <button type="submit" className='register-btn'>Register</button>
            </div>
          </form>
          </div>
        </div>
    </div>
  )
}
