package covid.simulation.services;

import covid.simulation.dto.SimulationDayDto;
import covid.simulation.dto.SimulationDto;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

@Import(GenerateSimulationDaysService.class)
@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
class GenerateSimulationDaysServiceTest {
    @Autowired
    GenerateSimulationDaysService service;

    @DisplayName("GenerateSimulationDaysWhenProvidedAnySimulation")
    @Nested
    class GenerateSimulationDays {
        SimulationDto anySimulation;
        Long simulationDays;
        Long population;

        @BeforeEach
        void setUp() {
            //given
            simulationDays = 6L;
            population = 100L;

            anySimulation = SimulationDto.builder()
                    .daysOfSimulation(simulationDays)
                    .daysToDeath(2L)
                    .daysToRecover(4L)
                    .initInfected(1L)
                    .mortality(50L)
                    .population(population)
                    .reproduction(1L)
                    .build();
        }

        @Test
        void shouldReturnList() {
            //when
            List<SimulationDayDto> simulationDayList = service.generateSimulationDays(anySimulation);
            //then
            MatcherAssert.assertThat(simulationDayList, Matchers.notNullValue());
        }

        @Test
        void shouldReturnListWitchProperSize() {
            //when
            List<SimulationDayDto> simulationDayList = service.generateSimulationDays(anySimulation);
            //then
            MatcherAssert.assertThat(simulationDayList, Matchers.hasSize((int) (simulationDays + 1)));
        }

        @Test
        void shouldReturnListWithCorrectPopulation() {
            //when
            List<SimulationDayDto> simulationDayList = service.generateSimulationDays(anySimulation);
            Long totalPopulationInitial = getTotalPopulation(simulationDayList, 0);
            Long totalPopulation1 = getTotalPopulation(simulationDayList, 4);
            Long totalPopulation2 = getTotalPopulation(simulationDayList, 6);

            //then
            MatcherAssert.assertThat(totalPopulation1, Matchers.is(population));
            MatcherAssert.assertThat(totalPopulation2, Matchers.is(population));
            MatcherAssert.assertThat(totalPopulationInitial, Matchers.is(population));
        }

        @Test
        void shouldReturnListWithCorrectDeathPeople() {
            //when
            List<SimulationDayDto> simulationDayList = service.generateSimulationDays(anySimulation);

            //then
            MatcherAssert.assertThat(simulationDayList.get(2).getDeathPeople(), Matchers.is(0L));
            MatcherAssert.assertThat(simulationDayList.get(3).getDeathPeople(), Matchers.is(1L));
            MatcherAssert.assertThat(simulationDayList.get(4).getDeathPeople(), Matchers.is(3L));
        }

        @Test
        void shouldReturnListWithCorrectInfectedPeople() {
            //when
            List<SimulationDayDto> simulationDayList = service.generateSimulationDays(anySimulation);

            //then
            MatcherAssert.assertThat(simulationDayList.get(2).getInfectedPeople(), Matchers.is(4L));
            MatcherAssert.assertThat(simulationDayList.get(3).getInfectedPeople(), Matchers.is(6L));
            MatcherAssert.assertThat(simulationDayList.get(4).getInfectedPeople(), Matchers.is(8L));
        }

        @Test
        void shouldReturnListWithCorrectImmunePeople() {
            //when
            List<SimulationDayDto> simulationDayList = service.generateSimulationDays(anySimulation);

            //then
            MatcherAssert.assertThat(simulationDayList.get(2).getImmunePeople(), Matchers.is(0L));
            MatcherAssert.assertThat(simulationDayList.get(3).getImmunePeople(), Matchers.is(0L));
            MatcherAssert.assertThat(simulationDayList.get(4).getImmunePeople(), Matchers.is(1L));
        }

        @Test
        void shouldReturnListWithCorrectHealthyPeople() {
            //when
            List<SimulationDayDto> simulationDayList = service.generateSimulationDays(anySimulation);

            //then
            MatcherAssert.assertThat(simulationDayList.get(2).getHealthyPeople(), Matchers.is(96L));
            MatcherAssert.assertThat(simulationDayList.get(3).getHealthyPeople(), Matchers.is(93L));
            MatcherAssert.assertThat(simulationDayList.get(4).getHealthyPeople(), Matchers.is(88L));
        }

    }

    private long getTotalPopulation(List<SimulationDayDto> simulationDayList, int i) {
        return simulationDayList.get(i).getInfectedPeople()
                + simulationDayList.get(i).getHealthyPeople()
                + simulationDayList.get(i).getDeathPeople()
                + simulationDayList.get(i).getImmunePeople();
    }
}