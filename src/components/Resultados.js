import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from '@sweetalert/with-react';
function Resultados() {
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');


    const [moviesResults, setMoviesResults] = useState([]);
    useEffect(() => {

        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=595c4ca17ecddffb45cee419c3944b88&language=en-US&page=1&include_adult=false&query=${keyword}`;
        axios.get(endPoint).then(response => {
            const apiData = response.data.results;
            if (apiData.length === 0) {

                swal(<h2>No se encontraron resultados</h2>);
            }
            setMoviesResults(apiData);

        })
            .catch(error => {
                console.log("hubo errores con la api");
            })
    }, [keyword]);


    return (
        <>
            <h1>Resultados de busqueda para: <em>{keyword}</em></h1>

            <div className='row'>
                {
                    moviesResults.map((oneMovie, idx) => {
                        return (
                            <div className='col-3' key={idx}>
                                <div className="card">
                                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} class="card-img-top" alt="..." />
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
        </>
    )
}

export default Resultados;