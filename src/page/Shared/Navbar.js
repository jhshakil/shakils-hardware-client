import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
    const [user] = useAuthState(auth)
    const handleLogOut = () => {
        signOut(auth);
        localStorage.removeItem('accessToken')
    }
    const menuItem = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        <li><Link to='/blog'>Blog</Link></li>
        {/* <li><a href="https://jhshakil.github.io/protfolio-client/" target='_blank' rel='noopener noreferrer'>My Protfolio</a></li> */}
        <li><Link to='/myProtfolio'>My Protfolio</Link></li>
        {
            user ? <li><Link onClick={handleLogOut} to='/login'>Log Out</Link></li> : <li><Link to='/login'>Log In</Link></li>
        }


    </>
    return (
        <div className='bg-primary text-white'>
            <div className="navbar px-4 lg:px-16">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact bg-primary dropdown-content shadow w-52">
                            {menuItem}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl lg:text-3xl font-bold">Shakil's Hardware</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItem}
                    </ul>
                </div>
                <div className="navbar-end">
                    <label htmlFor="mobile-drawer" className="btn btn-primary drawer-button lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg></label>
                </div>
            </div>
        </div>
    );
};

export default Navbar;