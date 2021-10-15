package covid.simulation.mapper;

import covid.simulation.controller.request.SimulationRequest;
import covid.simulation.dto.SimulationDto;
import covid.simulation.model.Simulation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SimulationMapper {

    public Simulation map(SimulationDto simulationDto);
    public SimulationDto mapToDto(Simulation simulation);
    public SimulationDto mapToDto(SimulationRequest simulationRequest);
}
