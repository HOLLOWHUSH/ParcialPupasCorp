package sv.edu.catolica.Parcial.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TiendaDePupusas")

public class AsignacionMesa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Pedido pedido;

    @ManyToOne
    private Mesa mesa;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaAsignacion = new Date();
}
