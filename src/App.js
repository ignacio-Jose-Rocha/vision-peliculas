import { useState, useEffect } from 'react';
import Login from './components/Login';
import Listado from './components/Listado';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Favoritos from './components/Favoritos';
import Detalle from './components/Detalle';
import './css/bootstrap.min.css';
import './css/App.css';
import Resultados from './components/Resultados';
function App() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favs = localStorage.getItem('favs');
    if (favs !== null) {
      const favsArray = JSON.parse(favs);
      setFavoritos(favsArray)
    }
  }, []);

  const addOrRemoveFavourite = (movie) => {
    const favMovies = localStorage.getItem('favs');
    let tempMovies;
    if (favMovies === null) {
      tempMovies = [];
    } else {
      tempMovies = JSON.parse(favMovies);
    }


    const btn = movie.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {
      imgURL, title, overview,
      id: btn.dataset.movieId
    }
    let movieIsInArray = tempMovies.find(oneMovie => {
      return oneMovie.id === movieData.id;
    });
    if (!movieIsInArray) {

      tempMovies.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMovies));
      setFavoritos(tempMovies);
      console.log('se agrego a favoritos');
    }
    else {
      let borrar = tempMovies.filter(oneMovie => {
        return oneMovie.id !== movieData.id;
      });
      localStorage.setItem('favs', JSON.stringify(borrar));
      setFavoritos(borrar);
      console.log('se borro de favoritos');

    }
  }


  return (
    <>
      <div className="header">
        <Header favoritos={favoritos}/>
      </div>

      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/Listado' render={(props) => <Listado addOrRemoveFavourite={addOrRemoveFavourite}{...props} />} />
        <Route path='/Detalle' component={Detalle} />
        <Route path='/Resultados' render={(props) => <Resultados addOrRemoveFavourite={addOrRemoveFavourite}{...props} />} />
        <Route path='/Favoritos' render={(props) => <Favoritos favoritos={favoritos} addOrRemoveFavourite={addOrRemoveFavourite}{...props} />} />

      </Switch>




    </>
  );
}

export default App;
