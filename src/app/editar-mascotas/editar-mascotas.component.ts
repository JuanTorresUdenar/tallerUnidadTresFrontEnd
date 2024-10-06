// src/app/editar-mascotas/editar-mascotas.component.ts

import { Component, OnInit } from '@angular/core';
import { MascotaModel } from '../shared/mascota.model';
import { MascotaService } from '../shared/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-mascotas',
  templateUrl: './editar-mascotas.component.html',
  styleUrls: ['./editar-mascotas.component.css'],
})
export class EditarMascotasComponent implements OnInit {
  idMascota: string = '';
  isEditMode: boolean = false; // Nueva variable para saber si es modo edición o creación

  // Inicializar el objeto con todas las propiedades requeridas
  mascota: MascotaModel = new MascotaModel('', '', '', '', '', '');

  constructor(private mascotaService: MascotaService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Obtener el ID de la mascota de la ruta (si existe) para determinar si es modo de edición
    this.idMascota = this.route.snapshot.params['idMascota'];

    if (this.idMascota) {
      this.isEditMode = true; // Modo de edición
      this.obtenerMascota();
    } else {
      this.isEditMode = false; // Modo de creación
      this.mascota = new MascotaModel('', '', '', '', '', ''); // Limpiar el objeto mascota para agregar una nueva
    }
  }

  obtenerMascota(): void {
    this.mascotaService.obtenerMascota(this.idMascota).subscribe({
      next: (data) => {
        this.mascota = data;
      },
      error: (err) => {
        console.error(`Error al obtener la mascota: ${err}`);
      },
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      // Si es modo de edición, actualizar la mascota
      this.mascotaService.actualizarMascota(this.mascota).subscribe({
        next: () => {
          console.log('Mascota actualizada exitosamente.');
          this.router.navigate(['/mascotas']);
        },
        error: (err) => {
          console.error(`Error al actualizar la mascota: ${err}`);
        },
      });
    } else {
      // Si es modo de creación, agregar la nueva mascota
      this.mascotaService.agregarMascota(this.mascota).subscribe({
        next: () => {
          console.log('Mascota agregada exitosamente.');
          this.router.navigate(['/mascotas']);
        },
        error: (err) => {
          console.error(`Error al agregar la mascota: ${err}`);
        },
      });
    }
  }
}

