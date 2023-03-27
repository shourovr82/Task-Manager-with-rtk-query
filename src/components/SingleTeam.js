import React from 'react';

const SingleTeam = ({ team }) => {
    const { avatar, name } = team;

    return (
        <div className="mt-3 space-y-4">
            <div className="checkbox-container">
                <img src={avatar} className="team-avater" alt="avater" />
                <p className="label">{name}</p>
            </div>
        </div>
    );
};

export default SingleTeam;