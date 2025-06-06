// script.js limpio y optimizado

const API_BASE = 'http://localhost:8080/api';
const apiClientesUrl = `${API_BASE}/clientes`;
const apiPupusasUrl = `${API_BASE}/pupusas`;
const apiPedidosUrl = `${API_BASE}/pedidos`;

let carrito = [];

// ------------------------- CARGA INICIAL -------------------------
document.addEventListener("DOMContentLoaded", () => {
    cargarClientes();
    cargarPupusas();
    cargarPedidos();
});

function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');

    if (tabId === 'restaurante') {
        cargarPedidos();
    }
}

// ------------------------- CLIENTES -------------------------
async function cargarClientes() {
    try {
        const response = await fetch(apiClientesUrl);
        const clientes = await response.json();
        const selectCliente = document.getElementById('restaurante-cliente-id-pedido');
        selectCliente.innerHTML = '';
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nombre} (${cliente.telefono})`;
            selectCliente.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar clientes:', error);
    }
}

// ------------------------- PUPUSAS -------------------------
async function cargarPupusas() {
    try {
        const response = await fetch(apiPupusasUrl);
        const pupusas = await response.json();
        const selectPupusas = document.getElementById('pupusas-select-restaurante');
        selectPupusas.innerHTML = '';
        pupusas.forEach(pupusa => {
            const option = document.createElement('option');
            option.value = JSON.stringify(pupusa);
            option.textContent = `${pupusa.tipo} - $${pupusa.precio}`;
            selectPupusas.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar pupusas:', error);
    }
}

// ------------------------- CARRITO -------------------------
function agregarAlCarrito() {
    const select = document.getElementById('pupusas-select-restaurante');
    const cantidadInput = document.getElementById('cantidad-pupusa');
    const pupusa = JSON.parse(select.value);
    const cantidad = parseInt(cantidadInput.value);

    if (cantidad < 1) return alert('Cantidad inválida');

    const itemExistente = carrito.find(item => item.id === pupusa.id);
    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({ ...pupusa, cantidad });
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById('carrito-lista');
    const totalSpan = document.getElementById('carrito-total');
    lista.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        const subtotal = item.precio * item.cantidad;
        li.textContent = `${item.tipo} x ${item.cantidad} = $${subtotal.toFixed(2)}`;
        lista.appendChild(li);
        total += subtotal;
    });

    totalSpan.textContent = total.toFixed(2);
}

// ------------------------- PEDIDOS -------------------------
document.getElementById("pedido-form-restaurante").addEventListener("submit", async function (e) {
    e.preventDefault();

    if (carrito.length === 0) return alert('El carrito está vacío');

    const direccion = document.getElementById("direccion-pedido-restaurante").value;
    const paraLlevar = document.getElementById("para-llevar-restaurante").checked;
    const comerEnRestaurante = document.getElementById("comer-en-restaurante").checked;
    const clienteId = document.getElementById("restaurante-cliente-id-pedido").value;

    const nuevoPedido = {
        direccion,
        paraLlevar,
        comerEnRestaurante,
        estado: "pendiente",
        cliente: { id: parseInt(clienteId) },
        pupusas: carrito.map(item => ({ id: item.id, cantidad: item.cantidad }))
    };

    try {
        const response = await fetch(apiPedidosUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoPedido)
        });

        if (!response.ok) throw new Error('Error al guardar el pedido');

        alert("Pedido guardado correctamente");
        carrito = [];
        actualizarCarrito();
        cargarPedidos();
        e.target.reset();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});

async function cargarPedidos() {
    try {
        const response = await fetch(apiPedidosUrl);
        const pedidos = await response.json();
        const tbody = document.querySelector("#restaurante-pedidos-table tbody");
        tbody.innerHTML = "";

        pedidos.forEach(pedido => {
            const fila = document.createElement("tr");
            const creadoEn = new Date(pedido.fechaCreacion || Date.now());
            const ahora = new Date();
            const tiempoActivoMin = Math.floor((ahora - creadoEn) / 60000);

            fila.innerHTML = `
                <td>${pedido.id}</td>
                <td>${pedido.direccion}</td>
                <td>${pedido.paraLlevar ? "Sí" : "No"}</td>
                <td>${pedido.comerEnRestaurante ? "Sí" : "No"}</td>
                <td>
                    <select onchange="actualizarEstadoPedido(${pedido.id}, this.value)">
                        <option value="pendiente" ${pedido.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                        <option value="en_proceso" ${pedido.estado === 'en_proceso' ? 'selected' : ''}>En proceso</option>
                        <option value="entregado" ${pedido.estado === 'entregado' ? 'selected' : ''}>Entregado</option>
                    </select>
                </td>
                <td>${pedido.cliente ? pedido.cliente.nombre : "Sin cliente"}</td>
                <td>${tiempoActivoMin} min</td>
                <td><button onclick="eliminarPedido(${pedido.id})">Eliminar</button></td>
            `;

            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar pedidos:', error);
    }
}

async function actualizarEstadoPedido(id, estado) {
    try {
        await fetch(`${apiPedidosUrl}/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado })
        });
        cargarPedidos();
    } catch (error) {
        console.error('Error al actualizar estado:', error);
    }
}

async function eliminarPedido(id) {
    if (!confirm('¿Estás seguro de eliminar este pedido?')) return;
    try {
        await fetch(`${apiPedidosUrl}/${id}`, { method: 'DELETE' });
        cargarPedidos();
    } catch (error) {
        console.error('Error al eliminar pedido:', error);
    }
}
