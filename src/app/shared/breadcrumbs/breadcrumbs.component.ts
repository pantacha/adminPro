import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  title: string;

  constructor(private route: Router, private titulo: Title,
                private meta: Meta) {
    console.log('iniciando constructor...');
    
    this.getDataRoute().subscribe((data) => {
      console.log(data);
      this.title = data.title;
      this.titulo.setTitle(this.title);

      const metaTag: MetaDefinition = {
        name: "description",
        content: this.title
      }
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
    
  }

  getDataRoute(): Observable<any>{
    return this.route.events.pipe(
                            filter((event) => event instanceof ActivationEnd),
                            filter((event: ActivationEnd) => event.snapshot.firstChild === null),
                            map((event: ActivationEnd) => event.snapshot.data)
    );
  }


}
