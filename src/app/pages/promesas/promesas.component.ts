import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contar_hasta_tres()
                            .then(() => console.log('Fin!'))
                            .catch((error) => (console.error('error: ', error)));
  }

  ngOnInit() {
  }

  contar_hasta_tres(): Promise<Boolean>{
    return new Promise((resolve, reject) => {
      let cont = 0;
      let intervalo = setInterval(() => {
        cont++;
        console.log(cont);
        if(cont === 3){
          resolve(true);
          clearInterval(intervalo);
        }
        if(cont === 2){
          reject('¿¿!!');
          
        }
      }, 1000);
    })
  }

}
