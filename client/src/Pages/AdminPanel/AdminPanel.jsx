import './AdminPanel.css';
import { useState } from 'react';
import Dialog from '../../components/Dialog/Dialog'
import GetBook from '../../components/GetBook/GetBook'
import User from '../../components/User/User'
import { LOAD_USERS } from '../../GraphQL/Queries'
import { useQuery } from "@apollo/client";
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../../GraphQL/Mutations'
import UserInfoCard from '../../components/UserInfoCard/UserInfoCard'
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

export default function AdminPanel() {

  const { data:usersData } = useQuery(LOAD_USERS);

  const [users, setUsers] = useState(usersData ? usersData.getAllUsers : []);

  const [getbook, setgetbook] = useState(0);

  const isLoggedInValue = true;

  const admininformation = {
    Email:adminEmail,
    Password:adminPassword
  }


  const [deleteUser] = useMutation(DELETE_USER, {

    refetchQueries: [

      { query: LOAD_USERS },
    ],
  });

const handleDeleteUser = async (id) => {
    try {
      await deleteUser({ variables: { id } });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getallbooks = () => {
    setgetbook((prevalue) => (prevalue === 0 ? 1 : 0));
    setUsers([])
  };

  const isLoggedIn = true;

  const handleuserinfo = () => {
    if (usersData && usersData.getAllUsers) {
      const filteredUsers = usersData.getAllUsers.filter(
        (user) => user.Email !== adminEmail || user.Password !== adminPassword
      );
      setUsers(filteredUsers);
      setgetbook(0);
    }
  };

  return (
    <div className='admincontainer'>
    <div className='admin-buttons-container'>
      <button className='book-user' onClick={getallbooks}>All Books</button>
      <button className='book-user' onClick={handleuserinfo}>All Users</button>
      <Dialog />
      <User isLoggedInValue = {isLoggedInValue} />
    </div>
    <UserInfoCard users={users} onDeleteUser={handleDeleteUser} />
    <GetBook
          isLoggedIn={isLoggedIn}
          getbook={getbook}
          getuserbooks={admininformation}
         />
    </div>
  )
}
