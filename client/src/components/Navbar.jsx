import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return <div className=' bg-dark text-light p-3 mb-5 '>
        <div className="container d-flex gap-3">
            <Link to="/" className='nav-link'>Students</Link>
            <Link to="/subject" className='nav-link'>Subjects</Link>
            <Link to="/marks" className='nav-link'>Marks</Link>
        </div>
    </div>
}

export default Navbar