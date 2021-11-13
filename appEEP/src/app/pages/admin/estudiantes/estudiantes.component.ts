import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.sass']
})
export class EstudiantesComponent implements OnInit {

  /**
   * Variables progress spinner
   */
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 10;
  habilitarprogress: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
