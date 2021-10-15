import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GeneratedSimulationService {
  private proxyApi = environment.proxyApi;
  private baseUrl = `${this.proxyApi}/simulations/`;

  constructor(private http: HttpClient) { }

  getGeneratedSimulation(simulationId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + simulationId + '/simulation-days').pipe(
      tap(x => console.log('GET' + JSON.stringify(x)))
    );
  }

  getRegeneratedSimulation(simulationId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + simulationId + '/simulation-days-regenerated').pipe(
      tap(x => console.log('GET' + JSON.stringify(x)))
    );
  }
}
