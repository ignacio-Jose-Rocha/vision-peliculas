import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';

import swal from '@sweetalert/with-react';
function Login() {
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email === '' || password === '') {
            swal(<h2>los campos no pueden estar vacios</h2>);
            return;
        }
        if (email !== '' && !regexEmail.test(email)) {
            swal(<h2>debes escribir una direccion valida</h2>);
            return;
        }
        if (email !== "challenge@alkemy.org" || password !== "react") {
            swal(<h2> credenciales invalidas</h2>);
            return;
        }

        axios.post('http://challenge-react.alkemy.org', { email, password })
            .then(res => {
                swal(<h2>Ingresaste correctamente</h2>);
                const token = res.data.token;
                sessionStorage.setItem('token', token);
                history.push('/Listado');
            })
    }

    let token = sessionStorage.getItem('token');


    return (
        <>
            {
                token && <Redirect to='/Listado' />
            }
            <div class="contenedor">
                <h2>Formulario de Login</h2>
            </div>
            <div class="contenedor">

                <form onSubmit={submitHandler}>
                    <label>
                        <span>Correo Electronico:</span>
                        <br />
                        <input type="text" name="email" />
                    </label>

                    <br />
                    <label>
                        <span>codigo:</span>
                        <br />
                        <input type="password" name="password" />
                    </label>

                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;