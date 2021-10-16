import {Simulation} from "../../model/simulation.model";

export class FetchSimulations {
  public static readonly type = '[Simulations] Fetch all simulations';
}

export class FetchSimulationById {
  public static readonly type = '[Simulations] Fetch Simulation by id';
  constructor(public payload: { id: number }) { }
}

export class CreateSimulation {
  public static readonly type = '[Simulations] Create simulation';
  constructor(public payload: { simulation: Simulation }) { }
}

export class UpdateSimulation {
  public static readonly type = '[Simulations] Update simulation';
  constructor(public payload: { simulation: Simulation }) { }
}

export class DeleteSimulation {
  public static readonly type = '[Simulations] Delete simulation';
  constructor(public payload: { id: number }) { }
}
