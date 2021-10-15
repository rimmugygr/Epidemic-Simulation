package covid.simulation.model;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class SimulationDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    //what simulation day is
    private Long simulationDay;
    //Pi
    private Long infectedPeople;
    //Pv
    private Long healthyPeople;
    //Pm
    private Long deathPeople;
    //Pr
    private Long immunePeople;
    @ManyToOne
    private Simulation simulation;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SimulationDay that = (SimulationDay) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
