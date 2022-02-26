import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { ModalUploadComponent } from './components/modal-upload/modal-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ModalLoginComponent,
    ModalUploadComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ModalLoginComponent,
    ModalUploadComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
