package MS_guias.guide.repository;


import MS_guias.guide.entity.Guia;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GuiaRepository extends JpaRepository<Guia, Long> {
    @Query("SELECT g FROM Guia g WHERE (:city IS NULL OR lower(g.city) = lower(:city))")
    List<Guia> searchByCity(String city);

    @Query("SELECT g FROM  Guia g WHERE (g.id = :id)")
    Guia searchGuiaBy(Long id);

    boolean existsByDni(String dni);
    boolean existsByCorreo(String correo);

    List<Guia> searchByCertification(Boolean certification);

    @Query("SELECT DISTINCT g FROM Guia g JOIN g.idiomas i WHERE i.languageCode = " +
            ":languageCode OR i.languageName = :languageName")
    List<Guia> findByLanguage(@Param("languageCode") String languageCode,
                              @Param("languageName") String languageName);
    /*
    @Query("SELECT DISTINCT g FROM Guia g " +
            "LEFT JOIN g.idiomas i " +
            "WHERE (:city IS NULL OR g.city = :city) " +
            "AND (:certification IS NULL OR g.certification = :certification) " +
            "AND (:language IS NULL OR i.languageCode = :language OR i.languageName = :language)")
    List<Guia> findByFilters(@Param("city") String city,
                             @Param("certification") Boolean certification,
                             @Param("language") String language);*/
    @Query("SELECT DISTINCT g FROM Guia g " +
            "LEFT JOIN g.idiomas i " +
            "WHERE (:city IS NULL OR g.city ILIKE %:city%) " +
            "AND (:certification IS NULL OR g.certification = :certification) " +
            "AND (:language IS NULL OR i.languageCode ILIKE %:language% OR i.languageName ILIKE %:language%)")
    List<Guia> findByFilters(@Param("city") String city,
                             @Param("certification") Boolean certification,
                             @Param("language") String language);

}
