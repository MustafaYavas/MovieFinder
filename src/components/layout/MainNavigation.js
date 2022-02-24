import styles from "./MainNavigation.module.css";

import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from "../../store/auth-slice";

const MainNavigation = () => {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(authActions.logoutHandler());
        navigate('/home', { replace: true });
    }

    return (
        <div className={`bg-dark ${styles['navbar-sticky']}`}>
            <div className={`container p-3 ${styles['navbar-logo']} ${styles['links-flex']}`}>
                <div>
                    <NavLink to="/home" className={navData => navData.isActive ? 'text-danger text-decoration-none fs-5' : 'text-decoration-none text-light fs-5'}>
                        <i className="fas fa-meteor me-2"></i>
                        MovieFinder
                    </NavLink>
                </div>
                <div>
                    {
                        authState.isLoggedIn && <NavLink to="/my-list" className={navData => navData.isActive ? 'text-danger me-5 text-decoration-none fs-5' : 'me-5 text-decoration-none text-light fs-5' }>My List</NavLink>
                    }

                    {
                        !authState.isLoggedIn && <NavLink to="/login" className={navData => navData.isActive ? 'text-danger text-decoration-none fs-5' : 'text-decoration-none text-light fs-5' }>Login</NavLink>
                    }

                    {
                        authState.isLoggedIn && <NavLink to="/profile" className={navData => navData.isActive ? 'text-danger text-decoration-none fs-5' : 'text-decoration-none text-light fs-5' }>Profile</NavLink>
                    }

                    {
                        authState.isLoggedIn && <button onClick={logoutHandler} className={`ms-5 fs-5 text-light ${styles.button}`}>Logout</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default MainNavigation;
