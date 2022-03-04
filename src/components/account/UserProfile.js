import profileImg from '../../assets/profile.png';
import LoadingSpinner from '../UI/LoadingSpinner';

import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { convertToDate } from '../../store/utility-actions';

const UserProfile = () => {
    const authState = useSelector(state => state.auth);
    const [accountInfos, setAccountInfos] = useState({});
    

    const getUserData = useCallback( async() => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_KEY}`, {
            method: 'POST',
            body: JSON.stringify({
                idToken: authState.token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        const createDate = convertToDate(new Date(parseInt(data.users[0].createdAt)));
        const email = data.users[0].email;
        const lastLogin = convertToDate(new Date(parseInt(data.users[0].lastLoginAt)));
        const passwordUpdate = convertToDate(new Date(parseInt(data.users[0].passwordUpdatedAt)));

        setAccountInfos({
            createDate, email, lastLogin, passwordUpdate
        });

    }, [authState.token])

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    
    return (
        <>
            <div className='container text-light'>
                <div className='row mt-5'>
                    <div className='col-sm-12 mb-5 border-bottom border-danger'>
                        <h1 className='text-danger text-center'>Your Account</h1>
                    </div>
                    <div className='col-sm-12 col-md-4  d-flex justify-content-center'>
                        <img className='border rounded bg-danger' src={profileImg} alt='profile_img'/>
                    </div>

                    <div className='col-sm-12 col-md-8 mt-3 mt-sm-0'>
                        <div className='d-flex justify-content-between'>
                            <p className='d-inline me-5'>E-mail:</p>
                            {
                                !accountInfos.email && <LoadingSpinner />
                            }
                            {
                                accountInfos.email && <p className='d-inline ms-5 fw-bold'>{`${accountInfos.email}`}</p>
                            }
                        </div>

                        <div className='d-flex justify-content-between'>
                            <p className='d-inline me-5'>Account Create Date:</p>
                            {
                                !accountInfos.email && <LoadingSpinner />
                            }
                            {
                                accountInfos.email && <p className='d-inline ms-5 fw-bold'>{`${accountInfos.createDate}`}</p>
                            }
                            
                        </div>

                        <div className='d-flex justify-content-between'>
                            <p className='d-inline me-5'>Last Login:</p>
                            {
                                !accountInfos.email && <LoadingSpinner />
                            }
                            {
                                accountInfos.email && <p className='d-inline ms-5 fw-bold'>{`${accountInfos.lastLogin}`}</p>
                            }
                            
                        </div>

                        <div className='d-flex justify-content-between'>
                            <p className='d-inline me-5'>Password Update Date:</p>
                            {
                                !accountInfos.email && <LoadingSpinner />
                            }
                            {
                                accountInfos.email && <p className='d-inline ms-5 fw-bold'>{`${accountInfos.passwordUpdate}`}</p>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;
