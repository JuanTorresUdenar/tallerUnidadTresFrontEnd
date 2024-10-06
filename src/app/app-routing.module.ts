// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMascotasComponent } from './lista-mascotas/lista-mascotas.component';
import { EditarMascotasComponent } from './editar-mascotas/editar-mascotas.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';

const routes: Routes = [
  { path: '', component: ListaMascotasComponent }, // Ruta para la página de bienvenida
  { path: 'mascotas', component: ListaMascotasComponent }, // Ruta para gestión de mascotas
  { path: 'mascotas/agregar', component: EditarMascotasComponent }, // Ruta para agregar nueva mascota
  { path: 'mascotas/editar/:idMascota', component: EditarMascotasComponent }, // Ruta para editar mascota
  { path: 'solicitudes', component: ListaMascotasComponent }, // Usar el mismo componente para mostrar solicitudes
  { path: 'solicitudes/crear/:idMascota', component: CrearSolicitudComponent }, // Crear solicitud para una mascota específica
  { path: 'solicitudes/editar/:idSolicitud', component: CrearSolicitudComponent }, // Editar una solicitud específica
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirigir cualquier otra ruta a la raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

