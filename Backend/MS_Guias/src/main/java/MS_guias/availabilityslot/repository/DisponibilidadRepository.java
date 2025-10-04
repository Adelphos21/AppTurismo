package MS_guias.availabilityslot.repository;

import MS_guias.availabilityslot.entity.Disponibilidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface DisponibilidadRepository extends JpaRepository<Disponibilidad, Long> {
    @Query("SELECT s FROM Disponibilidad s WHERE s.guia.id = :guideId AND s.date = :date AND s.status = MS_guias.availabilityslot.entity.Status.FREE")
    List<Disponibilidad> findFreeByGuideAndDate(@Param("guideId") Long guideId, @Param("date") LocalDate date);

    @Query("SELECT s FROM Disponibilidad s WHERE s.guia.id = :guideId AND s.date = :date")
    List<Disponibilidad> findByGuideAndDate(@Param("guideId") Long guideId, @Param("date") LocalDate date);

    @Query("SELECT s FROM Disponibilidad s WHERE s.guia.id = :guideId AND s.date = :date AND s.startTime = :start AND s.endTime = :end")
    Optional<Disponibilidad> findExact(@Param("guideId") Long guideId, @Param("date") LocalDate date,
                                       @Param("start") LocalTime start, @Param("end") LocalTime end);
}
