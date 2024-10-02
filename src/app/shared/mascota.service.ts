// src/app/shared/mascota.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MascotaModel } from './mascota.model';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  BASE_URL = 'http://localhost:4000'; // Asegúrate de que esta URL apunte a tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las mascotas
  obtenerMascotas(): Observable<MascotaModel[]> {
    return this.http.get<MascotaModel[]>(`${this.BASE_URL}/mascotas/buscarTodo`);
  }

  // Obtener una mascota por ID
  obtenerMascota(idMascota: string): Observable<MascotaModel> {
    return this.http.get<MascotaModel>(`${this.BASE_URL}/mascotas/buscar/${idMascota}`);
  }

  // Crear una nueva mascota
  agregarMascota(mascota: MascotaModel): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}/mascotas/crear`, mascota);
  }

  // Actualizar una mascota existente
  actualizarMascota(mascota: MascotaModel): Observable<string> {
    return this.http.put<string>(`${this.BASE_URL}/mascotas/actualizar/${mascota.id}`, mascota);
  }

  // Eliminar una mascota por ID
  borrarMascota(idMascota: string): Observable<string> {
    return this.http.delete<string>(`${this.BASE_URL}/mascotas/eliminar/${idMascota}`);
  }
}
