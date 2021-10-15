package covid.simulation.repository;

import covid.simulation.model.Simulation;
import covid.simulation.model.SimulationDay;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@Sql(scripts = "classpath:repository-test.sql")
@DataJpaTest
@ActiveProfiles("test")
class SimulationDayRepositoryTest {
    @Autowired
    SimulationDayRepository simulationDayRepository;

    @Autowired
    SimulationRepository simulationRepository;

    @Test
    void getSimulationDayBySimulationIdOrderBySimulationDay() {
        //given
        entitiesSave();
        Long simulationId = 1L;
        //when
        List<SimulationDay> actualSimulationDayList =
                simulationDayRepository.getSimulationDayBySimulationIdOrderBySimulationDay(simulationId);
        //then
        assertEquals(3, actualSimulationDayList.size());
        assertEquals(0L, actualSimulationDayList.get(0).getSimulationDay());
        assertEquals(1L, actualSimulationDayList.get(1).getSimulationDay());
        assertEquals(2L, actualSimulationDayList.get(2).getSimulationDay());
    }

    public void entitiesSave() {
        Simulation simulation = Simulation.builder()
                .id(1L)
                .build();
        simulationRepository.save(simulation);
        Stream.of(
                SimulationDay.builder()
                        .simulationDay(0L)
                        .deathPeople(0L)
                        .healthyPeople(100L)
                        .immunePeople(0L)
                        .infectedPeople(10L)
                        .simulation(simulation)
                        .build(),
                SimulationDay.builder()
                        .simulationDay(2L)
                        .deathPeople(1L)
                        .healthyPeople(97L)
                        .immunePeople(1L)
                        .infectedPeople(11L)
                        .simulation(simulation)
                        .build(),
                SimulationDay.builder()
                        .simulationDay(1L)
                        .deathPeople(1L)
                        .healthyPeople(97L)
                        .immunePeople(1L)
                        .infectedPeople(11L)
                        .simulation(simulation)
                        .build()
        ).forEach(simulationDayRepository::save);
    }
}