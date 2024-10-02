// src/app/crear-solicitud/crear-solicitud.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from '../shared/solicitud.service';
import { SolicitudModel } from '../shared/solicitud.model';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css'],
})
export class CrearSolicitudComponent implements OnInit {
  idMascota: string = '';
  idSolicitud: string = ''; // ID de la solicitud para el modo de edición
  isEditMode: boolean = false; // Indica si es modo de edición

  solicitud: SolicitudModel = new SolicitudModel('', '', '', {
    cedula: '',
    nombre: '',
    apellido: '',
    direccion: ''
  });

  constructor(
    private route: ActivatedRoute,
    private solicitudService: SolicitudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la solicitud de la ruta para determinar si es modo de edición
    this.idSolicitud = this.route.snapshot.params['idSolicitud'];
    this.idMascota = this.route.snapshot.params['idMascota']; // Obtener ID de la mascota (opcional)

    // Comprobar si estamos en modo de edición o creación
    if (this.idSolicitud) {
      this.isEditMode = true;
      this.obtenerSolicitud(this.idSolicitud); // Llamar al método para obtener la solicitud y cargar los datos en el formulario
    } else if (this.idMascota) {
      // Si estamos en modo de creación, asignar el ID de la mascota
      this.solicitud.idMascota = this.idMascota;
    }
  }

  // Método para obtener la solicitud y cargar sus datos en el formulario
  obtenerSolicitud(idSolicitud: string): void {
    this.solicitudService.obtenerSolicitud(idSolicitud).subscribe({
      next: (data) => {
        // Asignar los datos obtenidos al modelo `solicitud`
        this.solicitud = data;
        // Si el objeto `persona` existe, asignar los datos correctamente
        if (data.persona) {
          this.solicitud.cedula = data.persona.cedula;
          this.solicitud.nombre = data.persona.nombre;
          this.solicitud.apellido = data.persona.apellido;
          this.solicitud.direccion = data.persona.direccion;
        }
      },
      error: (err) => {
        console.error(`Error al obtener la solicitud: ${err}`);
      },
    });
  }

  // Método para manejar la creación o actualización de la solicitud
  onSubmit(): void {
    if (this.isEditMode) {
      // Si estamos en modo de edición, llamar al servicio para actualizar la solicitud
      this.solicitudService.actualizarSolicitud(this.solicitud).subscribe({
        next: () => {
          console.log('Solicitud actualizada exitosamente.');
          this.router.navigate(['/mascotas']); // Redirigir a la lista de mascotas
        },
        error: (err) => {
          console.error(`Error al actualizar la solicitud: ${err}`);
        },
      });
    } else {
      // Si estamos en modo de creación, llamar al servicio para crear una nueva solicitud
      this.solicitudService.crearSolicitud(this.solicitud).subscribe({
        next: () => {
          console.log('Solicitud creada exitosamente.');
          this.router.navigate(['/mascotas']); // Redirigir a la lista de mascotas
        },
        error: (err) => {
          console.error(`Error al crear la solicitud: ${err}`);
        },
      });
    }
  }
}
