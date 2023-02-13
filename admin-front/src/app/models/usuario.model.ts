import { environment } from 'src/environments/environment';

const base_url = environment.auth_url;

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public id?: string,
  ) {}
}
