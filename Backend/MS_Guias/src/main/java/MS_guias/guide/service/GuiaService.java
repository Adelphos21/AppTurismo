package MS_guias.guide.service;


import MS_guias.availabilityslot.dto.SlotResponse;
import MS_guias.availabilityslot.entity.Disponibilidad;
import MS_guias.availabilityslot.entity.Status;
import MS_guias.availabilityslot.repository.DisponibilidadRepository;
import MS_guias.exception.ConflictException;
import MS_guias.exception.NotFoundException;
import MS_guias.guide.dto.GuiaPutRequest;
import MS_guias.guide.dto.GuiaResponse;
import MS_guias.guide.entity.Guia;
import MS_guias.guide.repository.GuiaRepository;
import MS_guias.guidelanguage.dto.GuiaIdiomaRequest;
import MS_guias.guidelanguage.entity.GuiaIdioma;
import MS_guias.pricing.dto.PrecioResponse;
import MS_guias.pricing.repository.PrecioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class GuiaService {

    private final GuiaRepository guideRepo;
    private final DisponibilidadRepository slotRepo;
    private final PrecioRepository pricingRepo;


    @Autowired
    public GuiaService(GuiaRepository guideRepo, DisponibilidadRepository slotRepo, PrecioRepository pricingRepo) {
        this.guideRepo = guideRepo;
        this.slotRepo = slotRepo;
        this.pricingRepo = pricingRepo;
    }
    public Guia createGuide(Guia guide) {
        if(guideRepo.existsByDni(guide.getDni())){
            throw new ConflictException("Ya existe un usuario con este DNI");
        }
        if(guideRepo.existsByCorreo(guide.getCorreo())){
            throw new ConflictException("Ya existe un usuario registrado con este correo");
        }
        return guideRepo.save(guide);
    }

    public Guia findById(Long id) {
        return guideRepo.findById(id).orElseThrow(() -> new NotFoundException("Guia no encontrado!"));
    }
    public void updateGuide(Long id, GuiaPutRequest guiaPutRequest) {
        Guia guia = findById(id);

        if(guiaPutRequest.getBio() != null && !guiaPutRequest.getBio().isEmpty()){
            guia.setBio(guiaPutRequest.getBio());
        }
        if(guiaPutRequest.getCity() != null && !guiaPutRequest.getCity().isEmpty()){
            guia.setCity(guiaPutRequest.getCity());
        }

        if(guiaPutRequest.getLanguages() != null && !guiaPutRequest.getLanguages().isEmpty()){
            updateLanguages(guia, guiaPutRequest.getLanguages());
        }
    }
    private void updateLanguages(Guia guia, List<GuiaIdiomaRequest> languageDTOs) {
        // Eliminar idiomas existentes
        guia.getIdiomas().clear();

        // Agregar nuevos idiomas
        for (GuiaIdiomaRequest dto : languageDTOs) {
            GuiaIdioma idioma = new GuiaIdioma();
            idioma.setLanguageCode(dto.getCode());
            idioma.setLanguageName(dto.getName());
            idioma.setGuia(guia);
            guia.getIdiomas().add(idioma);
        }
    }/*
    public List<GuiaResponse> searchByCity(String city, LocalDate date) {
        List<Guia> list = guideRepo.searchByCity(city);
        return list.stream().map(g -> {
            GuiaResponse dto = new GuiaResponse();
            // Ajusta estos getters según tus entidades:
            dto.id = g.getId();
            dto.fullName = g.getNombres() + " " + g.getApellidos(); // si tus getters se llaman así
            dto.city = g.getCity(); // o g.getCiudad()
            dto.ratingAvg = g.getRatingAvg();
            dto.languages = g.getIdiomas().stream().map(idioma -> idioma.getLanguageCode()).collect(Collectors.toList());
            if (date != null) {
                List<Disponibilidad> slots = slotRepo.findFreeByGuideAndDate(g.getId(), date);
                if (!slots.isEmpty()) {
                    var s = slots.get(0);
                    SlotResponse slot = new SlotResponse();
                    slot.startTime = s.getStartTime().toString(); // asegúrate startTime existe
                    slot.endTime = s.getEndTime().toString();     // asegúrate endTime existe
                    slot.status = s.getStatus();
                    dto.nextAvailable = slot;
                }
            }
            var prices = pricingRepo.findLatestByGuide(g.getId());
            if (!prices.isEmpty()) {
                var p = prices.get(0);
                PrecioResponse price = new PrecioResponse();
                price.currency = p.getCurrency();
                price.hourlyRate = p.getHourlyRate();
                dto.hourlyRate = price;
            }
            return dto;
        }).collect(Collectors.toList());
    }*/

    /*public List<GuiaResponse> searchByCertification(Boolean bandera, LocalDate date) {
        List<Guia> list = guideRepo.searchByCertification(bandera);
        return list.stream().map(g -> {
            GuiaResponse dto = new GuiaResponse();
            // Ajusta estos getters según tus entidades:
            dto.id = g.getId();
            dto.fullName = g.getNombres() + " " + g.getApellidos(); // si tus getters se llaman así
            dto.city = g.getCity(); // o g.getCiudad()
            dto.ratingAvg = g.getRatingAvg();
            dto.languages = g.getIdiomas().stream().map(GuiaIdioma::getLanguageCode).collect(Collectors.toList());
            if (date != null) {
                List<Disponibilidad> slots = slotRepo.findFreeByGuideAndDate(g.getId(), date);
                if (!slots.isEmpty()) {
                    var s = slots.get(0);
                    SlotResponse slot = new SlotResponse();
                    slot.startTime = s.getStartTime().toString(); // asegúrate startTime existe
                    slot.endTime = s.getEndTime().toString();     // asegúrate endTime existe
                    slot.status = s.getStatus();
                    dto.nextAvailable = slot;
                }
            }
            var prices = pricingRepo.findLatestByGuide(g.getId());
            if (!prices.isEmpty()) {
                var p = prices.get(0);
                PrecioResponse price = new PrecioResponse();
                price.currency = p.getCurrency();
                price.hourlyRate = p.getHourlyRate();
                dto.hourlyRate = price;
            }
            return dto;
        }).collect(Collectors.toList());
    }*/

    public List<GuiaResponse> search(String city, LocalDate date, String language, Boolean certification) {
        // Usar el método unificado del repositorio
        List<Guia> list = guideRepo.findByFilters(city, certification, language);

        return list.stream().map(g -> {
            GuiaResponse dto = new GuiaResponse();
            dto.id = g.getId();
            dto.fullName = g.getNombres() + " " + g.getApellidos();
            dto.city = g.getCity();
            dto.ratingAvg = g.getRatingAvg();
            dto.certification = g.getCertification(); // Agregar esto al DTO si no existe

            // Mapear idiomas
            dto.languages = g.getIdiomas().stream()
                    .map(GuiaIdioma::getLanguageCode)
                    .collect(Collectors.toList());

            // Lógica para nextAvailable (slots)
            if (date != null) {
                List<Disponibilidad> slots = slotRepo.findFreeByGuideAndDate(g.getId(), date);
                if (!slots.isEmpty()) {
                    var s = slots.get(0);
                    SlotResponse slot = new SlotResponse();
                    slot.startTime = s.getStartTime().toString();
                    slot.endTime = s.getEndTime().toString();
                    slot.status = s.getStatus();
                    dto.nextAvailable = slot;
                }
            }

            // Lógica para precios
            var prices = pricingRepo.findLatestByGuide(g.getId());
            if (!prices.isEmpty()) {
                var p = prices.get(0);
                PrecioResponse price = new PrecioResponse();
                price.currency = p.getCurrency();
                price.hourlyRate = p.getHourlyRate();
                dto.hourlyRate = price;
            }

            return dto;
        }).collect(Collectors.toList());
    }
    public List<SlotResponse> getAvailability(Long guideId, LocalDate date) {
        var slots = slotRepo.findByGuideAndDate(guideId, date);
        return slots.stream().map(s -> {
            SlotResponse dto = new SlotResponse();
            dto.startTime = s.getStartTime().toString(); // CORRECTO si Disponibilidad tiene getStartTime()
            dto.endTime = s.getEndTime().toString();     // CORRECTO si Disponibilidad tiene getEndTime()
            dto.status = s.getStatus();
            return dto;
        }).collect(Collectors.toList());
    }


    @Transactional
    public HoldResponse holdSlot(Long guideId, LocalDate date, LocalTime start, LocalTime end, int minutes) {
        var opt = slotRepo.findExact(guideId, date, start, end);
        if (opt.isEmpty()) return new HoldResponse(false, null);
        var slot = opt.get();
        if (!Status.FREE.equals(slot.getStatus())) return new HoldResponse(false, null);
        slot.setStatus(Status.HELD);
        slotRepo.save(slot);
        var until = OffsetDateTime.now(ZoneOffset.UTC).plusMinutes(minutes);
        return new HoldResponse(true, until.toString());
    }

    @Transactional
    public boolean bookSlot(Long guideId, LocalDate date, LocalTime start, LocalTime end) {
        var opt = slotRepo.findExact(guideId, date, start, end);
        if (opt.isEmpty()) return false;
        var slot = opt.get();
        if (Status.BOOKED.equals(slot.getStatus())) return false;
        slot.setStatus(Status.BOOKED);
        slotRepo.save(slot);
        return true;
    }

    @Transactional
    public boolean freeSlot(Long guideId, LocalDate date, LocalTime start, LocalTime end) {
        var opt = slotRepo.findExact(guideId, date, start, end);
        if (opt.isEmpty()) return false;
        var slot = opt.get();
        slot.setStatus(Status.FREE);
        slotRepo.save(slot);
        return true;
    }

    public PrecioResponse getLatestPrice(Long guideId) {
        var list = pricingRepo.findLatestByGuide(guideId);
        if (list.isEmpty()) return null;
        var p = list.get(0);
        PrecioResponse dto = new PrecioResponse();
        dto.currency = p.getCurrency();
        dto.hourlyRate = p.getHourlyRate();
        return dto;
    }

    // small helper class for hold response
    public static class HoldResponse {
        public final boolean ok;
        public final String untilIso;
        public HoldResponse(boolean ok, String untilIso) { this.ok = ok; this.untilIso = untilIso; }
    }
}
