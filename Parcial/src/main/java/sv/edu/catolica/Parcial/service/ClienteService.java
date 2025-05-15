package sv.edu.catolica.Parcial.service;

import sv.edu.catolica.Parcial.entities.Cliente;
import java.util.List;
import java.util.Optional;

public interface ClienteService {
    List<Cliente> listarClientes();
    Optional<Cliente> obtenerClientePorId(Long id);
    Cliente guardarCliente(Cliente cliente);
    void eliminarCliente(Long id);
}
