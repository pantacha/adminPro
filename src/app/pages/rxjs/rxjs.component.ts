import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, from, Subscription } from 'rxjs';
import {retry, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
      
    console.log('Arranca el constructor');

    this.subscription = this.regresaObservable()
                            .pipe(retry(2),
                                  map((data) => data.valor),
                                  filter((value,index) => {
                                    //console.log('Filter: ', value,index);
                                    if(value % 2 !== 0){
                                      return true;
                                    }else{
                                      return false;
                                    }
                                  })
                                  )
                            .subscribe( (data) => { console.log('Subs: ', data)},
                    (error) => {console.error('error en el subscriber', error)},
                    () => {console.log('Fin')}
                  );
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log('la pagina se va a cerrar...');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any>{
    return new Observable((observer: Subscriber<any>) => {
      let cont=0;
      let intervalo = setInterval(() => {
        cont++;
        const salida = {
          valor: cont
        };
        observer.next(salida);
        /*if(cont === 3){
          clearInterval(intervalo);
          observer.complete();
        }
        if(cont === 2){
          observer.error('¿¿!!');
        }*/
      },1000);

    });
  }

}
