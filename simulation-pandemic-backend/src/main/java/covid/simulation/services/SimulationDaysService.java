package covid.simulation.services;

import covid.simulation.dto.SimulationDayDto;
import covid.simulation.dto.SimulationDto;
import covid.simulation.exceptions.ResourceNotFound;
import covid.simulation.mapper.SimulationDayMapper;
import covid.simulation.mapper.SimulationMapper;
import covid.simulation.model.SimulationDay;
import covid.simulation.repository.SimulationDayRepository;
import covid.simulation.repository.SimulationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@AllArgsConstructor
public class SimulationDaysService {
    private final GenerateSimulationDaysService generateService;

    private final SimulationDayRepository simulationDayRepo;
    private final SimulationRepository simulationRepo;

    private final SimulationDayMapper simulationDayMapper;
    private final SimulationMapper simulationMapper;

    public List<SimulationDayDto> getSimulationDaysBySimulationId(Long simulationId) {
        simulationRepo.findById(simulationId)
                .orElseThrow(() -> new ResourceNotFound("Not found simulation with id: " + simulationId));

        return simulationDayRepo.getSimulationDayBySimulationIdOrderBySimulationDay(simulationId).stream()
                .map(simulationDayMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public List<SimulationDayDto> regeneratedSimulationDays(Long simulationId) {
        SimulationDto simulation = simulationRepo.findById(simulationId)
                .map(simulationMapper::mapToDto)
                .orElseThrow(() -> new ResourceNotFound("Not found simulation with id: " + simulationId));
        return regeneratedSimulationDays(simulation);
    }

    @Transactional
    public List<SimulationDayDto> regeneratedSimulationDays(SimulationDto simulation) {
        // delete old list of simulation days
        this.deleteSimulationDaysBySimulation(simulation);

        // generate and save new list of simulation days
        List<SimulationDayDto> regeneratedSimulationDayDtoList = generateService.generateSimulationDays(simulation);

        return this.saveSimulationDays(regeneratedSimulationDayDtoList, simulation);
    }

    public List<SimulationDayDto> saveSimulationDays(List<SimulationDayDto> simulationDayDtoList, SimulationDto simulationDto) {

        List<SimulationDay> simulationDayList = simulationDayDtoList.stream()
                .map(simulationDayMapper::map)
                .peek(x -> x.setSimulation(simulationMapper.map(simulationDto)))
                .collect(Collectors.toList());

        Iterable<SimulationDay> simulationDaysSaved = simulationDayRepo.saveAll(simulationDayList);

        return StreamSupport.stream(simulationDaysSaved.spliterator(), false)
                .map(simulationDayMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public void deleteSimulationDaysBySimulation(SimulationDto simulation) {
        simulationDayRepo.deleteAllBySimulation(simulationMapper.map(simulation));
    }
}
