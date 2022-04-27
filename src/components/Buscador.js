import swal from '@sweetalert/with-react';
import { useHistory } from 'react-router-dom';
let token = sessionStorage.getItem('token');
function Buscador() {
    const history = useHistory();
    const submitHandler = (e) => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();
        if (keyword.length < 2 && token) {
            swal(<h2>escribe una palabra clave</h2>)
        }
        else {
            e.currentTarget.keyword.value = '';
            if (token !== null) {

                history.push(`resultados?keyword=${keyword}`);
            }
        }

    }


    return (
        <>


            <form className="d-flex align-items-center" onSubmit={submitHandler}>
                <label className="form-label mb-0 mx-2">
                    <input className="form-control " type="text" name="keyword" placeholder="buscar" />
                </label>


                <button className="btn btn-success ml-3" type="submit">
                    Buscar</button>


            </form>



        </>
    )
}

export default Buscador;
