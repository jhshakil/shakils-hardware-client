import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import SocialLogin from './SocialLogin';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
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
    if (user) {
        return navigate(from, { replace: true });
    }
    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    };
    return (
        <div className='my-16 flex justify-center'>
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body items-center">
                    <h2 class="card-title text-3xl font-bold">Log In</h2>
                    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-control w-full ">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="email"
                                placeholder="Enter Yor Email"
                                class="input input-bordered w-full"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        massage: 'Provide a valid Email'
                                    }
                                })}
                            />
                            <label class="label">
                                {errors.email?.type === 'required' && <span className='text-red-500'>{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className='text-red-500'>{errors.pattern.message}</span>}
                            </label>
                        </div>
                        <div class="form-control w-full ">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="password"
                                placeholder="Enter Your Password"
                                class="input input-bordered w-full"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer'
                                    }
                                })}
                            />
                            <label class="label">
                                {errors.password?.type === 'required' && <span className='text-red-500'>{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-500'>{errors.password.message}</span>}
                            </label>
                        </div>
                        <input className='btn btn-natural block m-auto w-full font-bold' type="submit" value='Log In' />
                    </form>
                    <div class="divider">OR</div>
                    <div class="card-actions w-full">
                        <SocialLogin></SocialLogin>
                    </div>
                    <div>
                        <p>Do not have an account? Please <Link className='text-red-500' to='/signup'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;