import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlBase = "http://localhost:8000/api/users";

  constructor(private clienteHttp: HttpClient) { }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.clienteHttp.get<{ usuarios: Usuario[]; status: number }>(this.urlBase)
      .pipe(
        map(response => response.usuarios) // Extrae solo el arreglo "usuarios"
      );
  }

  obtenerUsuario(id: number): Observable<Usuario> {
    return this.clienteHttp.get<{ usuario: Usuario; status: number }>(`${this.urlBase}/${id}`)
      .pipe(
        map(response => response.usuario) // Extrae solo el arreglo "usuarios"
      );
  }

  actualizarUsuario(usuario: Usuario): Observable<any> {
    return this.clienteHttp.put<any>(`${this.urlBase}/${usuario.id}`, usuario);
  }

  insertarUsuario(usuario: Usuario): Observable<any> {
    return this.clienteHttp.post<any>(`${this.urlBase}`, usuario);
  }

  eliminarUsuario(usuario: Usuario): Observable<any> {
    return this.clienteHttp.delete<any>(`${this.urlBase}/${usuario.id}`)
  }

}
