// src/app/shared/solicitud.model.ts

export class SolicitudModel {
    constructor(
      public idSolicitud: string,
      public cedulaPersona: string,
      public idMascota: string,
      public persona?: {
        cedula: string;
        nombre: string;
        apellido: string;
        direccion: string;
      }, // Agregar la propiedad `persona`
      public mascota?: {
        id: string;
        nombre: string;
        edad: number;
        claseAnimal: string;
        peso: string;
        color: string;
      } // Agregar la propiedad `mascota`
    ) {}
  
    // O agregar las propiedades directamente en el modelo si se necesitan sin estructura adicional
    public cedula?: string;
    public nombre?: string;
    public apellido?: string;
    public direccion?: string;
  }