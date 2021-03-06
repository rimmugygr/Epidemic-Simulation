import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Simulation} from "../model/simulation.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private proxyApi = environment.proxyApi;
  private baseUrl = `${this.proxyApi}/simulations/`;

  constructor(private http: HttpClient) { }

  getAllSimulations(): Observable<Simulation[]> {
    return this.http.get<Simulation[]>(this.baseUrl).pipe(
      tap(x => console.log('GETED' + JSON.stringify(x)))
    );
  }

  getSimulation(simulationId: number): Observable<Simulation> {
    return this.http.get<Simulation>(this.baseUrl + simulationId).pipe(
      tap(x => console.log('GETED' + JSON.stringify(x)))
    );
  }

  postSimulation(simulation: Simulation): Observable<Simulation>  {
    return this.http.post<Simulation>(this.baseUrl, JSON.stringify(simulation), httpOptions).pipe(
      tap(x => console.log('POSTED' + JSON.stringify(x)))
    );
  }

  putSimulation(simulation: Simulation): Observable<Simulation>  {
    console.log('PUTED' + JSON.stringify(simulation));
    return this.http.put<Simulation>(this.baseUrl + simulation.id, JSON.stringify(simulation), httpOptions).pipe(
      tap(x => console.log('PUTED' + JSON.stringify(x)))
    );
  }
  deleteSimulation(simulationId: number): Observable<number>  {
    return this.http.delete<number>(this.baseUrl + simulationId).pipe(
      tap(x => console.log('DELETED' + JSON.stringify(x)))
    );
  }


}
