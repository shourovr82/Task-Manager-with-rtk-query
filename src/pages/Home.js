import React from 'react';
import DetailsProject from '../components/DetailsProject';
import Projects from '../components/Projects';
import TeamMembars from '../components/TeamMembars';

const Home = () => {
    return (
        <div className="container relative" >
            <div className="sidebar" >
                <Projects />
                <TeamMembars />
            </div>
            <div>
                <DetailsProject />
            </div>
        </div>
    );
};

export default Home;