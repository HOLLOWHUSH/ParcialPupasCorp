package sv.edu.catolica.Parcial.service;

import sv.edu.catolica.Parcial.entities.Pupusa;
import java.util.List;
import java.util.Optional;

public interface PupusaService {
    List<Pupusa> listarPupusas();
    Optional<Pupusa> obtenerPupusaPorId(Long id);
    Pupusa guardarPupusa(Pupusa pupusa);
    void eliminarPupusa(Long id);
}
