import React, { useState } from 'react';
import axios               from 'axios';

axios.post = ( url, data ) => {
    return new Promise( resolve => {
        setTimeout( () => {

            if ( data.email === 'test@test.pl' && data.password === 'Password1' ) {
                resolve( {
                    status : 200,
                    data   : {
                        success : true,
                        message : 'Login successful.',
                    },
                } );
            } else {
                resolve( {
                    status : 422,
                    data   : {
                        success : false,
                        message : 'Invalid email or password.',
                    },
                } );
            }

        }, 1000 );
    } );
};

export default function LoginForm ( props ) {

    const [ email, setEmail ]                     = useState( '' );
    const [ password, setPassword ]               = useState( '' );
    const [ rememberMe, setRememberMe ]           = useState( false );
    const [ isAuthenticated, setIsAuthenticated ] = useState( false );

    function validateForm () {
        return email.length &&
            email.match( /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ) &&
            password.match( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/ )
            ;
    }

    async function handleSubmit ( event ) {
        event.preventDefault();
        let response = await axios.post( '/login', {
            email    : email,
            password : password,
        } );

        if ( response.data.success ) {

        }

    }

    return (
        <form onSubmit = { handleSubmit } method = "POST">
            <fieldset>
                <label for = "email">Email</label>
                <input id = "email" type = "email" name = "email" required autoFocus
                       onChange = { event => setEmail( event.target.value ) }
                />

                <label for = "password">Password</label>
                <input id = "password" type = "password" name = "password" required
                       onChange = { event => setPassword( event.target.value ) }
                />

                <label for = "rememberMe">Remember Me</label>
                <input id = "rememberMe" type = "checkbox" name = "rememberMe"
                       onChange = { event => setRememberMe( event.target.checked ) }
                />

                <input type = "submit" value = "Login" disabled = { !validateForm() }/>
            </fieldset>
        </form>
    );
}