import { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Connexion from './connexion/Connexion';
import Creation from './creation/Creation';

function App() {

  return (
    <> 
    <div>
    <Connexion/>
    <Creation/>
    </div>
    </>
  )
}

export default App
