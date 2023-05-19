import { useState } from 'react';
import './App.css';
import Dashboard from "../Creation/Dashboard";
import Preferences from "../Creation/Preferences";
import Connexion from "../Connexion/Connexion";
import {BrowerRouter, Route, Switch} from "react-router-dom";

function App() {
    const [token, setToken] = useState();
    if(!token) {
        return <Connexion setToken={setToken}/>;
    }
    return (
        <div className="wrapper">
            <h1>Application</h1>
            <BrowserRouter>
            <Switch>
                <Route path="/dashboard">
                    <Dashboard/>
                    <Route path="/preferences"/>
                    <Preferences/>
                    </Route>
                    </Switch>
                    </BrowerRouter>
                    </div>
    );
}

export default App;
