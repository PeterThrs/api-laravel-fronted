import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TablaUsuariosComponent } from './dashboard/tabla-usuarios/tabla-usuarios.component';
import { TablaPlantasComponent } from './dashboard/tabla-plantas/tabla-plantas.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, children: [
        { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
        { path: 'usuarios', component: TablaUsuariosComponent },
        { path: 'plantas', component: TablaPlantasComponent },

    ]},
];
