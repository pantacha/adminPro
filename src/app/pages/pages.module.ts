import { NgModule } from "@angular/core";
import { PAGES_ROUTING } from './pages.routes';

import { SharedModule } from "../shared/shared.module";

import { PagesComponent } from "./pages.component";

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from './graficas1/graficas1.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTING
    ]
})

export class PagesModule{}