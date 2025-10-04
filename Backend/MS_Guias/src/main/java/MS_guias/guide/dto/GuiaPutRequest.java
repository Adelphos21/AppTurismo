package MS_guias.guide.dto;

import MS_guias.guidelanguage.dto.GuiaIdiomaRequest;
import MS_guias.guidelanguage.entity.GuiaIdioma;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GuiaPutRequest {
    public String bio;
    public List<GuiaIdiomaRequest> languages;
    public String city;
}
