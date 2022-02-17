import styles from './Hero.module.css';
import SearchBar from './SearchBar';

const Hero = () => {
    return (
        <>
            <div className={`text-danger d-flex flex-column justify-content-center align-items-center ${styles['hero-img']}`}>
                <div>
                    <i className="fab fa-galactic-senate fs-4 text-warning my-3 mx-3" />
                    <i className="fas fa-user-astronaut fs-4 text-secondary my-3 mx-3" />
                    <i className="fab fa-jedi-order fs-4 text-primary my-3 mx-3" />
                </div>
                <h1>Search Movies</h1>
            </div>
            <SearchBar />
        </>
    )
}

export default Hero;
