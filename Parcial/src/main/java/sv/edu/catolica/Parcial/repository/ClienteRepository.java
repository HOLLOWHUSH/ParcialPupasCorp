package sv.edu.catolica.Parcial.repository;

import sv.edu.catolica.Parcial.entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
