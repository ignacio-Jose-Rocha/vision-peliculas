import { Link } from 'react-router-dom';
function Footer() {
    return (
        <footer>
            <button className="btn btn-primary bg-white" onClick={(e) => {
                sessionStorage.clear(e);
            }}><Link to="/">Logout</Link></button>


        </footer>
    )
}

export default Footer;