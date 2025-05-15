package sv.edu.catolica.Parcial.service;

import sv.edu.catolica.Parcial.entities.Mesa;
import java.util.List;
import java.util.Optional;

public interface MesaService {
    List<Mesa> listarMesas();
    Optional<Mesa> obtenerMesaPorId(Long id);
    Mesa guardarMesa(Mesa mesa);
    void eliminarMesa(Long id);
}
