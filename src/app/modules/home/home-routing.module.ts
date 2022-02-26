import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';

const routes: Routes = [
  {
    path: 'gallery',
    loadChildren: () =>
      import('@modules/gallery/gallery.module').then((m) => m.GalleryModule),
  },
  {
    path: '**', //TODO 404 cuando no existe la ruta
    redirectTo: '/gallery',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
