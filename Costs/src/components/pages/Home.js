import styles from './Home.module.css';
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton';

function Home() {
  return (
    <section className={styles.home}>
      <h1>Bem-vindo ao <span>Costs</span></h1>
      <p>Começe a gerenciar seus projetos agora mesmo!</p>

      <LinkButton to="/newproject" text="Criar Projeto"/>
      <img src={savings} alt='Costs'/>
    </section>
  );
}

export default Home;