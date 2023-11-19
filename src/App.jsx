// Importamos estilos globales para la aplicación desde el archivo App.css
import './App.css'

// Importamos React desde la biblioteca React
import React from 'react';

// Importamos el componente NoteList desde el archivo NoteList.jsx
import NoteList from './components/NoteList.jsx'

function App() {
  // Renderizamos el componente principal de la aplicación
  return (
    <>
      {/* Contenedor principal de la aplicación */}
      <div className="container mt-4">
        {/* Encabezado */}
        <div className="row mb-4">    
          <div className="col text-center">
            <h1> APLICACIÓN DE NOTAS </h1>
          </div>
        </div>

        {/* Renderizamos el componente NoteList, que maneja la lista de notas */}
        <NoteList />
      </div>
    </>
  );
}

// Exportamos el componente App
export default App;