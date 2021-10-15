package covid.simulation.controller;

import covid.simulation.dto.SimulationDayDto;
import covid.simulation.services.SimulationDaysService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/simulations/")
public class SimulationDaysController {
    private final SimulationDaysService service;

    @GetMapping("{id}/simulation-days")
    @ResponseStatus(HttpStatus.OK)
    public List<SimulationDayDto> getSimulationDays(@PathVariable Long id) {
        return service.getSimulationDaysBySimulationId(id);
    }

    @GetMapping("{id}/simulation-days-regenerated")
    @ResponseStatus(HttpStatus.OK)
    public List<SimulationDayDto> getRegeneratedSimulationDays(@PathVariable Long id) {
        return service.regeneratedSimulationDays(id);
    }
}
