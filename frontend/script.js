const apiClientesUrl = 'http://localhost:8080/api/clientes';
const apiPedidosUrl = 'http://localhost:8080/api/pedidos';
const apiPupusasUrl = 'http://localhost:8080/api/pupusas'; // Asegúrate de que la URL esté correcta

function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

function getClientes() {
    fetch(apiClientesUrl)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#clientes-table tbody');
            tbody.innerHTML = '';
            data.forEach(cliente => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.direccion}</td>
                    <td>
                      <button onclick="editCliente(${cliente.id}, '${cliente.nombre}', '${cliente.telefono}', '${cliente.direccion}')">Editar</button>
                      <button onclick="deleteCliente(${cliente.id})">Eliminar</button>
                    </td>`;
                tbody.appendChild(row);
            });
        });
}

function getPedidos() {
    fetch(apiPedidosUrl)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#pedidos-table tbody');
            tbody.innerHTML = '';
            data.forEach(pedido => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pedido.id}</td>
                    <td>${pedido.direccion}</td>
                    <td>${pedido.paraLlevar ? 'Sí' : 'No'}</td>
                    <td>${pedido.comerEnRestaurante ? 'Sí' : 'No'}</td>
                    <td>${pedido.estado}</td>
                    <td>${pedido.cliente?.id}</td>
                    <td>
                      <button onclick="editPedido(${pedido.id}, '${pedido.direccion}', ${pedido.paraLlevar}, ${pedido.comerEnRestaurante}, '${pedido.estado}', ${pedido.cliente?.id})">Editar</button>
                      <button onclick="deletePedido(${pedido.id})">Eliminar</button>
                    </td>`;
                tbody.appendChild(row);
            });
        });
}

document.getElementById("cliente-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("cliente-id").value;
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;

    const data = { nombre, telefono, direccion };

    const url = id ? `http://localhost:8080/api/clientes/${id}` : "http://localhost:8080/api/clientes";
    const method = id ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then(res => {
            if (!res.ok) throw new Error("Error en la respuesta");
            fetchClientes(); // recargar lista
            showTab("clientes");
        })
        .catch(err => console.error("Error al guardar cliente:", err));
});


document.getElementById('pedido-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('pedido-id').value;
    const pedido = {
        direccion: document.getElementById('direccion-pedido').value,
        paraLlevar: document.getElementById('para-llevar').checked,
        comerEnRestaurante: document.getElementById('comer-en-restaurante').checked,
        estado: document.getElementById('estado').value,
        cliente: { id: parseInt(document.getElementById('cliente-id-pedido').value) }
    };
    const url = id ? `${apiPedidosUrl}/${id}` : apiPedidosUrl;
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
    }).then(res => {
        if (!res.ok) throw new Error('Error al guardar pedido');
        return res.json();
    }).then(() => {
        alert('Pedido guardado');
        resetPedidoForm();
        showTab('pedidos');
        getPedidos();
    }).catch(err => console.error(err));
});

function editCliente(id, nombre, telefono, direccion) {
    document.getElementById('cliente-id').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('telefono').value = telefono;
    document.getElementById('direccion').value = direccion;
    showTab('agregarCliente');
}

function deleteCliente(id) {
    if (confirm('¿Eliminar cliente?')) {
        fetch(`${apiClientesUrl}/${id}`, { method: 'DELETE' })
            .then(() => getClientes());
    }
}

function editPedido(id, direccion, paraLlevar, comerEnRestaurante, estado, clienteId) {
    document.getElementById('pedido-id').value = id;
    document.getElementById('direccion-pedido').value = direccion;
    document.getElementById('para-llevar').checked = paraLlevar;
    document.getElementById('comer-en-restaurante').checked = comerEnRestaurante;
    document.getElementById('estado').value = estado;
    document.getElementById('cliente-id-pedido').value = clienteId;
    showTab('agregarPedido');
}

function deletePedido(id) {
    if (confirm('¿Eliminar pedido?')) {
        fetch(`${apiPedidosUrl}/${id}`, { method: 'DELETE' })
            .then(() => getPedidos());
    }
}

function resetForm() {
    document.getElementById('cliente-id').value = '';
    document.getElementById('cliente-form').reset();
}

function resetPedidoForm() {
    document.getElementById('pedido-id').value = '';
    document.getElementById('pedido-form').reset();
}

function cancelEdit() {
    resetForm();
    showTab('clientes');
}

function cancelEditPedido() {
    resetPedidoForm();
    showTab('pedidos');
}

window.onload = function() {
    getClientes();
    getPedidos();
    getPupusas(); // Llamar a getPupusas cuando la página cargue
};

