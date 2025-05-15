package sv.edu.catolica.Parcial.service.impl;

import sv.edu.catolica.Parcial.entities.Pupusa;
import sv.edu.catolica.Parcial.repository.PupusaRepository;
import sv.edu.catolica.Parcial.service.PupusaService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PupusaServiceImpl implements PupusaService {
    private final PupusaRepository pupusaRepository;

    public PupusaServiceImpl(PupusaRepository pupusaRepository) {
        this.pupusaRepository = pupusaRepository;
    }

    @Override
    public List<Pupusa> listarPupusas() {
        return pupusaRepository.findAll();
    }

    @Override
    public Optional<Pupusa> obtenerPupusaPorId(Long id) {
        return pupusaRepository.findById(id);
    }

    @Override
    public Pupusa guardarPupusa(Pupusa pupusa) {
        return pupusaRepository.save(pupusa);
    }

    @Override
    public void eliminarPupusa(Long id) {
        pupusaRepository.deleteById(id);
    }
}
