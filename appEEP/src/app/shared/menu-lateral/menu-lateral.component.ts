import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MenuNode } from '../../models/menu.model';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { LoginService } from '../../services/login/login.service';
import { DataCentralService } from '../../libs/data-central.service';
import { User } from '../../interfaces/user.iterface';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.sass']
})
export class MenuLateralComponent implements OnInit {

  treeControl = new NestedTreeControl<MenuNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuNode>();
  hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;


  public get user(): User {
    return this.dcentral.user
  }

  constructor(
    private dcentral: DataCentralService,
  ) { }

  ngOnInit(): void {
    this.SeleccionMenu();
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
    if (this.user.rol === 1) {
      this.dataSource.data = this.MenuAdministracion() as MenuNode[];
    } else if ((this.user.rol === 2)) {
      this.dataSource.data = this.MenuEmpleado() as MenuNode[];
    }
  }

  MenuAdministracion() {
    return [
      {
        name: 'Administración',
        icono: 'dashboard',
        children: [
          { name: 'Home', url: '/admin/home-admin' },
          { name: 'Proceso Electoral', url: '/admin/proceso-electoral' },
          { name: 'Ver votos', url: '/admin/votos-live' },
        ]
      },
      {
        name: 'Padrón Electoral',
        icono: 'account_circle',
        children: [
          { name: 'Estudiantes', url: '/admin/estudiantes' },
          { name: 'Crear Empleado', url: '/admin/home-estudiante' },
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
          { name: 'Datos Generales', url: '/estudiante/home-estudiante' },
          { name: 'Contrato de Trabajo', url: '/estudiante/home-estudiante' },
        ]
      },
      {
        name: 'Asistencia',
        accion: true,
        estado: true,
        icono: 'mobile_friendly',
        children: [
          { name: 'Planificación', url: '/estudiante/home-estudiante' },
          { name: 'Horarios', url: '/estudiante/home-estudiante' },
        ]
      }
    ]
  }

}
