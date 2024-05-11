import './UserInfoCard.css';
import PropTypes from 'prop-types';

const UserInfoCard = ({ users, onDeleteUser }) => {


  return (
    <div className='user-info-card-container'>
      {users.map((user) => (
        <div key={user.id} className='usercard'>
        <button className='close-button' onClick={() => onDeleteUser(user.id)}>X</button>
          <p className='usercard-content'>Name: {user.UserName}</p>
          <p className='usercard-content'>Email: {user.Email}</p>
          <p className='usercard-content'>Password: {user.Password}</p>
        </div>
      ))}
    </div>
  )
}

export default UserInfoCard;

UserInfoCard.propTypes = {
    users: PropTypes.any.isRequired,
    onDeleteUser:PropTypes.any.isRequired,
  };