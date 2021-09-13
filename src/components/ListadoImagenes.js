import React from 'react';
import Imagen from './Imagen';

const ListadoImagenes = ({resultadoImagen}) => {
    
    return ( 
        <div className="col-12 p-5 row">
            {resultadoImagen.map(elemento => (
                <Imagen 
                    key={elemento.id}
                    elemento={elemento}
                />
            ))}
        </div>
    )
}
 
export default ListadoImagenes;