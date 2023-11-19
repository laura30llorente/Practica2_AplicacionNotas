// LISTA DE NOTAS
/* 
    Crea un componente NoteList para mostrar todas las notas existentes.
    Utiliza el Hook useState para mantener una lista de notas. 
*/

// Importamos React y los hooks useState y useEffect desde la biblioteca React
import React, { useState, useEffect } from 'react';

// Importamos otros componentes
import Note from './Note.jsx';
import NoteEditor from './NoteEditor.jsx';
import SearchBar from './SearchBar.jsx';

// Importamos estilos del componente
import '../css/NoteList.css'

function NoteList() {
    // Estado para mantener la lista de notas utilizando el Hook useState
    const [notes, setNotes] = useState([]);

    // Estado para manejar la nota que se está editando actualmente
    const [editingNote, setEditingNote] = useState(null);

    // Estado para almacenar el término de búsqueda activo
    const [activeSearchTerm, setActiveSearchTerm] = useState("");

    // Estado para manejar mensajes de error durante la búsqueda
    const [searchError, setSearchError] = useState(""); 

    // Efecto que carga las notas desde el almacenamiento local (localStorage) cuando el componente se monta
    useEffect(() => {
        const savedNotes = localStorage.getItem('notes');
        
        // Si hay notas almacenadas
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []);   // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

    // Función para añadir o editar una nota
    const addOrEditNote = (note) => {
        // Verificamos que tanto el título como el contenido de la nota no estén vacíos (después de eliminar espacios en blanco)
        if (note.title.trim() && note.content.trim()) {
            let updatedNotes;
            // Verificamos si hay una nota en proceso de edición (editingNote no es null)
            if (editingNote) {
                // Si hay una nota en edición, mapeamos las notas y reemplazamos la nota actual con la nueva versión editada
                updatedNotes = notes.map(n => n.id === note.id ? note : n);

                // Limpiamos la nota en edición después de la edición
                setEditingNote(null);
            } else {
                // Si no hay una nota en edición, creamos un nuevo array de notas que incluya la nueva nota
                updatedNotes = [...notes, note];
            }
            // Actualizamos el estado de 'notes' con el nuevo array de notas
            setNotes(updatedNotes);
        }
    };

    // Función para eliminar una nota
    const deleteNote = (id) => {
        // Filtramos las notas y mantenemos solo aquellas cuyo ID no coincide con el proporcionado
        const updatedNotes = notes.filter(note => note.id !== id);

        // Actualizar el estado de 'notes' con el nuevo array de notas
        setNotes(updatedNotes);
    };

    // Función para tachar o destachar una nota
    const completeNote = (id) => {
        // Mapeamos las notas 
        const updatedNotes = notes.map(note => {
            // Cambiamos el estado "completed" de la nota con el ID proporcionado
            if(note.id === id) { note.completed = !note.completed; }
            return note;
        });

        // Actualizamos el estado de 'notes' con el nuevo array de notas
        setNotes(updatedNotes);
    };

    // Función para editar una nota
    const editNote = (note) => {
        setEditingNote(note);
    };

    // Efecto que guarda las notas en el almacenamiento local (localStorage) cada vez que se modifican
    useEffect(() => {
        // Si hay notas almacenadas
        if (notes.length > 0) {
            localStorage.setItem('notes', JSON.stringify(notes));
        } else {
            localStorage.setItem('notes', []);   // Para almacenar un array vacío si no hay notas
        }
    }, [notes]);  // Este efecto se ejecuta cada vez que el estado de 'notes' cambia

    // Función para manejar la búsqueda de notas
    const handleSearch = (searchTerm) => {
        // Verificamos si no hay notas guardadas
        if (!notes.length) {
            // Establecemos un mensaje de error si no hay notas, pero solo si hay un término de búsqueda
            setSearchError(searchTerm ? "No hay notas para buscar." : "");
            setActiveSearchTerm("");   // Limpiamos el término de búsqueda activo
            return;
        }

        setSearchError("");   // Limpiamos el mensaje de error si se está realizando una búsqueda
        setActiveSearchTerm(searchTerm.toLowerCase());   // Almacenamos el término de búsqueda en minúsculas para una búsqueda sin distinción entre mayúsculas y minúsculas
    };

    // Filtramos las notas según el término de búsqueda activo
    const filteredNotes = notes.filter(note =>
        // Filtramos las notas que coinciden con el término de búsqueda en el título o contenido
        note.title.toLowerCase().includes(activeSearchTerm) || 
        note.content.toLowerCase().includes(activeSearchTerm)
    );

    // Renderizamos el componente NoteList
    return (
        <div className="note-list row mb-4">
            {/* Sección de búsqueda de notas */}
            <div className="search-section row mb-4">
                {/* Llamamos al componente SearchBar y gestionamos la búsqueda con la función handleSearch */}
                <SearchBar onSearch={handleSearch} />
                {searchError && <div className="search-error">{searchError}</div>}
            </div>

            <h2>Insertar Nota</h2>
            
            {/* Sección para añadir y mostrar todas las notas */}
            <div className="add-note-section">
                {/* Llamamos al componente NoteEditor con la prop onSubmit */}
                <NoteEditor onSubmit={addOrEditNote} noteToEdit={editingNote} />
                
                {/* Mapeamos y renderizamos las notas filtradas */}
                {filteredNotes.map((note) => (
                    <Note 
                        key={note.id} 
                        id={note.id}
                        title={note.title}
                        text={note.content} 
                        color={note.color}    // Para pasar el color
                        completed={note.completed}
                        createdAt={note.createdAt}   // Para pasar la fecha de creación
                        updatedAt={note.updatedAt}   // Para pasar la fecha de última modificación
                        deleteNote={deleteNote}
                        completeNote={completeNote}
                        editNote={() => editNote(note)}
                    />
                ))}
            </div>
        </div>
    );
};

// Exportamos el componente NoteList
export default NoteList;