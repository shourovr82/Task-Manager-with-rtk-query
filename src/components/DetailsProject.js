import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useGetTaskQuery } from '../redux/features/taskSlice';
import SingleDetails from './SingleDetails';

const DetailsProject = () => {

    const { data: allTask, isLoading, isError } = useGetTaskQuery();
    const filter = useSelector(state => state?.filter);


    const filterByActiveProjects = (task) => {
        const { activeProjects } = filter;
        const taskExists = activeProjects.find(project => project.id === task.project.id && project.projectName.trim().toLowerCase() === task.project.projectName.trim().toLowerCase())
        if (taskExists) {
            return true;
        } else {
            return false
        }
    }


    const filterBySearchText = (task) => {
        const { search } = filter;
        if (search) {
            return task.taskName
                .trim()
                .toLowerCase()
                .includes(search.trim().toLowerCase())
        } else {
            return true;
        }
    }


    let content;

    if (isLoading) {
        content = <div>Loading...</div>
    }
    if (!isLoading && isError) {
        content = <div>There was an error occured</div>
    }
    if (!isLoading && !isError && allTask.length === 0) {
        content = <div>No Projects Found</div>
    }
    if (!isLoading && !isError && allTask.length > 0) {

        const taskToShow = allTask
            .filter(filterByActiveProjects)
            .filter(filterBySearchText)

        content = taskToShow.length > 0 ? taskToShow.map(task => <SingleDetails task={task} key={task.id} />) : "No Task Found"

        // content = allTask?.filter(t => (filter === 'all' ? true : t?.project.projectName)).filter(t => t?.taskName.toLowerCase().includes(search.toLowerCase())).map(task => <SingleDetails task={task} key={task.id} />)
    }

    return (
        <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
            <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
                    <Link to='/addNew' className="lws-addnew group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span className="group-hover:text-indigo-500">Add New</span>
                    </Link>
                </div>
                <div className="lws-task-list">
                    {content}
                </div>
            </main>
        </div>
    );
};

export default DetailsProject;