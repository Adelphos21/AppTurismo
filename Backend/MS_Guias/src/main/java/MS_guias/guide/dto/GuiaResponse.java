package MS_guias.guide.dto;

import MS_guias.availabilityslot.dto.SlotResponse;
import MS_guias.pricing.dto.PrecioResponse;

import java.util.List;

public class GuiaResponse {
    public Long id;
    public String fullName;
    public String city;
    public Double ratingAvg;
    public List<String> languages;
    public Boolean certification;
    public SlotResponse nextAvailable;
    public PrecioResponse hourlyRate;
}
