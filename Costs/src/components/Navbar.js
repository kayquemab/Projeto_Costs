import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../img/costs_logo.png'

import Container from './layout/Container';

function Navbar() {
    return (

        // Navegação
        <nav className={styles.navbar}>

            {/* Container (Logo + Lista) */}
            <Container>

                {/* Logo */}
                <Link to="/">
                    <img src={logo} alt="Costs" />
                </Link>

                {/* Lista */}
                <ul className={styles.list}>

                    {/* Home */}
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>

                    {/* Meus Projetos */}
                    <li className={styles.item}>
                        <Link to="/Projects">Meus Projetos</Link>
                    </li>

                    {/* Sobre */}
                    <li className={styles.item}>
                        <Link to="/Company">Sobre</Link>
                    </li>

                    {/* Contato */}
                    <li className={styles.item}>
                        <Link to="/Contact">Contato</Link>
                    </li>


                </ul>

            </Container>

        </nav>
    )
}

export default Navbar




