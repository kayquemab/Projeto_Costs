import Styles from './Projects.module.css'
import { useLocation } from "react-router-dom"
import Menssage from "../layout/Menssage"
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import { useEffect, useState } from 'react'
import Loading from '../layout/Loading'

function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [ProjectsMenssage, setProjectsMenssage] = useState('')

    const location = useLocation()
    let menssage = ''
    if (location.state) {
        menssage = location.state.menssage
    }

    useEffect(() => {
        fetch('http://localhost:5000/Projects', {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(data => setProjects(data))
        .catch(err => console.log(err))
        .finally(() => setRemoveLoading(true)) // garante que loading desapareça
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/Projects/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectsMenssage("Projeto Removido com Sucesso!")
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <div className={Styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>

            <div className={Styles.project_container}>
                {menssage && <Menssage type="success" msg={menssage} />}
                {ProjectsMenssage && <Menssage type="success" msg={ProjectsMenssage} />}

                <Container customClass="start">
                    <div className={Styles.projects_grid}>
                        {projects.length > 0 &&
                            projects.map((project) => (
                                <div key={project.id} className={Styles.project_item}>
                                    <ProjectCard
                                        id={project.id}
                                        name={project.name}
                                        budget={project.budget}
                                        category={project.category?.name || "Sem categoria"}
                                        key={project.id}
                                        handleRemove={removeProject}
                                    />
                                </div>
                            ))
                        }
                    </div>

                    {!removeLoading && <Loading />}
                    {removeLoading && projects.length === 0 && (
                        <p>Não há projetos cadastrados!</p>
                    )}
                </Container>
            </div>
        </>
    )
}

export default Projects
