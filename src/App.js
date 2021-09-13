import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {
  const [busqueda, setBusqueda] = useState('');
  const [resultadoImagen, setResultadoImagen] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalpaginas, setTotalPaginas] = useState(1);
  useEffect(() => {
    const consultarApi = async () => {
      if(busqueda==='') return null;
      const key="10849364-a6af642b4b2917b0e02b040aa";
      const ImgPorPagina = 30;
      const url =`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${ImgPorPagina}&page=${pagina}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      //console.log(resultado.hits);
      setResultadoImagen(resultado.hits);
      const calcularPaginas = Math.ceil(resultado.totalHits / ImgPorPagina);
      setTotalPaginas(calcularPaginas);
      // Mover la pantalla hacia arriba
      const jumbootron = document.querySelector('.jumbotron');
      jumbootron.scrollIntoView({behavior:'smooth'})
    };
    consultarApi();

  }, [busqueda, pagina]);
  const paginaAnterior = () => {
    const moverPaginaAnterior = pagina -1;
    if(moverPaginaAnterior === 0) return;
    setPagina(moverPaginaAnterior);

  }
  const paginaSiguiente = () => {
    const moverPaginaSiguiente = pagina +1;
    if(pagina > setTotalPaginas) return;
    setPagina(moverPaginaSiguiente)
  }

  return (
    <>
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario
          setBusqueda={setBusqueda}
        />
        <div className="row justify-content-center">
          <ListadoImagenes 
            resultadoImagen={resultadoImagen}
          />
          {(pagina === 1) ? null : <button
            onClick={paginaAnterior}
            type="button"
            className="btn btn-info mr-1"
          >  &laquo; Anterior </button>}

          {(pagina === totalpaginas )? null : <button
            onClick={paginaSiguiente}
            type="button"
            className="btn btn-info mr-1"
          > Siguiente &raquo; </button>}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
