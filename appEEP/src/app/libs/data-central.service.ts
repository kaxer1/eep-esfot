import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { LoginResp, permisosSistema, User, userDefault } from '../interfaces/user.iterface';
import { ToastrService } from 'ngx-toastr';
import { Menu, MenuNode } from '../models/menu.model';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../components/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class DataCentralService {

  private SECRETE_KEY = 'token_esfot_epn';
  // url para conexion a la api
  private API_URL = environment.url;

  // Variables del usuario y que se usa en todo el sistema.
  private dataUserLocal: User;
  public get user(): User { return this.dataUserLocal };

  // variables que mantienen la inforamcion del menu que viene de la BDD con roles y permisos
  private dataMenuLocal: Menu[] = [];
  public get menu(): Menu[] { return this.dataMenuLocal };

  // variables que ayudan a presentar la informacion del menu lateral
  private menuNodelocal: MenuNode[] = [];
  public get menuNode(): MenuNode[] { return this.menuNodelocal };

  // variables para manejar los permisos para cada transaccion o verificacion del menu de acuerdo al rol.
  private permisosSistema: permisosSistema = { crear: false, editar: false, elminar: false };
  public get permisos() : permisosSistema { return this.permisosSistema };

  // variable para manejar proceso de carga cuando realiza las peticiones. Para mostar ese dialogo.
  private loading: boolean;
  public get loadingDialog(): boolean { return this.loading };

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  public dialogRef: any;
  public setLoading(value: boolean): void {
    this.loading = value;

    if (this.loading === true) {
      this.dialogRef = this.dialog.open(LoadingComponent, { width: '200px', });
    }

  }
  /**
   * Encripta los datos de respuesta al loguearse al sistema.
   * @param data Datos de respuesta al loguear un usuario
   */
  public encriptarData(data: LoginResp): void {
    localStorage.setItem('token', data.authorization)

    const ciphertext = AES.encrypt(JSON.stringify(data.user), this.SECRETE_KEY).toString(); // datos de usuario
    localStorage.setItem('d', ciphertext)
    const menutext = AES.encrypt(JSON.stringify(data.menu), this.SECRETE_KEY).toString(); // datos del menu segun el rol
    localStorage.setItem('m', menutext)
  }

  /**
   * Desencripta los datos del usuario para usarlos cuando el usuario esta logueado.
   */
  public desencriptarDataUser(): void {
    this.dataUserLocal = {} as User
    const d = localStorage.getItem('d');
    if (d === null) return;

    const bytes = AES.decrypt(d, this.SECRETE_KEY);
    this.dataUserLocal = JSON.parse(bytes.toString(enc.Utf8)) as User;
  }

  /**
   * Limpia los datos cuando sale de sesion.
   */
  public limpiarDataCentral(): void {
    this.dataUserLocal = userDefault;
    this.dataMenuLocal = [];
    this.menuNodelocal = [];
    this.permisosSistema = { crear: false, editar: false, elminar: false };
    localStorage.clear();
    sessionStorage.clear();
  }

  public mostrarmsgerror(msg: string): void {
    this.toastr.error(msg)
  }

  public mostrarmsgexito(msg: string): void {
    this.toastr.success(msg)
  }

  /**
   * Desencripta los datos del menu del rol que tiene el usuario logeado.
   */
  public desencriptarMenu(): void {
    this.dataMenuLocal = [] as Menu[]
    const m = localStorage.getItem('m');
    if (m === null) return;

    const bytes = AES.decrypt(m, this.SECRETE_KEY);
    this.dataMenuLocal = JSON.parse(bytes.toString(enc.Utf8)) as Menu[];
    this.setMenuRol(this.dataMenuLocal);
  }

  /**
   * es para manejar permisos en la ruta que esta
   */
   setPermisos(value: any) {
    this.permisosSistema = {
      crear: value.crear,
      editar: value.editar,
      elminar: value.eliminar
    }
  }


  /**
   * Llama a los menus de acurdo al rol del usuario.
   * @param menu Menu general descencriptado o enviodo desde la base de datos.
   */
  public setMenuRol(menu: Menu[]): void {
    this.menuNodelocal = [];
    if (menu.length === 0) return;

    menu.forEach(o => {
      this.menuNodelocal.push(
        {
          name: o.nombre,
          icono: o.icon,
          children: (o.hijos.length === 0) ? [{ name: '', url: '/#'}] :
            o.hijos.filter(h => { return h.mostrarmenu === true})
            .map(h => {
              return { name: h.nombre, url: '/' + h.cruta}
            })
        }
      )
    })
    if (menu[0].hijos.length === 0) return;

    let url = menu[0].hijos[0].cruta;
    this.router.navigate(["/" + url], { skipLocationChange: false });
  }

  /**
   * Metodo para eliminar registros de la base de datos.
   * @param idreg Id del registro
   * @param nametable nombre de la tabla referencia
   * @returns Observable de la peticion a la API
   */
  EliminarRegistro(idreg: string, nametable: string) {
    const params = new HttpParams()
      .set('nametable', nametable)
      .set('idreg', idreg)
    return this.http.delete<any>(`${this.API_URL}/delete/registro`, { params })
  }

  /** ******************************************************************** *
   *                  MÉTODO PARA CONTROLAR INGRESO DE LETRAS              *
   *  ******************************************************************** */
  IngresarSoloLetras(e) {
    let key = e.keyCode || e.which;
    let tecla = String.fromCharCode(key).toString();
    // SE DEFINE TODO EL ABECEDARIO QUE SE VA A USAR.
    let letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    // ES LA VALIDACIÓN DEL KEYCODES, QUE TECLAS RECIBE EL CAMPO DE TEXTO.
    let especiales = [8, 37, 39, 46, 6, 13];
    let tecla_especial = false
    for (var i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }
    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      this.toastr.info('No se admite datos numéricos', 'Usar solo letras', {
        timeOut: 6000,
      })
      return false;
    }
  }

  /** ******************************************************************** *
   *                  MÉTODO PARA CONTROLAR INGRESO DE NÚMEROS             *
   *  ******************************************************************** */
  IngresarSoloNumeros(evt) {
    if (window.event) {
      var keynum = evt.keyCode;
    }
    else {
      keynum = evt.which;
    }
    // COMPROBAMOS SI SE ENCUENTRA EN EL RANGO NUMÉRICO Y QUE TECLAS NO RECIBIRÁ.
    if ((keynum > 47 && keynum < 58) || keynum == 8 || keynum == 13 || keynum == 6) {
      return true;
    }
    else {
      this.toastr.info('No se admite el ingreso de letras', 'Usar solo números', {
        timeOut: 6000,
      })
      return false;
    }
  }

}
