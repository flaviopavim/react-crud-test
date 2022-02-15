import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import Top from './includes/Top'
import ListLevel from './pages/ListLevel'
import CreateLevel from './pages/CreateLevel'
import EditLevel from './pages/EditLevel'
import ListDev from './pages/ListDev'
import CreateDev from './pages/CreateDev'
import EditDev from './pages/EditDev'

const App = () => {

  return (
    <div>
      <Top />
      <Router>
        <Route path="/" exact render={(props) => <ListDev />} />
        <Route path="/listar/niveis" exact render={(props) => <ListLevel />} />
        <Route path="/listar/niveis/:paginacao" exact render={(props) => <ListLevel />} />
        <Route path="/buscar/niveis/:busca" exact render={(props) => <ListLevel />} />
        <Route path="/buscar/niveis/:busca/:paginacao" exact render={(props) => <ListLevel />} />
        <Route path="/cadastrar/nivel" render={(props) => <CreateLevel />} />
        <Route path="/editar/nivel/:id" render={(props) => <EditLevel />} />
        <Route path="/listar/desenvolvedores" exact render={(props) => <ListDev />} />
        <Route path="/listar/desenvolvedores/:paginacao" exact render={(props) => <ListDev />} />
        <Route path="/buscar/desenvolvedores/:busca" exact render={(props) => <ListDev />} />
        <Route path="/buscar/desenvolvedores/:busca/:paginacao" exact render={(props) => <ListDev />} />
        <Route path="/cadastrar/desenvolvedor" render={(props) => <CreateDev />} />
        <Route path="/editar/desenvolvedor/:id" render={(props) => <EditDev />} />
      </Router>
    </div>
  )
}

export default App;