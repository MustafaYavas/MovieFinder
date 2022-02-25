import styles from './MainNavigation.module.css';

import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { Navbar, Container, Nav } from  'react-bootstrap'

const MainNavigation = () => {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(authActions.logoutHandler());
        navigate('/login', { replace: true });
    }

    return (
  
        <Navbar collapseOnSelect expand='sm' bg='dark' variant='dark' sticky='top'>
            <Container>
                <NavLink to='/home' className={navData => navData.isActive ? 'text-danger text-decoration-none fs-5' : 'text-decoration-none text-light fs-5'}>
                        <i className='fas fa-meteor me-2'></i>
                        MovieFinder
                </NavLink>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                
                <Navbar.Collapse id='responsive-navbar-nav ' className='justify-content-end'>
                    <Nav>
                        {
                            authState.isLoggedIn && <NavLink to='/my-list' className={navData => navData.isActive ? 'nav-link text-danger me-5 text-decoration-none fs-5' : 'nav-link me-5 text-decoration-none text-light fs-5' }>My List</NavLink>
                        }

                        {
                            !authState.isLoggedIn && <NavLink to='/login' className={navData => navData.isActive ? 'nav-link text-danger text-decoration-none fs-5 me-5' : 'nav-link text-decoration-none text-light fs-5 me-5' }>Login</NavLink>
                        }

                        {
                            authState.isLoggedIn && <NavLink to='/profile' className={navData => navData.isActive ? 'nav-link text-danger text-decoration-none fs-5 me-5' : 'nav-link text-decoration-none text-light fs-5 me-5' }>Profile</NavLink>
                        }

                        {
                            authState.isLoggedIn && <button onClick={logoutHandler} className={`text-start nav-link fs-5 text-light ${styles.button}`}>Logout</button>
                        }
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default MainNavigation;