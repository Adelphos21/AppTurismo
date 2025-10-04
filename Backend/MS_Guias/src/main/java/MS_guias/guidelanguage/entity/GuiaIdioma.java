package MS_guias.guidelanguage.entity;



import MS_guias.guide.entity.Guia;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class GuiaIdioma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Guia guia; // Este campo debe coincidir con el mappedBy

    @Column(name = "language_code", nullable = false, length = 8)
    private String languageCode; //tipo eso para en, es, cn

    @Column(name = "language_name", length = 50) // CORREGIDO
    private String languageName;
}
