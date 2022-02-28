import Hero from '../UI/Hero';
import MainNavigation from './MainNavigation';
import Footer from '../UI/Footer';
import { useLocation } from 'react-router-dom';

const Layout = (props) => {
    const location = useLocation();
    
    return (
        <div style={{backgroundColor: '#111111'}}>
            <MainNavigation />
            {location.pathname === '/home' ? <Hero /> : null}
            <main>{props.children}</main>
            <Footer />
        </div>
    )
}

export default Layout;
