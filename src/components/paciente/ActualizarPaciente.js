import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

function ActualizarPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    rut: "",
    nombre: "",
    edad: "",
    sexo: "",
    enfermedad: "",
    fotoPersonal: null,
  });

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await api.get(`/pacientes/${id}`);
        setForm(response.data);
      } catch (error) {
        console.error("Error al cargar datos del paciente", error);
      }
    };
    fetchPaciente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, fotoPersonal: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      await api.put(`/pacientes/${id}`, formData);
      navigate("/paciente/listar");
    } catch (error) {
      alert("Error al actualizar paciente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Paciente</h1>
      <label>RUT:</label>
      <input type="text" name="rut" value={form.rut} onChange={handleChange} />
      <label>Nombre:</label>
      <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />
      <label>Edad:</label>
      <input type="number" name="edad" value={form.edad} onChange={handleChange} />
      <label>Sexo:</label>
      <select name="sexo" value={form.sexo} onChange={handleChange}>
        <option value="">Seleccione...</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
      </select>
      <label>Enfermedad:</label>
      <input
        type="text"
        name="enfermedad"
        value={form.enfermedad}
        onChange={handleChange}
      />
      <label>Foto:</label>
      <input type="file" name="fotoPersonal" onChange={handleFileChange} />
      <button type="submit">Actualizar</button>
    </form>
  );
}

export default ActualizarPaciente;
