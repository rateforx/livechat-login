export function post ( url, data ) {
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