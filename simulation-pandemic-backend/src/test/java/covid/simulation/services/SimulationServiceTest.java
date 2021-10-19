package covid.simulation.services;

import covid.simulation.dto.SimulationDto;
import covid.simulation.exceptions.ResourceNotFound;
import covid.simulation.mapper.SimulationMapper;
import covid.simulation.model.Simulation;
import covid.simulation.repository.SimulationRepository;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;

@Import(SimulationService.class)
@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
class SimulationServiceTest {
    @Autowired
    SimulationService service;

    @MockBean
    SimulationDaysService mockSimulationDaysService;

    @MockBean
    SimulationRepository mockRepository;

    @MockBean
    SimulationMapper mockMapper;


    @DisplayName("getAllSimulations")
    @Nested
    class GetAllSimulations {
        SimulationDto simulationDto;
        List<SimulationDto> simulationDtoList;
        Simulation simulation;
        List<Simulation> simulationList;

        @BeforeEach
        void setUp() throws Exception {
            //given
            simulation = Simulation.builder()
                    .id(1L)
                    .daysOfSimulation(2L)
                    .build();
            simulationList = List.of(simulation);

            simulationDto = SimulationDto.builder()
                    .id(1L)
                    .daysOfSimulation(2L)
                    .build();
            simulationDtoList = List.of(simulationDto);

            Mockito.when(mockRepository.findAll())
                    .thenReturn(simulationList);
            Mockito.when(mockMapper.mapToDto(simulation))
                    .thenReturn(simulationDto);
        }

        @AfterEach
        void tearDown() {
            Mockito.reset(mockRepository);
            Mockito.reset(mockMapper);
        }

        @Test
        void shouldGetListSimulationsList() {
            //when
            List<SimulationDto> simulationsExcepted = service.getAllSimulations();
            //then
            MatcherAssert.assertThat(simulationsExcepted, Matchers.notNullValue());
            MatcherAssert.assertThat(simulationsExcepted, Matchers.contains(simulationDto));
        }

        @Test
        void shouldInvokeRepositoryForSimulations() {
            //when
            service.getAllSimulations();
            //then
            Mockito.verify(mockRepository).findAll();
        }
    }

    @DisplayName("getSimulationById")
    @Nested
    class GetSimulationById {
        Long id, idInvalid;
        SimulationDto simulationDto;
        Simulation simulation;

        @BeforeEach
        void setUp() throws Exception {
            //given

            // found resource case
            id = 1L;
            simulation = Simulation.builder()
                    .id(id)
                    .daysOfSimulation(2L)
                    .build();
            simulationDto = SimulationDto.builder()
                    .id(id)
                    .daysOfSimulation(2L)
                    .build();
            Mockito.when(mockRepository.findById(id))
                    .thenReturn(Optional.of(simulation));
            Mockito.when(mockMapper.mapToDto(simulation))
                    .thenReturn(simulationDto);

            // not found resource case
            idInvalid = 2L;
            Mockito.when(mockRepository.findById(idInvalid))
                    .thenReturn(Optional.empty());
        }

        @AfterEach
        void tearDown() {
            Mockito.reset(mockRepository);
            Mockito.reset(mockMapper);
        }

        @Test
        void shouldReturnSimulation() {
            //when
            SimulationDto simulationsExcepted = service.getSimulationById(id);
            //then
            MatcherAssert.assertThat(simulationsExcepted, Matchers.is(simulationDto));
        }

        @Test
        void shouldInvokeRepositoryForSimulation() {
            //when
            service.getSimulationById(id);
            //then
            Mockito.verify(mockRepository).findById(id);
        }

        @Test
        void shouldThrowExceptionWhenNotFound() {
            //when
            Exception exception = assertThrows(RuntimeException.class, () ->
                    service.getSimulationById(idInvalid));
            //then
            MatcherAssert.assertThat(exception, Matchers.instanceOf(ResourceNotFound.class));
        }
    }



    @Test
    void addSimulationNew() {
    }

    @Test
    void updateSimulation() {
    }

    @Test
    void deleteSimulation() {
    }
}