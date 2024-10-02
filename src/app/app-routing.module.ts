// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMascotasComponent } from './lista-mascotas/lista-mascotas.component';
import { EditarMascotasComponent } from './editar-mascotas/editar-mascotas.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';

const routes: Routes = [
  { path: 'mascotas', component: ListaMascotasComponent },
  { path: 'mascotas/editar/:idMascota', component: EditarMascotasComponent },
  { path: 'mascotas/agregar', component: EditarMascotasComponent },
  { path: 'solicitudes/crear/:idMascota', component: CrearSolicitudComponent }, // Ruta para crear solicitudes
  { path: 'solicitudes/editar/:idSolicitud', component: CrearSolicitudComponent }, // Ruta para editar solicitudes
  { path: '**', redirectTo: '/mascotas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
