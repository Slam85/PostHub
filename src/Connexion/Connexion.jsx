import React, {useState} from 'react';
import Creation from '../creation/Creation';
import {useNavigation} from 'react-router-dom';

async function Connexion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigation();

    useEffect(()=> {
        if (localStorage.getItem('user-info')) {
            navigation.push('/add')
        }
    } , [])

    async function login(){
        console.log(email, password);
        let item={email, password};
        let result=await fetch ('https://social-network-api.osc-/fr1.scalingo.io/post-hub/connexion', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                Accept:'application/json'
            },
            body:JSON.stringify(item)})
        }
        result=await result.json();
        localStorage.setItem('user-info', JSON.stringify(result))
        // navigation.push('/add')

    return(
        <div className='auth-form-container'>
            <h2>Connexion</h2>
            <label for='email'>email</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type='text' placeholder='your@email.com' id='email' name='email'/>
            <label for='password'>password</label>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type='password' placeholder='********' id='password' name='password'/>
            <button className='btnLogin' type='submit'>Connexion</button>
        <button onClick={login}>Créer un compte</button>
        </div>
    )
}

export default Connexion;