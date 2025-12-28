import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import styles from './Footer.module.css';


function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>

                {/* Facebook */}
                <li>
                    <FaFacebook
                        as="a"
                        onClick={() => window.open('https://www.facebook.com', '_blank')}
                        style={{ cursor: 'pointer' }}
                    />
                </li>

                {/* Instagram */}
                <li>
                    <FaInstagram
                        as="a"
                        onClick={() => window.open('https://www.instagram.com', '_blank')}
                        style={{ cursor: 'pointer' }}
                    />
                </li>

                {/* LInkedin */}
                <li>
                    <FaLinkedin
                        as="a"
                        onClick={() => window.open('https://www.linkedin.com', '_blank')}
                        style={{ cursor: 'pointer' }}
                    />
                </li>

            </ul>
            
            <p className={styles.copy_right}>
                <span >
                    Costs
                </span>
                &copy; 2025
            </p>
        </footer>
    )
}

export default Footer