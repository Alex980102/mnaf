import { UsuarioService } from '../services/usuario.service';

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
export class CreatePromotorGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.usuarioService.role === 'ADMIN_ROLE' ||
      this.usuarioService.role === 'CREATE_PROMOTOR_ROLE'
    ) {
      return true;
    } else {
      this.router.navigateByUrl('promovidos');
      return false;
    }
  }
}
