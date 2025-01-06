import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route exact path="/inicio" component={Inicio} />
        <Route exact path="/paciente/nuevo" component={AgregarPaciente} />
        <Route exact path="/paciente/actualizar/:id" component={ActualizarPaciente} />
        <Route exact path="/paciente/detalle/:id" component={DetallePaciente} />
        <Route exact path="/paciente/listar" component={ListarPaciente} />
        <Route exact path="/paciente/buscar/:search" component={BuscarPaciente} />
        <Route
          exact
          path="/redirect/:search"
          render={(props) => {
            const search = props.match.params.search;
            return <Redirect to={`/paciente/buscar/${search}`} />;
          }}
        />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
