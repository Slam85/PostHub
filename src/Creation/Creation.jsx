import { useEffect, useState } from 'react';

function Creation(){

    const [info, setInfo] = useState({});
    const [arrayInfo, setArrayInfo] = useState({});

    const getInfo = (e) => {
        e.preventDefault();
        setInfo(new FormInfo());
        setArrayInfo([...arrayInfo, info]);
    };

     useEffect(() =>{
        useEffet(() => {
            console.log('Infos :', arrayInfo);
        }, [arrayInfo]);
     })

     async function signUp(){

        let item={name, password, email}
        console.log(item);

        const result =await fetch('https://social-network-api.osc-/fr1.scalingo.io/post-hub/creation', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(item)})

    result = await result.json();
    console.log('result', result);
    localStorage.setItem('user-info', JSON.stringify(result));
    }

    return (
        <div className='containerCreation'>
            <h2>Création de Compte</h2>
            <form className='formCreation' onSubmit={getInfo}>
            <input type='text'id='name' placeholder='Nom Complet' />
            <input type='email' placeholder='your@email.com' id='email'/>
            <input type='password' placeholder='********' id='password'/>
            <button className='btnSignup' type='submit'>Créer Mon Compte</button>
            </form>
        <button type='submit'>Se Connecter</button>
        </div>
    )
}

export default Creation;