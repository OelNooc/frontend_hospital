import React, { useState } from "react";
import api from "../../services/api";

function BuscarPaciente() {
  const [filtros, setFiltros] = useState({ sexo: "", fechaIngreso: "", enfermedad: "" });
  const [resultados, setResultados] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleBuscar = async () => {
    if (!filtros.sexo && !filtros.fechaIngreso && !filtros.enfermedad) {
      alert("Por favor, ingrese al menos un filtro.");
      return;
    }
  
    try {
      const response = await api.get("/pacientes/search", { params: filtros });
      setResultados(response.data);
    } catch (error) {
      alert("Error en la búsqueda.");
    }
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
