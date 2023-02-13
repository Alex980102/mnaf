import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from './../interfaces/cargar-usuarios.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

const auth_url = environment.auth_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public isLoggedIn = false;
  public usuario!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  get token(): any {
    return localStorage.getItem('token' || '');
  }

  get role(): any {
    // console.log(this.usuario);
    return this.usuario.role;
  }

  get uid(): string {
    return this.usuario.id || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
    this.isLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('myid');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isLoggedIn = false;
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${auth_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {
          const { email, nombre, role } = res.usuario;
          this.usuario = new Usuario(nombre, email, '', role);
          this.guardarLocalStorage(res.token, res.menu);
          return true;
        }),
        catchError((err) => {
          // console.log(err);
          return of(false);
        })
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http
      .post(`${auth_url}/usuarios`, formData)
      .pipe(tap((res: any) => this.guardarLocalStorage(res.token, res.menu)));
  }

  actualizarPerfil(data: {
    email: string;
    nombre: string;
    role: string | undefined;
  }) {
    data = {
      ...data,
      role: this.usuario.role,
    };

    return this.http.put(
      `${auth_url}/usuarios/${this.uid}`,
      data,
      this.headers
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${auth_url}/login`, formData).pipe(
      tap((res: any) => {
        // console.log(res.role);
        localStorage.setItem('role', res.role);
        localStorage.setItem('myid', res.myid);
        return this.guardarLocalStorage(res.token, res.menu);
      })
    );
  }

  // Cargar Usuarios
  cargarusuarios(desde: number = 0) {
    const url = `${auth_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers).pipe(
      map((res) => {
        // console.log('Obtener la res');
        // console.log(res)
        const usuarios = res.usuarios.map((user) => {
          return new Usuario(user.nombre, user.email, '');
        });
        return {
          total: res.total,
          usuarios,
        };
      })
    );
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${auth_url}/usuarios/${usuario.id}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(
      `${auth_url}/usuarios/${usuario.id}`,
      usuario,
      this.headers
    );
  }
}
