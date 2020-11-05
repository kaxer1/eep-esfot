import { Component, OnInit } from '@angular/core';
import { VotosService } from 'src/app/services/votos/votos.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.sass']
})
export class EstadisticaComponent implements OnInit {

  constructor(
    private votoServices: VotosService
  ) { }

  ngOnInit() {
    this.votoServices.getVotosTotales().subscribe(res => {
      console.log(res);
    })
  }

}
