import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";

function BuscarPaciente() {
  const [filtros, setFiltros] = useState({ sexo: "", fechaIngreso: "", enfermedad: "" });
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sexo = params.get('sexo');
    const fechaIngreso = params.get('fechaIngreso');
    const enfermedad = params.get('enfermedad');

    if (sexo || fechaIngreso || enfermedad) {
      api.get("/pacientes/search", { params: { sexo, fechaIngreso, enfermedad } })
        .then(response => setResultados(response.data))
        .catch(() => alert("Error en la búsqueda."));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleBuscar = () => {
    const queryParams = new URLSearchParams(filtros).toString();
    navigate(`/paciente/buscar/resultados?${queryParams}`);
  };

  return (
    <div>
      <h1>Buscar Pacientes</h1>
      <label>Sexo:</label>
      <select name="sexo" onChange={handleChange}>
        <option value="">Seleccione...</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
      </select>
      <label>Fecha de Ingreso:</label>
      <input type="date" name="fechaIngreso" onChange={handleChange} />
      <label>Enfermedad:</label>
      <input type="text" name="enfermedad" onChange={handleChange} />
      <button onClick={handleBuscar}>Buscar</button>

      <h2>Resultados</h2>
      {resultados.length === 0 ? (
        <p>No se encontraron pacientes.</p>
      ) : (
        <ul>
          {resultados.map((paciente) => (
            <li key={paciente._id}>{paciente.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BuscarPaciente;
