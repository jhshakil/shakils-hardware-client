import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../Shared/Loading';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [token] = useToken(user);
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }
    if (loading) {
        return <Loading></Loading>
    }
    if (token) {
        return navigate(from, { replace: true });
    }

    return (
        <div className='w-full'>
            <button onClick={() => signInWithGoogle()} className="btn btn-natural font-bold w-full">Google Log In</button>
        </div>
    );
};

export default SocialLogin;