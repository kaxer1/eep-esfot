import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { LoginResp, User, userDefault } from '../interfaces/user.iterface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DataCentralService {

  public SECRETE_KEY = 'token_esfot_epn';

  private dataUser: User;

  public get user(): User {
    return this.dataUser
  }

  constructor(
    private toastr: ToastrService
  ) { }

  /**
   * Encripta los datos de respuesta al loquearse al sistema.
   * @param data Datos de respuesta al loguear un usuario
   */
  public encriptarDataUser(data: LoginResp) {
    localStorage.setItem('token', data.authorization)

    const ciphertext = AES.encrypt(JSON.stringify(data.user), this.SECRETE_KEY).toString();
    localStorage.setItem('d', ciphertext)
  }
  /**
   * Desencripta los datos del usuario para usarlos cuando el usuario esta logueado.
   */
  public desencriptarDataUser(): User {
    this.dataUser = {} as User
    const d = localStorage.getItem('d');
    if (d === null) return;

    const bytes = AES.decrypt(d, this.SECRETE_KEY);
    this.dataUser = JSON.parse(bytes.toString(enc.Utf8)) as User;
    return;
  }

  /**
   * Limpia los datos cuando sale de sesion.
   */
  public limpiarDataCentral() {
    this.dataUser = userDefault
  }

  public mostrarmsgerror(msg: string) {
    this.toastr.error(msg)
  }

  public mostrarmsgexito(msg: string) {
    this.toastr.success(msg)
  }

}
