import Styles from './Company.module.css'
import Container from '../layout/Container'

import savings from '../../img/savings.svg'

function Sobre() {
  return (
    <Container>
      <div className={Styles.sobre_container}>
        <div className={Styles.sobre_texto}>
          <h1>Sobre a <span>Costs</span></h1>
          <p>O <strong>Costs</strong> é um sistema de gerenciamento de projetos
            desenvolvido para ajudar empresas e profissionais a
            organizarem seus orçamentos de forma prática e eficiente.</p>
          <div className={Styles.categorias}>
            <h2>Áreas que atendemos:</h2>
            <ul>
              <li>✔️ Infra</li>
              <li>✔️ Desenvolvimento</li>
              <li>✔️ Design</li>
              <li>✔️ Planejamento</li>
            </ul>
          </div>
        </div>

        <img className={Styles.img} src={savings} alt="Costs" />
      </div>

    </Container>
  )
}

export default Sobre
