import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document, public _settings: SettingsService ) { }

  ngOnInit() {
    this.persistirCheck();
  }

  changeColor(tema: string, link: any){
    console.log(tema);
    this.setCheck(link);
    this._settings.aplicarTema(tema);
  }

  setCheck(link: any){
    let selectores: any = document.getElementsByClassName("selector");
    for (let ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  persistirCheck(){
    let selectores: any = document.getElementsByClassName("selector");
    for(let ref of selectores){
      if(ref.getAttribute('data-theme') === this._settings.settings.tema){
        ref.classList.add('working');
        break;
      }
    }
  }

}
