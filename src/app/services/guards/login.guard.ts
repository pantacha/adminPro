import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public route: Router) {}

  canActivate(): boolean {
    if(this._usuarioService.isLogged()){
    console.log('guard passed');
    return true;
    }else{
      console.log('no ha pasado el guard');
      this.route.navigate(['/login']);
      return false;
    }
  }
}
