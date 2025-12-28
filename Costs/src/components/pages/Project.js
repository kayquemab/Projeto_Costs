import { useParams } from 'react-router-dom';
import Styles from './Project.module.css';
import { useEffect, useState } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Menssage from '../layout/Menssage';
import ServiceForm from '../service/ServiceForm';

import { v4 as uuidv4 } from 'uuid'
import ServiceCard from '../service/ServiceCard';

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiveForm, setShowServiceForm] = useState(false);
  const [messageInfo, setMessageInfo] = useState(null); // estado único para msg
  const [services, setServices] = useState([])

  useEffect(() => {
    // Para ver o loading
    setTimeout(
      () =>
        fetch(`http://localhost:5000/Projects/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data)
            setServices(data.services || [])
          }),
      0,
    )
  }, [id])

  function editPost(updatedProject) {
    if (updatedProject.budget < updatedProject.cost) {
      setMessageInfo({
        text: "O orçamento não pode ser menor que o custo do projeto",
        type: "error",
        id: Date.now(), // força recriar Menssage
      });
      return false;
    }

    fetch(`http://localhost:5000/Projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProject),
    })
      .then(resp => resp.json())
      .then(data => {
        setProject(data);
        setShowProjectForm(false);

        setMessageInfo({
          text: "Projeto atualizado com sucesso!",
          type: "success",
          id: Date.now(),
        });
      })
      .catch(err => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiveForm);
  }

  function createService(project) {
    const list = Array.isArray(project.services) ? [...project.services] : [];
    const lastService = list[list.length - 1];

    if (!lastService) {
      setMessageInfo({ text: "Adicione um serviço válido antes de salvar.", type: "error", id: Date.now() });
      return false;
    }

    // Helpers: trabalha em centavos p/ evitar 149.9999
    const cents = (n) => Math.round((Number(n) || 0) * 100);

    const lastCostC = cents(lastService.cost);
    const currentCostC = cents(project.cost);
    const budgetC = cents(project.budget);

    // garante id e mantém cost coerente (2 casas)
    const serviceWithId = { ...lastService, id: lastService.id || uuidv4(), cost: lastCostC / 100 };
    const newCostC = currentCostC + lastCostC;

    if (newCostC > budgetC) {
      setMessageInfo({ text: "Orçamento ultrapassado, verifique o valor do serviço!", type: "error", id: Date.now() });
      list.pop();
      return false;
    }

    const updatedServices = [...list.slice(0, -1), serviceWithId];
    const updatedProject = { ...project, services: updatedServices, cost: newCostC / 100 };

    return fetch(`http://localhost:5000/Projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProject),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setServices(data.services || []);
        setMessageInfo({ text: "Serviço adicionado com sucesso!", type: "success", id: Date.now() });
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  }


  function removeService(serviceId, serviceCost) {
    // helpers: trabalha em centavos
    const cents = (n) => Math.round((Number(n) || 0) * 100);

    const updatedServices = (project.services || []).filter(
      (s) => s.id !== serviceId
    );

    const newCostC = Math.max(0, cents(project.cost) - cents(serviceCost));

    const updatedProject = {
      ...project,
      services: updatedServices,
      cost: newCostC / 100, // volta para reais
    };

    fetch(`http://localhost:5000/Projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProject),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Erro ao atualizar projeto");
        }
        return resp.json();
      })
      .then((data) => {
        setProject(data);
        setServices(data.services || []);
        setMessageInfo({
          text: "Serviço removido com sucesso!",
          type: "success",
          id: Date.now(),
        });
      })
      .catch((err) => {
        console.error(err);
        setMessageInfo({
          text: "Erro ao remover serviço",
          type: "error",
          id: Date.now(),
        });
      });
  }




  return (
    <>
      {project.name ? (
        <div className={Styles.project_details}>

          <Container custonClass="column">

            {messageInfo && (
              <Menssage
                key={messageInfo.id}
                type={messageInfo.type}
                msg={messageInfo.text}
              />
            )}

            <div className={Styles.details_container}>
              <h1>Projeto:  {project.name}</h1>
              <button className={Styles.btn} onClick={toggleProjectForm}>
                {showProjectForm ? 'Fechar' : 'Editar Projeto'}
              </button>

              {showProjectForm ? (
                <div className={Styles.projects_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    bntText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              ) : (
                <div className={Styles.projects_info}>
                  <p><span>Categoria: </span> {project.category?.name ?? 'Sem categoria'}</p>
                  <p><span>Total do orçamento: </span> R${project.budget}</p>
                  <p><span>Total utilizado: </span> R${project.cost}</p>
                </div>
              )}
            </div>

            <div className={Styles.service_form_container}>
              <h2>Adicione um serviço:</h2>

              <button className={Styles.btn} onClick={toggleServiceForm}>
                {showServiveForm ? 'Fechar' : 'Adicionar Serviço'}
              </button>

              <div className={Styles.projects_info}>
                {showServiveForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    projectData={project}
                    btnText="Adicionar Serviço"
                  />
                )}
              </div>

            </div>


            <div>

              <h2>Serviços:</h2>

              <Container custonClass="start">
                {services.length > 0 &&
                  services.map((service) => (
                    <ServiceCard

                      id={service.id}
                      name={service.name}
                      cost={service.cost}
                      description={service.description}
                      key={service.id}
                      handleRemove={removeService}

                    />
                  ))
                }
                {services.length === 0 && <p>Não há serviços cadastrados!</p>}

              </Container>

            </div>


          </Container>

        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