// Función para mostrar la lista de pupusas
function getPupusas() {
    fetch(apiPupusasUrl)
        .then(res => res.json())
        .then(data => {
            console.log("Datos recibidos:", data);  // Verifica la respuesta completa

            const tbody = document.querySelector('#pupusas-table tbody');
            tbody.innerHTML = '';
            data.forEach(pupusa => {
                console.log("Pupusa individual:", pupusa);  // Verifica cada pupusa

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pupusa.id}</td>
                    <td>${pupusa.tipo}</td>  <!-- Aquí estamos mostrando 'tipo' -->
                    <td>${pupusa.precio}</td>  <!-- Mostramos solo el precio -->
                    <td>
                        <button onclick="editPupusa(${pupusa.id}, '${pupusa.tipo}', ${pupusa.precio})">Editar</button>
                        <button onclick="deletePupusa(${pupusa.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener pupusas:', error);
        });
}

// Función para agregar o editar una pupusa
document.getElementById('pupusa-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('pupusa-id').value;
    const pupusa = {
        tipo: document.getElementById('nombre-pupusa').value,  // Usar tipo para nombre
        precio: parseFloat(document.getElementById('precio-pupusa').value)  // Asegurarse de que el precio se convierte a decimal
    };

    // Validación para asegurar que el precio es un número válido
    if (isNaN(pupusa.precio) || pupusa.precio <= 0) {
        alert('Por favor ingrese un precio válido');
        return;
    }

    const url = id ? `${apiPupusasUrl}/${id}` : apiPupusasUrl;
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pupusa)
    }).then(() => {
        alert('Pupusa guardada');
        resetPupusaForm();
        showTab('pupusas');
        getPupusas();
    });
});

// Función para editar una pupusa
function editPupusa(id, tipo, precio) {
    document.getElementById('pupusa-id').value = id;
    document.getElementById('nombre-pupusa').value = tipo;  // Usa 'tipo' aquí, porque es el nombre de la pupusa en tu entidad
    document.getElementById('precio-pupusa').value = precio;
    showTab('agregarPupusa');
}

// Función para eliminar una pupusa
function deletePupusa(id) {
    if (confirm('¿Eliminar pupusa?')) {
        fetch(`${apiPupusasUrl}/${id}`, { method: 'DELETE' })
            .then(() => getPupusas());
    }
}

// Función para reiniciar el formulario de pupusas
function resetPupusaForm() {
    document.getElementById('pupusa-id').value = '';
    document.getElementById('pupusa-form').reset();
}

