export interface Simulation {
  id: number;
  name: string;
  population: number;
  initInfected: number;
  reproduction: number;
  mortality: number;
  daysToRecover: number;
  daysToDeath: number;
  daysOfSimulation: number;
  simulationDayList?: GeneratedSimulationDay[];
}

export interface GeneratedSimulationDay {
  id: number;
  simulationDay: number;
  infectedPeople: number;
  healthyPeople: number;
  deathPeople: number;
  immunePeople: number;
}
