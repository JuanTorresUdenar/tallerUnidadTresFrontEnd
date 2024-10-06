// src/app/lista-mascotas/lista-mascotas.component.ts

import { Component, OnInit } from '@angular/core';
import { MascotaModel } from '../shared/mascota.model';
import { SolicitudModel } from '../shared/solicitud.model';
import { MascotaService } from '../shared/mascota.service';
import { SolicitudService } from '../shared/solicitud.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css'],
})
export class ListaMascotasComponent implements OnInit {
  mascotas: MascotaModel[] = []; // Array para almacenar las mascotas
  solicitudes: SolicitudModel[] = []; // Array para almacenar las solicitudes
  mostrarMascotas: boolean = true; // Variable para controlar qué lista mostrar
  mostrarBienvenida: boolean = false; // Variable para mostrar la vista de bienvenida

  constructor(
    private mascotaService: MascotaService,
    private solicitudService: SolicitudService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {    
    // Suscribirse a los cambios de la ruta para determinar si se muestra bienvenida o lista de datos
    this.route.url.subscribe(() => {
      if (this.router.url === '/') {
        this.mostrarBienvenida = true; // Mostrar mensaje de bienvenida en la ruta principal
      } else {
        this.mostrarBienvenida = false; // No mostrar bienvenida en otras rutas
        this.mostrarMascotas = this.router.url.includes('mascotas'); // Mostrar mascotas o solicitudes según la ruta
        if (this.mostrarMascotas) {
          this.obtenerMascotas();
        } else {
          this.obtenerSolicitudes();
        }
      }
    });
  }

  // Método para obtener todas las mascotas desde el servicio
  obtenerMascotas(): void {
    this.mascotaService.obtenerMascotas().subscribe({
      next: (data) => {
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

  // Método para editar una solicitud
  editarSolicitud(idSolicitud: string): void {
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
