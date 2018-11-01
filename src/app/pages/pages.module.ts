import { NgModule } from "@angular/core";
import { PAGES_ROUTING } from './pages.routes';
import {FormsModule} from '@angular/forms';

import { SharedModule } from "../shared/shared.module";

import { PagesComponent } from "./pages.component";

//ng2-charts
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from './graficas1/graficas1.component';
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import {DonutComponent} from '../components/graficas/donut.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        DonutComponent,
        AccountSettingsComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTING,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule{}