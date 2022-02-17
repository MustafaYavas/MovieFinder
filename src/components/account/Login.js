import styles from './Login.module.css';

import { useState, useRef } from 'react';
import {useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth-slice';
import { useDispatch } from "react-redux"

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const emailInputRef = useRef();
    const nameInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const switchAuthModeHandler = () => {
        setIsLogin(prevState => !prevState);
        emailInputRef.current.value = '';
        if(!isLogin) nameInputRef.current.value = '';
        passwordInputRef.current.value = ''
    }

    const authHandler = async() => {
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        let url = '';

        if(isLogin) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        }

        const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            try {
                if(!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error.message);
                }
                const data = await response.json();
                const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000))
                dispatch(authActions.loginHandler({
                    token: data.idToken,
                    email: enteredEmail,
                    expirationTime: expirationTime.toISOString()
                }));

                navigate('/home', { replace: true });
                
            } catch (error) {
                alert(error);
            }
    }

    return (
        <div className={`container mt-5 w-50 p-5 rounded ${styles['form-bg']}`}>
            
            <h3 className="text-center text-danger mb-5">{isLogin ? 'Login' : 'Join Us!'}</h3>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" ref={emailInputRef} placeholder="email@example.com" />
                <label htmlFor="email">Email address</label>
            </div>
            {
                !isLogin ? 
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="name" ref={nameInputRef} placeholder="Name" />
                    <label htmlFor="name">Name</label>
                </div> : null
            }
            <div className="form-floating">
                <input type="password" className="form-control" id="password" ref={passwordInputRef} placeholder="Password" />
                <label htmlFor="password">Password</label>
            </div>

            <div className="mt-3">
                <p className='text-light'> {isLogin ? "Don't have an account ?" : 'Already have an account ?'} <button onClick={switchAuthModeHandler} className={styles.button}>{isLogin ? 'Sign up' : 'Log in'}</button></p>
            </div>

            <div className="d-grid gap-2 mt-4">
                <button onClick={authHandler} className="btn btn-md btn-outline-danger">{!isLogin ? 'Sign up' : 'Login'}</button>
            </div>
        </div>
    )
}

export default Login;
