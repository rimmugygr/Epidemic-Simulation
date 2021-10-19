package covid.simulation.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import covid.simulation.controller.request.SimulationRequest;
import covid.simulation.dto.SimulationDto;
import covid.simulation.exceptions.ResourceNotFound;
import covid.simulation.exceptions.ResourceUnprocessable;
import covid.simulation.mapper.SimulationMapper;
import covid.simulation.services.SimulationDaysService;
import covid.simulation.services.SimulationService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

@ExtendWith(SpringExtension.class)
@WebMvcTest
@AutoConfigureMockMvc
class SimulationControllerTest {
    private final String URL_BASE = "/api/simulations/";

    @Autowired
    MockMvc mvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    SimulationService mockService;

    @MockBean
    SimulationDaysService mockSimulationDaysService;

    @MockBean
    SimulationMapper mockMapper;

    @DisplayName("when data POST /api/simulations/")
    @Nested
    class PostSimulation {
        String url;
        SimulationDto simulationDto, simulationInvalidDto;
        SimulationRequest simulationRequest, simulationInvalidRequest;
        String simulationRequestJson, simulationInvalidRequestJson;

        @BeforeEach
        void setUp() throws Exception {
            //given
            url = URL_BASE;
            //valid simulation case
            simulationDto = SimulationDto.builder()
                    .reproduction(1L)
                    .population(10L)
                    .name("aaa")
                    .mortality(50L)
                    .initInfected(0L)
                    .daysToRecover(5L)
                    .daysToDeath(2L)
                    .daysOfSimulation(25L)
                    .build();
            simulationRequest = SimulationRequest.builder()
                    .reproduction(1L)
                    .population(10L)
                    .name("aaa")
                    .mortality(50L)
                    .initInfected(0L)
                    .daysToRecover(5L)
                    .daysToDeath(2L)
                    .daysOfSimulation(25L)
                    .build();
            simulationRequestJson = objectMapper.writeValueAsString(simulationRequest);
            Mockito.when(mockMapper.mapToDto(simulationRequest))
                    .thenReturn(simulationDto);

            // invalid simulation case
            simulationInvalidDto = SimulationDto.builder()
                    .mortality(null)
                    .initInfected(null)
                    .build();
            simulationInvalidRequest = SimulationRequest.builder()
                    .mortality(null)
                    .initInfected(null)
                    .build();
            simulationInvalidRequestJson = objectMapper.writeValueAsString(simulationInvalidRequest);
            Mockito.when(mockMapper.mapToDto(simulationInvalidRequest))
                    .thenReturn(simulationInvalidDto);
            Mockito.doThrow(ResourceUnprocessable.class)
                    .when(mockService).addSimulationNew(simulationInvalidDto);
        }

        @AfterEach
        void tearDown() {
            Mockito.reset(mockService);
            Mockito.reset(mockMapper);
        }

