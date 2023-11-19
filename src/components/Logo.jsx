// LOGO DE LA APLICACION

// Importamos React desde la biblioteca React
import React from 'react';

// Importamos estilos del componente
import '../css/Logo.css'

// Ruta de la ubicación del logo
import logoImage from '../img/logo.png'; 

function Logo() {
    return (
        <img src={logoImage} alt="Logo de la aplicación de notas" />
    );
}

// Exportamos el componente Logo
export default Logo;