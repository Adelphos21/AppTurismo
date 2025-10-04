package MS_guias.availabilityslot.dto;


public class HoldRequestDTO {
    public String date;       // YYYY-MM-DD
    public String startTime;  // HH:MM
    public String endTime;    // HH:MM
    public Integer holdMinutes = 15;
}
