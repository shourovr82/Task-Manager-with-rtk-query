import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFilters } from '../redux/features/filterSlice';
import { useGetProjectsQuery } from '../redux/features/projectSlice';
import SingleProjects from './SingleProjects';

const Projects = () => {

    const { data: projectName, isLoading, isError } = useGetProjectsQuery()


    const [activeProjects, setActiveProjects] = useState([])
    ///Data Fetching 

    const dispatch = useDispatch();

    useEffect(() => {
        if (projectName) {
            setActiveProjects(projectName)
        }
    }, [projectName])


    useEffect(() => {
        dispatch(updateFilters({ activeProjects }))

    }, [dispatch, activeProjects])





    let content;

    if (isLoading) {
        content = <div>Loading...</div>
    }
    if (!isLoading && isError) {
        content = <div>There was an error occured</div>
    }
    if (!isLoading && !isError && projectName.length === 0) {
        content = <div>No Projects Found</div>
    }
    if (!isLoading && !isError && projectName.length > 0) {
        content = projectName?.map(project => <SingleProjects project={project} key={project.id} activeProjects={activeProjects} setActiveProjects={setActiveProjects} />)
    }



    return (
        <div>
            <h3 className="text-xl font-bold">Projects</h3>
            {content}
        </div>
    );
};

export default Projects;