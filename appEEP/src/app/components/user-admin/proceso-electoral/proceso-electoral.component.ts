import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProcesoService } from 'src/app/services/proceso/proceso.service';
import { MatTableDataSource } from '@angular/material/table';
import { IProcesoElectoral } from '../../../models/tablas.model'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-proceso-electoral',
  templateUrl: './proceso-electoral.component.html',
  styleUrls: ['./proceso-electoral.component.sass']
})
export class ProcesoElectoralComponent implements AfterViewInit {

  /**
   * Variables Formulario
   */
  descripcionCtrl = new FormControl('', Validators.required);
  semestreCtrl = new FormControl('', Validators.required);
  fec_eleccionCtrl = new FormControl('', Validators.required);

  public ProcesoElectoralForm = new FormGroup({
    descripcion: this.descripcionCtrl,
    semestre: this.semestreCtrl,
    fec_eleccion: this.fec_eleccionCtrl
  });

  /**
   * Variables Tabla de datos
   */
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  ArrayProceso: any = [];
  filtroProcesos = '';

  constructor(
    private procesoService: ProcesoService,
    private toastr: ToastrService,
  ) { 
    this.ProcesoElectoralForm.patchValue({
      descripcion: '',
      semestre: '',
      fec_eleccion: ''
    })
  }
  
  ngAfterViewInit() {
    this.ObtenerDatosTabla()
  }

  ObtenerDatosTabla(){
    this.procesoService.GetDatosTablaProcesoElectoral().subscribe((res:IProcesoElectoral[]) => {
      this.dataSource = new MatTableDataSource(res);
      this.ArrayProceso = this.dataSource.data;
      // console.log(this.dataSource);
      console.log(this.dataSource.data);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.toastr.error(err.error.message)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtroProcesos = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  GuardarProcesoElectoral(form) {
    
    let data = {
      descripcion: form.descripcion,
      semestre: form.semestre,
      fec_eleccion: form.fec_eleccion
    }
    console.log(data);

    this.procesoService.PostProcesoElectoral(data).subscribe(res => {
      this.toastr.success(res.message);
      this.LimpiarCampos();
    }, err => {
      this.toastr.error(err.error.message)
    })
    
  }

  LimpiarCampos() {
    this.ProcesoElectoralForm.reset();
  }
}
