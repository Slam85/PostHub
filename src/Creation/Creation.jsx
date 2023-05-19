import React, {useState} from 'react'; 

const Creation = (props) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = () => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className='auth-form-container'>
          <form onSubmit={handleSubmit}>
            <label>Nom Complet</label>
            <input valut={name} name='name' id='name' placeholder='Nom Complet' />
            <label for="email">email</label>
            <input value={email} type='email' placeholder='your@email.com' id='email' name='email'/>
            <label for='password'>password</label>
            <input value={password} type='password' placeholder='********' id='password' name='password'/>
            <button type='submit'>Connexion</button>
        </form>
        <button onClick={() => props.onFormSwitch('connexion')}>Connexion</button>
        </div>
    )
}

export default Creation;