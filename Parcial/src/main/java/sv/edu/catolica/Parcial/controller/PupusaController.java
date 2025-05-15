package sv.edu.catolica.Parcial.controller;

import sv.edu.catolica.Parcial.entities.Pupusa;
import sv.edu.catolica.Parcial.service.PupusaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pupusas")
public class PupusaController {

    private final PupusaService pupusaService;

    public PupusaController(PupusaService pupusaService) {
        this.pupusaService = pupusaService;
    }

    @GetMapping
    public List<Pupusa> listarPupusas() {
        return pupusaService.listarPupusas();
    }

    @GetMapping("/api/pupusas")
    public ResponseEntity<Pupusa> obtenerPupusa(@PathVariable Long id) {
        Optional<Pupusa> pupusa = pupusaService.obtenerPupusaPorId(id);
        return pupusa.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pupusa> crearPupusa(@RequestBody Pupusa pupusa) {
        Pupusa nuevaPupusa = pupusaService.guardarPupusa(pupusa);
        return new ResponseEntity<>(nuevaPupusa, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pupusa> actualizarPupusa(@PathVariable Long id, @RequestBody Pupusa pupusa) {
        Optional<Pupusa> pupusaExistente = pupusaService.obtenerPupusaPorId(id);
        if (pupusaExistente.isPresent()) {
            pupusa.setId(id);
            Pupusa pupusaActualizada = pupusaService.guardarPupusa(pupusa);
            return ResponseEntity.ok(pupusaActualizada);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPupusa(@PathVariable Long id) {
        pupusaService.eliminarPupusa(id);
        return ResponseEntity.noContent().build();
    }
}
