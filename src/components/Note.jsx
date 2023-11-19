// NOTA INDIVIDUAL
/* 
    Crea un componente Note para representar una nota individual.
    Añade un botón para eliminar la nota.
    Utiliza propiedades para pasar la información de la nota desde NoteList a Note
*/

// Importamos React desde la biblioteca React
import React from 'react';

// Importamos el estilo del componente Note
import '../css/Note.css'

// Definimos el componente Note, que recibe varios props
function Note({ id, title, text, color, completed, createdAt, updatedAt, deleteNote, completeNote, editNote }) {
    // Establecemos el estilo del componente según el color de la nota
    const noteStyle = {
        backgroundColor: color,  // Aplicamos el color como fondo
    };

    // Renderizamos el componente Note con la información de la nota
    return (
        <div className={completed ? "note-container completed" : "note-container"} style={noteStyle}>

            {/* Título de la nota */}
            <div className="note-title">
                {title}
            </div>

            {/* Contenido de la nota */}
            <div className="note-content" 
                onClick={() => completeNote(id)}>     {/* Para completar la nota, hay que hacer click en el contenido y se tachará */}
                {text}
            </div>

            {/* Información de fechas */}
            <div className="note-dates">
                {/* Mostramos la fecha de creación de la nota */}
                <div> Creada: {new Date(createdAt).toLocaleDateString()} {new Date(createdAt).toLocaleTimeString()} </div>

                {/* Mostramos la fecha de la última modificación de la nota */}
                <div> Última modificación: {new Date(updatedAt).toLocaleDateString()} {new Date(updatedAt).toLocaleTimeString()} </div>
            </div>

            {/* Botones para eliminar y editar la nota */}
            <div className="row">
                <div className="col-12 col-md-6 mb-2 mb-md-0">
                    {/* Botón para eliminar la nota */}
                    <button className="btn btn-danger w-50" 
                        onClick={() => deleteNote(id)}>   {/* Funcion que elimina la nota por el id */}
                        Eliminar nota
                    </button>
                </div>
                <div className="col-12 col-md-6 mb-2 mb-md-0">
                    {/* Botón para editar la nota */}
                    <button className="btn btn-primary w-50" 
                        onClick={() => editNote({ id, title, text })}>  {/* Funcion que edita la nota por el id, el titulo y el contenido */}
                        Editar nota
                    </button>
                </div>
            </div>
        </div>
    );
}

// Exportamos el componente Note
export default Note;