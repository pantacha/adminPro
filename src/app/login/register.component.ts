import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/user.model';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public _usuarioService: UsuarioService, public route: Router) {    
  }

  comparator(campo1: string, campo2: string){
    return (group: FormGroup) => {
      
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if(pass1===pass2){
        return null;
      }
      return {
        comparator: true
      }
    }
   }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      'nombre': new FormControl( null, [Validators.required]),
      email: new FormControl( null, [Validators.required, Validators.email]),
      password: new FormControl( null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, {validators: this.comparator('password', 'password2')});
  }

  registrarUsuario(){
    console.log('forma valid: ', this.forma.valid);
    
    if(this.forma.value.condiciones==false){
      //console.log('tine que aceptar las condiciones');
      swal('Importante','Tiene que aceptar las condiciones','warning');
      return;
    }
    console.log(this.forma.value);
    console.log(this.forma);

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
      );

    this._usuarioService.crearUsuario(usuario)
              .subscribe( (resp) => {
                this.route.navigate(['/login']);
              })
    
    
  }

}
