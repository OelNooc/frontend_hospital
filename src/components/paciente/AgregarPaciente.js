import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import SimpleReactValidator from 'simple-react-validator';

function AgregarPaciente() {
  const [form, setForm] = useState({
    rut: '',
    nombre: '',
    edad: '',
    sexo: '',
    enfermedad: '',
    fotoPersonal: null,
  });

  const [validator] = useState(new SimpleReactValidator());
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validator.showMessageFor(name);
  };

  const handleFileChange = (e) => {
    setForm({ ...form, fotoPersonal: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.allValid()) {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      try {
        await api.post('/pacientes', formData);
        navigate('/paciente/listar');
      } catch (error) {
        setError('Error al agregar el paciente.');
      }
    } else {
      validator.showMessages();
      setError('Por favor, completa los campos correctamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>RUT:</label>
      <input 
        type="text" 
        name="rut" 
        value={form.rut} 
        onChange={handleChange} 
      />
      {validator.message('rut', form.rut, 'required|alpha_num')}

      <label>Nombre:</label>
      <input 
        type="text" 
        name="nombre" 
        value={form.nombre} 
        onChange={handleChange} 
      />
      {validator.message('nombre', form.nombre, 'required|alpha_space')}

      <label>Edad:</label>
      <input 
        type="number" 
        name="edad" 
        value={form.edad} 
        onChange={handleChange} 
      />
      {validator.message('edad', form.edad, 'required|numeric|min:1,num|max:120,num')}

      <label>Sexo:</label>
      <select 
        name="sexo" 
        value={form.sexo} 
        onChange={handleChange}
      >
        <option value="">Seleccione...</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
      </select>
      {validator.message('sexo', form.sexo, 'required')}

      <label>Enfermedad:</label>
      <input 
        type="text" 
        name="enfermedad" 
        value={form.enfermedad} 
        onChange={handleChange} 
      />
      {validator.message('enfermedad', form.enfermedad, 'required')}

      <label>Foto:</label>
      <input 
        type="file" 
        name="fotoPersonal" 
        onChange={handleFileChange} 
      />
      {validator.message('fotoPersonal', form.fotoPersonal, 'required')}

      <button type="submit">Agregar</button>
    </form>
  );
}

export default AgregarPaciente;
