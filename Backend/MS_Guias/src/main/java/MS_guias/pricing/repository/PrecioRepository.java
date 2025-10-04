package MS_guias.pricing.repository;

import MS_guias.pricing.entity.Precio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PrecioRepository extends JpaRepository<Precio, Long> {
    @Query("SELECT p FROM Precio p WHERE p.guia.id = :guideId ORDER BY p.createdAt DESC")
    List<Precio> findLatestByGuide(Long guideId);
}
