import React from "react";

function Connexion (){ 
    return (
        <div className="login-wrapper">
            <h1>Connexion</h1>
        <form>
            <label>
                <p>Username</p>
                <input type="text"/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password"/>
                        </label>
                        <div>
                            <button type="submit">Submit</button>
                            </div>
                            </form>
                            </div>
    )
}

export default Connexion;