package MS_guias.guide.dto;

import MS_guias.guidelanguage.dto.GuiaIdiomaRequest;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GuiaRequest {
    @NotBlank
    public String nombres;
    @NotBlank
    public String apellidos;
    @NotBlank(message = "El DNI es obligatorio")
    @Size(min = 8, max = 8, message = "El DNI debe tener exactamente 8 caracteres")
    public String dni;
    @NotBlank
    public String bio;
    @NotNull
    public String city;
    @NotNull
    public String country;
    @NotNull
    public Boolean certification;
    @NotNull
    public List<GuiaIdiomaRequest> languages;
    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo debe tener un formato válido")
    private String correo;
}
