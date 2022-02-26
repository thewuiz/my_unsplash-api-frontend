import { Component, OnInit } from '@angular/core';
import { ModalLoginService } from '../services/modal-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css'],
})
export class ModalLoginComponent implements OnInit {
  constructor(public modalLoginService: ModalLoginService) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.modalLoginService.cerrarModal();
  }

  signIn() {
    this.cerrarModal();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Welcome :D',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
