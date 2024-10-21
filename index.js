let resultados = JSON.parse(localStorage.getItem('resultados')) || { loterias: [], chances: [] };
const listaLoterias = document.getElementById('listaLoterias');
const listaChances = document.getElementById('listaChances');

// Función para mostrar resultados
function mostrarResultados() {
    listaLoterias.innerHTML = '';
    listaChances.innerHTML = '';

    resultados.loterias.forEach(loteria => {
        listaLoterias.innerHTML += `
            <li>
                <img src="${loteria.logo}" alt="${loteria.nombre}" class="logo">
                <span class="nombre">${loteria.nombre}</span>
                <span class="numero">${loteria.numero}</span>
                <span class="serie">${loteria.serie}</span>
                <span class="fecha">${formatFecha(loteria.fecha)}</span>
            </li>`;
    });

    resultados.chances.forEach(chance => {
        listaChances.innerHTML += `
            <li>
                <img src="${chance.logo}" alt="${chance.nombre}" class="logo">
                <span class="nombre">${chance.nombre}</span>
                <span class="numero">${chance.numero}</span>
                <span class="serie">${chance.serie}</span>
                <span class="fecha">${formatFecha(chance.fecha)}</span>
            </li>`;
    });
}

// Formato de fecha
function formatFecha(fecha) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', options);
}

// Mostrar resultados al cargar la página
window.onload = mostrarResultados;
