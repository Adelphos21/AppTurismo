package MS_guias.guide.controller;

import MS_guias.availabilityslot.dto.HoldRequestDTO;
import MS_guias.availabilityslot.dto.SlotResponse;
import MS_guias.exception.ConflictException;
import MS_guias.guide.dto.GuiaPutRequest;
import MS_guias.guide.dto.GuiaRequest;
import MS_guias.guide.dto.GuiaResponse;
import MS_guias.guide.entity.Guia;
import MS_guias.guide.repository.GuiaRepository;
import MS_guias.guide.service.GuiaService;
import MS_guias.guidelanguage.entity.GuiaIdioma;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/guides")
public class GuiaController {

    private final GuiaService service;
    private final GuiaRepository guiaRepository;

    public GuiaController(GuiaService service, GuiaRepository guiaRepository) {
        this.service = service;
        this.guiaRepository = guiaRepository;
    }


    @PostMapping
    public ResponseEntity<?> createGuide(@Valid @RequestBody GuiaRequest payload) {
        try {
            // Mapear el DTO a la entidad
            Guia newGuide = new Guia();
            newGuide.setNombres(payload.nombres);
            newGuide.setApellidos(payload.apellidos);
            newGuide.setDni(payload.dni);
            newGuide.setBio(payload.bio);
            newGuide.setCity(payload.city);
            newGuide.setCountry(payload.country);
            newGuide.setCertification(payload.certification);
            List<GuiaIdioma> idiomas = payload.languages.stream()
                    .map(lang -> {
                        GuiaIdioma guiaIdioma = new GuiaIdioma();
                        guiaIdioma.setLanguageCode(lang.getCode());
                        guiaIdioma.setLanguageName(lang.getName());
                        guiaIdioma.setGuia(newGuide);
                        return guiaIdioma;
                    }).toList();
            newGuide.setIdiomas(idiomas);
            newGuide.setCorreo(payload.getCorreo());
            Guia savedGuide = service.createGuide(newGuide);
            return ResponseEntity.status(201).body(Map.of(
                    "id", savedGuide.getId(),
                    "message", "Guía creado exitosamente"
            ));
        } catch (ConflictException e) {
            return ResponseEntity.status(409).body(Map.of(
                    "error", "CONFLICT",
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "SYSTEM_ERROR",
                    "message", "Error al crear el guía: " + e.getMessage()
            ));
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> editGuia(@PathVariable Long id, @RequestBody GuiaPutRequest guiaPutRequest) {
        try {
            service.updateGuide(id, guiaPutRequest);
            return ResponseEntity.ok().body("Perfil de guia modificado correctamente");
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage() != null ? e.getMessage() : "Ocurrió un error inesperado");
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGuide(@PathVariable Long id) {
        try {
            var g = service.findById(id);

            var idiomas = g.getIdiomas().stream()
                    .map(i -> Map.of(
                            "code", i.getLanguageCode(),
                            "name", i.getLanguageName())).toList();
            // Crear respuesta básica
            return ResponseEntity.ok(Map.of(
                    "id", g.getId(),
                    "nombres", g.getNombres(),
                    "apellidos", g.getApellidos(),
                    "city", g.getCity(),
                    "country", g.getCountry(),
                    "bio", g.getBio(),
                    "certification", g.getCertification(),
                    "ratingAvg", g.getRatingAvg(),
                    "languages", idiomas
            ));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", "not_found", "message", "Guia no encontrado!"));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<GuiaResponse>> search(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) Boolean certification) {

        var res = service.search(city, date, language, certification);
        return ResponseEntity.ok(res);
    }


    @GetMapping("/{id}/availability")
    public ResponseEntity<List<SlotResponse>> availability(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        var res = service.getAvailability(id, date);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/{id}/availability/hold")
    public ResponseEntity<?> hold(
            @PathVariable Long id,
            @RequestBody HoldRequestDTO body,
            @RequestHeader(name = "X-Internal-Token", required = false) String internalToken) {
        // Validate incoming body, parse times
        LocalDate date = LocalDate.parse(body.date);
        LocalTime start = LocalTime.parse(body.startTime);
        LocalTime end = LocalTime.parse(body.endTime);
        var resp = service.holdSlot(id, date, start, end, body.holdMinutes != null ? body.holdMinutes : 15);
        if (!resp.ok) return ResponseEntity.badRequest().body("{\"ok\":false}");
        return ResponseEntity.ok(java.util.Map.of("ok", true, "heldUntil", resp.untilIso));
    }

    // internal book/free endpoints could require internal token; see interceptor config
    @PostMapping("/{id}/availability/book")
    public ResponseEntity<?> book(@PathVariable Long id,
                                  @RequestParam String date,
                                  @RequestParam String start,
                                  @RequestParam String end,
                                  @RequestHeader(name = "X-Internal-Token", required = false) String internalToken) {
        boolean ok = service.bookSlot(id, LocalDate.parse(date), LocalTime.parse(start), LocalTime.parse(end));
        if (ok) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().body("{\"error\":\"slot_unavailable\"}");
    }

    @PostMapping("/{id}/availability/free")
    public ResponseEntity<?> free(@PathVariable Long id,
                                  @RequestParam String date,
                                  @RequestParam String start,
                                  @RequestParam String end,
                                  @RequestHeader(name = "X-Internal-Token", required = false) String internalToken) {
        boolean ok = service.freeSlot(id, LocalDate.parse(date), LocalTime.parse(start), LocalTime.parse(end));
        if (ok) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().body("{\"error\":\"cannot_free\"}");
    }
}
