package sv.edu.catolica.Parcial.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.edu.catolica.Parcial.entities.Pedido;
import sv.edu.catolica.Parcial.repository.PedidoRepository;

import java.util.List;
import java.util.Optional;

@Service
public abstract class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    // Método para obtener pedidos con la información del cliente
    public List<Pedido> listarPedidosConCliente() {
        return pedidoRepository.findAll();  // Necesitarías usar una consulta más compleja si requieres un JOIN en la base de datos
    }

    public Pedido guardarPedido(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    public abstract List<Pedido> listarPedidos();

    public Optional<Pedido> obtenerPedidoPorId(Long id) {
        return pedidoRepository.findById(id);
    }

    public void eliminarPedido(Long id) {
        pedidoRepository.deleteById(id);
    }
}
