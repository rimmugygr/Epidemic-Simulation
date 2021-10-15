package covid.simulation.services;

import covid.simulation.dto.SimulationDayDto;
import covid.simulation.dto.SimulationDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GenerateSimulationDaysService {

    public List<SimulationDayDto> generateSimulationDays(SimulationDto simulation) {
        // list of all simulation days
        List<SimulationDayDto> simulationDayList = new ArrayList<>();

        // initial simulation day
        SimulationDayDto actualDay = getInitialDay(simulation);

        simulationDayList.add(actualDay);
        SimulationDayDto previousDay = actualDay;

        for (Long dayNumber = 1L; dayNumber <= simulation.getDaysOfSimulation(); dayNumber++) {

            // calculate simulation day
            actualDay = getActualSimulationDay(simulation, simulationDayList, previousDay, dayNumber);

            simulationDayList.add(actualDay);
            previousDay = actualDay;
        }
        return simulationDayList;
    }

    private SimulationDayDto getActualSimulationDay(SimulationDto simulation,
                                                    List<SimulationDayDto> simulationDayList,
                                                    SimulationDayDto previousDay,
                                                    Long dayNumber) {
        Long todayDeath = 0L;
        Long todayRecovered = 0L;
        Long todayInfected = 0L;

        // to calculate actual new death people
        todayDeath = calculateActualDeathPeople(simulation, simulationDayList, previousDay, dayNumber);

        // to calculate actual new recovered people
        todayRecovered = calculateActualRecoveredPeople(simulation, simulationDayList, previousDay, todayDeath, dayNumber);

        // to calculate actual new infected people
        todayInfected = calculateActualInfectedPeople(simulation, previousDay, todayDeath, todayRecovered);

        // to calculate and build actual simulation day
        return getActualSimulationDay(previousDay, todayDeath, todayRecovered, todayInfected, dayNumber);
    }

    private SimulationDayDto getInitialDay(SimulationDto simulation) {
        return SimulationDayDto.builder()
                .simulationDay(0L)
                .deathPeople(0L)
                .infectedPeople(simulation.getInitInfected())
                .healthyPeople(simulation.getPopulation() - simulation.getInitInfected())
                .immunePeople(0L)
                .build();
    }

    private SimulationDayDto getActualSimulationDay(SimulationDayDto previousDay,
                                                    Long todayDeath,
                                                    Long todayRecovered,
                                                    Long todayInfected,
                                                    Long dayNumber) {
        return SimulationDayDto.builder()
                .simulationDay(dayNumber)
                .deathPeople(previousDay.getDeathPeople() + todayDeath)
                .infectedPeople(previousDay.getInfectedPeople() + todayInfected - todayDeath - todayRecovered)
                .healthyPeople(previousDay.getHealthyPeople() - todayInfected)
                .immunePeople(previousDay.getImmunePeople() + todayRecovered)
                .build();
    }

    private Long calculateActualInfectedPeople(SimulationDto simulation,
                                               SimulationDayDto previousDay,
                                               Long todayDeath,
                                               Long todayRecovered) {
        // all infected people who not die and recover reproduce covid
        Long todayCanInfected = (previousDay.getInfectedPeople() - todayDeath + todayRecovered) * simulation.getReproduction();
        // case when not enough people from previous day to infect
        return Math.min((long) Math.floor(todayCanInfected), previousDay.getHealthyPeople());
    }

    private Long calculateActualRecoveredPeople(SimulationDto simulation,
                                                List<SimulationDayDto> simulationDayList,
                                                SimulationDayDto previousDay,
                                                Long todayDeath,
                                                Long dayNumber) {
        Long todayRecovered = 0L;
        if(dayNumber - simulation.getDaysToRecover() >= 0) {
            Long todayCanRecover = simulationDayList
                    .get((int) (dayNumber - simulation.getDaysToRecover()))
                    .getInfectedPeople();
            // case when not enough people from previous day to recover because they die
            todayRecovered = Math.min(todayCanRecover, previousDay.getInfectedPeople() - todayDeath);
        }
        return (long) Math.floor(todayRecovered);
    }

    private Long calculateActualDeathPeople(SimulationDto simulation,
                                            List<SimulationDayDto> simulationDayList,
                                            SimulationDayDto previousDay,
                                            Long dayNumber) {
        Long todayDeath = 0L;
        if(dayNumber - simulation.getDaysToDeath() >= 0) {
            Long infectedPeopleCanDie = simulationDayList
                    .get((int) (dayNumber - simulation.getDaysToDeath()))
                    .getInfectedPeople();
            todayDeath = infectedPeopleCanDie * simulation.getMortality() / 100L;
        }
        // case when not enough people from previous day to die
        return Math.min((long) Math.floor(todayDeath), previousDay.getInfectedPeople());
    }
}
