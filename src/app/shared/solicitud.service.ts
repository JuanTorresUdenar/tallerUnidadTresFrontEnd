// src/app/shared/solicitud.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitudModel } from './solicitud.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  BASE_URL = 'http://localhost:4000'; // URL de tu backend

  constructor(private http: HttpClient) {}

  // Obtener la lista completa de solicitudes
  obtenerSolicitudes(): Observable<SolicitudModel[]> {
    return this.http.get<SolicitudModel[]>(`${this.BASE_URL}/solicitudes/buscarTodo`);
  }

  // Crear una nueva solicitud
  crearSolicitud(solicitud: SolicitudModel): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}/solicitudes/crear`, solicitud);
  }

  // Eliminar una solicitud por ID
  eliminarSolicitud(idSolicitud: string): Observable<string> {
    return this.http.delete<string>(`${this.BASE_URL}/solicitudes/eliminar/${idSolicitud}`);
  }

  // Obtener una solicitud por ID
  obtenerSolicitud(idSolicitud: string): Observable<SolicitudModel> {
    return this.http.get<SolicitudModel>(`${this.BASE_URL}/solicitudes/buscar/${idSolicitud}`);
  }

    // **Añadir este método para actualizar una solicitud**
  actualizarSolicitud(solicitud: SolicitudModel): Observable<string> {
    // Llamada PUT al backend con el ID de la solicitud y el objeto solicitud actualizado
    return this.http.put<string>(`${this.BASE_URL}/solicitudes/actualizar/${solicitud.idSolicitud}`, solicitud);
  }
}

