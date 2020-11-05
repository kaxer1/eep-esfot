import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-registrar-listas',
  templateUrl: './registrar-listas.component.html',
  styleUrls: ['./registrar-listas.component.sass']
})
export class RegistrarListasComponent implements OnInit {

  nombre_listaCtrl = new FormControl('', [Validators.required]);
  
  public registrarListaForm = new FormGroup({
    nombre_lista: this.nombre_listaCtrl
  })

  constructor(
    public dialogRef: MatDialogRef<RegistrarListasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  GuardarLista(form) {
    console.log(form);
    
  }

}
