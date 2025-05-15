-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS TiendaDePupusas;
USE TiendaDePupusas;

-- Tabla de Pupusas
CREATE TABLE Pupusas (
    id_pupusa INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
);

-- Tabla de Ingredientes por Pupusa
CREATE TABLE Ingredientes (
    id_ingrediente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla intermedia entre Pupusas e Ingredientes
CREATE TABLE PupusaIngrediente (
    id_pupusa INT,
    id_ingrediente INT,
    PRIMARY KEY (id_pupusa, id_ingrediente),
    FOREIGN KEY (id_pupusa) REFERENCES Pupusas(id_pupusa),
    FOREIGN KEY (id_ingrediente) REFERENCES Ingredientes(id_ingrediente)
);

-- Tabla de Clientes
CREATE TABLE Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(255)
);

-- Tabla de Pedidos
CREATE TABLE Pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    estado ENUM('pendiente', 'en proceso', 'entregado') DEFAULT 'pendiente',
    direccion VARCHAR(255),
    para_llevar BOOLEAN,
    comer_en_restaurante BOOLEAN,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

-- Tabla de Detalle de Pupusas por Pedido
CREATE TABLE DetallePedido (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_pupusa INT,
    cantidad INT,
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_pupusa) REFERENCES Pupusas(id_pupusa)
);

-- Tabla de Facturas
CREATE TABLE Facturas (
    id_factura INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido)
);

-- Tabla de Mesas para comer en restaurante
CREATE TABLE Mesas (
    id_mesa INT AUTO_INCREMENT PRIMARY KEY,
    disponible BOOLEAN DEFAULT TRUE
);

-- Tabla de Asignación de Mesas
CREATE TABLE AsignacionMesas (
    id_asignacion INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_mesa INT,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_mesa) REFERENCES Mesas(id_mesa)
);
 

SHOW DATABASES;

SELECT * FROM pedidos;

INSERT INTO cliente (nombre, telefono, direccion)
VALUES 
('Juan Pérez', '7777-1234', 'San Salvador'),
('María Gómez', '7555-5678', 'Santa Tecla'),
('Carlos Rodríguez', '7222-9012', 'Soyapango');

INSERT INTO Pedidos (id_cliente, estado, direccion, para_llevar, comer_en_restaurante)
VALUES (1, 'pendiente', 'Calle Ficticia 123', true, false);

SELECT * FROM Pedidos;


ALTER TABLE Pedidos 
MODIFY COLUMN estado ENUM('pendiente', 'en_proceso', 'entregado') DEFAULT 'pendiente';


INSERT INTO Pupusas (tipo, precio) VALUES 
('Revueltas', 1.25),
('Queso con loroco', 1.50),
('Frijol con queso', 1.10),
('Chicharrón con queso', 1.30);

INSERT INTO Ingredientes (nombre) VALUES 
('Queso'),
('Frijol'),
('Chicharrón'),
('Loroco'),
('Masa de maíz');

DESCRIBE pupusas;
