import React, { useState } from 'react';
import './App.css';
import Connexion from './connexion/Connexion';
import Creation from './creation/Creation';

function App() {
    const [currentForm, setCurrentForm] = useState("connexion");
    const toggleForm = (formName) => {
        setCurrentForm(forName);
    }

    <div>
        {
            currentForm === "connexion"? <Connexion onFormSwitch={toggleForm}/> : <Creation onFormSwitch={toggleForm}/>
        }
    </div>
}

export default App;
