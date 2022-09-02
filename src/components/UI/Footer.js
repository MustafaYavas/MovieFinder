import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles['footer-basic']}>
            <div className={styles.social}>
                <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/mustafa-yavas-936431199/'>
                    <i className='fa-brands fa-linkedin'></i>
                </a>
                <a target='_blank' rel='noreferrer' href='https://github.com/MustafaYavas'>
                    <i className='fa-brands fa-github'></i>
                </a> 
            </div>

            <ul className={`${styles['list-inline']} d-flex justify-content-center align-self-center`}>
                <li><a href='/home'>Home</a></li>
                <li><a href='/home'>Services</a></li>
                <li><a href='/home'>About</a></li>
                <li><a href='/home'>Terms</a></li>
                <li><a href='/home'>Privacy Policy</a></li>
            </ul>
            <p className={styles.copyright}>MovieFinder © 2022</p>
        </footer>
    )
}
export default Footer;