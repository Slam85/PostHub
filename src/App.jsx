import React, { useState } from 'react';
import './App.css';
import Connexion from './connexion/connexion';
import Creation from './creation/creation';

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
