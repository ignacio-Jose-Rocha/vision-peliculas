import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function Detalle() {
    let token = sessionStorage.getItem('token');
    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');
    const [movie, setMovie] = useState(null);
    useEffect(() => {

        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=595c4ca17ecddffb45cee419c3944b88&language=es-ES`;
        axios.get(endPoint).then(response => {
            const apiData = response.data;
            setMovie(apiData);

        })
            .catch(error => {
                console.log("hubo errores con la api");
            })
    }, [movieID]);

    return (
        <>
            {
                !token && <Redirect to='/' />
            }

            <div className="contenedor">
                <h2>Detalle de la pelicula</h2>
            </div>
            {!movie && <div className="contenedor"><div class="lds-dual-ring"></div></div>}


            {movie && <>
                <div className='contenedor'>
                    <h2>TITULO:{movie.title}</h2>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} class="img-fluid" alt="movie" />
                    </div>
                    <div className='col-8'>


                        <h5>rating {movie.vote_average}</h5>
                        <h5>fecha de estreno:{movie.release_date}</h5>
                        <h5>generos:</h5>
                        <ul>
                            {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                        </ul>

                        <h5>Critica</h5>
                        <h5>{movie.overview}</h5>

                    </div>
                </div>
            </>}
        </>
    )
}

export default Detalle;