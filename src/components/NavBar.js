import React from 'react';
import { Link } from "react-router-dom";

function NavBar(){
    return(
        <div className='navbar'>
            <div className='navbar-title'>掲示板</div>
            <ul className='navbar-menu'>
                <li><Link to="/new">スレッドをたてる</Link></li>
            </ul>
        </div>
    )
}

export default NavBar;