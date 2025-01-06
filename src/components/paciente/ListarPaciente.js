import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function ListarPacientes() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await api.get("/pacientes");
        setPacientes(response.data);
      } catch (error) {
        console.error("Error al obtener pacientes", error);
      }
    };
    fetchPacientes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas inhabilitar este paciente?")) {
      try {
        await api.delete(`/pacientes/${id}`);
        setPacientes(pacientes.filter((paciente) => paciente._id !== id));
      } catch (error) {
        alert("Error al eliminar paciente.");
      }
    }
  };

  return (
    <div>
      <h1>Lista de Pacientes</h1>
      <Link to="/pacientes/agregar" className="btn btn-primary">
        Agregar Paciente
      </Link>
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Sexo</th>
            <th>Enfermedad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente._id}>
              <td>
                <img src={paciente.foto} alt={paciente.nombre} />
              </td>
              <td>{paciente.rut}</td>
              <td>{paciente.nombre}</td>
              <td>{paciente.edad}</td>
              <td>{paciente.sexo}</td>
              <td>{paciente.enfermedad}</td>
              <td>
                <Link to={`/paciente/actualizar/${paciente._id}`} className="btn btn-warning">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(paciente._id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarPacientes;
