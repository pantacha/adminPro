import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/user.model';

declare function init_plugins();
declare const gapi: any; //login (google)

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  remember: boolean = false;
  email: string;

  auth2: any; //the Sign-In object (google)

  constructor(public route: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1){
      this.remember = true;      
    }
  }

  googleInit(){
    gapi.load('auth2', () =>{
      this.auth2 = gapi.auth2.init({
        client_id: "838106172696-947gtmvo3k1ikfgkubikppr26dcva4ri.apps.googleusercontent.com",
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      console.log(token);
      this._usuarioService.loginGoogle(token)
                                              .subscribe(() => window.location.href = '#/dashboard');
                                              
    })
  }

  login(forma: NgForm){
    console.log('inicio...');
    console.log(forma.valid);
    console.log(forma.value);
    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, forma.value.remember)
                                                            .subscribe((resp) => {
                                                                console.log(resp);
                                                                this.route.navigate(['/dashboard']);
          
                                                              })

    
    //this.route.navigate(['/dashboard']);
  }

}
