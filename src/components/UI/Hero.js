import styles from './Hero.module.css';
import SearchBar from './SearchBar';

const Hero = () => {
    return (
        <>
            <div  className={`${styles['hero-height']} ${styles['hero-img']}`}>
                <h3 className='text-light text-center pt-5'>Welcome.</h3>
                <h3 className='text-light text-center pt-3'>Search movies and create your list!</h3>
            </div>
                                
            <SearchBar />
        </>
    )
}

export default Hero;
