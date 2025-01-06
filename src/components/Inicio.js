import React from 'react';
import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div>
      <h1>Bienvenido a la Gestión de Pacientes</h1>
      <p>Seleccione una de las opciones a continuación:</p>
      <ul>
        <li><Link to="/paciente/nuevo">Agregar Paciente</Link></li>
        <li><Link to="/paciente/listar">Listar Pacientes</Link></li>
        <li><Link to="/paciente/buscar">Buscar Paciente</Link></li>
      </ul>
    </div>
  );
}

export default Inicio;
