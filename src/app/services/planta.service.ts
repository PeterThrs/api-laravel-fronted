import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Planta } from '../models/planta';

@Injectable({
  providedIn: 'root'
})
export class PlantaService {
  private urlBase = "http://localhost:8000/api/plants";

  constructor(private clienteHttp: HttpClient) { }

  obtenerPlantas(): Observable<Planta[]> {
    return this.clienteHttp.get<{ plantas: Planta[]; status: number }>(this.urlBase)
      .pipe(
        map(response => response.plantas) 
      );
  }

  obtenerPlanta(id: number): Observable<Planta> {
    return this.clienteHttp.get<{ planta: Planta; status: number }>(`${this.urlBase}/${id}`)
      .pipe(
        map(response => response.planta) 
      );
  }

  actualizarPlanta(planta: Planta): Observable<any> {
    return this.clienteHttp.put<any>(`${this.urlBase}/${planta.id}`, planta);
  }

  insertarPlanta(planta: Planta): Observable<any> {
    return this.clienteHttp.post<any>(`${this.urlBase}`, planta);
  }

  eliminarPlanta(planta: Planta): Observable<any> {
    return this.clienteHttp.delete<any>(`${this.urlBase}/${planta.id}`)
  }
}
