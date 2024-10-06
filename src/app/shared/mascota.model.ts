// src/app/shared/mascota.model.ts

export class MascotaModel {
  constructor(
    public id: string,
    public nombre: string,
    public edad: string,
    public claseAnimal: string,
    public peso: string,
    public color: string,
    public imagen?: string // Agregar la propiedad `imagen`
  ) {}
}
