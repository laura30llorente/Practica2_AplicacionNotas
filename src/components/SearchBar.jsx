// FILTRADO Y BUSQUEDA
/* 
    Añade una función de búsqueda para filtrar notas por contenido o título.
    Utiliza useState para manejar el estado del término de búsqueda.
*/

// Importamos React y el hook useState desde la biblioteca React
import React, { useState } from 'react';

// Importamos el estilo del componente SearchBar
import '../css/SearchBar.css'

// Definimos el componente funcional SearchBar, que recibe una función onSearch como prop
function SearchBar({ onSearch }) {
    // Utilizamos el estado para almacenar el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    // Manejamos cambios en el input de búsqueda
    const handleInputChange = (event) => {
        // Actualizamos el estado con el término de búsqueda
        setSearchTerm(event.target.value);

        // Llamamos a la función pasada por el padre con el término de búsqueda actualizado
        onSearch(event.target.value);
    };

    // Renderizamos el componente SearchBar
    return (
        <div className="search-bar-container my-3">
            {/* Input de búsqueda */}
            <input
                type="text"
                placeholder="Buscar por título o contenido..."
                className="search-bar-input"
                // Valor del input vinculado al estado local searchTerm
                value={searchTerm}
                // Manejamos cambios en el input llamando a la función handleInputChange
                onChange={handleInputChange}
            />
        </div>
    );
}

// Exportamos el componente SearchBar
export default SearchBar;