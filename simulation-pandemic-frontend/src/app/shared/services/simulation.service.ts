import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Simulation} from "../model/simulation.model";

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private proxyApi = environment.proxyApi;
  private baseUrl = `${this.proxyApi}/simulations`;

  constructor(private http: HttpClient) { }

  getAllSimulations(): Observable<Simulation[]> {
    return this.http.get<Simulation[]>(this.baseUrl).pipe(
      tap(x => console.log('GETED' + JSON.stringify(x)))
    );
  }

  getSimulation(simulationId: number): Observable<Simulation> {
    return this.http.get<Simulation>(this.baseUrl + '/' + simulationId).pipe(
      tap(x => console.log('GETED' + JSON.stringify(x)))
    );
  }

  postStudent(simulation: Simulation): Observable<Simulation>  {
    return this.http.post<Simulation>(this.baseUrl, JSON.stringify(simulation)).pipe(
      tap(x => console.log('POSTED' + JSON.stringify(x)))
    );
  }

  putStudent(simulation: Simulation): Observable<Simulation>  {
    return this.http.put<Simulation>(this.baseUrl + '/' + simulation.id, JSON.stringify(simulation)).pipe(
      tap(x => console.log('PUTED' + JSON.stringify(x)))
    );
  }
  deleteStudent(simulationId: number): Observable<number>  {
    return this.http.delete<number>(this.baseUrl + '/' + simulationId).pipe(
      tap(x => console.log('DELETED' + JSON.stringify(x)))
    );
  }


}
