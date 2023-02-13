import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu: any = [];
  public sidebarVisible: boolean = true;

  cargarMenu() {
    const menu: any = localStorage.getItem('menu');
    this.menu = JSON.parse(menu);
  }

  toggle() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
