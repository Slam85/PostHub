import React, {useState} from "react";

const Connexion = (props) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        e.preventDefault();
        console.log(email);
    }

    return(
        <div className="auth-form-container">
        <form onSubmit={handleSubmit}>
            <label for="email">email</label>
            <input value={email} type="email" placeholder="your@email.com" id="email" name="email"/>
            <label for="password">password</label>
            <input value={password} type="password" placeholder="********" id="password" name="password"/>
            <button type="submit">Connexion</button>
        </form>
        <button onClick={() => props.onFormSwitch("creation")}>Créer un compte</button>
        </div>
    )
}

export default Connexion;