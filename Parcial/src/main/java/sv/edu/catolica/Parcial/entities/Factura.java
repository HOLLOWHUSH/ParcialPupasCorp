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


public class Factura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_pedido")
    private Pedido pedido;

    private double total;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fecha = new Date();


}
