import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomResponse } from '../interface/custom-response';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Server } from '../interface/server';
import { Status } from '../enum/status.enum';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private readonly apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  servers$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${ this.apiUrl }/servers`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  save$ = (server: Server) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${ this.apiUrl }/servers`, server)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  ping$ = (ipAddress: string) => <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${ this.apiUrl }/servers/${ ipAddress }/ping`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  filter$ = (status: Status, response: CustomResponse) => <Observable<CustomResponse>>
  new Observable<CustomResponse>(subscriber => {
    console.log(response);
    let filteredServers = response.data.servers;

    if (status !== Status.ALL) {
      filteredServers = filteredServers.filter(server => server.status === status);
      response.message = filteredServers.length > 0
        ? `Servers filtered by ${status === Status.SERVER_UP ? 'SERVER UP' : 'SERVER DOWN'} status`
        : `No servers of ${status} found.`;
    } else {
      response.message = `Servers filtered by ${status} status`;
    }
    response.data = { servers: filteredServers };
    subscriber.next(response);
    subscriber.complete();
  })
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  delete$ = (serverId: number) => <Observable<CustomResponse>>
  this.http.delete<CustomResponse>(`${ this.apiUrl }/servers/${ serverId }`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    const errorMessage = `An error occured - Error code: ${ error.status }`;
    return throwError(() => new Error(errorMessage));
  }
}
