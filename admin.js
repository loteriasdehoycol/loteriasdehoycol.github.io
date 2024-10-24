// Recuperar los resultados del almacenamiento local o inicializar uno vacío
let resultados = JSON.parse(localStorage.getItem('resultados')) || { loterias: [], chances: [] };
let editIndex = null; // Para almacenar el índice del resultado que se está editando

// Elementos del DOM
const listaLoterias = document.getElementById('listaLoterias');
const listaChances = document.getElementById('listaChances');
const formulario = document.getElementById('formulario');
// Contraseña del admin
const contrasenaCorrecta = "@ndJos19"; // Cambia esto por tu contraseña real


// Mostrar los resultados actuales en la interfaz
function mostrarResultados() {
    listaLoterias.innerHTML = '';
    listaChances.innerHTML = '';

    resultados.loterias.forEach((loteria, index) => {
        listaLoterias.innerHTML += `
            <li>
                <img src="${loteria.logo}" alt="${loteria.nombre}" class="logo">
                <span>${loteria.nombre} - ${loteria.numero} - ${loteria.serie}</span>
                <span>${formatFecha(loteria.fecha)}</span>
                <button onclick="eliminarResultado('loterias', ${index})">Eliminar</button>
                <button onclick="editarResultado('loterias', ${index})">Editar</button>
            </li>`;
    });

    resultados.chances.forEach((chance, index) => {
        listaChances.innerHTML += `
            <li>
                <img src="${chance.logo}" alt="${chance.nombre}" class="logo">
                <span>${chance.nombre} - ${chance.numero} - ${chance.serie}</span>
                <span>${formatFecha(chance.fecha)}</span>
                <button onclick="eliminarResultado('chances', ${index})">Eliminar</button>
                <button onclick="editarResultado('chances', ${index})">Editar</button>
            </li>`;
    });
}

// Manejar el envío del formulario para agregar o editar un resultado
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const tipo = document.getElementById('tipo').value;
    const nombre = document.getElementById('nombre').value;
    const numero = document.getElementById('numero').value;
    const serie = document.getElementById('serie').value;
    const fecha = document.getElementById('fecha').value;
    const logoInput = document.getElementById('logo').files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
        const nuevoResultado = { nombre, numero, serie, fecha, logo: e.target.result };

        if (editIndex !== null) {
            // Editar resultado existente
            resultados[tipo][editIndex] = nuevoResultado;
            editIndex = null; // Resetear el índice de edición
        } else {
            // Agregar nuevo resultado
            resultados[tipo].push(nuevoResultado);
        }

        localStorage.setItem('resultados', JSON.stringify(resultados));
        mostrarResultados();
        formulario.reset();
        document.getElementById('submitBtn').textContent = 'Agregar Resultado'; // Restablecer el texto del botón
    };
    reader.readAsDataURL(logoInput);
});

// Eliminar un resultado específico
function eliminarResultado(tipo, index) {
    resultados[tipo].splice(index, 1);
    localStorage.setItem('resultados', JSON.stringify(resultados));
    mostrarResultados();
}

// Editar un resultado específico
function editarResultado(tipo, index) {
    const resultado = resultados[tipo][index];
    document.getElementById('tipo').value = tipo; // Seleccionar el tipo correspondiente
    document.getElementById('nombre').value = resultado.nombre;
    document.getElementById('numero').value = resultado.numero;
    document.getElementById('serie').value = resultado.serie;
    document.getElementById('fecha').value = resultado.fecha;
    
    // Preparar el formulario para edición
    editIndex = index; // Guardar el índice que se está editando
    document.getElementById('submitBtn').textContent = 'Actualizar Resultado'; // Cambiar el texto del botón
}

// Cerrar sesión y redirigir a la página de login
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
});

// Verificar si el usuario está autenticado
window.onload = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) window.location.href = 'login.html';
    mostrarResultados();
};

// Formatear la fecha en un formato más legible
function formatFecha(fecha) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', options);
}
