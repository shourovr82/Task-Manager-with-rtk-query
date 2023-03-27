import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useGetProjectsQuery } from '../redux/features/projectSlice';
import { useAddTaskMutation } from '../redux/features/taskSlice';
import { useGetTeamQuery } from '../redux/features/teamSlice';


const AddNew = () => {

    const { data: projectName, } = useGetProjectsQuery()
    const { data: teams } = useGetTeamQuery()

    const [addTask] = useAddTaskMutation()

    const { register, handleSubmit, reset } = useForm();

    const navigate = useNavigate()

    const handleAddTask = (data) => {
        const teamImage = teams.find(t => t.name === data.teamMember)

        const projectname = projectName.find(p => p.projectName === data.projectName)

        const task = {
            ...data,
            teamMember: teamImage,
            project: projectname
        }
        addTask(task)
        reset()
        navigate('/')
    }


    return (
        <div className="container relative">
            <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                    Create Task for Your Team
                </h1>
                <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
                    <form onSubmit={handleSubmit(handleAddTask)} className="space-y-6">
                        <div className="fieldContainer">
                            <label htmlFor="lws-taskName">Task Name</label>
                            <input {...register("taskName")} type="text" name="taskName" id="lws-taskName" required placeholder="Task Name" />
                        </div>
                        <div className="fieldContainer">
                            <label>Assign To</label>
                            <select {...register("teamMember")} name="teamMember" id="lws-teamMember" required>
                                {
                                    teams?.map(team =>
                                        <option value={team.name} key={Math.random()} >{team.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="fieldContainer">
                            <label htmlFor="lws-projectName">Project Name</label>
                            <select {...register("projectName")} id="lws-projectName" name="projectName" required>
                                {
                                    projectName?.map(project => <option value={project.projectName} key={Math.random()}>
                                        {project.projectName}
                                    </option>)
                                }
                            </select>
                        </div>
                        <div className="fieldContainer">
                            <label htmlFor="lws-deadline">Deadline</label>
                            <input {...register("deadline")} type="date" name="deadline" id="lws-deadline" required />
                        </div>
                        <div className="text-right">
                            <button type="submit" className="lws-submit">Save</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddNew;