import React from 'react';
import { useGetTeamQuery } from '../redux/features/teamSlice';
import SingleTeam from './SingleTeam';

const TeamMembars = () => {

    const { data: teams, isLoading, isError } = useGetTeamQuery()

    ///Data Fetching 

    let content;

    if (isLoading) {
        content = <div>Loading...</div>
    }
    if (!isLoading && isError) {
        content = <div>There was an error occured</div>
    }
    if (!isLoading && !isError && teams.length === 0) {
        content = <div>No Projects Found</div>
    }
    if (!isLoading && !isError && teams.length > 0) {
        content = teams?.map(team => <SingleTeam team={team} key={team.id} />)
    }

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold">Team Members</h3>
            {content}
        </div>
    );
};

export default TeamMembars;