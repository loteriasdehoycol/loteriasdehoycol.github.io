let resultados = JSON.parse(localStorage.getItem('resultados')) || { loterias: [], chances: [] };
const listaLoterias = document.getElementById('listaLoterias');
const listaChances = document.getElementById('listaChances');
const formulario = document.getElementById('formulario');
const mensaje = document.getElementById("mensaje");

// Contraseña del admin
const contrasenaCorrecta = "@ndJos19"; // Cambia esto por tu contraseña real

// Función para mostrar resultados
function mostrarResultados() {
    listaLoterias.innerHTML = '';
    listaChances.innerHTML = '';

    resultados.loterias.forEach((loteria, index) => {
        listaLoterias.innerHTML += `
            <li>
                <img src="${loteria.logo}" alt="${loteria.nombre}" class="logo">
                <span class="nombre">${loteria.nombre}</span>
                <span class="numero">${loteria.numero}</span>
                <span class="serie">${loteria.serie}</span>
                <span class="fecha">${formatFecha(loteria.fecha)}</span>
                <button class="eliminar" onclick="eliminarResultado('loteria', ${index})">Eliminar</button>
            </li>`;
    });

    resultados.chances.forEach((chance, index) => {
        listaChances.innerHTML += `
            <li>
                <img src="${chance.logo}" alt="${chance.nombre}" class="logo">
                <span class="nombre">${chance.nombre}</span>
                <span class="numero">${chance.numero}</span>
                <span class="serie">${chance.serie}</span>
                <span class="fecha">${formatFecha(chance.fecha)}</span>
                <button class="eliminar" onclick="eliminarResultado('chance', ${index})">Eliminar</button>
            </li>`;
    });
}

// Función para eliminar resultados
function eliminarResultado(tipo, index) {
    resultados[tipo === 'loteria' ? 'loterias' : 'chances'].splice(index, 1);
    localStorage.setItem('resultados', JSON.stringify(resultados));
    mostrarResultados();
}

// Inicio de sesión
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario

    const password = document.getElementById("password").value;

    if (password === contrasenaCorrecta) {
        document.getElementById("login").style.display = "none"; // Oculta el formulario de login
        document.getElementById("adminContent").style.display = "block"; // Muestra el contenido del admin
        mostrarResultados(); // Muestra los resultados al iniciar sesión
    } else {
        mensaje.textContent = "Contraseña incorrecta. Intenta de nuevo.";
    }
});

// Agregar resultados
if (formulario) {
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const tipo = document.getElementById('tipo').value;
        const nombre = document.getElementById('nombre').value;
        const numero = document.getElementById('numero').value;
        const serie = document.getElementById('serie').value;
        const fecha = document.getElementById('fecha').value;
        const logoInput = document.getElementById('logo').files[0];

        if (logoInput) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const nuevoResultado = {
                    nombre,
                    numero,
                    serie,
                    fecha,
                    logo: e.target.result // Guardamos la imagen en base64
                };

                resultados[tipo === 'loteria' ? 'loterias' : 'chances'].push(nuevoResultado);
                localStorage.setItem('resultados', JSON.stringify(resultados));
                mostrarResultados();
                formulario.reset();
            };
            reader.readAsDataURL(logoInput);
        }
    });
}

// Formato de fecha
function formatFecha(fecha) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', options);
}

// Mostrar resultados al cargar el panel de administración
window.onload = mostrarResultados;
