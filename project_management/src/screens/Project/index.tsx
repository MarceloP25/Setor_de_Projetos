import React, { useState, useEffect } from 'react';
import { db } from '../../services/config'
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './styles.css';

interface Project {
    id: string;
    nomeProjeto: string;
}

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsRef = collection(db, "projetos");
                const querySnapshot = await getDocs(projectsRef);
                const projectsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    nomeProjeto: doc.data().nomeProjeto
                }));
                setProjects(projectsData);
            } catch (error) {
                console.error("Erro ao buscar projetos:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="container">
            <h2>Lista de Projetos</h2>
            <div className="buttons-container">
                <Link to="/projetos/cadastrar" className="btn primary">
                    Cadastrar Projeto
                </Link>
                <Link to="/avaliadores" className="btn secondary">
                    Avaliadores
                </Link>
            </div>
            <div className="projects-list">
                {projects.map(project => (
                    <div key={project.id} className="project-item">
                        <Link to={`/projetos/${project.id}`}>
                            {project.nomeProjeto}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;