import {useState} from 'react'; 
import Connexion from '../connexion/Connexion';
// import {useHistory} from 'react-router-dom';

function Creation(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    // const history=useHistory();

    async function signUp(){

        let item={name, password, email}
        console.log(item);

        let result=await fetch('https://social-network-api.osc-/fr1.scalingo.io/post-hub/creation',{
        method: 'POST',
        body:JSON.stringify(item),
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    })

    result = await result.json();
    console.log('result', result);
    localStorage.setItem('user-info', JSON.stringify(result));
    // history.push('/home');
    }

    return (
        <div className='auth-form-container'>
            <h2>Création de Compte</h2>
            <label for ='name'>Nom Complet</label>
            <input value ={name} type='text'id='name' placeholder='Nom Complet' onChange={(e)=>setName(e.target.value)} />
            <label for='email'>email</label>
            <input value ={email} type='text' placeholder='your@email.com' id='email'onChange={(e)=>setEmail(e.target.value)}/>
            <label for='password'>password</label>
            <input value ={password} type='password' placeholder='********' id='password'onChange={(e)=>setPassword(e.target.value)}/>
            <button className='btnSignup' type='submit'>Créer Mon Compte</button>
        <button onClick={signUp}>Se Connecter</button>
        </div>
    )
}

export default Creation;