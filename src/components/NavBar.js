import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearch, updateFilters } from '../redux/features/filterSlice';


const NavBar = () => {
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch(updateFilters({ search: e.target.value }))
    }



    return (
        <nav className="container relative py-3">
            <div className="flex items-center justify-between">
                <Link to='/' >
                    <img src="/images/logo.svg" alt='logo' />
                </Link>
                <div className="flex-1 max-w-xs search-field group">
                    <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500" />
                    <input
                        onChange={handleChange}
                        type="text" placeholder="Search Task" className="search-input text-gray-800 " id="lws-searchTask" />
                </div>
            </div>
        </nav >
    );
};

export default NavBar;