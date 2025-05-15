package sv.edu.catolica.Parcial.service;

import sv.edu.catolica.Parcial.entities.Factura;
import java.util.List;
import java.util.Optional;

public interface FacturaService {
    List<Factura> listarFacturas();
    Optional<Factura> obtenerFacturaPorId(Long id);
    Factura guardarFactura(Factura factura);
    void eliminarFactura(Long id);
}
