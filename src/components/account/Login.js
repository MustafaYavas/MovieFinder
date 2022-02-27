import styles from './Login.module.css';

import { useState, useRef } from 'react';
import {useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth-slice';
import { useDispatch } from 'react-redux'


const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const emailInputRef = useRef();
    const nameInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const switchAuthModeHandler = (e) => {
        e.preventDefault();
        setIsLogin(prevState => !prevState);
        emailInputRef.current.value = '';
        if(!isLogin) nameInputRef.current.value = '';
        passwordInputRef.current.value = ''
    }

    const authHandler = async(e) => {
        e.preventDefault();
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
                dispatch(authActions.loginHandler({
                    token: data.idToken,
                    email: enteredEmail,
                }));

                navigate('/home', { replace: true });
                
            } catch (error) {
                alert(error);
            }
    }

    return (        
        <div className=' d-flex flex-column justify-content-center align-items-center'>
            <h4 className="text-center text-danger mt-5 mb-3">{isLogin ? 'Login to MovieFinder' : 'Join Us!'}</h4>

            <form className={`rounded p-5 ${styles['form-bg']}`} onSubmit={authHandler}>
                <div className="mb-3 form-group">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="email"  ref={emailInputRef}/>
                </div>

                {
                    !isLogin &&
                    <div className="mb-3 form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" ref={nameInputRef} />
                    </div> 
                }

                <div className="mb-3 form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" ref={passwordInputRef}/>
                </div>

                <div className="mt-3">
                    <p className='text-dark'> {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <a href='/' onClick={switchAuthModeHandler} className={styles.link}>{isLogin ? 'Sign up' : 'Log in'}</a>
                    </p>
                </div>

                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-danger">{!isLogin ? 'Sign up' : 'Login'}</button>
                </div>
            </form>
        </div>
    )
}

export default Login;
