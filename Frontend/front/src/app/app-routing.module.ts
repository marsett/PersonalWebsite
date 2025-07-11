import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ConocimientosComponent } from './components/conocimientos/conocimientos.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'proyectos',
    component: ProyectosComponent
  },
  {
    path: 'conocimientos',
    component: ConocimientosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
