import '@testing-library/jest-dom';
import { render, fireEvent, wait } from '@testing-library/react';
import React                       from 'react';
import LoginForm                   from '../components/LoginForm';

describe( '<LoginForm />', () => {

    test( 'validates email input', () => {
        const { container, getByLabelText } = render( <LoginForm/> );
        const emailInput                    = getByLabelText( 'Email' );

        fireEvent.change( emailInput, {
            target : {
                value : 'some@email.com',
            },
        } );
        fireEvent.blur( emailInput );

        expect( container.textContent ).not.toContain( 'Not a valid email address' );

        fireEvent.change( emailInput, {
            target : {
                value : 'not-email_address',
            },
        } );
        fireEvent.blur( emailInput );

        expect( container.textContent ).toContain( 'Not a valid email address' );
    } );

    test( 'validated password input', () => {
        const { container, getByLabelText } = render( <LoginForm/> );
        const passwordInput = getByLabelText( 'Password' );

        fireEvent.change( passwordInput, {
            target : {
                value : 'Password1',
            },
        } );
        fireEvent.blur( passwordInput );

        expect( container.textContent ).not.toContain( 'The password should contain' );

        fireEvent.change( passwordInput, {
            target : {
                value : 'pass',
            },
        } );
        fireEvent.blur( passwordInput );

        expect( container.textContent ).toContain( 'The password should contain' );
    } );

    test( 'allows to login', async () => {

        const { getByText, getByLabelText } = render( <LoginForm/> );
        const emailInput                    = getByLabelText( 'Email' );
        const passwordInput                 = getByLabelText( 'Password' );
        const loginButton                   = getByText( 'Login' );

        fireEvent.change( emailInput, {
            target : {
                value : 'test@test.pl',
            },
        } );
        fireEvent.change( passwordInput, {
            target : {
                value : 'Password1',
            },
        } );
        fireEvent.click( loginButton );

        expect( await wait( () => getByText( 'Login successful.' ) ) );
    } );

    test( 'but fails if the entered email/password are invalid', async () => {
        const { getByText, getByLabelText } = render( <LoginForm/> );
        const emailInput                    = getByLabelText( 'Email' );
        const passwordInput                 = getByLabelText( 'Password' );
        const loginButton                   = getByText( 'Login' );

        fireEvent.change( emailInput, {
            target : {
                value : 'test@test.pl',
            },
        } );
        fireEvent.change( passwordInput, {
            target : {
                value : 'InvalidPassword2',
            },
        } );
        fireEvent.click( loginButton );

        expect( await wait( () => getByText( 'Invalid email or password.' ) ) );
    } );
} );
