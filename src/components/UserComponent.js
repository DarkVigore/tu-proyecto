// UserComponent.js
import React, { useState, useEffect } from 'react';
import { ref, set, onValue, remove, push } from 'firebase/database';
import { db } from '../firebase/firebaseconfig';

const UserComponent = () => {
  const [users, setUsers] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editUserId, setEditUserId] = useState(null);

  // Cargar usuarios desde Firebase
  useEffect(() => {
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setUsers(data || {});
    });
  }, []);

  // Función para guardar o actualizar usuario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editUserId) {
      // Editar usuario existente
      const userRef = ref(db, 'users/' + editUserId);
      set(userRef, { name, email })
        .then(() => {
          console.log('Usuario actualizado correctamente.');
          setEditUserId(null); // Limpiar el ID de edición
          setName('');
          setEmail('');
        })
        .catch((error) => {
          console.error('Error al actualizar el usuario:', error);
        });
    } else {
      // Agregar un nuevo usuario
      const usersRef = ref(db, 'users');
      const newUserRef = push(usersRef); // Crea un nuevo ID único para el usuario
      set(newUserRef, { name, email })
        .then(() => {
          console.log('Usuario guardado correctamente.');
          setName('');
          setEmail('');
        })
        .catch((error) => {
          console.error('Error al guardar el usuario:', error);
        });
    }
  };

  // Función para cargar los datos del usuario en el formulario de edición
  const handleEdit = (userId) => {
    const user = users[userId];
    setName(user.name);
    setEmail(user.email);
    setEditUserId(userId);
  };

  // Función para eliminar un usuario
  const handleDelete = (userId) => {
    const userRef = ref(db, 'users/' + userId);
    remove(userRef)
      .then(() => {
        console.log('Usuario eliminado correctamente.');
      })
      .catch((error) => {
        console.error('Error al eliminar el usuario:', error);
      });
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editUserId ? 'Actualizar' : 'Guardar'}</button>
      </form>
      <ul>
        {Object.keys(users).map((userId) => (
          <li key={userId}>
            <span>{users[userId].name} - {users[userId].email}</span>
            <button onClick={() => handleEdit(userId)}>Editar</button>
            <button onClick={() => handleDelete(userId)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserComponent;
