import { Component, OnInit } from '@angular/core';
import { ServerService } from './service/server.service';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { AppState } from './interface/app-state';
import { CustomResponse } from './interface/custom-response';
import { DataState } from './enum/data-state.enum';
import { Server } from './interface/server';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  Status: any;
  isLoading$: Observable<boolean>;

  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    this.appState$ = this.serverService.servers$.pipe(
      map((response) => {
        return { dataState: DataState.LOADED_STATE, appData: response };
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR_STATE, error: error });
      })
    );
  }

  saveServer(_t77: any) {
    throw new Error('Method not implemented.');
  }
  deleteServer(_t45: Server) {
    throw new Error('Method not implemented.');
  }
  filterStatus$: Observable<unknown>;
  pingServer(arg0: string) {
    throw new Error('Method not implemented.');
  }

  filterServers($event: Event) {
    throw new Error('Method not implemented.');
  }
  printReport() {
    throw new Error('Method not implemented.');
  }
}
