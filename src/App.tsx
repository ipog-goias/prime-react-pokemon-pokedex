import React from 'react';
import './App.css';
//import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; //v5
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; //v6
import Splash from './pages/Splash';
import Login from './pages/Login';
import Dashsboard from './pages/Dashboard';
import PokemonList from './pages/PokemonList';
import PokemonDetails from './pages/PokemonDetail';

// function App() {
//   return (
   
//   );
// }

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />      
        <Route path="/dashboard" element={<Dashsboard />} />
        <Route path="/pokemon-list" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
        <Route path="/" element={<Splash />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>

  );
}

export default App;
