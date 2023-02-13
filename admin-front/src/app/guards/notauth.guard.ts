import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuth implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.usuarioService.isLoggedIn) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
