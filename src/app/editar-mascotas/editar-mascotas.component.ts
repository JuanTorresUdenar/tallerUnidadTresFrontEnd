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
  // Inicializar el objeto con todas las propiedades requeridas
  mascota: MascotaModel = new MascotaModel('', '', '', '', '', '');

  constructor(private mascotaService: MascotaService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.idMascota = this.route.snapshot.params['idMascota'];
    if (this.idMascota) {
      this.obtenerMascota();
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
    console.log('Datos enviados al backend:', this.mascota); // Verificar qué datos se están enviando
    if (
      this.mascota.nombre &&
      this.mascota.edad &&
      this.mascota.claseAnimal &&
      this.mascota.peso &&
      this.mascota.color
    ) {
      if (this.idMascota) {
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
    } else {
      alert('Por favor, completa todos los campos antes de enviar.');
    }
  }
}
