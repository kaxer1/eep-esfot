import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from 'src/app/services/lista-canditatos/lista.service';
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
  listaCandidatos: any = [];

  HabilitarCards: boolean = false;
  constructor(
    private rutaActiva: ActivatedRoute,
    private openView: MatDialog,
    private listaService: ListaService
  ) { }

  ngOnInit(): void {
    
    this.id_proceso = parseInt(this.rutaActiva.snapshot.params.id_proceso)

    this.FuncionalidadInicial();
    this.ObtenerListaCandidatos(this.id_proceso)
  }

  FuncionalidadInicial() {
    this.rutaActiva.queryParams.subscribe(obj => {
      this.QueryParams = [obj];
      if (obj.estado === 'vijente') {
        this.Btn_Agregar = true
      }

    })
    console.log(this.QueryParams);
    console.log(this.Btn_Agregar);
  }

  ObtenerListaCandidatos(id_proceso: number) {
    this.listaCandidatos = [];
    this.listaService.GetLista(id_proceso).subscribe(res => {
      
      if (!res.message) {
        this.listaCandidatos = res;
        this.HabilitarCards = true
        console.log('esta dentro de message');
        console.log(this.HabilitarCards);
      }
      
    })
  }

  AbrirVentanaRegistroCandidatura() {
    this.openView.open(RegistrarListasComponent, {width: '800px', data: {id_proceso: this.id_proceso}}).afterClosed().subscribe(update => {
      if (update === true) {
        this.ObtenerListaCandidatos(this.id_proceso);
      }
    })
  }

  GuardarImagenLocal(imagen: string) {
    localStorage.removeItem('imagen-lista')
    localStorage.setItem('imagen-lista', imagen)
  }

}
