import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private proxyApi = environment.proxyApi;
  private baseUrl = `${this.proxyApi}/simulations`;

  constructor(private http: HttpClient) { }

  getAllSimulations(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      tap(x => console.log('GET' + JSON.stringify(x)))
    );
  }

  getSimulation(simulationId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + simulationId).pipe(
      tap(x => console.log('GET' + JSON.stringify(x)))
    );
  }

  postStudent(simulation: any): Observable<any>  {
    return this.http.post<any>(this.baseUrl, JSON.stringify(simulation)).pipe(
      tap(x => console.log('POST' + JSON.stringify(x)))
    );
  }

  patchStudent(simulation: any): Observable<any>  {
    return this.http.put<any>(this.baseUrl + '/' + simulation.id, JSON.stringify(simulation)).pipe(
      tap(x => console.log('PUT' + JSON.stringify(x)))
    );
  }
  deleteStudent(simulationId: any): Observable<any>  {
    return this.http.delete<any>(this.baseUrl + '/' + simulationId).pipe(
      tap(x => console.log('DELETE' + JSON.stringify(x)))
    );
  }


}
