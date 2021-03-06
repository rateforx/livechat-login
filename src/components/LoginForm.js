import axios                          from 'axios';
import React, { useEffect, useState } from 'react';
import { post }                       from '../mock';
import '../styles/LoginForm.css';

axios.post = post;

export default function LoginForm ( props ) {

    const [ email, setEmail ]                     = useState( '' );
    const [ validEmail, setValidEmail ]           = useState( true );
    const [ password, setPassword ]               = useState( '' );
    const [ validPassword, setValidPassword ]     = useState( true );
    const [ rememberMe, setRememberMe ]           = useState( false );
    const [ isAuthenticated, setIsAuthenticated ] = useState( false ); // this should normally be in the App component
    const [ message, setMessage ]                 = useState( '' );

    useEffect( () => {
        if ( localStorage.getItem( 'isAuthenticated' ) === 'true' ) {
            setIsAuthenticated( true );
        }
    }, [] );

    function validateEmail () {
        setValidEmail( !!email.match( /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ) );
        return validEmail;
    }

    function validatePassword () {
        setValidPassword( !!password.match( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/ ) );
        return validPassword;
    }

    function validateForm () {
        return validateEmail() && validatePassword();
    }

    async function handleSubmit ( event ) {
        event.preventDefault();
        let response = await axios.post( '/login', {
            email    : email,
            password : password,
        } );

        setMessage( response.data.message );

        if ( response.data.success ) {
            setIsAuthenticated( true );

            if ( rememberMe ) localStorage.setItem( 'isAuthenticated', true.toString() );
        }

    }

    function handleLogout () {
        setIsAuthenticated( false );
        setMessage( '' );
        localStorage.removeItem( 'isAuthenticated' );
    }

    if ( isAuthenticated ) return (

        <div className = { 'loginFormWrapper' }>
            <h4 className = { 'message text-success' }>Login successful.</h4>
            <input id = 'logout' type = 'button' onClick = { handleLogout } value = 'Logout'/>
        </div>

    ); else return (

        <div className = { 'loginFormWrapper' }>
            <form className = { 'loginForm' } onSubmit = { handleSubmit } method = "POST">
                <h2>Sign In</h2>

                <label htmlFor = 'email'> Email </label>
                <input id = "email" type = "email" name = "email" required
                       onChange = { event => setEmail( event.target.value ) }
                       onBlur = { () => validateEmail() }
                />
                { !validEmail && (
                    <small className = { 'message text-danger' }>
                        Not a valid email address
                    </small>
                ) }

                <label htmlFor = 'password'>Password</label>
                <input id = "password" type = "password" name = "password" required
                       onChange = { event => setPassword( event.target.value ) }
                       onBlur = { () => validatePassword() }
                />
                { !validPassword && (
                    <small className = { 'message text-danger' }>
                        The password should contain
                        <ul>
                            <li>at least 6 characters</li>
                            <li>1 lowercase letter</li>
                            <li>1 uppercase letter</li>
                            <li>1 digit</li>
                        </ul>
                    </small>
                ) }

                <label htmlFor = 'rememberMe'>Remember Me</label>
                <input id = "rememberMe" type = "checkbox" name = "rememberMe"
                       onChange = { event => setRememberMe( event.target.checked ) }
                />

                <input id = 'login' type = 'submit' value = 'Login'/>

                { !!message.length && (
                    <h4 className = { 'message text-danger' }>{ message }</h4>
                ) }
            </form>
        </div>

    );
};
