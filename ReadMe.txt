🫓 PupasCorp - API RESTful con Spring Boot

Proyecto desarrollado como parte del curso de Programación Web Avanzada, que implementa una API RESTful utilizando Java + Spring Boot con persistencia en base de datos MySQL. El objetivo es gestionar entidades relacionadas a un sistema de pedidos en una pupusería.

------------------------------------------
🚀 Tecnologías Utilizadas
- Java 17
- Spring Boot 3.3.10
- Spring Data JPA
- MySQL
- Lombok
- Maven

------------------------------------------
📁 Estructura del Proyecto
src/
├── controller       # Controladores REST
├── entities         # Entidades JPA
├── repository       # Interfaces de acceso a datos
├── service          # Interfaces de lógica de negocio
├── service/impl     # Implementaciones de servicios
├── config           # Configuraciones adicionales (CORS, etc.)
└── resources/
    └── application.properties

------------------------------------------
⚙️ Configuración del Proyecto

Base de Datos MySQL:
spring.datasource.url=jdbc:mysql://localhost:3306/TiendaDePupusas
spring.datasource.username=root
spring.datasource.password=1234
spring.jpa.hibernate.ddl-auto=update

Puedes importar el archivo basew.sql incluido en el proyecto para tener datos iniciales.

------------------------------------------
🛠️ Instalación y Ejecución

1. Clona este repositorio:
   git clone https://github.com/tu_usuario/ParcialPupasCorp.git

2. Navega al proyecto:
   cd ParcialPupasCorp/Parcial

3. Ejecuta el proyecto:
   ./mvnw spring-boot:run

4. Accede desde tu navegador o Postman en:
   http://localhost:8080/api/clientes

------------------------------------------
🔁 Endpoints CRUD Principales

Cliente:
- GET /api/clientes → Lista todos los clientes
- GET /api/clientes/{id} → Cliente por ID
- POST /api/clientes → Crear cliente
- PUT /api/clientes/{id} → Actualizar cliente
- DELETE /api/clientes/{id} → Eliminar cliente

(Lo mismo aplica para entidades como Pedido, Factura, etc.)

------------------------------------------
🧪 Pruebas

Puedes usar Postman o Insomnia para probar los endpoints. La API devuelve:
- 200 OK en operaciones exitosas
- 201 CREATED al crear recursos
- 404 NOT FOUND cuando no se encuentra un recurso
- 204 NO CONTENT al eliminar

------------------------------------------
🧑‍💻 Autores

✍️ Nombre del estudiante: Jonathan Ceron, Victor Bautista, Kevin Zuniga, Steven Mancia
🎓 Universidad Católica de El Salvador

------------------------------------------
📄 Licencia

Este proyecto es con fines educativos y forma parte del portafolio académico de los estudiantes.
