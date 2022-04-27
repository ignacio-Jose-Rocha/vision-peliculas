import { Link, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import Footer from './Footer';
function Listado(props) {
    let token = sessionStorage.getItem('token');
    console.log(props);
    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=595c4ca17ecddffb45cee419c3944b88&language=es-ES&page=1';
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMoviesList(apiData.results);
            })
            .catch(error => {
                swal(<h2>hubo errores con la api</h2>)
            })
    }, [setMoviesList]);
    return (
        <>
            {
                !token && <Redirect to='/' />
            }
            <div className='row'>
                
                {
                    moviesList.map((oneMovie, idx) => {
                        return (
                            <div className='col-3' key={idx}>
                                <div className="card">
                                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} class="card-img-top" alt="..." />
                                    <button
                                        className='favourite-btn'
                                        onClick={props.addOrRemoveFavourite}
                                        data-movie-id={oneMovie.id}>🖤</button>
                                    <div className="card-body">
                                        <h5 className="card-title">{oneMovie.title}</h5>
                                        <p className="card-text">{oneMovie.overview.substring(0, 100)}...</p>
                                        <div className='contenedor'>
                                            <Link to={`/Detalle?movieID=${oneMovie.id}`} className="btn btn-primary">detalles</Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    })

                }



            </div>


            <div class="contenedor">
                <Footer />
            </div>

        </>
    )
}

export default Listado;