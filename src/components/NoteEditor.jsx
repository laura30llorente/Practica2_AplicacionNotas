// EDITOR DE NOTAS
/* 
    Crea un componente NoteEditor para añadir y editar notas.
    Utiliza useState para mantener el contenido de la nota actualmente en edición.
    Opcionalmente, utiliza useRef para manejar el enfoque del campo de texto.
*/

// Importación de uuidv4 desde la biblioteca 'uuid' para generar identificadores únicos
import { v4 as uuidv4 } from 'uuid';

// Importación de React y de los hooks useState, useRef y useEffect desde la biblioteca 'react'
import React, { useState, useRef, useEffect } from 'react';

// Importación del archivo de estilos asociado
import '../css/NoteEditor.css';

// Declaración del componente NoteEditor, que recibe las props de onSubmit y noteToEdit
function NoteEditor({ onSubmit, noteToEdit }) {

    // Estado para el título de la nota
    const [title, setTitle] = useState(''); 

    // Estado para el contenido de la nota
    const [content, setContent] = useState(''); 

    // Estado para el estilo del formulario
    const [formStyle, setFormStyle] = useState({});

    // Estado para el color
    const [color, setColor] = useState('#ffffff');   // Color por defecto

    // Creamos una referencia para el campo de texto
    const titleInputRef = useRef(null);

    // Función para cambiar el estilo del formulario cuando se guarda o edita una nota
    const updateFormStyle = () => {
        setFormStyle({
            backgroundColor: "#D4EDDA",   // Color de fondo
            borderRadius: '5px',   // Bordes redondeados
        });

        // Restablecemos el estilo después de 3 segundos
        setTimeout(() => setFormStyle({}), 3000);
    };

    useEffect(() => {
        if (noteToEdit) {   // Si hay una nota para editar (noteToEdit no es null)

            // Establecemos los campos del formulario (titulo y contenido) con los valores de la nota que se está editando
            setTitle(noteToEdit.title); 
            setContent(noteToEdit.content); 

            // Cargamos el color de la nota o usamos el color por defecto
            setColor(noteToEdit.color || '#ffffff'); 
        } else {   // Si no hay una nota para editar

            // Limpiamos los campos del formulario (titulo y contenido)
            setTitle(''); 
            setContent(''); 

            setColor('#ffffff'); // Restablecemos al color por defecto para una nueva nota
        }
    
        // Enfoca automáticamente el campo del título cuando el componente se monta o cuando cambia la nota a editar
        /* Considerando que el título es lo primero que un usuario querrá ingresar al crear una nueva nota, enfocamos el input del título.
        Eliminamos así la necesidad de que el usuario haga clic manualmente en el campo de titulo para empezar a escribir. */
        titleInputRef.current.focus();

    }, [noteToEdit]);   // Este efecto se ejecuta cuando el componente se monta y cada vez que cambia el valor de noteToEdit

    // Función que captura el título escrito por el usuario
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // Función que captura el contenido escrito por el usuario
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    // Manejador para el cambio de color
    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    // Llamamos al onSubmit del padre para que añada la nota
    const handleSend = (e) => {
        e.preventDefault();   // Previene el comportamiento predeterminado de recarga de página al enviar un formulario
    
        const now = new Date().toISOString();   // Fecha y hora actuales

        // Verificamos que tanto el título como el contenido de la nota no estén vacíos (después de eliminar espacios en blanco)
        if (title.trim() && content.trim()) {
            // Datos de la nota
            const noteData = {
                id: noteToEdit ? noteToEdit.id : uuidv4(),  // Usamos el ID existente para una nota que se está editando, o generamos un nuevo ID para una nota nueva
                title: title,  // Título de la nota
                content: content,  // Contenido de la nota
                color: color,  // Color seleccionado de la nota
                createdAt: noteToEdit ? noteToEdit.createdAt : now,  // Guardamos la fecha de creación original o establecemos una nueva
                updatedAt: now   // Siempre se actualiza la fecha de última modificación
            };
    
            onSubmit(noteData);  // Envíamos la nota (nueva o editada) al componente padre (NoteList) para su procesamiento
    
            setTitle('');   // Limpiamos el campo del título en el formulario
            setContent('');   // Limpiamos el campo del contenido en el formulario
            setColor('#ffffff');   // Restablecemos el color al valor por defecto, que va a ser blanco

            // Cambiamos el estilo del formulario para indicar éxito
            updateFormStyle();
        } else {
            // Si el título o el contenido están vacíos, mostramos una alerta al usuario
            alert("Por favor, ingrese tanto el título como el contenido de la nota.");
        }
    };

    return (
        <form className='note-editor-form' onSubmit={handleSend} style={formStyle}>
            {/* Campo de entrada para el título de la nota */}
            <input
                className='note-editor-title'
                type='text'
                placeholder="Título de la nota"
                name="title"
                value={title}
                // Manejamos el titulo de la nota que introduzca el usuario
                onChange={handleTitleChange}
                // Asignamos la referencia al elemento de input del título
                ref={titleInputRef}
            />
            
            {/* Área de texto para el contenido de la nota */}
            <textarea
                className='note-editor-content'
                placeholder="Contenido de la nota"
                name="content"
                value={content}
                // Manejamos el contenido de la nota que introduzca el usuario
                onChange={handleContentChange}
            />
            
            {/* Etiqueta para el selector de color */}
            <label className="note-color-picker-label">
                Elija un color:
            </label>

            {/* Selector de color para elegir el color de la nota */}
            <input
                className="note-color-picker"
                type='color'
                value={color}
                placeholder="Seleccionar color"
                // Manejamos el color que elija el usuario para la nota
                onChange={handleColorChange}
            />
            
            {/* Botón para guardar la nota */}
            <button className='note-editor-button'>
                Guardar nota
            </button>
        </form>
    ); 
}

// Exportación del componente NoteEditor
export default NoteEditor;