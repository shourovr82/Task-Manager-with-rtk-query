import React from 'react';



const SingleProjects = ({ project, activeProjects, setActiveProjects }) => {
    const { id, projectName, colorClass } = project;

    const handleChange = (e, project) => {
        if (e.target.checked) {
            setActiveProjects([...activeProjects, project])
        } else {
            setActiveProjects(activeProjects.filter(p => p.id !== project.id))
        }
    }


    return (
        <div className="mt-3 space-y-4">
            <div className="checkbox-container">
                <input
                    id={id}
                    onChange={(e) => handleChange(e, project)}
                    checked={activeProjects.includes(project)}
                    value={projectName} type="checkbox" className={colorClass} defaultChecked />
                <p className="label">{projectName}</p>
            </div>
        </div>
    );
};

export default SingleProjects;