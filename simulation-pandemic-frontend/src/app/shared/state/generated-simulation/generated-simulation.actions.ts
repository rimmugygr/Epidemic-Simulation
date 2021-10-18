export class FetchGeneratedSimulationById {
  public static readonly type = '[Generated simulation] Fetch generated simulation by id';
  constructor(public payload: { id: number }) { }
}

export class FetchRegeneratedSimulationById {
  public static readonly type = '[Generated simulation] Fetch regenerated simulation by id';
  constructor(public payload: { id: number }) { }
}
