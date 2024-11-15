// UserCrud.js
import React, { useState } from 'react';
// Asegúrate de no duplicar las importaciones de 'ref' y otras funciones de Firebase
import { ref, set, onValue } from 'firebase/database';  // Solo una vez
import { db } from '../firebase/firebaseconfig';  // Asegúrate de importar db desde firebaseconfig


const UserCrud = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Función para registrar un usuario
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = new Date().getTime().toString(); // Genera un ID único para el usuario
    const userRef = ref(db, 'users/' + userId);
    
    set(userRef, {
      name,
      email,
    }).then(() => {
      console.log("Usuario guardado correctamente.");
      onUserAdded();  // Llama a la función para actualizar la lista
      setName('');
      setEmail('');
    }).catch((error) => {
      console.error("Error al guardar el usuario:", error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Usuario</h2>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Guardar Usuario</button>
    </form>
  );
};

export default UserCrud;

