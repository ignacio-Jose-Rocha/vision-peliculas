import { Link } from 'react-router-dom';
import Buscador from './Buscador';
import { Redirect } from 'react-router-dom';
function Header(props) {

    let token = sessionStorage.getItem('token');
    return (

        <>
            {
                !token && <Redirect to='/' />
            }
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className='container'>
                        <div className='collapse navbar-collapse' id="navbarNav">

                            <ul className="navbar-nav">
                                <li className='nav-item'><Link
                                    className='nav-link' to="/">HOME</Link></li>
                                <li className='nav-item'><Link className="nav-link" to="/Listado">LIST</Link></li>
                                <li className='nav-item'><Link className="nav-link" to="/Favoritos">FAVORITOS</Link></li>


                            </ul>
                        </div>
                        <Buscador />
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;