import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { MenuNode, } from '../../../models/menu.model';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.sass']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  treeControl = new NestedTreeControl<MenuNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuNode>();
  hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;

  barraInicial = false;
  barraUno = false;

  iniciales: string = localStorage.getItem('iniciales').toUpperCase();
  UserName: string = localStorage.getItem('username');
  UserEmail: string = localStorage.getItem('email');

  constructor(
    private breakpointObserver: BreakpointObserver,
    public loginService: LoginService,
  ) { }

  ngOnInit() {

    this.breakpointObserver.observe('(max-width: 663px)').subscribe(result => {
      this.barraInicial = result.matches;
      this.barraUno = result.matches;
    });
    this.SeleccionMenu();
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

  /**
   * 
   * MENU PRINCIPAL
   * 
   */
  nombreSelect: string = '';
  manejarEstadoActivo(name) {
    this.nombreSelect = name;
  }

  SeleccionMenu() {
    if (this.loginService.getRolMenu() === true) {
      this.dataSource.data = this.MenuAdministracion() as MenuNode[];
    } else {
      this.dataSource.data = this.MenuEmpleado() as MenuNode[];
    }
  }

  MenuAdministracion() {
    return [
      {
        name: 'Administración',
        icono: 'dashboard',
        children: [
          { name: 'Home', url: '/home-admin' },
          { name: 'Proceso Electoral', url: '/proceso-electoral' },
          { name: 'Ver votos', url: '/votos-live' },
        ]
      },
      {
        name: 'Padrón Electoral',
        icono: 'account_circle',
        children: [
          { name: 'Estudiantes', url: '/estudiantes' },
          { name: 'Crear Empleado', url: '/home-estudiante' },
        ]
      }
    ];
  }

  MenuEmpleado() {
    return [
      {
        name: 'Perfil',
        accion: true,
        estado: true,
        icono: 'account_circle',
        children: [
          { name: 'Datos Generales', url: '/home-estudiante' },
          { name: 'Contrato de Trabajo', url: '/home-estudiante' },
        ]
      },
      {
        name: 'Asistencia',
        accion: true,
        estado: true,
        icono: 'mobile_friendly',
        children: [
          { name: 'Planificación', url: '/home-estudiante' },
          { name: 'Horarios', url: '/home-estudiante' },
        ]
      }
    ]
  }
}
