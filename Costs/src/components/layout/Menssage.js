import { useState, useEffect } from 'react';
import styles from './Menssage.module.css';

function Menssage({ type, msg }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!msg) {
            setVisible(false);
            return;
        }

        // Reseta visibilidade para permitir reaparecer a mesma mensagem
        setVisible(false);
        const showTimer = setTimeout(() => setVisible(true), 0);

        const hideTimer = setTimeout(() => setVisible(false), 3000);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, [msg]);

    if (!visible) return null;

    return (
        <div className={`${styles.menssage} ${styles[type]}`}>
            {msg}
        </div>
    );
}

export default Menssage;
