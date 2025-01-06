import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

function DetallePaciente() {
  const { id } = useParams(); // Obtén el ID desde la URL
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await api.get(`/pacientes/${id}`);
        setPaciente(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los detalles del paciente:', error);
        setLoading(false);
      }
    };

    fetchPaciente();
  }, [id]);

  const handleDelete = async () => {
    try {
      if (window.confirm('¿Estás seguro de eliminar este paciente?')) {
        await api.delete(`/pacientes/${id}`);
        alert('Paciente eliminado correctamente.');
        window.location.href = '/paciente/listar'; // Redirige a la lista de pacientes
      }
    } catch (error) {
      console.error('Error al eliminar el paciente:', error);
      alert('Error al eliminar el paciente.');
    }
  };

  if (loading) {
    return <p>Cargando detalles del paciente...</p>;
  }

  if (!paciente) {
    return <p>No se encontró información del paciente.</p>;
  }

  return (
    <div>
      <h2>Detalles del Paciente</h2>
      <div>
        <p><strong>RUT:</strong> {paciente.rut}</p>
        <p><strong>Nombre:</strong> {paciente.nombre}</p>
        <p><strong>Edad:</strong> {paciente.edad}</p>
        <p><strong>Sexo:</strong> {paciente.sexo}</p>
        <p><strong>Enfermedad:</strong> {paciente.enfermedad}</p>
        {paciente.fotoPersonal && (
          <div>
            <strong>Foto:</strong>
            <img 
              src={`http://localhost:5000/uploads/${paciente.fotoPersonal}`} 
              alt="Foto del Paciente" 
              style={{ width: '200px', borderRadius: '8px' }} 
            />
          </div>
        )}
      </div>
      <div>
        <Link to={`/paciente/actualizar/${id}`} className="btn btn-primary">
          Actualizar
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default DetallePaciente;
