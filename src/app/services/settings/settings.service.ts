import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }

  constructor( @Inject(DOCUMENT) private _document) {
    this.loadSettings();
  }

  saveSettings(){
    console.log('Guardado en el localStorage');
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings(){
    if(localStorage.getItem('settings')){
      this.settings = JSON.parse(localStorage.getItem('settings'));
      this.aplicarTema(this.settings.tema);
      console.log('Cargando del localStorage');

    }else{
      console.log('Usando los valores por defecto');
      
    }
  }

  aplicarTema(tema: string){
    let url = `assets/css/colors/${tema}.css`
    this._document.getElementById("tema").setAttribute('href', url);

    this.settings.tema = tema;
    this.settings.temaUrl = url;
    this.saveSettings();
  }
}

interface Settings{
  temaUrl: string;
  tema: string;
}
