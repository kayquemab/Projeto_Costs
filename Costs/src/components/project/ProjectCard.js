import { Link } from 'react-router-dom'
import Styles from './ProjectCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjectCard({ id, name, budget, category, handleRemove }) {
  const remove = () => handleRemove(id)

  // fallback simples
  const cat = (category || 'Indefinida').toLowerCase()
  
  
  return (
    <div className={Styles.project_card}>
      <h4>{name}</h4>

      <p>
        <span>Orçamento: </span> R${budget}
      </p>

      <p className={Styles.category_text}>
        <span className={Styles[cat] || Styles['default-category']}></span> {category || 'Indefinida'}
      </p>

      <div className={Styles.project_card_actions}>
        <Link to={`/project/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  )
}

export default ProjectCard
