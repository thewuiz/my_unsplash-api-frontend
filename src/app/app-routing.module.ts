import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/pages/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    loadChildren: () =>
      import('@modules/home/home.module').then((m) => m.HomeModule),
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
