package covid.simulation.controller.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SimulationRequest {
    private String name;
    private Long population;
    private Long initInfected;
    private Long reproduction;
    private Long mortality;
    private Long daysToRecover;
    private Long daysToDeath;
    private Long daysOfSimulation;
}
