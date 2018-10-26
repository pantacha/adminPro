import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progress1: number = 20;
  progress2: number = 30;

  constructor() { }

  ngOnInit() {
  }

  /*cambiarValor(valor: number){
    if(this.progress >= 100 && valor > 0){
      this.progress = 100;
      return;
    }
    if(this.progress <= 0 && valor < 0){
      this.progress = 0;
      return;
    }

    this.progress += valor;

  }*/

}
