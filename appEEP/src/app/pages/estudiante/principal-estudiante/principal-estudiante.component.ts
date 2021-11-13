import { Component, OnInit } from '@angular/core';
import { Proceso, Lista_electoral, procesoValueDefault } from 'src/app/interfaces/proceso.interface';
import { ProcesoService } from '../../../services/proceso.service';
import { VotosService } from '../../../services/votos.service';

@Component({
  selector: 'app-principal-estudiante',
  templateUrl: './principal-estudiante.component.html',
  styleUrls: ['./principal-estudiante.component.sass']
})
export class PrincipalEstudianteComponent implements OnInit {

  procesos: Proceso = procesoValueDefault;

  constructor(
    private procesoService: ProcesoService,
    private votoService: VotosService,
  ) { }

  ngOnInit() {
    this.procesos
    this.procesoService.infoProcesoToUsuarios().subscribe(
      procesos => { this.procesos = procesos },
      err => { },
      () => { }
    )
  }

  saveVoto(option_lista: Lista_electoral) {
    console.log(option_lista);
    this.votoService.postVotoUsuario(option_lista).subscribe(res => {
      console.log(res);
    })
  }

}
