package covid.simulation.services;

import covid.simulation.dto.SimulationDto;
import covid.simulation.exceptions.ResourceNotFound;
import covid.simulation.exceptions.ResourceUnprocessable;
import covid.simulation.mapper.SimulationMapper;
import covid.simulation.model.Simulation;
import covid.simulation.repository.SimulationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SimulationService {
    private final GenerateSimulationDaysService generateService;
    private final SimulationDaysService simulationDaysService;

    private final SimulationRepository simulationRepo;

    private final SimulationMapper simulationMapper;

    public List<SimulationDto> getAllSimulations() {
        return ((List<Simulation>) simulationRepo.findAll()).stream()
                .map(simulationMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public SimulationDto getSimulationById(Long id) {
        return simulationRepo.findById(id)
                .map(simulationMapper::mapToDto)
                .orElseThrow(() -> new ResourceNotFound("Not found simulation with id: " + id));
    }

    @Transactional
    public SimulationDto addSimulationNew(SimulationDto simulationNewDto) {

        //validation simulation parameters
        this.isSimulationValidateOrThrowException(simulationNewDto);

        Simulation simulationNew = simulationMapper.map(simulationNewDto);
        Simulation simulationSaved = simulationRepo.save(simulationNew);

        // generate new simulation
        simulationDaysService.regeneratedSimulationDays(simulationSaved.getId());

        return simulationMapper.mapToDto(simulationSaved);
    }

    @Transactional
    public SimulationDto updateSimulation(SimulationDto simulationDto, Long id) {

        //validation simulation parameters
        isSimulationExistOrThrowException(id);
        
        //validation simulation parameters
        this.isSimulationValidateOrThrowException(simulationDto);

        Simulation simulation = simulationMapper.map(simulationDto);

        // regenerate new simulation
        simulationDaysService.regeneratedSimulationDays(simulationDto);

        return simulationMapper.mapToDto(simulationRepo.save(simulation));
    }


    public Long deleteSimulation(Long id) {
        SimulationDto simulation = getSimulationById(id);
        // delete all simulated days
        simulationDaysService.deleteSimulationDaysBySimulation(simulation);
        // delete simulation
        simulationRepo.deleteById(id);
        return id;
    }

    private void isSimulationValidateOrThrowException(SimulationDto simulation) {
        if(isNotIntegerNumber(simulation.getDaysOfSimulation()) || simulation.getDaysOfSimulation() < 1)
            throw new ResourceUnprocessable("Simulation days are incorrect");

        if(isNotIntegerNumber(simulation.getInitInfected()) || simulation.getInitInfected() < 1)
            throw new ResourceUnprocessable("Simulation number of initial infected people is incorrect");

        if(isNotIntegerNumber(simulation.getPopulation()) || simulation.getPopulation() < 1)
            throw new ResourceUnprocessable("Simulation number of all people is incorrect");

        if(isNotIntegerNumber(simulation.getDaysToDeath()) || simulation.getDaysToDeath() < 0)
            throw new ResourceUnprocessable("Simulation number of days to die is incorrect");

        if(isNotIntegerNumber(simulation.getDaysToRecover()) || simulation.getDaysToRecover() < 0)
            throw new ResourceUnprocessable("Simulation number of days to recover from infection is incorrect");

        if(simulation.getMortality() < 0 || simulation.getMortality() > 100)
            throw new ResourceUnprocessable("Simulation mortality is incorrect");

        if(isNotIntegerNumber(simulation.getReproduction()) || simulation.getReproduction() < 0)
            throw new ResourceUnprocessable("Simulation number of reproduction infection is incorrect");

        if(simulation.getName() == null || simulation.getName().isEmpty())
            throw new ResourceUnprocessable("Simulation name is incorrect");

        if(simulation.getPopulation() < simulation.getInitInfected())
            throw new ResourceUnprocessable("Data in simulation are incorrect");
    }

    private boolean isNotIntegerNumber(Long number){
        return Math.ceil(number) != Math.floor(number);
    }

    private void isSimulationExistOrThrowException(Long id) {
        if (!simulationRepo.existsById(id))
            throw new ResourceNotFound("Not found simulation with id: " + id);
    }
}
