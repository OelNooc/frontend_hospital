import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Cambié Switch por Routes y Redirect por Navigate
import Nav from './components/Nav';
import Inicio from './components/Inicio';
import AgregarPaciente from './components/paciente/AgregarPaciente';
import ActualizarPaciente from './components/paciente/ActualizarPaciente';
import BuscarPaciente from './components/paciente/BuscarPaciente';
import DetallePaciente from './components/paciente/DetallePaciente';
import ListarPaciente from './components/paciente/ListarPaciente';
import Error from './components/Error';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route exact path="/inicio" element={<Inicio />} />
        <Route exact path="/paciente/nuevo" element={<AgregarPaciente />} />
        <Route exact path="/paciente/actualizar/:id" element={<ActualizarPaciente />} />
        <Route exact path="/paciente/detalle/:id" element={<DetallePaciente />} />
        <Route exact path="/paciente/listar" element={<ListarPaciente />} />
        <Route exact path="/paciente/buscar" element={<BuscarPaciente />} />
        <Route exact path="/paciente/buscar/resultados" element={<BuscarPaciente />} />
        <Route path="*" element={<Error />} /> 
      </Routes>
    </Router>
  );
}

export default App;
