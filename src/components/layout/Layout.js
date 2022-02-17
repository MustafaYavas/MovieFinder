import Hero from "../UI/Hero";
import MainNavigation from "./MainNavigation";
import Footer from "../UI/Footer";
import { useLocation } from 'react-router-dom';

const Layout = (props) => {
    const location = useLocation();
    
    return (
        <>
            <MainNavigation />
            {location.pathname === '/home' ? <Hero /> : null}
            <main>{props.children}</main>
            <Footer />
        </>
    )
}

export default Layout;
