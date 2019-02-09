import { Injectable } from '@angular/core';
import { Usuario } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../Config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public route: Router) {
    console.log('servicio usuario constructor');
    this.loadStorage();
  }

  isLogged(){
    if(this.token.length > 5){
      return true;
    }else{
      return false;
    }
  }

  loadStorage(){
    if(localStorage.getItem('token')){
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  saveStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    
    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle(token: string){

    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token: token})
                                              .pipe(
                                                map((res: any) => {
                                                  this.saveStorage(res.usuario._id, res.token, res.usuario);
                                                  return true;
                                                })
              
                                              )
  }

  login(usuario: Usuario, remember: boolean){
    if(remember === true){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
                                      .pipe(
                                        map((res: any) => {
                                          this.saveStorage(res.usuario._id, res.token, res.usuario);
                                          return true;
                                        })
                                      )
  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    this.route.navigate(['/login']);
  }

  crearUsuario(usuario: Usuario){
    let url = URL_SERVICIOS + `/usuario`;
    return this.http.post(url, usuario)
                                      .pipe(map((resp: any) => {
                                        console.log(resp);
                                        swal('Usuario usurero',usuario.email,'success');  
                                        return resp.usuario;
                                      }))
  }
}
