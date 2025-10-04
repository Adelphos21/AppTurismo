package MS_guias.guidelanguage.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GuiaIdiomaRequest {
    @NotBlank
    private String code;
    @NotBlank
    private String name;
}
