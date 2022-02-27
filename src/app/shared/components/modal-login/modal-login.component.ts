import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from '@models/user';
import { ModalLoginService } from '../../services/modal-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css'],
})
export class ModalLoginComponent implements OnInit, OnDestroy {
  public errors: string[] = [];
  public usuario: User = new User();
  public usuarioSignUp: User = new User();
  private subscription: Subscription = new Subscription();

  constructor(
    public modalLoginService: ModalLoginService,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  // ==============================================================================================
  // =================================== SIGN IN ==================================================
  signIn() {
    this.subscription.add(
      this.authService.signIn(this.usuario).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          this.clearUser();
          this.cerrarModal();
          this.modalLoginService.user.emit('user');
        },
        error: (err) => {
          this.errors = err.error.errors;
        },
        complete: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Welcome :D',
            showConfirmButton: false,
            timer: 1000,
          });
        },
      })
    );
  }

  // ==============================================================================================
  // =================================== SIGN UP ==================================================
  signUp() {
    this.subscription.add(
      this.authService.signUp(this.usuarioSignUp).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          this.clearUser();
          this.cerrarModal();
        },
        error: (err) => {
          this.errors = err.error.errors;
        },
        complete: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Welcome :D',
            showConfirmButton: false,
            timer: 1000,
          });
        },
      })
    );
  }

  cerrarModal() {
    this.clearUser();
    this.errors = [];
    this.modalLoginService.cerrarModal();
  }

  clearUser() {
    this.usuario = new User();
  }
}
