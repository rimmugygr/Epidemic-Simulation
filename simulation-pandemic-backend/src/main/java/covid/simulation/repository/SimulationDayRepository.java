package covid.simulation.repository;

import covid.simulation.model.Simulation;
import covid.simulation.model.SimulationDay;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SimulationDayRepository extends CrudRepository<SimulationDay, Long> {
    List<SimulationDay> getSimulationDayBySimulationIdOrderBySimulationDay(Long simulationId);
    void deleteAllBySimulation(Simulation simulation);
}
