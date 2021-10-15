package covid.simulation.controller;

import covid.simulation.controller.request.SimulationRequest;
import covid.simulation.dto.SimulationDto;
import covid.simulation.mapper.SimulationMapper;
import covid.simulation.services.SimulationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/simulations/")
public class SimulationController {
    private final SimulationService service;
    private final SimulationMapper mapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<SimulationDto> getSimulations() {
        return service.getAllSimulations();
    }

    @GetMapping(path = "{id}")
    @ResponseStatus(HttpStatus.OK)
    public SimulationDto getSimulation(@PathVariable Long id) {
        return service.getSimulationById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SimulationDto postSimulation(@RequestBody SimulationRequest simulationRequest) {
        return service.addSimulationNew(mapper.mapToDto(simulationRequest));
    }

    @PutMapping(path = "{id}")
    @ResponseStatus(HttpStatus.OK)
    public SimulationDto putSimulation(@RequestBody SimulationRequest simulationRequest, @PathVariable Long id) {
        SimulationDto simulationDto = mapper.mapToDto(simulationRequest);
        simulationDto.setId(id);
        return service.updateSimulation(simulationDto, id);
    }

    @DeleteMapping(path = "{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteSimulation(@PathVariable Long id) {
        service.deleteSimulation(id);
    }
}
