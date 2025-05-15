package sv.edu.catolica.Parcial.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Pupusas")
public class Pupusa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pupusa")  // Asegúrate de que el nombre de la columna sea 'id_pupusa'
    private Long id;

    private String tipo;  // Este es el nombre o tipo de la pupusa (si esto es lo que deseas mostrar como "nombre")
    private String descripcion;  // Descripción de la pupusa, si lo necesitas
    private double precio;

    @ManyToMany
    @JoinTable(
            name = "PupusaIngrediente",
            joinColumns = @JoinColumn(name = "id_pupusa"),
            inverseJoinColumns = @JoinColumn(name = "id_ingrediente")
    )
    private List<Ingrediente> ingredientes = new ArrayList<>();
}
