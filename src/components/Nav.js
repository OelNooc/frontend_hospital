import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/inicio">Inicio</Link></li>
        <li><Link to="/paciente/nuevo">Agregar Paciente</Link></li>
        <li><Link to="/paciente/listar">Listar Pacientes</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
