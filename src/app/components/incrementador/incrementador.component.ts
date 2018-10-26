import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() progress: number = 5;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChanges(newValue: number){
    console.log(newValue);

    //let elemHTML: any = document.getElementsByName("progress")[0];

    if(this.progress>=100){
      this.progress=100;
    }else if(this.progress<=0){
      this.progress=0;
    }else{
      this.progress = newValue;
    }
    //elemHTML.value = this.progress;
    this.txtProgress.nativeElement.value = this.progress;
    this.cambioValor.emit(this.progress);
    this.txtProgress.nativeElement.focus();
    
  }

  cambiarValor(valor: number) {
    if (this.progress >= 100 && valor > 0) {
      this.progress = 100;
      return;
    }
    if (this.progress <= 0 && valor < 0) {
      this.progress = 0;
      return;
    }

    this.progress += valor;

    this.cambioValor.emit(this.progress);

  }

}