// Función para cancelar la edición de pupusa
function cancelEditPupusa() {
    resetPupusaForm();
    showTab('pupusas');
}
// Función para mostrar y ocultar las pestañas
function showTab(tabName) {
    // Ocultar todas las pestañas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Mostrar la pestaña correspondiente
    const tabToShow = document.getElementById(tabName);
    tabToShow.classList.add('active');

    // Mostrar o ocultar el formulario de "Realizar Pedido" si estamos en la pestaña "restaurante"
    if (tabName === 'restaurante') {
        document.getElementById('realizar-pedido').style.display = 'block'; // Mostrar formulario de realizar pedido
    } else {
        document.getElementById('realizar-pedido').style.display = 'none'; // Ocultar formulario de realizar pedido
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Cargar los datos de clientes y pupusas cuando la pestaña Restaurante se activa
    document.getElementById('restaurante').addEventListener('click', cargarDatosRestaurante);

    function cargarDatosRestaurante() {
        // Llamar a la API para obtener clientes y pupusas
        fetchClientes();
        fetchPupusas();
    }

    // Función para obtener clientes desde la API
    function fetchClientes() {
        fetch('http://localhost:8080/api/clientes')
            .then(response => response.json())
            .then(data => {
                const clientesTable = document.getElementById('clientes-table').getElementsByTagName('tbody')[0];
                data.forEach(cliente => {
                    const row = clientesTable.insertRow();
                    row.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.direccion}</td>
                    <td><button onclick="editCliente(${cliente.id})">Editar</button><button onclick="deleteCliente(${cliente.id})">Eliminar</button></td>
                `;
                });
            })
            .catch(error => console.error('Error:', error));
    }


    // Función para obtener pupusas desde la API
    function fetchPupusas() {
        fetch('/api/pupusas')  // Asegúrate de que esta URL es la correcta para tus pupusas
            .then(response => response.json())
            .then(data => {
                const selectPupusa = document.getElementById('pupusa-seleccionada');
                const selectPupusasRestaurante = document.getElementById('pupusas-select-restaurante');
                selectPupusa.innerHTML = '';  // Limpiar las opciones anteriores
                selectPupusasRestaurante.innerHTML = '';  // Limpiar las opciones anteriores

                data.forEach(pupusa => {
                    const option = document.createElement('option');
                    option.value = pupusa.id;
                    option.textContent = `${pupusa.nombre} - $${pupusa.precio}`;
                    selectPupusa.appendChild(option);

                    const optionRestaurante = document.createElement('option');
                    optionRestaurante.value = pupusa.id;
                    optionRestaurante.textContent = `${pupusa.nombre} - $${pupusa.precio}`;
                    selectPupusasRestaurante.appendChild(optionRestaurante);
                });
            })
            .catch(error => console.error('Error al obtener pupusas:', error));
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const apiClientesUrl = 'http://localhost:8080/api/clientes';
    const apiPupusasUrl = 'http://localhost:8080/api/pupusas';

    // Cargar clientes en el select
    function cargarClientesRestaurante() {
        fetch(apiClientesUrl)
            .then(response => response.json())
            .then(clientes => {
                const selectCliente = document.getElementById('restaurante-cliente-id-pedido');
                selectCliente.innerHTML = '';
                clientes.forEach(cliente => {
                    const option = document.createElement('option');
                    option.value = cliente.id;
                    option.textContent = `${cliente.nombre} (${cliente.telefono})`;
                    selectCliente.appendChild(option);
                });
            })
            .catch(error => console.error('Error al cargar clientes en Restaurante:', error));
    }

    // Cargar pupusas en el select
    function cargarPupusasRestaurante() {
        fetch(apiPupusasUrl)
            .then(response => response.json())
            .then(pupusas => {
                const selectPupusas = document.getElementById('pupusas-select-restaurante');
                selectPupusas.innerHTML = '';
                pupusas.forEach(pupusa => {
                    const option = document.createElement('option');
                    option.value = pupusa.id;
                    option.textContent = `${pupusa.tipo} - $${pupusa.precio}`;
                    option.setAttribute('data-precio', pupusa.precio);
                    selectPupusas.appendChild(option);
                });
            })
            .catch(error => console.error('Error al cargar pupusas en Restaurante:', error));
    }

    // Llamar funciones al cargar
    cargarClientesRestaurante();
    cargarPupusasRestaurante();
});

document.addEventListener("DOMContentLoaded", () => {
    fetchClientes(); // Cargar clientes al iniciar
    fetchPupusas();  // Cargar pupusas al iniciar
    fetchPedidos();  // Cargar pedidos al iniciar
});

async function cargarPedidosRestaurante() {
    const response = await fetch("http://localhost:8080/api/pedidos"); // Ajusta la URL si es distinta
    const pedidos = await response.json();
    const tbody = document.querySelector("#restaurante-pedidos-table tbody");
    tbody.innerHTML = "";

    pedidos.forEach(pedido => {
        const fila = document.createElement("tr");

        // Calcula tiempo activo
        const creadoEn = new Date(pedido.fechaCreacion || Date.now()); // Asegúrate que la API mande esto
        const ahora = new Date();
        const tiempoActivoMinutos = Math.floor((ahora - creadoEn) / 60000);

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
            <td>${tiempoActivoMinutos} min</td>
            <td><button onclick="eliminarPedido(${pedido.id})">Eliminar</button></td>
        `;

        tbody.appendChild(fila);
    });
}
async function actualizarEstadoPedido(id, nuevoEstado) {
    await fetch(`http://localhost:8080/api/pedidos/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado })
    });
    cargarPedidosRestaurante(); // Recarga la tabla
}
function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');

    if (tabId === 'restaurante') {
        cargarPedidosRestaurante(); // Recargar al abrir pestaña
    }
}

document.getElementById("pedido-form-restaurante").addEventListener("submit", async function (e) {
    e.preventDefault();

    const direccion = document.getElementById("direccion-pedido-restaurante").value;
    const paraLlevar = document.getElementById("para-llevar-restaurante").checked;
    const comerEnRestaurante = document.getElementById("comer-en-restaurante").checked;
    const clienteId = document.getElementById("restaurante-cliente-id-pedido").value;

    const pupusaSelect = document.getElementById("pupusas-select-restaurante");
    const pupusaIds = Array.from(pupusaSelect.selectedOptions).map(option => parseInt(option.value));

    // Crear el objeto del pedido
    const nuevoPedido = {
        direccion: direccion,
        paraLlevar: paraLlevar,
        comerEnRestaurante: comerEnRestaurante,
        estado: "pendiente",
        cliente: {
            id: parseInt(clienteId)
        },
        pupusaIds: pupusaIds
    };

    // Enviar el POST a la API
    const response = await fetch("http://localhost:8080/api/pedidos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoPedido)
    });

    if (response.ok) {
        alert("Pedido guardado correctamente");
        cargarPedidosRestaurante(); // Recargar la tabla
        e.target.reset(); // Limpiar el formulario
    } else {
        alert("Error al guardar el pedido");
    }
});

let carrito = [];

// Cargar pupusas en el select
function cargarPupusasRestaurante() {
    fetch(apiPupusasUrl)
        .then(response => response.json())
        .then(pupusas => {
            const selectPupusas = document.getElementById('pupusas-select-restaurante');
            selectPupusas.innerHTML = '';
            pupusas.forEach(pupusa => {
                const option = document.createElement('option');
                option.value = JSON.stringify(pupusa);
                option.textContent = `${pupusa.tipo} - $${pupusa.precio}`;
                selectPupusas.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar pupusas en Restaurante:', error));
}

// Agregar al carrito
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

// Actualizar vista del carrito
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

// Realizar el pedido (enviar al backend)
function realizarPedido() {
    if (carrito.length === 0) {
        return alert('El carrito está vacío');
    }

    const pedido = {
        pupusas: carrito.map(item => ({
            id: item.id,
            cantidad: item.cantidad
        }))
    };

    fetch(apiPedidosUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    })
        .then(response => {
            if (response.ok) {
                alert('Pedido realizado exitosamente');
                carrito = [];
                actualizarCarrito();
            } else {
                throw new Error('Error al realizar pedido');
            }
        })
        .catch(error => console.error('Error:', error));
}


// Suponiendo que tienes un select para elegir la pupusa
document.getElementById('pupusa-seleccionada').addEventListener('change', function() {
    let pupusaId = this.value;
    let cantidad = document.getElementById('cantidad').value;
    // Aquí deberías obtener los datos de la pupusa seleccionada desde la API
    // Ejemplo:
    let pupusa = { id: pupusaId, nombre: 'Pupusa de Frijoles', precio: 2.5 };
    agregarAlCarrito(pupusa, cantidad);
});

// Función para cargar pupusas en el select
function cargarPupusas() {
    // Suponiendo que obtienes los datos de la API
    let pupusas = [{ id: 1, nombre: 'Pupusa de Frijoles', precio: 2.5 }, { id: 2, nombre: 'Pupusa de Queso', precio: 3.0 }];
    let selectPupusas = document.getElementById('pupusa-seleccionada');
    pupusas.forEach(pupusa => {
        let option = document.createElement('option');
        option.value = pupusa.id;
        option.textContent = pupusa.nombre;
        selectPupusas.appendChild(option);
    });
}

// Cargar pupusas al cargar la página
cargarPupusas();


document.getElementById("restaurante-pedido-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener datos del formulario
    const clienteId = document.getElementById("restaurante-cliente-id-pedido").value;
    const direccion = document.getElementById("direccion-pedido-restaurante").value;
    const paraLlevar = document.getElementById("para-llevar-restaurante").checked;
    const comerEnRestaurante = document.getElementById("comer-en-restaurante").checked;
    const estado = document.getElementById("estado").value;
    const pupusaId = document.getElementById("pupusa-seleccionada").value;
    const cantidad = document.getElementById("cantidad").value;

    // Calcular costo total
    const precioPupusa = parseFloat(document.getElementById("pupusa-seleccionada").selectedOptions[0].dataset.precio);
    const costoTotal = precioPupusa * cantidad;
    document.getElementById("costo-total").textContent = costoTotal.toFixed(2);

    // Crear un nuevo pedido
    const pedido = {
        clienteId: clienteId,
        direccion: direccion,
        paraLlevar: paraLlevar,
        comerEnRestaurante: comerEnRestaurante,
        estado: estado,
        pupusaId: pupusaId,
        cantidad: cantidad,
        costoTotal: costoTotal
    };

    // Aquí se enviaría el pedido a la base de datos o se actualizaría el carrito

    // Mostrar el pedido en la tabla de pedidos actuales
    agregarPedidoATabla(pedido);
});

function agregarPedidoATabla(pedido) {
    const tabla = document.getElementById("restaurante-pedidos-table").getElementsByTagName('tbody')[0];
    const fila = tabla.insertRow();
    fila.innerHTML = `
        <td>${pedido.clienteId}</td>
        <td>${pedido.direccion}</td>
        <td>${pedido.paraLlevar ? "Sí" : "No"}</td>
        <td>${pedido.comerEnRestaurante ? "Sí" : "No"}</td>
        <td>${pedido.estado}</td>
        <td>${pedido.clienteId}</td>
        <td><button onclick="eliminarPedido(${pedido.clienteId})">Eliminar</button></td>
    `;
}
