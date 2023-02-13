import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public usuarioRole?: string;
  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService,
              private router: Router ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.usuarioRole = localStorage.getItem('role') || '';
  }

  logout(){
    this.usuarioService.logout();
  }

  // FIXME: Arreglar el funcionamiento de buscar desde el backend y el frontend
  buscar(termino: string){
    if (termino.length === 0) {
      this.router.navigateByUrl(`/dashboard/`);
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}