        @Test
        void shouldCreateSimulationWhenProvideSimulation() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.post(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(simulationRequestJson));
            //then
            Mockito.verify(mockService).addSimulationNew(simulationDto);
        }
        @Test
        void shouldResponseCreateStatusWhenSimulationIsCreated() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.post(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(simulationRequestJson));
            //then
            result.andExpect(MockMvcResultMatchers.status().isCreated());
        }
        @Test
        void shouldResponseUnprocessableEntityStatusWhenSimulationHaveWrongData() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.post(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(simulationInvalidRequestJson));
            //then
            result.andExpect(MockMvcResultMatchers.status().isUnprocessableEntity());
        }
    }



    @DisplayName("when data GET /api/simulations/{id}")
    @Nested
    class GetSimulation {
        String url, urlNotFoundIds;
        Long id, idInvalid;
        SimulationDto simulationDto;
        String simulationDtoJson;

        @BeforeEach
        void setUp() throws Exception {
            //given

            // case with resource found
            id = 2L;
            url = URL_BASE + "2";
            simulationDto = SimulationDto.builder()
                    .id(id)
                    .reproduction(1L)
                    .population(10L)
                    .name("aaa")
                    .mortality(50L)
                    .initInfected(0L)
                    .daysToRecover(5L)
                    .daysToDeath(2L)
                    .daysOfSimulation(25L)
                    .build();
            simulationDtoJson = objectMapper.writeValueAsString(simulationDto);
            Mockito.when(mockService.getSimulationById(id))
                    .thenReturn(simulationDto);

            // case with resource not found
            urlNotFoundIds = URL_BASE + "3";
            idInvalid = 3L;
            Mockito.doThrow(ResourceNotFound.class)
                    .when(mockService).getSimulationById(idInvalid);
        }

        @AfterEach
        void tearDown() {
            Mockito.reset(mockService);
            Mockito.reset(mockMapper);
        }

        @Test
        void shouldGetSimulationWhenProvideCorrectId() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.get(url));
            //then
            Mockito.verify(mockService).getSimulationById(id);
        }
        @Test
        void shouldResponseSimulationWhenSimulationIsFound() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.get(url));
            //then
            result.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
            result.andExpect(MockMvcResultMatchers.content().json(simulationDtoJson));
        }
        @Test
        void shouldResponseStatusOkWhenSimulationIsFound() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.get(url));
            //then
            result.andExpect(MockMvcResultMatchers.status().isOk());
        }
        @Test
        void shouldResponseNotFoundStatusWhenSimulationNotFoundByIds() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.get(urlNotFoundIds));
            //then
            result.andExpect(MockMvcResultMatchers.status().isNotFound());
        }
    }




    @DisplayName("when data GET /api/simulations/")
    @Nested
    class GetSimulations {
        String url;
        SimulationDto simulation1Dto,simulation2Dto;
        List<SimulationDto> simulationDtoList;
        String simulationDtoResponseJson;

        @BeforeEach
        void setUp() throws Exception {
            //given

            // case with resource found
            url = URL_BASE;
            simulation1Dto = SimulationDto.builder()
                    .id(1L)
                    .initInfected(0L)
                    .daysToRecover(5L)
                    .daysToDeath(2L)
                    .daysOfSimulation(25L)
                    .build();
            simulation2Dto = SimulationDto.builder()
                    .id(2L)
                    .initInfected(0L)
                    .daysToRecover(5L)
                    .daysToDeath(2L)
                    .daysOfSimulation(25L)
                    .build();
            simulationDtoList = List.of(simulation1Dto, simulation2Dto);

            simulationDtoResponseJson = objectMapper.writeValueAsString(simulationDtoList);
            Mockito.when(mockService.getAllSimulations())
                    .thenReturn(simulationDtoList);
        }

        @AfterEach
        void tearDown() {
            Mockito.reset(mockService);
            Mockito.reset(mockMapper);
        }

        @Test
        void shouldGetSimulation() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.get(url));
            //then
            Mockito.verify(mockService).getAllSimulations();
        }
        @Test
        void shouldResponseSimulationList() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.get(url));
            //then
            result.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
            result.andExpect(MockMvcResultMatchers.content().json(simulationDtoResponseJson));
        }
        @Test
        void shouldResponseStatusOk() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.get(url));
            //then
            result.andExpect(MockMvcResultMatchers.status().isOk());
        }
    }

    @DisplayName("when data DELETE /api/simulations/{id}")
    @Nested
    class DeleteSimulation {
        String url, urlNotFound;
        Long id, idInvalid;
        String responseJson;

        @BeforeEach
        void setUp() throws Exception {
            //given

            // case with resource found
            id = 1L;
            url = URL_BASE + id;
            responseJson = objectMapper.writeValueAsString(id);
            Mockito.when(mockService.deleteSimulation(id))
                    .thenReturn(id);

            // case with resource not found
            idInvalid = 2L;
            urlNotFound = URL_BASE + idInvalid;
            Mockito.doThrow(ResourceNotFound.class)
                    .when(mockService).deleteSimulation(idInvalid);
        }

        @AfterEach
        void tearDown() {
            Mockito.reset(mockService);
            Mockito.reset(mockMapper);
        }

        @Test
        void shouldDeleteSimulation() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.delete(url));
            //then
            Mockito.verify(mockService).deleteSimulation(id);
        }
        @Test
        void shouldResponseSimulationId() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.delete(url));
            //then
            result.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
            result.andExpect(MockMvcResultMatchers.content().json(responseJson));
        }
        @Test
        void shouldResponseStatusOk() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.delete(url));
            //then
            result.andExpect(MockMvcResultMatchers.status().isOk());
        }
        @Test
        void shouldResponseNotFoundStatusWhenSimulationNotFoundByIds() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.delete(urlNotFound));
            //then
            result.andExpect(MockMvcResultMatchers.status().isNotFound());
        }
    }



    @DisplayName("when data PUT /api/simulations/{id}")
    @Nested
    class PUTSimulation {
        Long id, idInvalid;
        String url, ulrInvalid;
        SimulationDto simulationDto, simulationInvalidDto, simulationResponseDto;
        SimulationRequest simulationRequest, simulationInvalidRequest;
        String simulationRequestJson, simulationInvalidRequestJson;

        @BeforeEach
        void setUp() throws Exception {
            //given

            //valid simulation case
            id = 1L;
            url = URL_BASE + id;
            simulationResponseDto = SimulationDto.builder()
                    .id(id)
                    .reproduction(1L)
                    .population(10L)
                    .name("aaa")
                    .mortality(50L)
                    .initInfected(0L)
                    .daysToRecover(5L)
                    .daysToDeath(2L)
                    .daysOfSimulation(25L)
                    .build();
            simulationDto = SimulationDto.builder()
                    .reproduction(1L)
                    .population(10L)
                    .name("aaa")
                    .mortality(50L)
                    .initInfected(0L)
                    .daysToRecover(5L)
                    .daysToDeath(2L)
                    .daysOfSimulation(25L)
                    .build();
            simulationRequest = SimulationRequest.builder()
                    .reproduction(1L)
                    .population(10L)
                    .name("aaa")
                    .mortality(50L)
                    .initInfected(0L)
                    .daysToRecover(5L)
                    .daysToDeath(2L)
                    .daysOfSimulation(25L)
                    .build();
            simulationRequestJson = objectMapper.writeValueAsString(simulationRequest);
            Mockito.when(mockMapper.mapToDto(simulationRequest))
                    .thenReturn(simulationDto);
            Mockito.when(mockService.updateSimulation(simulationDto, id))
                    .thenReturn(simulationResponseDto);

            // invalid data simulation case
            simulationInvalidDto = SimulationDto.builder()
                    .mortality(null)
                    .initInfected(null)
                    .build();
            simulationInvalidRequest = SimulationRequest.builder()
                    .mortality(null)
                    .initInfected(null)
                    .build();
            simulationInvalidRequestJson = objectMapper.writeValueAsString(simulationInvalidRequest);
            Mockito.when(mockMapper.mapToDto(simulationInvalidRequest))
                    .thenReturn(simulationInvalidDto);
            Mockito.doThrow(ResourceUnprocessable.class)
                    .when(mockService).updateSimulation(simulationInvalidDto, id);

            // not found resource case
            idInvalid = 2L;
            ulrInvalid = URL_BASE + idInvalid;
            Mockito.doThrow(ResourceNotFound.class)
                    .when(mockService).updateSimulation(simulationDto, idInvalid);
        }

        @AfterEach
        void tearDown() {
            Mockito.reset(mockService);
            Mockito.reset(mockMapper);
        }

        @Test
        void shouldUpdateSimulationWhenProvideSimulation() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.put(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(simulationRequestJson));
            //then
            Mockito.verify(mockService).updateSimulation(simulationDto, id);
        }
        @Test
        void shouldResponseOkStatusWhenSimulationIsUpdated() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.put(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(simulationRequestJson));
            //then
            result.andExpect(MockMvcResultMatchers.status().isOk());
        }
        @Test
        void shouldResponseUnprocessableEntityStatusWhenSimulationHaveWrongData() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.put(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(simulationInvalidRequestJson));
            //then
            result.andExpect(MockMvcResultMatchers.status().isUnprocessableEntity());
        }
        @Test
        void shouldResponseNotFoundStatusWhenSimulationNotFoundByIds() throws Exception {
            //when
            ResultActions result = mvc.perform(
                    MockMvcRequestBuilders.put(ulrInvalid)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(simulationRequestJson));
            //then
            result.andExpect(MockMvcResultMatchers.status().isNotFound());
        }
    }

}