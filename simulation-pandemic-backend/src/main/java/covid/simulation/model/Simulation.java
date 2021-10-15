package covid.simulation.model;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Simulation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    //N name of simulation
    private String name;
    //P all population number
    private Long population;
    //I initial infected population
    private Long initInfected;
    //R reproduction of infected
    private Long reproduction;
    //M mortality of illness in % by day
    private Long mortality;
    //Ti days to recover from illness
    private Long daysToRecover;
    //Tm days to death from illness
    private Long daysToDeath;
    //Ts number of days of simulation
    private Long daysOfSimulation;
    //Generated Simulation
    @OneToMany(mappedBy = "simulation")
    @ToString.Exclude
    private List<SimulationDay> simulationDayList;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Simulation that = (Simulation) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
