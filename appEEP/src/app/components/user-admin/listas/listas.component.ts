import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RegistrarListasComponent } from './registrar-listas/registrar-listas.component';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.sass']
})
export class ListasComponent implements OnInit {

  id_proceso: number;
  QueryParams: any = [];

  Btn_Agregar: boolean = false;

  constructor(
    private rutaActiva: ActivatedRoute,
    private openView: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.id_proceso = parseInt(this.rutaActiva.snapshot.params.id_proceso)

    this.rutaActiva.queryParams.subscribe(obj => {
      this.QueryParams = [obj];
      if (obj.estado === 'vijente') {
        this.Btn_Agregar = true
      }

    })
    console.log(this.QueryParams);
    console.log(this.Btn_Agregar);
  }

  AbrirVentanaRegistroCandidatura() {
    this.openView.open(RegistrarListasComponent, {width: '400px', data: {id_proceso: this.id_proceso}}).afterClosed().subscribe(res => {
      
    })
  }

}
