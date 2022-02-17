import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={`${styles['footer-basic']} position-relative bg-dark text-light`}>
            <footer className='position-sticky'>
                <div className={styles.social}>
                    <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/mustafa-yavas-936431199/'>
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                    <a target='_blank' rel='noreferrer' href='https://github.com/MustafaYavas'>
                        <i className="fa-brands fa-github"></i>
                    </a>
                    
                </div>
                <ul className={`${styles['list-inline']} d-flex justify-content-center align-self-center`}>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/">Services</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Terms</a></li>
                    <li><a href="/">Privacy Policy</a></li>
                </ul>
                <p className={styles.copyright}>MovieFinder © 2022</p>
            </footer>
        </div>
    )
}
export default Footer;