import { Redirect } from "react-router-dom";
function Favoritos(props) {
    /*const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const favs = localStorage.getItem('favs');
        if (favs !== null) {
            const favsArray = JSON.parse(favs);
            setFavoritos(favsArray)
        }
    }, []);*/
    let token = sessionStorage.getItem('token');
    return (
        <>
            {
                !token && <Redirect to='/' />
            }
            <h2>Seccion de favoritos</h2>


            <span className="text-success">
                {props.favoritos.length > 0 && <>PELICULAS EN FAVORITOS:{props.favoritos.length}</>}
            </span>

            <div className='row'>
                {
                    props.favoritos.map((oneMovie, idx) => {
                        return (
                            <div className='col-3' key={idx}>
                                <div className="card my-4">
                                    <img src={oneMovie.imgURL} class="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{oneMovie.title.substring(0, 30)}...</h5>
                                        <p className="card-text">{oneMovie.overview.substring(0, 100)}...</p>

                                        <div className='contenedor'>



                                            {/*<Link to={`/Detalle?movieID=${oneMovie.id}`} className="btn btn-primary">detalles</Link>*/}
                                        </div>
                                    </div>
                                    <button
                                        className='btn btn-danger'
                                        onClick={props.addOrRemoveFavourite}
                                        data-movie-id={oneMovie.id}>eliminar</button>
                                </div>

                            </div>

                        )
                    })

                }



            </div>

        </>
    )
}

export default Favoritos;
