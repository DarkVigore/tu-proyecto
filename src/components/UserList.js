// UserList.js
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/firebaseconfig'; // Importa la configuración de Firebase

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, 'users/');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const usersList = data ? Object.values(data) : [];
      setUsers(usersList);  // Actualiza el estado con los usuarios
    });
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

