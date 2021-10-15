package covid.simulation.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class SimulationDto {
    private Long id;
    private String name;
    private Long population;
    private Long initInfected;
    private Long reproduction;
    private Long mortality;
    private Long daysToRecover;
    private Long daysToDeath;
    private Long daysOfSimulation;
    @JsonIgnore
    private List<SimulationDayDto> simulationDayList;
}
