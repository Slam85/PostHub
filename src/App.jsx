import './App.css';
import Connexion from './connexion/Connexion';
import Creation from './creation/Creation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/creation' element={<Creation />} />
            <Route path='/connexion' element={<Connexion />} />
        </Routes>    
        </BrowserRouter>

    </div>
  )
}

export default App
