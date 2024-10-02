// src/app/lista-mascotas/lista-mascotas.component.ts

import { Component, OnInit } from '@angular/core';
import { MascotaModel } from '../shared/mascota.model';
import { SolicitudModel } from '../shared/solicitud.model';
import { MascotaService } from '../shared/mascota.service';
import { SolicitudService } from '../shared/solicitud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css'],
})
export class ListaMascotasComponent implements OnInit {
  mascotas: MascotaModel[] = []; // Array para almacenar las mascotas
  solicitudes: SolicitudModel[] = []; // Array para almacenar las solicitudes

  constructor(
    private mascotaService: MascotaService,
    private solicitudService: SolicitudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerMascotas();   // Obtener la lista de mascotas
    this.obtenerSolicitudes(); // Obtener la lista de solicitudes
  }

  // Método para obtener todas las mascotas desde el servicio
  obtenerMascotas(): void {
    this.mascotaService.obtenerMascotas().subscribe({
      next: (data) => {
        console.log('Mascotas obtenidas:', data);
        this.mascotas = data;
      },
      error: (err) => {
        console.error(`Error al obtener mascotas: ${err}`);
      },
    });
  }

  // Método para obtener todas las solicitudes desde el servicio
  obtenerSolicitudes(): void {
    this.solicitudService.obtenerSolicitudes().subscribe({
      next: (data) => {
        console.log('Solicitudes obtenidas:', data); // Verificar estructura completa de datos
        data.forEach((solicitud) => {
          console.log('Solicitud ID:', solicitud.idSolicitud);
          console.log('Persona:', solicitud.persona);
          console.log('Mascota:', solicitud.mascota);
        });
        this.solicitudes = data;
      },
      error: (err) => {
        console.error(`Error al obtener solicitudes: ${err}`);
      },
    });
  }

  // Método para eliminar una mascota
  borrarMascota(idMascota: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      this.mascotaService.borrarMascota(idMascota).subscribe({
        next: () => {
          console.log('Mascota eliminada exitosamente.');
          this.obtenerMascotas(); // Recargar la lista después de eliminar
        },
        error: (err) => {
          console.error(`Error al eliminar mascota: ${err}`);
        },
      });
    }
  }

  // Método para solicitar una mascota
  solicitarMascota(idMascota: string): void {
    this.router.navigate(['/solicitudes/crear', idMascota]); // Redirigir al formulario de solicitud
  }

  editarSolicitud(idSolicitud: string): void {
    console.log(`Redirigiendo para editar la solicitud con ID: ${idSolicitud}`);
    this.router.navigate([`/solicitudes/editar/${idSolicitud}`]);
  }

  // Método para eliminar una solicitud
  eliminarSolicitud(idSolicitud: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta solicitud?')) {
      this.solicitudService.eliminarSolicitud(idSolicitud).subscribe({
        next: () => {
          console.log('Solicitud eliminada exitosamente.');
          this.obtenerSolicitudes(); // Recargar la lista después de eliminar
        },
        error: (err) => {
          console.error(`Error al eliminar solicitud: ${err}`);
        },
      });
    }
  }
}
