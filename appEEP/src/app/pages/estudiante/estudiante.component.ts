import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['../../app.component.sass']
})
export class EstudianteComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  showBtn = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit() {

    this.breakpointObserver.observe('(max-width: 663px)').subscribe(result => {
      this.showBtn = result.matches;
    });
  }

  isExpanded = true;
  isShowing = false;
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}