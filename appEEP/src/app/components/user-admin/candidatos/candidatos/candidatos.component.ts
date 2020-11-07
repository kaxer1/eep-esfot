import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CandidaturaService } from 'src/app/services/candidatura/candidatura.service';
import { ICandidatos } from 'src/app/models/tablas.model'
@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.sass']
})
export class CandidatosComponent implements OnInit {

  /**
   * Variables inicio de pantalla
   */
  id_lista: number;
  QueryParams: any = [];
  imagen_local: string;
  HabilitarRegistro: boolean = false;

  /**
   * Varibles formulario
   */
  nombreCtrl = new FormControl('', Validators.required)
  apellidoCtrl = new FormControl('', Validators.required)
  cargoCtrl = new FormControl('', Validators.required)

  public CandidatosForm = new FormGroup({
    nombre: this.nombreCtrl,
    apellido: this.apellidoCtrl,
    cargo: this.cargoCtrl
  });

  /**
   * Variables progress spinner
   */
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 10;
  habilitarprogress: boolean = false;

  /**
   * Variables Tabla de datos
   */
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  candidatos: any = [];

  constructor(
    private rutaActiva: ActivatedRoute,
    private candidaturaService: CandidaturaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id_lista = parseInt(this.rutaActiva.snapshot.params.id_lista)

    this.FuncionalidadInicial();
    this.ObtenerListaCandidatos(this.id_lista)
  }

  FuncionalidadInicial() {
    this.imagen_local = localStorage.getItem('imagen-lista')

    this.rutaActiva.queryParams.subscribe(obj => {
      this.QueryParams = [obj];
      if (obj.estado === 'true') {
        this.HabilitarRegistro = true
      }

    })
    console.log(this.QueryParams);
    console.log(this.HabilitarRegistro);
  }

  ObtenerListaCandidatos(id_lista) {
    this.candidatos = []
    this.candidaturaService.ListaCandidatos(id_lista).subscribe(res => {
      // console.log(res);
      if (!res.message) {
        this.dataSource = new MatTableDataSource(res as ICandidatos[]);
        this.candidatos = this.dataSource.data      
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.candidatos);
        this.habilitarprogress = false;
      }
    }, err => {
      this.toastr.error(err)     
      console.log(err);
    })
  }

  GuardarCandidato(form) {
    this.habilitarprogress = true;
    let data = {
      nombre: form.nombre,
      apellido: form.apellido,
      cargo: form.cargo,
      id_lista: this.id_lista
    }
    // console.log(data);
    this.candidaturaService.RegistrarCandidatura(data).subscribe(res => {
      this.toastr.success(res.message);
      this.ObtenerListaCandidatos(this.id_lista);
      this.LimpiarCampos();
    }, err => {
      this.toastr.error(err.error.message)   
      if (err.error.message) {
        this.habilitarprogress = false;
        this.HabilitarRegistro = false;
      }  
      console.log(err);
    })
  }

  LimpiarCampos() {
    this.CandidatosForm.reset();
  }
}
