package covid.simulation.mapper;

import covid.simulation.dto.SimulationDayDto;
import covid.simulation.model.SimulationDay;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SimulationDayMapper {

    public SimulationDayDto mapToDto(SimulationDay simulationDay);
    public SimulationDay map(SimulationDayDto simulationDay);
}
