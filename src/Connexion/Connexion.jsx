function Connexion() {

    async function login(){

        let item={email, password};
        console.log(item);

        const result= await fetch ('https://social-network-api.osc-/fr1.scalingo.io/post-hub/connexion', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                Accept:'application/json'
            },
            body:JSON.stringify(item)})

        result = await result.json();
        localStorage.setItem('user-info', JSON.stringify(result));
    }

    return (
        <div className='containerConnexion'>
            <form>
                <input type='email' id='emailConnexion' placeholder='Votre adresse e-mail'/>
                <input type='password' id='passwordConnexion' placeholder='Votre mot de passe'/>
                <button type='submit'>Connexion</button>
            </form>
        </div>
    );
}

export default Connexion;