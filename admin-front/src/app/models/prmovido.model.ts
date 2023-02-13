import { Usuario } from './usuario.model';

export class Promovido {
  constructor(
    public nombre: string,
    public _id?: string,
    public img?: string,
    public promotor?: Usuario,
    public primerApellido?: string,
    public segundoApellido?: string,
    public correo?: string,
    public telefono?: string,
    public seccion?: string,
    public municipio?: string,
    public distrito?: string,
    public claveElectoral?: string,
    public progress?: boolean,
    public success?: boolean,
    public error?: boolean
  ) {}
}
