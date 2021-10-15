package covid.simulation.repository;

import covid.simulation.model.Simulation;
import org.springframework.data.repository.CrudRepository;

public interface SimulationRepository extends CrudRepository<Simulation, Long> {
}
