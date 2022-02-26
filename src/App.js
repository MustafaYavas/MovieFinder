import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import MyList from './pages/MyList';
import Movie from './pages/Movie';
import Login from './components/account/Login';
import NoPageFound from './components/UI/NoPageFound';
import Layout from './components/layout/Layout';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieData, sendCartData } from './store/movie-actions';
import { useEffect } from 'react';

let isInitial = true;

const App = () => {
    const authState = useSelector(state => state.auth);
    const movieState = useSelector(state => state.movie);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovieData(authState.userEmail))
    }, [dispatch, authState.userEmail])

    useEffect(() => {
        if(isInitial) {
            isInitial = false;
            return;
        }
        dispatch(sendCartData(movieState.userMovieList))
    }, [movieState.userMovieList, dispatch])


    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Navigate replace to='/home' />} /> 
                <Route path='/home' element={<HomePage />} />
                <Route path='/login' element={<Login />}/>
                <Route path='/movie/:id' element={<Movie />} />
                <Route path='/profile' element={!authState.isLoggedIn ? <Navigate replace to='/login' /> : <Profile />}/>
                <Route path='/my-list' element={!authState.isLoggedIn ? <Navigate replace to='/login' /> : <MyList />}/>
                
                <Route path="*" element={<NoPageFound />} />
            </Routes>
        </Layout>
    )
}

export default App;
