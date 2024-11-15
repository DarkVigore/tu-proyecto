import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tus estilos globales
import UserComponent from './components/UserComponent'; // Importa el componente principal
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserComponent />
  </React.StrictMode>
);
