import { UsuarioService } from './../services/usuario.service';

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    /* return (this.usuarioService.role === 'ADMIN_ROLE') ? true : false; */
    // console.log('Role del usuario');
    // console.log(this.usuarioService.role);
    const role = localStorage.getItem('role');
    if (role === 'ADMIN_ROLE') {
      return true;
    } else {
      this.router.navigateByUrl('/inicio');
      return false;
    }
  }
}
