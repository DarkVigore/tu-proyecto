import React from "react";
import UserCrud from "./components/UserCrud";
import UserComponent from './components/UserComponent.js';  // Importa el componente
import "./styles.css";

const App = () => {
  return (
    <div className="app-container">
      <header>
        <h1>Gestión de Usuarios</h1>
        <UserComponent />
      </header>
      <main>
        <UserCrud />
      </main>
    </div>
  );
};

export default App;
