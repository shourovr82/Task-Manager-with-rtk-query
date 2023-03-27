import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProjectsQuery } from '../redux/features/projectSlice';
import { useEditTaskMutation, useGetSingleTaskQuery } from '../redux/features/taskSlice';
import { useGetTeamQuery } from '../redux/features/teamSlice';

const Edit = () => {

    const navigate = useNavigate()

    const { register, handleSubmit } = useForm();
    const { data: projectName, } = useGetProjectsQuery()
    const { data: teams } = useGetTeamQuery()

    const [editTask] = useEditTaskMutation()

    const { id } = useParams();

    const { data: getTask, isLoading } = useGetSingleTaskQuery(id)

    if (isLoading) {
        return <div>Loading...</div>
    }


    const handelEdit = (data) => {
        const teamImage = teams.find(t => t.name === data.teamMember)

        const projectname = projectName.find(p => p.projectName === data.projectName)

        const task = {
            ...data,
            teamMember: teamImage,
            project: projectname
        }
        editTask({ id, task })
        navigate('/')
    }

    return (
        <div className="container relative">
            <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                    Edit Task for Your Team
                </h1>
                <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
                    <form onSubmit={handleSubmit(handelEdit)} className="space-y-6">
                        <div className="fieldContainer">
                            <label htmlFor="lws-taskName">{getTask.taskName}</label>
                            <input {...register("taskName")} defaultValue={getTask.taskName} type="text" name="taskName" id="lws-taskName" required placeholder="Implement RTK Query" />
                        </div>
                        <div className="fieldContainer">
                            <label>Assign To</label>
                            <select {...register("teamMember")} name="teamMember" id="lws-teamMember" required>
                                <option defaultValue={getTask.teamMember.name} hidden >{getTask.teamMember.name}  </option>
                                {
                                    teams?.map(team =>
                                        <option value={team.name} key={Math.random()} >{team.name}</option>
                                    )
                                }
                            </select>


                            {/* <select name="teamMember" id="lws-teamMember" required>

                                <option defaultValue={getTask.teamMember.name} >{getTask.teamMember.name}</option>

                            </select> */}
                        </div>
                        <div className="fieldContainer">
                            <label htmlFor="lws-projectName">Project Name</label>
                            <select {...register("projectName")} id="lws-projectName" name="projectName" required>

                                <option defaultValue={getTask.project.projectName} hidden >{getTask.project.projectName}  </option>
                                {
                                    projectName?.map(project => <option value={project.projectName} key={Math.random()}>
                                        {project.projectName}
                                    </option>)
                                }
                            </select>


                            {/* <select id="lws-projectName" name="projectName" required>
                                <option >
                                    {getTask.project.projectName}
                                </option>

                            </select> */}
                        </div>
                        <div className="fieldContainer">
                            <label htmlFor="lws-deadline">Deadline</label>
                            <input {...register("deadline")} defaultValue={getTask.deadline} type="date" name="deadline" id="lws-deadline" required />
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

export default Edit;