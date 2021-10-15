package covid.simulation.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SimulationDayDto {
    private Long id;
    private Long simulationDay;
    private Long infectedPeople;
    private Long healthyPeople;
    private Long deathPeople;
    private Long immunePeople;
}
