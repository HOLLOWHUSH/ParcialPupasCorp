package sv.edu.catolica.Parcial.repository;

import sv.edu.catolica.Parcial.entities.Factura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacturaRepository extends JpaRepository<Factura, Long> {
}
