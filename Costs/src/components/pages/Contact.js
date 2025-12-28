import Styles from './Contact.module.css'
import Container from '../layout/Container'

function Contato() {
  return (
    <Container>
      <div className={Styles.contato_container}>
        <h1>Entre em contato</h1>
        <p>Envie sua mensagem para nossa equipe</p>

        <form className={Styles.form}>
          <div className={Styles.form_group}>
            <label htmlFor="nome">Nome:</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              placeholder="Digite seu nome:" 
            />
          </div>

          <div className={Styles.form_group}>
            <label htmlFor="email">E-mail:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Digite seu e-mail:" 
            />
          </div>

          <div className={Styles.form_group}>
            <label htmlFor="mensagem">Mensagem:</label>
            <textarea 
              id="mensagem" 
              name="mensagem" 
              placeholder="Digite sua mensagem:"
            ></textarea>
          </div>

          <button type="submit" className={Styles.btn}>Enviar Mensagem</button>
        </form>
      </div>
    </Container>
  )
}

export default Contato
