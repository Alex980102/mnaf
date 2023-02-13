import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  public cargando: boolean = true;
  public respuestaDashboard: any;

  constructor() {}

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard() {
    this.cargando = false;
    // this.dashboardService.cargarRespuestaDashboard().subscribe((respuesta) => {
    //   this.respuestaDashboard = respuesta;
    //   // console.log(respuesta.totales)
    //   this.cargando = false;
    // });
  }
}
