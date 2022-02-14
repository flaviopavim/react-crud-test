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
        <Route path="/list/level" render={(props) => <ListLevel />} />
        <Route path="/search/level/:search" render={(props) => <ListLevel />} />
        <Route path="/create/level" render={(props) => <CreateLevel />} />
        <Route path="/edit/level/:id" render={(props) => <EditLevel />} />
        <Route path="/list/dev" render={(props) => <ListDev />} />
        <Route path="/search/dev/:search" render={(props) => <ListDev />} />
        <Route path="/create/dev" render={(props) => <CreateDev />} />
        <Route path="/edit/dev/:id" render={(props) => <EditDev />} />
      </Router>
    </div>
  )
}

export default App;