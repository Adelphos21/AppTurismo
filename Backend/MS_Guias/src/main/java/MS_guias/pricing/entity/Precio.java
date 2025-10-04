package MS_guias.pricing.entity;



import MS_guias.guide.entity.Guia;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Precio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guia", nullable = false) // Mismo nombre
    private Guia guia;

    @Column(nullable = false, length = 8)
    private String currency;

    @Column(name = "hourly_rate", nullable = false)
    private Double hourlyRate;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

}
